import React, {Component, PureComponent} from 'react'

export default class C extends PureComponent {
  static whyDidYouRender = true;

  render () {
    return <div style={{backgroundColor: 'yellow', width: '200px', height: '200px'}}>
      <h3>组件 C</h3>
      <div>a.c.g.f:{this.props.c.g.f}</div>
    </div>
  }
}