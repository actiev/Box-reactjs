import React from 'react'
import { shallow,  configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Grid from '../src/Components/Grid'

configure({ adapter: new Adapter() })

describe('tests', () => {
  it('create test grid', () => {
    const grid = shallow(<Grid initialWidth={2} initialHeight={2}/>)

    expect(grid).toMatchSnapshot()
  })

  it('add new row', () => {
    const grid = shallow(<Grid initialWidth={1} initialHeight={1}/>)

    const button = grid.find('button.container__add_row').at(0)

    button.simulate('click')

    expect(grid).toMatchSnapshot()
  })

  it('add new column', () => {
    const grid = shallow(<Grid initialWidth={1} initialHeight={1}/>)

    const button = grid.find('button.container__add_column').at(0)

    button.simulate('click')

    expect(grid).toMatchSnapshot()
  })

  it('remove last row', () => {
    const grid = shallow(<Grid initialWidth={6} initialHeight={1}/>)

    grid.simulate('mouseenter')

    expect({'display remove row button': grid.state('removeRowBtn')}).toMatchSnapshot()
  })

  it('remove last column', () => {
    const grid = shallow(<Grid initialWidth={1} initialHeight={6}/>)

    grid.simulate('mouseenter')

    expect({'display remove column button': grid.state('removeColBtn')}).toMatchSnapshot()
  })
})
