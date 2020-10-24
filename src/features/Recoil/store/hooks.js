import {useEffect, useState} from 'react'
import { useRecoilState, useSetRecoilState, useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil'
import { cartAtom, orderAtom, orderWillSubmitAtom, orderIDHadSubmitAtom } from './atoms'
import {orderSubmition} from './selector'
import {produce} from 'immer'
import { requestStatus } from '../const'

/**
 * 用 useHooks 的方法写 dispatch
 */
export function useAddProductToCart() {
  const [cart, setCart] = useRecoilState(cartAtom)
  const addToCart = (item) => {
    const idx = cart.findIndex(cartItem => item.id === cartItem.id) 
    if (idx === -1) {
      const newItem = {...item, quantity: 1}
      setCart([...cart, newItem])
    } else {
      setCart(produce(draftCart => {
        const itemInCart = draftCart[idx]
        itemInCart.quantity ++
      }))
    }
  }
  return [addToCart]
}

export function useDecreaseProductIncart() {
  const setCart = useSetRecoilState(cartAtom)
  const decreaseItemInCart = (item) => {
    setCart(produce(draftCart => {
      const {id} =item
      draftCart.forEach((item, idx, _draftCart) => {
        if(item.id === id) {
          if (item.quantity > 1) item.quantity --
          else if (item.quantity === 1) {
            draftCart.splice(idx, 1)
          }
        }
      })
    }))
  }
  return [decreaseItemInCart]
}

export function useRemoveProductIncart() {
  const setCart = useSetRecoilState(cartAtom)
  const rmItemIncart = (item) => {
    setCart(produce(draftCart => {
      draftCart = draftCart.filter(_item => _item.id !== item.id)
      return draftCart
    }))
  }
  return [rmItemIncart]
}

export function useAddProductToOrder() {
  const [order, setOrder] = useRecoilState(orderAtom)
  const [rmItemIncart] = useRemoveProductIncart()

  const addToOrder = (item) => {
    setOrder(produce(draftOrder => {
      draftOrder = [...draftOrder, {...item, orderID: Math.random()}]
      return draftOrder
    }))
    // 从购物车删除掉
    rmItemIncart(item)
  }
  return [addToOrder]
}

export function useSubmitOrder() {
  const [orderIDHadSubmit, setOrderIDHadSubmit] = useRecoilState(orderIDHadSubmitAtom)
  const [orderWillSubmit, setOrderWillSubmit] = useRecoilState(orderWillSubmitAtom)
  const submitLoadable = useRecoilValueLoadable(orderSubmition)
  const [isPending, setIsPending] = useState(false)
  //const [submitResLoadable, setOrderWillSubmit] = useRecoilStateLoadable(orderSubmition)

  const loadableStateHandler = {
    pending: () => {
      setIsPending(true)
      console.count('正在提交订单')
    },
    success: (loadableContents) => {
      setIsPending(false)
      if (loadableContents === requestStatus.noReq) return
      const hadSubmitOrderID = loadableContents.data.orderID
      setOrderIDHadSubmit(hadSubmitOrderID)
      console.log('提交订单成功', hadSubmitOrderID)
    },
    fail: () => {
      setIsPending(false)
      console.log('订单提交失败')
    }

  }
  useRequest(submitLoadable, loadableStateHandler)
  
  const submitOrder = (orderItem) => {
    // 只需要往 orderWillSubmitAtom 添加待提交的订单，
    // orderSubmition 这个 selector 会自动执行提交的异步请求
    // 然后将请求后的响应返回
    setOrderWillSubmit(orderItem)
  }
  return [submitOrder, orderIDHadSubmit, isPending, orderWillSubmit?.orderID]
}

/**
 * 通用的 loadable 状态机 hooks
 * @param {Recoil Loadable} loadable useRecoilStateLoadable 返回的 loadable
 * @param {Object} stateHandler 请求状态处理器，分别有 【正在请求 请求完成 请求出错】 3 种状态的处理器
 */
const useRequest = (loadable, stateHandler) => {
  useEffect(() => {
    const onSubmitState = (status) => {
      switch (status) {
        case 'hasValue':
          //if (loadable.contents === requestStatus.noReq) return
          stateHandler.success(loadable.contents)
          break
        case 'hasError':
          stateHandler.fail()
          break
        case 'loading':
          stateHandler.pending()
          break
        default:
          break
          //stateHandler.success(loadable.contents)
      }
    }
  
    onSubmitState(loadable.state)
  }, [loadable.contents, loadable.state, stateHandler])
}