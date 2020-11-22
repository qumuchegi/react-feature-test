
import React,{ useEffect, useState, useRef, useContext } from 'react';

const nodes = new Map()
const nodesSub = new Map()
class Node{
  constructor(k, v){
    this.key = k
    this.value = v
  }

  getValue(){
    return this.value 
  }

  setValue(newV) {
    this.value = newV
  }
}

export function useSetRecoilState(atom) {
  const { key, defaultValue } = atom
  let node
  const store = useStoreRef().current
  const hasNode = store.atomValues.has(key)
  if (hasNode) {
    node = store.atomValues.get(key)
  } else {
    const newNode = new Node(key, defaultValue)
    store.atomValues.set(key, newNode)
    node = store.atomValues.get(key)
    store.nodeToComponentSubscriptions.set(key, new Map())
  }

  const setState = (newValueOrUpdater) => {
    let newValue
    if (typeof newValueOrUpdater === 'function') {
      newValue = newValueOrUpdater(node.getValue())
    }
    node.setValue(newValue)
    store.atomValues.set(key, node)
    console.log('写 state：', node)
    store.replaceState()
    store.nodeToComponentSubscriptions.set(key, new Map())
  }
  return setState
}

function subToRecoilValue(store, key, cb) {
  if (!store.nodeToComponentSubscriptions.has(key)) {
    store.nodeToComponentSubscriptions.set(key, new Map())
  }
 
  cb()
}
export function useRecoilValue(atom) {
  const [_, forceUpdate] = useState([]);

  const { key, defaultValue } = atom
  const storeRef = useStoreRef()
  const store = storeRef.current
  
  let hasNode = store.atomValues.has(key)
  let node
  if (!hasNode) {
    node = new Node(key, defaultValue)
    store.atomValues.set(node)
  } else {
    node = store.atomValues.get(key)
  }
  console.log('读取 state:', node)

  console.log('订阅', store.nodeToComponentSubscriptions.get(key))

  useEffect(() => {
    subToRecoilValue(store, key, () => {
      forceUpdate([])
    })
  }, [])

  
  return node.getValue(key)
}

export function useRecoilState(atom) {
  return [useRecoilValue(atom), useSetRecoilState(atom)]
}

const storeContext = React.createContext()

export const useStoreRef = () => useContext(storeContext)

export default function RecoilRoot({children}) {
  const notifyUpdate = useRef()
  

  function setNotify(x) {
    notifyUpdate.current = x
  }
  function Batcher({setNotify}) {
    const [_, setstate] = useState([])
    setNotify(() => setstate({}))
    return null
  }
  function replaceState() {
    console.log('replace state')
    notifyUpdate.current()
  }
  const storeState = useRef({
    atomValues: nodes,
    replaceState,
    nodeToComponentSubscriptions: nodesSub
  })

  return <div>
    <storeContext.Provider value={storeState}>
      <Batcher setNotify={setNotify}/>
      {children}
    </storeContext.Provider>
  </div>
}