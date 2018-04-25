import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }
  
  render() {
    return (
      <React.Fragment>
        <Logo></Logo>
        <h2>我是登录页面</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace/>
            <InputItem>密码</InputItem>
          </List>
          <Button type="primary">登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default Login