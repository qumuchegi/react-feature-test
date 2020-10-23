import {useRecoilState, useSetRecoilState} from 'recoil'
import {cartAtom, orderAtom} from './atoms'

import {produce} from 'immer'

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
      draftOrder = [...draftOrder, item]
      return draftOrder
    }))
    // 从购物车删除掉
    rmItemIncart(item)
  }
  return [addToOrder]
}