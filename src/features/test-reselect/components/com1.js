import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    count: state.com1State.count
  }),
  dispatch => ({
    dispatchAdd: ()=>dispatch(add)
  })
)(Com1)

export const add = {
  type: 'change-state',
}