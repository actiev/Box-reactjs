import React, { Component } from 'react'

export default class Cell extends Component {
  render () {
    return (
      <div className="cell" style={this.props.style} data-cell={this.props.index}></div>
    )
  }
}
