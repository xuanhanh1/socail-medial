import React, { Component } from 'react';
import './App.scss';
import Header from './compoments/Header/Header';
import Container from './compoments/Container/Container';
import Button from '@mui/material/Button';
class App extends Component {
  render() {
    return <div>
      <Header />
      <Container />
    </div>;
  }
}

export default App;
