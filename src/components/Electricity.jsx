import React, { Component } from "react";
import { Autocomplete } from "@mui/material";
import { Grid, Stack, Box, TextField } from "@mui/material";
import { Button, FormControl } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


class Electricity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billvalue: "",
      chosenState: "",
      billorwatts: "bill",
      watts: "",
      units: "mwh",
      emissions: "",
    };
  }

  handleState = (event, values) => {
    this.setState({ chosenState: values }, () => {
      console.log(this.state.chosenState);
    });
  };

  handleBillChange = (event) => {
    this.setState({ billvalue: event.target.value }, () => {
      console.log(this.state.billvalue);
    });
  };

  handleElec = (event) => {
    this.setState({ watts: event.target.value });
  };

  handleUnits = (event) => {
    this.setState({ units: event.target.value }, () => {
      console.log(this.state.units);
    });
  };

  handleYesBill = () => {
    this.setState({ billorwatts: "bill" });
  };

  handleNoBill = () => {
    this.setState({ billorwatts: "watts" });
  };

  calculate = () => {
    if (this.state.billorwatts == "bill") {
      if (this.state.billvalue && this.state.chosenState) {
        var state = this.state.chosenState.value;
        var rate = this.state.chosenState.rate;
        var userrate = this.state.billvalue;
        var elecval = userrate / rate;

        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw	",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "electricity",
            electricity_value: elecval,
            electricity_unit: "kwh",
            country: "us",
            state: state,
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
              }
            );
          });
      } else {
        alert("Please fill missing values");
      }
    } else if (this.state.billorwatts == "watts") {
      if (this.state.watts && this.state.chosenState) {
        var state = this.state.chosenState.value;
        var val = this.state.watts;
        var electricity_unit = this.state.units;

        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw	",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "electricity",
            electricity_value: val,
            electricity_unit: electricity_unit,
            country: "us",
            state: state,
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
              }
            );
          });
      }
    }
  };

  render() {
    const statedata = [
      { rate: 12.41, avgbill: 108, value: "AK", label: "Alaska" },
      { rate: 22.54, avgbill: 185, value: "AL", label: "Alabama" },
      { rate: 13.16, avgbill: 109, value: "AR", label: "Arkansas" },
      { rate: 9.99, avgbill: 88, value: "AZ", label: "Arizona" },
      { rate: 19.9, avgbill: 153, value: "CA", label: "California" },
      { rate: 12.28, avgbill: 105, value: "CO", label: "Colorado" },
      { rate: 21.62, avgbill: 189, value: "CT", label: "Connecticut" },
      { rate: 13.21, avgbill: 120, value: "DC", label: "District of Columbia" },
      { rate: 12.05, avgbill: 123, value: "DE", label: "Delaware" },
      { rate: 11.37, avgbill: 102, value: "FL", label: "Florida" },
      { rate: 12.26, avgbill: 101, value: "GA", label: "Georgia" },
      { rate: 32.76, avgbill: 246, value: "HI", label: "Hawaii" },
      { rate: 10.58, avgbill: 89, value: "IA", label: "Iowa" },
      { rate: 12.56, avgbill: 112, value: "ID", label: "Idaho" },
      { rate: 12.02, avgbill: 102, value: "IL", label: "Illinois" },
      { rate: 13.81, avgbill: 108, value: "IN", label: "Indiana" },
      { rate: 11.56, avgbill: 118, value: "KS", label: "Kansas" },
      { rate: 10.56, avgbill: 92, value: "KY", label: "Kentucky" },
      { rate: 9.37, avgbill: 81, value: "LA", label: "Louisiana" },
      { rate: 16.16, avgbill: 152, value: "MA", label: "Massachusetts" },
      { rate: 13.92, avgbill: 130, value: "MD", label: "Maryland" },
      { rate: 21.11, avgbill: 177, value: "ME", label: "Maine" },
      { rate: 16.07, avgbill: 136, value: "MI", label: "Michigan" },
      { rate: 14.09, avgbill: 113, value: "MN", label: "Minnesota" },
      { rate: 11.55, avgbill: 97, value: "MO", label: "Missouri" },
      { rate: 13.23, avgbill: 96, value: "MS", label: "Mississippi" },
      { rate: 11.85, avgbill: 99, value: "MT", label: "Montana" },
      { rate: 11.31, avgbill: 101, value: "NC", label: "North Carolina" },
      { rate: 11.67, avgbill: 92, value: "ND", label: "North Dakota" },
      { rate: 11.93, avgbill: 95, value: "NE", label: "Nebraska" },
      { rate: 15.64, avgbill: 167, value: "NH", label: "New Hampshire" },
      { rate: 13.37, avgbill: 141, value: "NJ", label: "New Jersey" },
      { rate: 19.3, avgbill: 104, value: "NM", label: "New Mexico" },
      { rate: 11.24, avgbill: 108, value: "NV", label: "Nevada" },
      { rate: 19.3, avgbill: 156, value: "NY", label: "New York" },
      { rate: 12.64, avgbill: 113, value: "OH", label: "Ohio" },
      { rate: 10.72, avgbill: 90, value: "OK", label: "Oklahoma" },
      { rate: 11.02, avgbill: 95, value: "OR", label: "Oregon" },
      { rate: 14.38, avgbill: 128, value: "PA", label: "Pennsylvania" },
      { rate: 18.64, avgbill: 170, value: "RI", label: "Rhode Island" },
      { rate: 12.91, avgbill: 113, value: "SC", label: "South Carolina" },
      { rate: 12.39, avgbill: 101, value: "SD", label: "South Dakota" },
      { rate: 10.79, avgbill: 91, value: "TN", label: "Tennessee" },
      { rate: 11.36, avgbill: 110, value: "TX", label: "Texas" },
      { rate: 10.63, avgbill: 98, value: "UT", label: "Utah" },
      { rate: 18.5, avgbill: 104, value: "VA", label: "Virginia" },
      { rate: 12.4, avgbill: 157, value: "VT", label: "Vermont" },
      { rate: 9.79, avgbill: 84, value: "WA", label: "Washington" },
      { rate: 11.57, avgbill: 131, value: "WI", label: "Wisconsin" },
      { rate: 14.28, avgbill: 100, value: "WV", label: "West Virginia" },
      { rate: 12.3, avgbill: 100, value: "WY", label: "Wyoming" },
    ];

    return (
      <Box
        className="App"
        sx={{ pt: 7, flexGrow: 1, px: 5, height: `100%`, width: `100%` }}
      >
        <Grid container direction="row" spacing={1}>
          <Grid
          sx={{ m: 4 }}
          >
            <Grid item sx={{ py: 1 }}>
              <Button onClick={this.handleYesBill}>
                Monthly electricity bill
              </Button>
              <Button onClick={this.handleNoBill}>
                Monthly electricity consumption
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Stack spacing={2}>
          <item>
            <Box display="flex" justifyContext="flex-end">
              {this.state.billorwatts == "bill" && (
                    <FormControl>
                      <TextField
                        label="Monthly Electricity Bill"
                        onChange={this.handleBillChange}
                        type="number"
                      ></TextField>
                    </FormControl>
                  )}
                  {this.state.billorwatts == "watts" && (
                    <FormControl>
                      <TextField
                        label="Monthly Electricity Consumption"
                        onChange={this.handleElec}
                      ></TextField>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.units}
                        label="Units"
                        onChange={this.handleUnits}
                      >
                        <MenuItem value={"mwh"}>Mwh</MenuItem>
                        <MenuItem value={"kwh"}>Kwh</MenuItem>
                      </Select>
                    </FormControl>
                  )}
            </Box>
            
          </item>

          <item>
            <Autocomplete
                disablePortal
                id="stateselector"
                options={statedata}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="State" />
                )}
                onChange={this.handleState}
                value={this.state.chosenState}
            />
          </item>

          <item>
          <Box display="flex" justifyContext="flex-end">

            <Button onClick={this.calculate}>Calculate</Button>
          </Box>
          </item>

        </Stack>
            

          {this.state.emissions && (
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
                      <Typography variant="h5">
                        {this.state.emissions["electricity_value"]}{" "}
                        {this.state.units} of electricity
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sx={{ py: 1, px: 1 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">
                        {Math.ceil(this.state.emissions["carbon_lb"] * 0.028)}{" "}
                        Trees Planted
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sx={{ py: 1, px: 1 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">
                        {Math.ceil(this.state.emissions["carbon_lb"] * 202)}{" "}
                        Phones Charged
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
                              Math.ceil(
                                this.state.emissions["carbon_lb"] * 0.028
                              )
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
          )}
      </Box>
    );
  }
}

export default Electricity;
