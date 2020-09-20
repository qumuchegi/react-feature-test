import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const selectCom2Count = createSelector(
  state => state.com2State,
  com2State => {
    console.log('引起组件2状态重新计算') // 如果使用 reselect 在第一次组件1状态改变才执行打印，之后都不会,因为组件2所需的状态并没有随着组件1状态的改变而改变
    return com2State.count
  }
)
const getCount = (state) => {
  console.log('引起组件2状态重新计算') // 如果不使用 reselect 就会随着组件1状态改变每一次都会执行打印，即使组件 2 所需状态并没有改变，属于不必要的计算
  return state.com2State.count
}
class Com2 extends Component{
  componentDidUpdate() {
    console.log('组件 2 重新渲染了') // 当改变 组件 1 的状态后，组件2并没有更新。所以不打印出来
  }

  render() {
    return (
      <div style={{
        border: `solid 2px red`,
        width: '300px',
        textAlign: 'center'
      }}>
        <h4>组件 2</h4>
        <div>组件2 : {this.props.count}</div>
      </div>
    )
  }
}

export default connect(
  state => {
    return ({count: selectCom2Count(state)}) // [1]
    //return ({count: getCount(state)}) // [2]
  }
)(Com2)