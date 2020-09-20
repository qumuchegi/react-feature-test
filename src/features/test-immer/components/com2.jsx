import React, {PureComponent, Component} from 'react';

export default class Com2 extends Component {
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
    console.log('组件 2 重新渲染了')
  }

  render() {
    return <div>
     组件2接收到的 b ：{this.props.b}
  </div>
  }
}