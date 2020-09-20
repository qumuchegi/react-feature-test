import React, {PureComponent, Component} from 'react';

export default class Com3 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.b !== this.props.b) return true
  //   return false
  // }
  componentDidUpdate() {
    console.log('组件 3 重新渲染了')
  }

  render() {
    return <div>
     组件 3 接收到的 c.d ：{this.props.c.d}
  </div>
  }
}