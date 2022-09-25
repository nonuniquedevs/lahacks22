import React, { Component } from "react";
import { Autocomplete, Typography } from "@mui/material";
import { Grid, Box, TextField } from "@mui/material";
import { Button, FormControl } from "@mui/material";
import { Select, MenuItem} from "@mui/material"
import Montage from "../montage_sequence_2_1.mp4"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  render() {
    return (
     <div style={{position: "relative"}}>
      <video loop autoPlay muted id="backgroundHome" style={{width: "100vw", height: "100vh"}}>
        <source src={Montage} type="video/mp4"/>
      </video>
     </div>
    );
  }
}

export default Home;
