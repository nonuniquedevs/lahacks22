import React from "react";
import { Component } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Button, CardContent } from "@mui/material";
import { airportlist } from "./AirportData.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { calculateFlightEmissions } from "./FlightEmission.jsx";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  GoogleMap,
  LoadScript,
  PolylineF,
  MarkerF,
  Marker,
} from "@react-google-maps/api";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

//import useStyles from "./styles.jsx";

const center = {
  lat: 20,
  lng: -20,
};

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legs: {
        0: "",
        1: "",
        2: "",
        3: "",
      },
      selectedOrigin: "",
      selectedDestination: "",
      selectedAddedLeg: "",
      selectedFinalLeg: "",
      airportsinvolved: 2,
      passengers: 2,
      emissions: "",
      leftcolumn: [
        "Legs Involved",
        "Airports",
        "Distance",
        "Units",
        "Date of Estimation",
        "Carbon in Grams",
        "Carbon in Pounds",
        "Carbon in Kilograms",
        "Carbon in Metric Tons",
      ],
      airporttwo: "Destination",
      airportthree: "Destination",
      pathCoordinates: "",
      isFLightNumber: false,
    };
    this.handleOrigin = this.handleOrigin.bind(this);
    this.handleDestination = this.handleDestination.bind(this);
  }

  componentDidMount = async () => {};

  createData = (column, otherColumn) => {
    return { column, otherColumn };
  };

  handlePassengers = (event) => {
    this.setState({ passengers: event.target.value }, () => {
      console.log(this.state.passengers);

      let demobool = false;
      let legarray = [];
      let coordinateArray = [];

      let loopervar = this.state.airportsinvolved;

      for (let key2 = 0; key2 < loopervar; key2++) {
        if (this.state.legs[`${key2}`] && this.state.legs[`${key2}`] != null) {
          console.log("a");
          demobool = true;
          legarray.push(this.state.legs[`${key2}`]["code"]);
          let lat = parseInt(this.state.legs[`${key2}`]["lat"]);
          let lng = parseInt(this.state.legs[`${key2}`]["lon"]);
          let coordinatesObject = { lat: lat, lng: lng };
          coordinateArray.push(coordinatesObject);
        } else {
          demobool = false;
        }
      }
      if (demobool == true) {
        calculateFlightEmissions(legarray, this.state.passengers).then(
          (emissions) => {
            this.setState(
              { emissions: emissions, pathCoordinates: coordinateArray },
              () => {
                console.log("worked gg");
                console.log(this.state.emissions);
                console.log("coordiantes haha");
                console.log(this.state.pathCoordinates);
              }
            );
          }
        );
      }
    });
  };

  handleOrigin = (event, values) => {
    if (values != null) {
      let templegs = this.state.legs;
      templegs["0"] = values;

      this.setState({ legs: templegs }, () => {
        console.log(this.state.legs);
      });

      let demobool = false;
      let legarray = [];
      let loopervar = this.state.airportsinvolved;
      let coordinateArray = [];

      for (let key2 = 0; key2 < loopervar; key2++) {
        if (this.state.legs[`${key2}`] && this.state.legs[`${key2}`] != null) {
          console.log("a");
          demobool = true;
          legarray.push(this.state.legs[`${key2}`]["code"]);
          let lat = parseInt(this.state.legs[`${key2}`]["lat"]);
          let lng = parseInt(this.state.legs[`${key2}`]["lon"]);
          let coordinatesObject = { lat: lat, lng: lng };
          coordinateArray.push(coordinatesObject);
        } else {
          demobool = false;
        }
      }
      if (demobool == true) {
        calculateFlightEmissions(legarray, this.state.passengers).then(
          (emissions) => {
            this.setState(
              { emissions: emissions, pathCoordinates: coordinateArray },
              () => {
                console.log("worked gg");
                console.log(this.state.emissions);
                console.log("coordiantes haha");
                console.log(this.state.pathCoordinates);
              }
            );
          }
        );
      }
    }
  };

  handleDestination = (event, values) => {
    if (values != null) {
      let templegs = this.state.legs;
      templegs["1"] = values;

      this.setState({ legs: templegs }, () => {
        console.log(this.state.legs);
      });

      let demobool = false;
      let legarray = [];
      let loopervar = this.state.airportsinvolved;
      let coordinateArray = [];

      for (let key2 = 0; key2 < loopervar; key2++) {
        if (
          this.state.legs[`${key2}`] != "" &&
          this.state.legs[`${key2}`] != null
        ) {
          demobool = true;
          legarray.push(this.state.legs[`${key2}`]["code"]);
          let lat = parseInt(this.state.legs[`${key2}`]["lat"]);
          let lng = parseInt(this.state.legs[`${key2}`]["lon"]);
          let coordinatesObject = { lat: lat, lng: lng };
          coordinateArray.push(coordinatesObject);
        } else {
          demobool = false;
        }
      }
      if (demobool == true) {
        calculateFlightEmissions(legarray, this.state.passengers).then(
          (emissions) => {
            this.setState(
              { emissions: emissions, pathCoordinates: coordinateArray },
              () => {
                console.log("worked gg");
                console.log(this.state.emissions);
                console.log("coordiantes haha");
                console.log(this.state.pathCoordinates);
              }
            );
          }
        );
      }
    }
  };

  handleAddLeg = () => {
    if (this.state.airportsinvolved < 4) {
      let addleg = this.state.airportsinvolved + 1;
      this.setState({ airportsinvolved: addleg }, () => {
        console.log(this.state.airportsinvolved);
        if (this.state.airportsinvolved == 3) {
          this.setState({ airporttwo: "Leg One" }, () => {
            console.log(this.state.airporttwo);
          });
        } else if (this.state.airportsinvolved == 4) {
          this.setState({ airportthree: "Leg Two" }, () => {
            console.log(this.state.airportthree);
          });
        }
      });
    } else {
      alert("you really that broke you needa fly 5 connections bruh");
    }
  };

  handleRemLeg = () => {
    if (this.state.airportsinvolved > 2) {
      let remleg = this.state.airportsinvolved - 1;
      this.setState({ airportsinvolved: remleg }, () => {
        if (this.state.airportsinvolved == 3) {
          this.setState({ airportthree: "Destination" }, () => {
            console.log(this.state.airportthree);
          });
        } else if (this.state.airportsinvolved == 2) {
          this.setState({ airporttwo: "Destination" }, () => {
            console.log(this.state.airporttwo);
          });
        }

        console.log(this.state.airportsinvolved);
        let demobool = false;
        let legarray = [];
        let loopervar = this.state.airportsinvolved;
        let coordinateArray = [];

        for (let key2 = 0; key2 < loopervar; key2++) {
          if (
            this.state.legs[`${key2}`] != "" &&
            this.state.legs[`${key2}`] != null
          ) {
            demobool = true;
            legarray.push(this.state.legs[`${key2}`]["code"]);
            let lat = parseInt(this.state.legs[`${key2}`]["lat"]);
            let lng = parseInt(this.state.legs[`${key2}`]["lon"]);
            let coordinatesObject = { lat: lat, lng: lng };
            coordinateArray.push(coordinatesObject);
          } else {
            demobool = false;
          }
        }
        if (demobool == true) {
          calculateFlightEmissions(legarray, this.state.passengers).then(
            (emissions) => {
              this.setState(
                { emissions: emissions, pathCoordinates: coordinateArray },
                () => {
                  console.log("worked gg");
                  console.log(this.state.emissions);
                  console.log("coordiantes haha");
                  console.log(this.state.pathCoordinates);
                }
              );
            }
          );
        }
      });
    } else {
      alert("you needa fly to another airport 🤦‍♂️");
    }
  };

  handleAddedLeg = (event, values) => {
    if (values != null) {
      let templegs = this.state.legs;
      templegs["2"] = values;

      this.setState({ legs: templegs }, () => {
        console.log(this.state.legs);
      });

      let demobool = false;
      let legarray = [];
      let loopervar = this.state.airportsinvolved;
      let coordinateArray = [];

      for (let key2 = 0; key2 < loopervar; key2++) {
        if (
          this.state.legs[`${key2}`] != "" &&
          this.state.legs[`${key2}`] != null
        ) {
          demobool = true;
          legarray.push(this.state.legs[`${key2}`]["code"]);
          let lat = parseInt(this.state.legs[`${key2}`]["lat"]);
          let lng = parseInt(this.state.legs[`${key2}`]["lon"]);
          let coordinatesObject = { lat: lat, lng: lng };
          coordinateArray.push(coordinatesObject);
        } else {
          demobool = false;
        }
      }
      if (demobool == true) {
        calculateFlightEmissions(legarray, this.state.passengers).then(
          (emissions) => {
            this.setState(
              { emissions: emissions, pathCoordinates: coordinateArray },
              () => {
                console.log("worked gg");
                console.log(this.state.emissions);
              }
            );
          }
        );
      }
    }
  };

  handleFinalLeg = (event, values) => {
    if (values != null) {
      let templegs = this.state.legs;
      templegs["3"] = values;

      this.setState({ legs: templegs }, () => {
        console.log(this.state.legs);
      });

      let demobool = false;
      let legarray = [];
      let loopervar = this.state.airportsinvolved;
      let coordinateArray = [];

      for (let key2 = 0; key2 < loopervar; key2++) {
        if (
          this.state.legs[`${key2}`] != "" &&
          this.state.legs[`${key2}`] != null
        ) {
          demobool = true;
          legarray.push(this.state.legs[`${key2}`]["code"]);
          let lat = parseInt(this.state.legs[`${key2}`]["lat"]);
          let lng = parseInt(this.state.legs[`${key2}`]["lon"]);
          let coordinatesObject = { lat: lat, lng: lng };
          coordinateArray.push(coordinatesObject);
        } else {
          demobool = false;
        }
      }
      if (demobool == true) {
        calculateFlightEmissions(legarray, this.state.passengers).then(
          (emissions) => {
            this.setState(
              { emissions: emissions, pathCoordinates: coordinateArray },
              () => {
                console.log("worked gg");
                console.log(this.state.emissions);
              }
            );
          }
        );
      }
    }
  };

  render() {
    let addedlegone = "";
    if (this.state.airportsinvolved >= 3) {
      addedlegone = (
        <Autocomplete
          disablePortal
          id="airport-leg3-autofill"
          autoHighlight
          getOptionLabel={(option) => `${option.name} (${option.code})`}
          options={airportlist}
          sx={{ width: "auto" }}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name} {option.city} <b>{option.code}</b>
            </Box>
          )}
          onChange={this.handleAddedLeg}
          renderInput={(params) => (
            <TextField {...params} label={this.state.airportthree} />
          )}
        />
      );
    }

    let addedfinalleg = "";
    if (this.state.airportsinvolved >= 4) {
      addedfinalleg = (
        <Autocomplete
          disablePortal
          id="airport-leg3-autofill"
          autoHighlight
          getOptionLabel={(option) => `${option.name} (${option.code})`}
          options={airportlist}
          sx={{ width: "auto" }}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name} {option.city} <b>{option.code}</b>
            </Box>
          )}
          onChange={this.handleFinalLeg}
          renderInput={(params) => (
            <TextField {...params} label="Destination" />
          )}
        />
      );
    }

    let results = "";
    if (this.state.emissions) {
      results = JSON.stringify(this.state.emissions);
    }

    let leftcolumn = [
      "Passengers",
      "Airports",
      "Distance",
      "Carbon in Pounds",
      "Carbon in Kilograms",
      "Carbon in Metric Tons",
    ];
    let rightcolumnindexer = [
      "passengers",
      "legs",
      "distance_value",
      "carbon_lb",
      "carbon_kg",
      "carbon_mt",
    ];
    //let leftcolumn = Object.keys(this.state.emissions)

    let areEmissions = this.state.emissions;
    let areCoordinates = this.state.pathCoordinates;

    let legListZero = "";
    if (this.state.legs[0]) {
      let lat = parseInt(this.state.legs[0]["lat"]);
      let lng = parseInt(this.state.legs[0]["lon"]);
      legListZero = { lat: lat, lng: lng };
    }
    let legListOne = "";
    if (this.state.legs[1]) {
      let lat = parseInt(this.state.legs[1]["lat"]);
      let lng = parseInt(this.state.legs[1]["lon"]);
      legListOne = { lat: lat, lng: lng };
    }

    let legListTwo = "";
    if (
      this.state.airportsinvolved == 3 ||
      (this.state.airportsinvolved == 4 && this.state.legs[2])
    ) {
      let lat = parseInt(this.state.legs[2]["lat"]);
      let lng = parseInt(this.state.legs[2]["lon"]);
      legListTwo = { lat: lat, lng: lng };
    } else if (this.state.airportsinvolved == 2) {
      legListTwo = "";
    }

    let legListThree = "";
    if (this.state.airportsinvolved == 4 && this.state.legs[3]) {
      let lat = parseInt(this.state.legs[3]["lat"]);
      let lng = parseInt(this.state.legs[3]["lon"]);
      legListThree = { lat: lat, lng: lng };
    } else if (this.state.airportsinvolved != 4) {
      legListThree = "";
    }

    let cards = "";
    if (this.state.emissions) {
      let distanceStuff = `${this.state.emissions["distance_value"]} ${this.state.emissions["distance_unit"]}`;
      cards = (
        <div>
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sx={{ py: 1, px: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {this.state.emissions["carbon_lb"]} Pounds
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ py: 1, px: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {this.state.emissions["carbon_mt"]} Metric Tons
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ py: 1, px: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{distanceStuff}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ py: 1, px: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {Math.ceil(this.state.emissions["carbon_lb"] * 0.028)} Trees
                    Planted
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ py: 1, px: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {Math.ceil(this.state.emissions["carbon_lb"] * 202)} Phones
                    Charged
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AfbaYXzVZdAk46vKRzwBCG_QoBHe02_QjrFIJZpnEcVF2m-zrZv3Oa7cEShBJxgw_pPrR3RjG06g4FXF",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: String(
                          Math.ceil(this.state.emissions["carbon_lb"] * 0.028)
                        ),
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

    return (
      <Box
        className="App"
        sx={{ pt: 10, flexGrow: 1, px: 5, height: `100vh`, width: `100vw` }}
      >
        <Grid container direction="row" spacing={1}>
          <Grid
            item
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignspacing={1}
            xs={4}
            sx={{ px: 1 }}
          >
            <Grid item sx={{ py: 1 }}>
              <Autocomplete
                disablePortal
                id="airport-origin-autofill"
                autoHighlight
                getOptionLabel={(option) => `${option.name} (${option.code})`}
                options={airportlist}
                sx={{ width: "auto" }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name} {option.city} <b>{option.code}</b>
                  </Box>
                )}
                onChange={this.handleOrigin}
                renderInput={(params) => (
                  <TextField {...params} label="Origin" />
                )}
              />
            </Grid>
            <Grid item sx={{ py: 1 }}>
              <Autocomplete
                disablePortal
                id="airport-destination-autofill"
                autoHighlight
                getOptionLabel={(option) => `${option.name} (${option.code})`}
                options={airportlist}
                sx={{ width: "auto" }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name} {option.city} <b>{option.code}</b>
                  </Box>
                )}
                onChange={this.handleDestination}
                renderInput={(params) => (
                  <TextField {...params} label={this.state.airporttwo} />
                )}
              />
            </Grid>

            <Grid item sx={{ py: 1 }}>
              {addedlegone}
            </Grid>

            <Grid item sx={{ py: 1 }}>
              {addedfinalleg}
            </Grid>

            <Grid
              container
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item sx={{ py: 1, px: 2 }}>
                <FormControl fullWidth sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel id="demo-simple-select-label">
                    Passengers
                  </InputLabel>
                  <Select
                    labelId="select-passenger-count"
                    id="select-passenger-count"
                    value={this.state.passengers}
                    label="Passengers"
                    onChange={this.handlePassengers}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ py: 1 }}>
                <Button color="primary" onClick={this.handleAddLeg}>
                  {" "}
                  Add Leg{" "}
                </Button>{" "}
              </Grid>

              <Grid item sx={{ py: 1 }}>
                <Button color="primary" onClick={this.handleRemLeg}>
                  Remove Leg
                </Button>{" "}
              </Grid>
            </Grid>
            <Grid item sx={{ py: 1, height: `100%`, width: `100%` }}>
              <LoadScript
                style={{ height: `100%`, width: `100%` }}
                googleMapsApiKey="AIzaSyBKHL2R02wDBkDHAWv9b-mnaHmu6MmaWBc"
              >
                <GoogleMap
                  mapContainerStyle={{ height: `100%`, width: `100%` }}
                  center={center}
                  zoom={2}
                >
                  {areCoordinates && (
                    <PolylineF
                      path={this.state.pathCoordinates}
                      options={{
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.5,
                        clickable: false,
                        draggable: false,
                        editable: false,
                        visible: true,
                        radius: 30000,
                        paths: this.state.pathCoordinates,
                      }}
                    />
                  )}

                  {legListZero && <MarkerF position={legListZero} />}
                  {legListOne && <MarkerF position={legListOne} />}
                  {legListTwo && <MarkerF position={legListTwo} />}
                  {legListThree && <MarkerF position={legListThree} />}
                </GoogleMap>
              </LoadScript>
            </Grid>
          </Grid>

          <Grid
            item
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignspacing={1}
            xs={4}
          >
            <Grid item sx={{ py: 1 }}>
              <Typography align="center" variant="h4">
                Flight Emissions
              </Typography>
            </Grid>

            {cards}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Flight;

// googleMapsApiKey='AIzaSyBKHL2R02wDBkDHAWv9b-mnaHmu6MmaWBc'
