import React from 'react'
import TestRenderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { A } from '../../features/Hoc/反向继承.jsx'

Enzyme.configure({ adapter: new Adapter() })

// describe('A component', () => {
//   let warper 
//   let prevStateA

//   beforeEach(() => {
//     warper = TestRenderer.create(<A />)
//     prevStateA = warper.root.instance.state.a
//   })
//   test('default props', () => {
//     const tree = warper.toJSON()
//     expect(tree).toMatchSnapshot()
//   })
//   test('should increase 1 after click button', () => {
//     const instance = warper.getInstance()
//     const button = warper.root.findByProps({ id: 'button' })
//     const showStatA = warper.root.findByProps({id: 'state-a'})
//     instance.handleClick()
//     expect(button.children[0]).toBe('点击')
//     expect(showStatA.children[0]).toBe('1')
//     expect(instance.state.a).toBe(prevStateA + 1)
//   })
// })

// use anzyme
describe('A component', () => {
  let warper
  let prevStateA
   
  beforeEach(() => {
    warper = shallow(<A/>)
    prevStateA = warper.state().a
  })

  test('default props', () => {
    //const tree = warper.toJSON()
    expect(warper).toMatchSnapshot()
  })
  test('should increase 1 after click button', () => {
    const button = warper.find('#button')
    button.simulate('click')
    warper.update() // simulate 之后要手动更新才能拿到子组件的新文本
    const showStatA = warper.find('#state-a')
    expect(button.text()).toBe('点击')
    expect(showStatA.text()).toBe('1')
    expect(warper.state().a).toEqual(prevStateA + 1)
  })

})