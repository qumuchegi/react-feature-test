import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import TestReselect from '../features/test-reselect/index'
import TestImmer from '../features/test-immer/index'
import TestHoc from '../features/Hoc/反向继承'
import A from '../features/renderTree/index'
import Com1 from '../features/context/'
import Shopee from '../features/Recoil/index'
import EmptySetStateWillUpdateAllCom from '../features/emptySetState'

export const routes = [
  {
    path: '/test-reselect',
    component: TestReselect,
    link: '测试 reselect 的作用'
  },
  {
    path: '/test-immer',
    component: <TestImmer/>,
    link: '测试 immer.js 的作用(PureComponent、shouldComponent)'
  },
  {
    path: '/hoc',
    component: <TestHoc b={1}/>,
    link: '测试 HOC'
  }, 
  {
    path: '/renderTree',
    component: <A/>,
    link: '测试树的重渲染'
  },
  {
    path: '/context',
    component: <Com1/>,
    link: 'React Context'
  },
  {
    path: '/recoil',
    component: <Shopee/>,
    link: 'recoil demo'
  },
  {
    path: '/emptysetstate',
    component: <EmptySetStateWillUpdateAllCom />,
    link: 'empty setState'
  }
]

export function FeatureList() {

  return <Router>
    <Switch>
    {
      routes.map(route => {
        return <Route path={route.path} key={route.path}>
          {route.component}
        </Route>
      })
    }
    </Switch>
  </Router>
}