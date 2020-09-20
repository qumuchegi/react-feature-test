import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import TestReselect from '../features/test-reselect/index'
import TestImmer from '../features/test-immer/index'

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