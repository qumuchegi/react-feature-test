import React, {Component, PureComponent} from 'react'

class B extends Component {
  static whyDidYouRender = true;

  style = {backgroundColor: 'white', width: '200px', height: '100px', padding: '10px'}
  render () {
    return <div style={{backgroundColor: 'origin', width: '200px', height: '200px'}}>
      <h3>组件 B</h3>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <E e={this.props.b.e} style={{backgroundColor: 'white', width: '200px', height: '100px', padding: '10px'}}/>
        <F style={this.style} onChangef={this.props.onChangef}/>
      </div>
    </div>
  }
}
class E extends PureComponent {
  static whyDidYouRender = true;

  render () {
    return <div style={this.props.style}>
      <h3>组件 E</h3>
      组件 E 接收到 a.b.e：{this.props.e}
    </div>
  }
}
class F extends PureComponent {
  static whyDidYouRender = true;

  render () {
    return<div style={this.props.style}>
      <h3>组件 F</h3>
      <button onClick={this.props.onChangef}>点击改变 a.c.g.f</button>
    </div>
  }
}

export default React.memo(B, 
  // (prevProps, nextProps) => {
  //   if(Object.keys(prevProps).length !== Object.keys(nextProps).length) return false
  //   for( let key in prevProps) {
  //     if (prevProps[key] !== nextProps[key]) {
  //       return false
  //     }
  //   }
  //   return true
  // }
)