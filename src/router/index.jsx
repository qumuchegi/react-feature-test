import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import TestReselect from '../features/test-reselect/index'
import TestImmer from '../features/test-immer/index'
import TestHoc from '../features/Hoc/反向继承'
import A from '../features/renderTree/index'

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
  }
]

export function FeatureList() {

  return <Router>
    <div style={{
      margin: '10px auto',
      width: '90%',
      display: 'flex',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        backgroundColor: 'green',
        border: 'solid 1.2px red',
        borderRadius: '4px',
        textAlign: 'center',
        maxWidth: '100px',
        padding: '10px 20px'
      }}>
        <Link to='/' style={{color: 'white', textDecoration: 'none',}}>首页</Link>
      </div>
      {
        routes.map(({ link, path }) => <div key={link} style={{
          backgroundColor: 'white',
          border: 'solid 1.2px red',
          borderRadius: '4px',
          textAlign: 'center',
          maxWidth: '100px',
          padding: '10px 20px',
          marginLeft: '10px'
        }}>
            <Link to={path} style={{color: 'origin', textDecoration: 'no',}}>{link}</Link>
          </div>)
      }
    </div>
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