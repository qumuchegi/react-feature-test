import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

class Com1 extends Component{
  componentDidUpdate() {
    console.log('组件1 重新渲染了')
  }
  render() {
    return (
      <div style={{
        border: `solid 2px blue`,
        width: '300px',
        textAlign: 'center'
      }}> 
        <h4>组件 1</h4>
        <div>组件1 状态： {this.props.count}</div>
        <button onClick={()=>this.props.dispatchAdd(add)}> 点我 + 1</button>
      </div>
    )
  }
}
export default connect(
  state => ({
    count: createSelector(
      state => state.com1State,
      com1State => {
        console.log('引起组件1状态重新计算')
        return com1State.count
      }
    )(state)//state.com1State.count
  }),
  dispatch => ({
    dispatchAdd: ()=>dispatch(add)
  })
)(Com1)

export const add = {
  type: 'change-state',
}