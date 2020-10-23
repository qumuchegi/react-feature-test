import {productAtom, cartAtom, orderAtom} from '../store/atoms'
import {useRecoilValueLoadable, selector, useRecoilState} from 'recoil'

import {getProductList} from '../service'

// selector 的计算结果会被缓存
export const productsQuery = selector({
  key: 'productsQuery',
  get: async ({get}) => {
    console.count('productsQuery 被调用次数：')
    const res = await getProductList()
    return res.data.products
  }
})

export const myOrderQuery = selector({
  key: 'myOrderQuery',
  get: async ({get}) => {

  }
})

export const myOrderTotalPrice = selector({
  key: 'myOrderTotalPrice',
  get: ({get}) => {
    const order = get(orderAtom)
    return order.reduce((total, orderItem) => total + orderItem.price * orderItem.quantity)
  }
})

