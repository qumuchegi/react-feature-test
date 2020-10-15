import React, {Component, PureComponent, useState, useCallback } from 'react'
import B from './subTree/B'
import C from './subTree/C'
import produce from "immer"
import _ from 'lodash'

import whyDidYouRender from "@welldone-software/why-did-you-render"

whyDidYouRender(React, {
  trackAllPureComponents: true,
  logOnDifferentValues: true,
})

A.whyDidYouRender = true

export default function A (){
  const [a, setA] = useState({
    b: {
      e: 0
    },
    c: {
      g: {
        f: 0
      }
    }
  },)
  
  // const onClickToChangef = () => {
  //   const nextState = produce(a, draftState => {
  //     draftState.c.g.f ++
  //   })
  //   setA(nextState)

  // }
  
  const onClickToChangef = useCallback(() => {
    const nextState = produce(a, draftState => {
      draftState.c.g.f ++
    })
    setA(nextState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const onClickToChangeE = () => {
    const nextState = produce(a, draftState => {
      draftState.b.e ++
    })
    setA(nextState)
    // this.setState(produce(draftState=>{
    //   draftState.a.b.e ++
    // }))

    // this.setState(({a}) => ({
    //   a: {
    //     ...a,
    //     b: {
    //       ...a.b,
    //       e: a.b.e + 1
    //     }, 
    //   }
    // }))

    // const _a = _.cloneDeep(this.state.a)
    // _a.b.e ++
    //  this.setState({
    //    a: _a
    //  })

    //  const _a = this.state.a
    //  _a.b.e ++
    //  this.setState({
    //    a: _a
    //  })
  }
    return <div style={{backgroundColor: 'green', width: '800px', height: '500px', margin: 'auto'}}>
      <h3>组件 A </h3>
      <div>
        <pre style={{color: 'white', margin: '20px'}}>
          {`A 的 state: 
          a: {
            b: {
              e: ${a.b.e}
            },
            c: {
              g: {
                f: ${a.c.g.f}
              }
            }
          }`}
        </pre>
      </div>    
      <button onClick={onClickToChangeE}>点击修改a.b.e</button>
      <button>点击修改c</button>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <B b={a.b} onChangef={onClickToChangef}/>
        <C c={a.c}/>
      </div>
    </div>
}