import React, { Component } from 'react'
import './assets/App.css'
import Grid from './Components/Grid'

export default class App extends Component {
  render () {
    return (
      <Grid initialWidth={4} initialHeight={4} cellSize={50} />
    )
  }
}
