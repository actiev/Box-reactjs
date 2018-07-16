import React, { Component } from 'react'
import Cell from './Cell'

export default class Grid extends Component {
  constructor (props) {
    super(props)

    this.selectedCell = null

    this.style = {
      height: this.props.cellSize,
      width: this.props.cellSize
    }

    const cellsArray = []
    const rowsArray = []

    for (let i = 0; i < this.props.initialWidth; i++) {
      cellsArray.push(<Cell style={this.style} key={i} index={i} />)
    }

    for (let i = 0; i < this.props.initialHeight; i++) {
      rowsArray.push(cellsArray)
    }

    this.state = {
      cellsCount: this.props.initialWidth,
      rowsCount: this.props.initialHeight,
      removeColBtn: false,
      removeRowBtn: false,
      cellsArray: cellsArray,
      rowsArray: rowsArray
    }

    this.getGridCoords = this.getGridCoords.bind(this)
    this.addColumn = this.addColumn.bind(this)
    this.addRow = this.addRow.bind(this)
    this.removeColumn = this.removeColumn.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.moveRemoveButtons = this.moveRemoveButtons.bind(this)
    this.showButtons = this.showButtons.bind(this)
  }

  getGridCoords (e) {
    const box = document.querySelector('.wrapper').getBoundingClientRect()

    const cursorOutBox = (
      box.x - this.props.cellSize > e.pageX ||
      box.y - this.props.cellSize > e.pageY ||
      box.x + box.width < e.pageX ||
      box.y + box.height < e.pageY
    )

    if (cursorOutBox) {
      this.hideButtons()
    }
  }

  addColumn () {
    this.setState({
      cellsCount: this.state.cellsCount + 1,
      cellsArray: [...this.state.cellsArray, <Cell style={this.style} key={this.state.cellsCount} index={this.state.cellsCount} />]
    })
  }

  addRow () {
    this.setState({
      rowsCount: this.state.rowsCount + 1,
      rowsArray: [...this.state.rowsArray, this.state.cellsArray]
    })
  }

  removeColumn () {
    const index = [].indexOf.call(this.selectedCell.parentNode.children, this.selectedCell)

    const newCellsArray = this.state.cellsArray

    newCellsArray.splice(index, 1)

    if (index >= 0) {
      this.setState({
        cellsArray: newCellsArray
      })
    }

    this.hideButtons()
  }

  removeRow () {
    const index = [].indexOf.call(this.selectedCell.parentNode.parentNode.children, this.selectedCell.parentElement)

    const newRowsArray = this.state.rowsArray

    newRowsArray.splice(index, 1)

    if (index >= 0) {
      this.setState({
        rowsArray: newRowsArray
      })
    }

    this.hideButtons()
  }

  moveRemoveButtons (e) {
    window.addEventListener('mousemove', this.getGridCoords)

    if (e.target.dataset.index) {
      this.selectedCell = e.target
    }

    if (this.state.removeColBtn) {
      document.querySelector('.container__remove_column').style.transform = `translateX(${e.target.offsetLeft}px)`
    }

    if (this.state.removeRowBtn) {
      document.querySelector('.container__remove_row').style.transform = `translateY(${e.target.offsetTop}px)`
    }
  }

  hideButtons () {
    window.removeEventListener('mousemove', this.getGridCoords)

    this.setState({
      removeRowBtn: false,
      removeColBtn: false
    })
  }

  showButtons () {
    if (this.state.cellsArray.length > 1) {
      this.setState({removeColBtn: true})
    }

    if (this.state.rowsArray.length > 1) {
      this.setState({removeRowBtn: true})
    }
  }

  render () {
    const grid = this.state.rowsArray.map((row, index) => <div className="row" key={index}>{this.state.cellsArray}</div>)

    const removeColumn = this.state.removeColBtn &&
      <button style={this.style} className="container__remove_column" onClick={this.removeColumn}>&minus;</button>

    const removeRow = this.state.removeRowBtn &&
      <button style={this.style} className="container__remove_row" onClick={this.removeRow}>&minus;</button>

    return (
      <div className="app-container" onMouseEnter={this.showButtons}>
        {removeColumn}
        {removeRow}
        <button style={this.style} className="container__add_column" onClick={this.addColumn}>&#43;</button>
        <button style={this.style} className="container__add_row" onClick={this.addRow}>&#43;</button>
        <div className="wrapper" onMouseMove={this.moveRemoveButtons}>{grid}</div>
      </div>
    )
  }
}