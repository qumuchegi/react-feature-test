import React, {useEffect, useCallback} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import { orderAtom, orderIDHadSubmitAtom } from '../store/atoms'
import {useSubmitOrder} from '../store/hooks'
import { requestStatus } from '../const'

import '../style/order.css'

export default function Order() {
  const [orderList, setOrderList] = useRecoilState(orderAtom)
  const orderIDHadSubmit = useRecoilValue(orderIDHadSubmitAtom)

  let [submitOrder] = useSubmitOrder()

  const onSubmit = (orderItem) => {
    submitOrder(orderItem)
  }

  return<div>
    <h3>
      <i className="fas fa-list"></i>
      <div>我的订单</div>
      {
        orderList.length > 0
        ?
        <div style={{backgroundColor: 'red', width: '25px', height: '25px', borderRadius: '25px', textAlign: 'center', color: 'white'}}>{orderList.length}</div>
        : null
      }
    </h3>
    <div style={{display: 'flex', justifyContent:'flex-start'}}>
    {
      orderList.length > 0
      ? orderList.map(
        listItem => <div key={listItem.name} className="order-item">
          <div style={{display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <img src={listItem.img} style={{width: '60px'}}/>
            {listItem.name}
          </div>
          <div>
            <div>¥ {listItem.quantity * listItem.price}</div>
            <div>共 {listItem.quantity} 件</div>
          </div>
          {
            orderIDHadSubmit.findIndex(id => id === listItem.orderID) !== -1
              ? <div>此订单已提交</div>
              :
              <div onClick={
                () => onSubmit(listItem)
              } className="submit-button">
              提交
              </div>
          }
          
        </div>  
      )
      : <div style={{textAlign:'center'}}>订单空了</div>
      }    
    </div>
  </div>
}
