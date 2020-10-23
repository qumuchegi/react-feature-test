import React from 'react'
import {Context} from './Father'


class Child1 extends React.Component {
  static whyDidYouRender = true;
  componentDidUpdate(){
    console.log('组件1的子组件1重渲染了')
  }
  render() {
    const {a, setA} = this.props
    return<div style={{backgroundColor: '#897', padding: '29px'}}>
      子组件1
      <div>a：{a}</div>
      <input placeholder='输入' onChange={(e) => setA(e.target.value)}></input>
    </div>
  }
}

export default class WorpeChild1 extends React.Component {

  render () {
    return <Context.Consumer>{
      (context) => {
       console.log('context 更新了，按理说组件应该更新 ')
       return <Child1 {...context}/>
      }
    }</Context.Consumer>
  }
}
