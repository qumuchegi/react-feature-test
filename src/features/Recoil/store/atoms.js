import {atom} from 'recoil'
import { getProductList } from '../service'

// atom 可以是异步的
export const productAtom = atom({
  key: 'productState',
  default: (async () => {
    const res = await getProductList()
    return res.data.products
  })() // 返回 promise
})

export const cartAtom = atom({
  key: 'cartState',
  default: []
})

export const orderAtom = atom({
  key: 'orderState',
  default: []
})

export const orderWillSubmitAtom = atom({
  key: 'submitOrderStatusAtom',
  default: []
})

export const orderIDHadSubmitAtom = atom({
  key: 'orderIDHadSubmitAtom',
  default: null
})