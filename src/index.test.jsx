import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import App from './App'

describe('App UI tests', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should creates the snapshot of App', () => {
    const tree = renderer.create(wrapper).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
