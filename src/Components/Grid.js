import React, { Component } from 'react'
import Cell from './Cell'
import classNames from 'classnames'
import update from 'immutability-helper'

export default class Grid extends Component {
  constructor (props) {
    super(props)

    this.selectedCell = null

    this.cellStyle = {
      height: props.cellSize,
      width: props.cellSize
    }

    const cellsArray = []
    const rowsArray = []

    for (let i = 0; i < props.initialWidth; i++) {
      cellsArray.push({id: i})
    }

    for (let i = 0; i < props.initialHeight; i++) {
      rowsArray.push({cells: cellsArray, id: i})
    }

    this.state = {
      cellsCount: props.initialWidth,
      rowsCount: props.initialHeight,
      removeColBtn: false,
      removeRowBtn: false,
      cellsArray: cellsArray,
      rowsArray: rowsArray
    }

    this.addColumn = this.addColumn.bind(this)
    this.addRow = this.addRow.bind(this)
    this.removeColumn = this.removeColumn.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.moveRemoveButtons = this.moveRemoveButtons.bind(this)
    this.showButtons = this.showButtons.bind(this)
    this.hideButtons = this.hideButtons.bind(this)
    this.hideButtonsOutContainer = this.hideButtonsOutContainer.bind(this)
  }

  addColumn () {
    const addColumn = update(this.state.cellsArray, {$push: [{id: this.state.cellsCount}]})

    this.setState({
      cellsCount: this.state.cellsCount + 1,
      cellsArray: addColumn
    })
  }

  addRow () {
    const addRow = update(this.state.rowsArray, {$push: [{cells: this.state.cellsArray, id: this.state.rowsCount}]})

    this.setState({
      rowsCount: this.state.rowsCount + 1,
      rowsArray: addRow
    })
  }

  removeColumn () {
    this.hideButtons()

    const index = [].indexOf.call(this.selectedCell.parentNode.children, this.selectedCell)

    const removeColumn = update(this.state.cellsArray, {$splice: [[index, 1]]})

    if (index >= 0) {
      this.setState({
        cellsArray: removeColumn
      })
    }
  }

  removeRow () {
    this.hideButtons()

    const index = [].indexOf.call(this.selectedCell.parentNode.parentNode.children, this.selectedCell.parentElement)

    const removeRow = update(this.state.rowsArray, {$splice: [[index, 1]]})

    if (index >= 0) {
      this.setState({
        rowsArray: removeRow
      })
    }
  }

  moveRemoveButtons (e) {
    if (e.target.dataset.index) {
      this.selectedCell = e.target
    }

    if (this.state.removeColBtn) {
      this.refs.removeColbtn.style.transform = `translateX(${e.target.offsetLeft}px)`
    }

    if (this.state.removeRowBtn) {
      this.refs.removeRowbtn.style.transform = `translateY(${e.target.offsetTop}px)`
    }
  }

  hideButtonsOutContainer (e) {
    if (e.target === this.refs.removeColbtn || e.target === this.refs.removeRowbtn) {
      return
    }

    this.hideButtons()
  }

  hideButtons () {
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
    let removeColbtn = classNames({
      'container__remove_column': true,
      'show': this.state.removeColBtn
    })

    let removeRowbtn = classNames({
      'container__remove_row': true,
      'show': this.state.removeRowBtn
    })

    return (
      <div className="app-container" onMouseEnter={this.showButtons} onMouseLeave={this.hideButtonsOutContainer}>
        {<button style={this.cellStyle}
                 onMouseLeave={this.hideButtons}
                 ref="removeColbtn"
                 className={removeColbtn}
                 onClick={this.removeColumn}>&minus;</button>}
        {<button style={this.cellStyle}
                 ref="removeRowbtn"
                 onMouseLeave={this.hideButtons}
                 className={removeRowbtn}
                 onClick={this.removeRow}>&minus;</button>}
        <button style={this.cellStyle} className="container__add_column" onClick={this.addColumn}>&#43;</button>
        <button style={this.cellStyle} className="container__add_row" onClick={this.addRow}>&#43;</button>
        <div className="wrapper" onMouseMove={this.moveRemoveButtons}>
          {this.state.rowsArray.map(row => <div className="row" key={row.id}> {
            this.state.cellsArray.map(cell => <Cell key={cell.id} index={cell.id} style={this.cellStyle} />)}</div>)}
        </div>
      </div>
    )
  }
}