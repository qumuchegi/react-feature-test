import {productAtom, cartAtom, orderAtom, orderWillSubmitAtom} from './atoms'
import {useRecoilValueLoadable, selector, useRecoilState,  useSetRecoilState} from 'recoil'

import {getProductList, postOrder} from '../service'
import { requestStatus } from '../const'

// selector 结果会被缓存
export const orderSubmition = selector({
  key: 'orderSubmition',
  /**
   * get
   * a function used to retrieve values from other atoms/selectors. 
   * All atoms/selectors passed to this function will be implicitly added to a list of dependencies for the selector.
   * If any of the selector's dependencies change, the selector will re-evaluate.
   */
  get: async ({ get }) => {
    const orderWillSubmit = get(orderWillSubmitAtom)
    console.count('提交次数')
    // console.log({orderWillSubmit})
    if (orderWillSubmit.length === 0) return requestStatus.noReq
    const res = await postOrder(orderWillSubmit)
    return res
  },
  // set: ({ set }, orderItem) => {
  //   set(orderWillSubmitAtom, orderItem)
  // }
})

export const myOrderQuery = selector({
  key: 'myOrderQuery',
  get: async ({ get }) => {
    

  }
})

export const myOrderTotalPrice = selector({
  key: 'myOrderTotalPrice',
  get: ({ get }) => {
    const order = get(orderAtom)
    return order.reduce((total, orderItem) => total + orderItem.price * orderItem.quantity)
  }
})

