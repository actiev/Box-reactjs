import React, { Component } from 'react'

export default class Cell extends Component {
  render () {
    const {style, index} = this.props
    return (
      <div className="cell" style={style} data-index={index}></div>
    )
  }
}
