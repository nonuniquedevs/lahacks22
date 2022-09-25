import React, { Component } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class Donations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entered: null,
      amount: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    this.setState({entered: 1})
  }

  render() {
    return (
      <div>
        <br /> <br />
        <p>One dollar plants one tree.</p>
        {this.state.entered == null && (
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="number"
                value={this.state.amount}
                onChange={this.handleChange}
                placeholder="Donation amount"
              />
            </label>
            <input type="submit" value="Donate" />
          </form>
        )}
        {this.state.entered !== null && (
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
                        value: String(this.state.amount),
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
        )}
        <p>Donate to a nonprofit to offset your emissions.</p>
      </div>
    );
  }
}

export default Donations;
