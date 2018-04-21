import React from 'react'
import App from './App'
import { List, Button } from 'antd-mobile'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './Auth.redux.js'

const Item = List.Item

function Erying() {
  return <h2>二营</h2>
}

function Qibinglian() {
  return <h2>骑兵连</h2>
}

@connect(
  state => state.auth,
  {logout}
)
class Dashboard extends React.Component {
  render() {
    const match = this.props.match
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
      <div>
        <h1>独立团</h1>
        {this.props.isAuth ? <Button onClick={this.props.logout}>注销</Button> : null}
        <List>
          <Item>
            <Link to={`${match.url}/`}>一营</Link>
          </Item>
          <Item>
            <Link to={`${match.url}/erying`}>二营</Link>
          </Item>
          <Item>
            <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
          </Item>
        </List>
        <Route path={`${match.url}/`} exact component={App}></Route>
        <Route path={`${match.url}/erying`} component={Erying}></Route>
        <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard