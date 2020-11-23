import React,{ useEffect, useState, useRef, useContext } from 'react';

const nodes = new Map()
const subNodes = new Map()

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

export function useMySetRecoilState(atom) {
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
  }

  const setState = (newValueOrUpdater) => {
    let newValue
    if (typeof newValueOrUpdater === 'function') {
      newValue = newValueOrUpdater(node.getValue())
    }
    node.setValue(newValue)
    store.atomValues.set(key, node)
    store.replaceState()
  }
  return setState
}

let subID = 0
function subRecoilState(store, atomkey, subid, cb) {
  console.log(subid)
  if(!store.nodeToComponentSubscriptions.has(`${subid}-${atomkey}`)){
    store.nodeToComponentSubscriptions.set(`${subid}-${atomkey}`, cb)
  }
}
export function useMyRecoilValue(atom) {
  const [_, forceUpdate] = useState([])

  const { key, defaultValue } = atom
  const storeRef = useStoreRef()
  const store = storeRef.current
  
  let hasNode = store.atomValues.has(key)
  let node
  if (!hasNode) {
    node = new Node(key, defaultValue)
    store.atomValues.set(key, node)
  }
  node = store.atomValues.get(key)

  useEffect(() => {
    subRecoilState(store, key, subID++, () =>{
      forceUpdate([])
    })
  }, [key, node, store, storeRef])
  
  return node.getValue()
}

export function useMyRecoilState(atom) {
  return [useMyRecoilValue(atom), useMySetRecoilState(atom)]
}

const storeContext = React.createContext()

export const useStoreRef = () => useContext(storeContext)

export default function MyRecoilRoot({children}) {
  const notifyUpdate = useRef()
  

  function setNotify(x) {
    notifyUpdate.current = x
  }
  function Batcher({setNotify}) {
    const [_, setstate] = useState([])
    setNotify(() => setstate({}))

    useEffect(() => {
      // 广播更新事件
      storeState.current.nodeToComponentSubscriptions.forEach((cb) => {
        cb()
      })
    })

    return null
  }
  function replaceState() {
    notifyUpdate.current()
  }
  const storeState = useRef({
    atomValues: nodes,
    replaceState,
    nodeToComponentSubscriptions: subNodes
  })

  return <div>
    <storeContext.Provider value={storeState}>
      <Batcher setNotify={setNotify}/>
      {children}
    </storeContext.Provider>
  </div>
}