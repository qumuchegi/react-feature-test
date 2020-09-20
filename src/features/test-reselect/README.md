# Select 的作用：缓存组件 state 计算结果，当其不变时不会因为全局 state 的改变而重复计算

select： `主要用来缓存衍生数据的：就是从 store 中的 A、B 要衍生出 C，就可以使用 reselect 来优化性能，避免重复计算。`
组件 1 state 改变没有引起组件 2 状态改变，所以不会导致组件 2 重渲染，但是组件 2 的 connect 的 mapStateToProps 中的逻辑仍然会重新执行，此时为了提高性能，有必要减小这部分重复执行代码的量。

```js

import { createSelector } from 'reselect'

const selectCom2Count = createSelector(
  state => state.com2State,
  com2State => {
    console.log('引起组件2状态重新计算') 
    // 如果使用 reselect 在第一次组件1状态改变才执行打印，之后都不会,因为在第一次计算后就被缓存了，如果组件 2 状态没有改变，就不会再重新计算
    return com2State.count
  }
)
const getCount = (state) => {
  console.log('引起组件2状态重新计算') 
  // 如果不使用 reselect 就会随着组件1状态改变每一次都会执行打印，即使组件 2 所需状态并没有改变，属于不必要的计算
  return state.com2State.count
}

// ......

export default connect(
  state => {
    return ({count: selectCom2Count(state)}) // [1]
    // return ({count: getCount(state)}) // [2]
  }
)(Com2)

```

以上代码是组件 2 中的，当我们注释掉[1]而使用[2]时，随着每次改变组件 1 的状态，都会执行 `getcount` 方法里面的逻辑，造成重复打印 ‘引起组件2状态重新计算’；但是如果反过来注释掉 [2] 而使用代码 [1]，就不会重复执行 selectCom2Count 里面的逻辑，自如也不会重复打印出 ‘引起组件2状态重新计算’，出来第一次初始化。