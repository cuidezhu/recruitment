import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

// function hello() {
//   console.log('hello imooc I love react')
// }

// function WrapperHello(fn) {
//   return function() {
//     console.log('before say hello')
//     fn()
//     console.log('after say hello')
//   }
// }

// hello = WrapperHello(hello)
// hello()

// 属性代理
function WrapperHello(Comp) {
  class WrapComp extends Comp {
    componentDidMount() {
      console.log('高阶组件新增的生命周期，加载完成')
    }
    
    render() {
      return <Comp></Comp>
    }
  }
  // class WrapComp extends React.Component {

  //   render() {
  //     return (
  //       <div>
  //         <p>这是HOC高阶组件特有的元素</p>
  //         <Comp name='text' {...this.props}></Comp>
  //       </div>
  //     )
  //   }
  // }

  return WrapComp
}

@WrapperHello
class Hello extends React.Component {
  render() {
    return <h2>hello imooc I love React & Redux</h2>
  }
}



// Hello = WrapperHello(Hello)

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleLogin() {
    this.props.login(this.state)
  }
  
  render() {
    return (
      <React.Fragment>
        <Hello></Hello>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}        
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户名</InputItem>
            <WhiteSpace/>
            <InputItem
              onChange={v => this.handleChange('pwd', v)}
              type='password'
            >密码</InputItem>
          </List>
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default Login