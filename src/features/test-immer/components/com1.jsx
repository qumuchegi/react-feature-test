import React, {Component} from 'react';

export default class Com1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  // shouldComponentUpdate() {
    
  // }
  componentDidUpdate() {
    console.log('组件 1 重新渲染了')
  }

  render() {
    return <div>
      组件1接收到的 a ：{this.props.a}
  </div>
  }
}