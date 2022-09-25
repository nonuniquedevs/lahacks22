import React from "react";
import { Component } from "react";
import {
  DistanceMatrixService,
  LoadScript,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
  GoogleMap,
} from "@react-google-maps/api";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: "",
      models: "",
      distance: "",
      emissions: "",
      leftkeys: "",
      selectedmake: "1",
      selectedmodel: "a",
      makename: "",
      yearom: "a",
      selectedinterval: "a",
      yeararray: [
        1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
        1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
        2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
        2016, 2017, 2018, 2019, 2020,
      ],
      intervalarray: ["Daily", "Weekly", "Monthly", "Yearly"],
      modelsfiltered: "",
      distanceApi: "",
      autofillApi: "",
      origin: "",
      destination: "",
      route_dist: "",
      route_results: "",
      route_result_pairs: "",
    };
  }

  componentDidMount = async () => {
    console.log("component mounted");

    //calls car makes list api
    //aadi's token - carbon interface
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw	",
        "Content-Type": "application/json",
      },
    };
    fetch("https://www.carboninterface.com/api/v1/vehicle_makes", options)
      .then((response) => response.json())
      .then((responseText) => {
        let temparray = [];
        for (var key2 in responseText) {
          temparray.push(responseText[key2].data);
        }

        this.setState({ makes: temparray }, function () {});
      });
  };

  //handles car make from drop down

  handleCarMake = (event) => {
    event.preventDefault();

    //sets this.state.selectedmake = the car make
    this.setState({ selectedmake: event.target.value });

    //sorts through makes list and matches name to id
    //then fetches models from selected make
    for (var key2 in this.state.makes) {
      if (this.state.makes[key2].id == event.target.value) {
        this.setState(
          { makename: this.state.makes[key2].attributes.name },
          function () {
            //console.log(this.state.makename);
            //console.log(this.state.selectedmake);
            const options = {
              method: "GET",
              headers: {
                Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw",
                "Content-Type": "application/json",
              },
            };
            fetch(
              `https://www.carboninterface.com/api/v1/vehicle_makes/${this.state.selectedmake}/vehicle_models`,
              options
            )
              .then((response) => response.json())
              .then((responseText) => {
                this.setState({ models: responseText }, function () {
                  if (this.state.yearom != "a") {
                    let filteredmodels = [];
                    for (var key2 in this.state.models) {
                      if (
                        this.state.models[key2].data.attributes.year ==
                        this.state.yearom
                      ) {
                        filteredmodels.push(this.state.models[key2].data);
                      } else {
                      }
                    }
                    this.setState(
                      { modelsfiltered: filteredmodels },
                      function () {
                        let removeduplicates = this.state.modelsfiltered;

                        for (var key2 in this.state.modelsfiltered) {
                          for (var key3 in removeduplicates) {
                            if (
                              this.state.modelsfiltered[key2].attributes.name ==
                                removeduplicates[key3].attributes.name &&
                              this.state.modelsfiltered[key2] !=
                                removeduplicates[key3]
                            ) {
                              removeduplicates.splice(key3, 1);
                            }
                          }
                        }

                        //console.log("diltered");
                        //console.log(removeduplicates);
                        this.setState(
                          { modelsfiltered: removeduplicates },
                          function () {
                            //console.log("mf");
                            //console.log(this.state.modelsfiltered);
                          }
                        );
                      }
                    );
                  }
                });
              });
          }
        );
      }
    }
  };

  // handles car year from dropdown

  handleyear = (event) => {
    //console.log("bruh");
    event.preventDefault();
    this.setState({ yearom: event.target.value }, function () {
      // console.log(this.state.yearom);
      // console.log(this.state.models);
      let filteredmodels = [];
      for (var key2 in this.state.models) {
        if (
          this.state.models[key2].data.attributes.year == event.target.value
        ) {
          filteredmodels.push(this.state.models[key2].data);
        } else {
        }
      }
      this.setState({ modelsfiltered: filteredmodels }, function () {
        //   console.log("mf");
        //   console.log(this.state.modelsfiltered);
        let removeduplicates = this.state.modelsfiltered;

        for (var key2 in this.state.modelsfiltered) {
          for (var key3 in removeduplicates) {
            if (
              this.state.modelsfiltered[key2].attributes.name ==
                removeduplicates[key3].attributes.name &&
              this.state.modelsfiltered[key2] != removeduplicates[key3]
            ) {
              removeduplicates.splice(key3, 1);
            }
          }
        }

        //   console.log("diltered");
        //   console.log(removeduplicates);
        this.setState({ modelsfiltered: removeduplicates }, function () {
          //  console.log("mf");
          //  console.log(this.state.modelsfiltered);
        });
      });
    });
  };

  // handles car model from dropdown

  handleCarModel = (event) => {
    //console.log("model handled");
    let vehicleid = event.target.value;
    // console.log(vehicleid);

    for (var key2 in this.state.modelsfiltered) {
      // console.log("hi");
      if (this.state.modelsfiltered[key2].id == event.target.value) {
        this.setState(
          { selectedmodel: this.state.modelsfiltered[key2].id },
          function () {
            //console.log(this.state.selectedmodel);
          }
        );
      }
    }

    if (this.state.distance) {
      let distance = this.state.distance;

      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "vehicle",
          distance_unit: "km",
          distance_value: distance,
          vehicle_model_id: vehicleid,
        }),
      };
      fetch("https://www.carboninterface.com/api/v1/estimates", options)
        .then((response) => response.json())
        .then((responseText) => {
          this.setState(
            { emissions: responseText.data.attributes },
            function () {
              console.log("Response:");
              console.log(this.state.emissions);
              // let leftkeys = Object.keys(this.state.emissions);
              // console.log(leftkeys);
              // this.setState({ leftkeys: leftkeys });
            }
          );
        });
    }
  };

  handleInterval = (event) => {
    this.setState({ selectedinterval: event.target.value });
    console.log(this.state.selectedinterval);
  };

  render() {
    let makeinput = "";
    if (this.state.makes) {
      makeinput = (
        <div>
          <Box sx={{}} size="small">
            <Select
              value={this.state.selectedmake}
              onChange={this.handleCarMake}
              size="small"
              variant="outlined"
              sx={{}}
            >
              <MenuItem value="1" disabled>
                Car make
              </MenuItem>
              {this.state.makes.map((make) => (
                <MenuItem key={make.id} value={make.id}>
                  {" "}
                  {make.attributes.name}{" "}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </div>
      );
    }

    let yearinput = "";
    if (this.state.selectedmake && this.state.selectedmake != "1") {
      yearinput = (
        <div>
          <Box sx={{}} size="small">
            <Select
              value={this.state.yearom}
              onChange={this.handleyear}
              size="small"
            >
              <MenuItem value="a" disabled>
                Manufacturing Year
              </MenuItem>
              {this.state.yeararray.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </div>
      );
    }

    let modelinput = "";
    if (this.state.modelsfiltered && this.state.yearom != "a") {
      modelinput = (
        <div>
          <Box sx={{}} size="small">
            <Select
              value={this.state.selectedmodel}
              onChange={this.handleCarModel}
              size="small"
            >
              <MenuItem value="a" disabled>
                Car Model
              </MenuItem>
              {this.state.modelsfiltered.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {" "}
                  {model.attributes.name}{" "}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </div>
      );
    }

    let intervalinput = "";
    if (this.state.selectedmodel !== "a") {
      intervalinput = (
        <div>
          <Box sx={{}} size="small">
            <Select
              value={this.state.selectedinterval}
              onChange={this.handleInterval}
              size="small"
            >
              <MenuItem value="a" disabled>
                Interval
              </MenuItem>
              {this.state.intervalarray.map((interval, index) => (
                <MenuItem key={index} value={interval}>
                  {interval}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </div>
      );
    }

    return (
      <Box className="App" sx={{ height: "100vh", width: "100vw", pt: 10 }}>
        <h1>Vehicle</h1>
        <Box
          sx={{
            display: "grid",
            columnGap: 1,
            rowGap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <list>
            <form>
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: "repeat(1, 4fr)",
                }}
                style={{}}
              >
                <list>{makeinput}</list>
                <list>{yearinput}</list>
                <list>{modelinput}</list>
                <list>{intervalinput}</list>
              </Box>
            </form>
          </list>
          <list>
            <LoadScript
              googleMapsApiKey="AIzaSyBKHL2R02wDBkDHAWv9b-mnaHmu6MmaWBc"
              libraries={["places"]}
            >
              {this.state.selectedinterval !== "a" && (
                <AutocompleteApiComponent
                  vehicle_model={this.state.selectedmodel}
                  interval={this.state.selectedinterval}
                />
              )}
            </LoadScript>
          </list>
        </Box>

      </Box>
    );
  }
}

// fetches distance for route

class DistApiComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.input_origin,
      destination: this.props.input_destination,
      distance: null,
      interval: this.props.interval,
      vehicleId: this.props.vehicleId,
    };
    this.distanceCallback = this.distanceCallback.bind(this);
  }

  // updates state when api returns distance for route

  distanceCallback(response) {
    if (response !== null && this.state.distance === null) {
      var distanceText = response.rows[0].elements[0].distance.text;
      this.setState({
        distance: distanceText.replace(",", "").replace("km", ""),
      });
    }
  }

  render() {
    console.log("DistApiComp vehicleId:", this.state.vehicleId);
    return (
      <div>
        <DistanceMatrixService
          options={{
            destinations: [{ placeId: this.state.origin }],
            origins: [{ placeId: this.state.destination }],
            travelMode: "DRIVING",
          }}
          callback={this.distanceCallback}
        />
        {this.state.vehicleId !== "a" && this.state.distance !== null && (
          <ResultsComponent
            vehicleId={this.state.vehicleId}
            routeDistance={this.state.distance}
            interval={this.state.interval}
          ></ResultsComponent>
        )}
      </div>
    );
  }
}

// handles map display and travel input

class AutocompleteApiComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: null,
      destination: null,
      routeResponse: null,
      DistApi: null,
      interval: this.props.interval,
      vehicle_model: this.props.vehicle_model,
    };

    this.origin_autocomplete = null;
    this.destination_autocomplete = null;

    this.origin_onLoad = this.origin_onLoad.bind(this);
    this.origin_onPlaceChanged = this.origin_onPlaceChanged.bind(this);
    this.destination_onLoad = this.destination_onLoad.bind(this);
    this.destination_onPlaceChanged =
      this.destination_onPlaceChanged.bind(this);
    this.directionsCallback = this.directionsCallback.bind(this);
  }

  // called on origin textbox load

  origin_onLoad(origin_autocomplete) {
    console.log("origin autocomplete: ", origin_autocomplete);

    this.origin_autocomplete = origin_autocomplete;
  }

  // called on destination textbox load

  destination_onLoad(destination_autocomplete) {
    console.log("destination autocomplete: ", destination_autocomplete);

    this.destination_autocomplete = destination_autocomplete;
  }

  // updates state when origin input is given

  origin_onPlaceChanged() {
    if (this.origin_autocomplete != null) {
      this.state.origin = this.origin_autocomplete.getPlace().place_id;
      this.setState({ origin: this.origin_autocomplete.getPlace().place_id });
      console.log(this.state.origin);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  // updates state when destination input is given

  destination_onPlaceChanged() {
    if (this.destination_autocomplete != null) {
      this.state.destination =
        this.destination_autocomplete.getPlace().place_id;
      this.setState({
        destination: this.destination_autocomplete.getPlace().place_id,
      });
      console.log(this.state.destination);
      console.log(
        "AutocompleteApiComp after destination vehicleId:",
        this.state.vehicle_model
      );
      this.setState({
        DistApi: [
          <DistApiComponent
            input_origin={this.state.origin}
            input_destination={this.state.destination}
            vehicleId={this.state.vehicle_model}
            interval={this.state.interval}
          ></DistApiComponent>,
        ],
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  // updates state when directions retrieved for showing route

  directionsCallback(response) {
    if (response !== null && this.state.routeResponse === null) {
      if (response.status === "OK") {
        this.setState({ routeResponse: response });
      } else {
        console.log("error: ", response);
      }
    }
  }

  render() {
    return (
      <div>
        <Box
          sx={{
            display: "grid",
            columnGap: 1,
            rowGap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <list>
            <GoogleMap
              id="searchbox-example"
              mapContainerStyle={{ height: "800px", width: "400px" }}
              zoom={2.5}
              center={{ lat: 38.685, lng: -115.234 }}
            >
              <Autocomplete
                onLoad={this.origin_onLoad}
                onPlaceChanged={this.origin_onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter your origin "
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    top: "2%",
                    marginLeft: "-120px",
                  }}
                />
              </Autocomplete>
              <Autocomplete
                onLoad={this.destination_onLoad}
                onPlaceChanged={this.destination_onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter your destination "
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    top: "12%",
                    marginLeft: "-120px",
                  }}
                />
              </Autocomplete>

              {this.state.destination !== null && this.state.origin !== null && (
                <DirectionsService
                  options={{
                    destination: { placeId: this.state.destination },
                    origin: { placeId: this.state.origin },
                    travelMode: "DRIVING",
                  }}
                  callback={this.directionsCallback}
                  onLoad={(directionsService) => {
                    console.log(
                      "DirectionsService onLoad directionsService: ",
                      directionsService
                    );
                  }}
                  onUnmount={(directionsService) => {
                    console.log(
                      "DirectionsService onUnmount directionsService: ",
                      directionsService
                    );
                  }}
                />
              )}

              {this.state.routeResponse !== null && (
                <DirectionsRenderer
                  options={{
                    // eslint-disable-line
                    directions: this.state.routeResponse,
                  }}
                  onLoad={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onLoad directionsRenderer: ",
                      directionsRenderer
                    );
                  }}
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onUnmount directionsRenderer: ",
                      directionsRenderer
                    );
                  }}
                />
              )}
            </GoogleMap>
          </list>
          <list>{this.state.DistApi}</list>
        </Box>
      </div>
    );
  }
}

// handles emission api

class ResultsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: this.props.vehicleId,
      routeDistance: this.props.routeDistance,
      interval: this.props.interval,
      emissionResult: null,
    };
  }

  // fetches emission data on component mount

  componentDidMount() {
    let model = this.state.vehicleId;
    // let distance = this.state.routeDistance;
    let interval = this.state.interval;
    var distance = this.state.routeDistance;
    switch (interval) {
      case "Daily":
        distance = distance;
        break;
      case "Weekly":
        distance = distance * 5;
        break;
      case "Monthly":
        distance = distance * 5 * 4;
        break;
      case "Yearly":
        distance = distance * 5 * 4 * 12;
        break;
    }

    console.log("resultscomp vehicleId:", this.state.vehicleId);

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw	",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "vehicle",
        distance_unit: "km",
        distance_value: distance,
        vehicle_model_id: model,
        emissionResult: null,
      }),
    };
    fetch("https://www.carboninterface.com/api/v1/estimates", options)
      .then((response) => response.json())
      .then((responseText) => {
        console.log("emission api response: ", responseText);
        this.setState({
          emissionResult: responseText.data.attributes,
        });
      });
  }

  render() {
    let formatResults = null;
    if (this.state.emissionResult !== null) {
      var parsed = JSON.parse(JSON.stringify(this.state.emissionResult));
      var distance = parsed.distance_value;
      var carbon_lb = parsed.carbon_lb;
      var carbon_kg = parsed.carbon_kg;
      var carbon_mt = parsed.carbon_mt;
      var trees = Math.ceil(carbon_lb * 0.028);
      var phones = Math.ceil(carbon_lb * 202);
      formatResults = (
        <div>
          <p>{distance} km travelled</p>
          <p>{carbon_kg} kilograms emitted</p>
          <p>{carbon_mt} metric tons emitted</p>
          <p>{trees} trees planted</p>
          <p>{phones} phones charged</p>

          <PayPalScriptProvider
            options={{
              "client-id":
                "AfbaYXzVZdAk46vKRzwBCG_QoBHe02_QjrFIJZpnEcVF2m-zrZv3Oa7cEShBJxgw_pPrR3RjG06g4FXF",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                this.setState({ trees: { trees } });
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: trees,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                alert("Thank you, " + name + ", for making a contribution to climate change.");
              }}
            />
          </PayPalScriptProvider>
        </div>
      );
    }

    return <div>{formatResults}</div>;
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
export default Vehicle;
