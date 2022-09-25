import React from 'react';
import './App.css';
import Vehicle from './components/Vehicle';
import Home from './components/Home';
import Navigation from './components/Navigation'
import Error from './components/Error'
import Flight from './components/Flight'
import Donations from './components/Donations'
import Electricity from './components/Electricity'
import Box from '@mui/material/Box'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

//Navigation is the nav bar
//Routes is the switch mechanism

function App() {
  return (
      <Router>
      <Box sx={{display:'flex'}}>
          <Navigation />

            <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/vehicle" element={<Vehicle/>}/>
             <Route path="/flight" element={<Flight/>}/>
             <Route path="/donations" element={<Donations/>}/>
             <Route path="/home" element={<Home/>}/>
             <Route path="/electricity" element={<Electricity/>}/>
             <Route path="*" element={<Error/>}/>
           </Routes>

        </Box> 
      </Router>

  );
}

export default App;
