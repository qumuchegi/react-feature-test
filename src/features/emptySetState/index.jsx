import React,{useState} from 'react';

Com1.whyDidYouRender = true
function Com1() {
  const [state, setstate] = useState(null)

  return (
    <div>组件1
      <button onClick={() => setstate({})}>点击更新组件1，看组件2、3会否更新</button>
    </div>
  )
}

Com2.whyDidYouRender = true
function Com2() {

  return (
    <div>组件2</div>
  )
}

Com3.whyDidYouRender = true
function Com3() {

  return (
    <div>组件3</div>
  )
}

export default function EmptySetStateWillUpdateAllCom() {
  return <div>
    <Com1/>
    <Com2/>
    <Com3 />
    <div>
      测试结果表明，在一个组件中使用 setState({})，React 会精确的更新这个组件，不会影响到其他组件
    </div>
  </div>
}