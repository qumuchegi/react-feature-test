import React from 'react'
import {produce} from 'immer'

import {productAtom, cartAtom} from '../store/atoms'
import {useRecoilValueLoadable, useRecoilValue} from 'recoil'

import '../style/products.css'

import {productsQuery} from '../store/selector'

import {useAddProductToCart, useRemoveProductIncart} from '../store/hooks'

// ProductList.whyDidYouRender = true
function ProductList(){
  //productsLoadable 会被缓存
  const productsLoadable = useRecoilValueLoadable(productsQuery)
  console.count('组件 ProductList 渲染次数')
  const cart = useRecoilValue(cartAtom)
  //const productsLoadable1 = useRecoilValueLoadable(productsQuery)

  const [addToCart] = useAddProductToCart()
  const [rmItemInCart] = useRemoveProductIncart()

  switch (productsLoadable.state) {
    case 'hasValue': 
      const products = productsLoadable.contents
      return <div>
        {
          products
          .map(product => 
            <div key={product.name} className="product-item">
              <div>{product.name}</div>
              <div>{product.price}</div>
              {
                cart.findIndex(
                  itemCart => itemCart.id === product.id
                ) === -1
                ?
                <div className='add-to-cart' onClick={() => addToCart(product)}>
                  加入购物车
                </div>
                :
                <div className='rm-in-cart' onClick={() => rmItemInCart(product)}>
                  从购物车删除
                </div>
              }
              
            </div>
          )
        }
      </div>
    case 'hasError':
      return <div>请求出错</div>
    case 'loading': 
    default: 
      return <div>正在加载中......</div>
  }
}

export default function() {
  return <div>
    <h3>
      <i className="fas fa-store-alt"></i>
      商品列表
    </h3>
    <ProductList/>
  </div>
}