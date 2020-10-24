import React from 'react'
import {useRecoilValue} from 'recoil'
import { orderAtom } from '../store/atoms'
import {useSubmitOrder} from '../store/hooks'

import '../style/order.css'

export default function Order() {
  const orderList  = useRecoilValue(orderAtom)

  let [submitOrder, orderIDHadSubmit, isPending, orderIDWillSubmit] = useSubmitOrder()

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
            <div>订单号: {listItem.orderID}</div>
          </div>
          {
            orderIDHadSubmit.findIndex(id => id === listItem.orderID) !== -1
              ? 
              <div>此订单已提交</div>
              :
              isPending && orderIDWillSubmit === listItem.orderID
                ?
                <div>正在提交....</div>
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
