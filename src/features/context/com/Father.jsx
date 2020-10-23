import React, {createContext} from 'react'
import Child1 from './child1'
import Child2 from './child2'

export const Context = createContext()

export default class Father extends React.Component {
  static whyDidYouRender = true;
  
  constructor(props){
    super(props)
    this.setA = (a) => {
      this.setState({a})
    }
    this.state = {
      a: 0,
      setA: this.setA
    }
  }

  componentDidUpdate() {
    console.log('组件1重渲染了')
  }

  defaultContext = {
    a: 0,
    setA: function (a) {
      this.a = a
      console.log(this)
    }
  }

  a = 0
  render() {

    return <Context.Provider value={this.state}>
        <Child1/>
        <Child2/>
    </Context.Provider>
  }
}