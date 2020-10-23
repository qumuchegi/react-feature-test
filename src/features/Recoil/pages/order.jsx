import React from 'react'
import {useRecoilState} from 'recoil'
import {orderAtom} from '../store/atoms'

import '../style/list.css'

export default function Order() {
  const [orderList, setOrderList] = useRecoilState(orderAtom)

  return<div>
    <h3>
      <i className="fas fa-list"></i>
      <div>我的订单</div>
      {
        orderList.length > 0
        ?
        <div style={{backgroundColor: 'red', width: '25px', height: '25px', borderRadius: '25px', textAlign: 'center'}}>{orderList.length}</div>
        : null
      }
    </h3>
    
    {
      orderList.length > 0
      ? orderList.map(
        listItem => <div key={listItem.name} className="list-item">
          <div>{listItem.name}</div>
          <div>{listItem.quantity}</div>
          <div>{listItem.quantity * listItem.price}</div>
          <div>remove</div>
        </div>  
      )
      : <div style={{textAlign:'center'}}>订单空了</div>
    }
  </div>
}
