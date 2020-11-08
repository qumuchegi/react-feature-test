import React from 'react'

export class A extends React.Component {
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
      <div id="state-a">{this.state.a}</div>
      <div onClick={this.handleClick} id='button'>点击</div>
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

export default A//Hoc(A)