import React from 'react'

class A extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 0
    }
  }
  handleClick = () => {
    this.setState(({a}) => ({
      a: a+1
    }))
  }
  render () {
    return <div>
      <div>props.b: {this.props.b}</div>
      <div>组件 A 状态 a ： {this.state.a}</div>
      <div onClick={this.handleClick}>点击</div>
    </div>
  }
}

const Hoc = (Warped) => class extends Warped {
  handleClick = () => {
    console.log(this.state)
    super.setState(({a}) => ({
      a: a+2
    }))
  }

  render () {
    return super.render();
  }
}

export default Hoc(A)