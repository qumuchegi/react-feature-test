import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import Com1 from './components/com1'
import Com2 from './components/com2'
import { com1Reducer } from './reducers/com1-reducer'
import { com2Reducer } from './reducers/com2-reducer'

export const store = createStore(combineReducers({
  com1State: com1Reducer,
  com2State: com2Reducer
}))

export default function TestReselect() {
  return <Provider store={store}>
    <h1>Redux state 更新导致组件重渲染</h1>
    <div>
      测试用例：
      <ol>
        <li>
          以下两个组件的状态都是同一棵 Redux state 树的一部分，A 组件的 state 改变让 Redux state 发生改变，进而会通过 props 传递使 A 组件本身重新渲染，那么会不会导致 B 组件也重新渲染呢
          <div style={{ fontSize: '1rem', color: 'red' }}>
            点击以下组件1的加号，修改组件1的状态，然后打开浏览器控制台，可以看到组件 2 不会发生重渲染（如果发生了就会打印出 ‘组件 2 重新渲染了’）
          </div>
        </li>
        <li>
          同样点击组件 1 加号使其改变状态，修改组件 2 的代码，看看使用下面两种方式会不会都重复计算组件 2 的状态：
           <div style={{ fontSize: '1rem', color: 'red' }}>
            测试结果：使用 [1] 不会重复计算组件 2 的状态，而使用 [2] 就会重复计算组件 2 的状态
           </div>
          <pre>
            {`
          // 组件 2 部分代码
          export default connect(
            state => {
              return ({count: selectCom2Count(state)}) // [1]
              // return ({count: getCount(state)}) // [2]
            }
          )(Com2)`}
          </pre>
        </li>
      </ol>
    </div>
    <div style={{
      display: 'flex', justifyContent: 'center', flexDirection: 'row'
    }}>
      <Com1/>
      <Com2/>
    </div>
  </Provider>
}