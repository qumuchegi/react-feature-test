import React from 'react'
import {Context} from './Father'

class Child2 extends React.Component {
  static whyDidYouRender = true;
  componentDidUpdate(){
    console.log('组件1的子组件2重渲染了')
  }
  render() {
    const {a} = this.props
    return<div style={{backgroundColor: 'green', padding: '29px'}}>
     子组件 2
     <div>a：{a}</div>
    </div>
  }
}

export default () => <Context.Consumer>{
  (context) => <Child2 {...context}/>
}</Context.Consumer>