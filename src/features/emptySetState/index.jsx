import React from 'react'
import RecoilRoot, {useRecoilState, useSetRecoilState, useRecoilValue} from './recoil'

const countAtom = {
  key: 'count_atom',
  defaultValue: 0
}


Com1.whyDidYouRender = true
function Com1() {
  const [count, setCount] = useRecoilState(countAtom)
  return (
    <div>组件1
     <div>count: {count}</div>
      <button onClick={() => setCount(count => count + 1)}>点击更新组件1，看组件2、3会否更新</button>
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

App.whyDidYouRender = true
export default function App() {
  
  return <RecoilRoot>
    <Com1/>
    <Com2/>
    <Com3/>
  </RecoilRoot>
}