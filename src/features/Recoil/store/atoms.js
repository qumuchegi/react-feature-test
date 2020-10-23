import {atom} from 'recoil'


export const productAtom = atom({
  key: 'productState',
  default: []
})
export const cartAtom = atom({
  key: 'cartState',
  default: []
})
export const orderAtom = atom({
  key: 'orderState',
  default: []
})
