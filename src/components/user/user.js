import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'

@connect(
  state=>state.user
)
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    console.log('logout')
  }

  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt="avatar"/>}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {this.props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {this.props.money ? <Brief>薪资: {props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : null
  }
}

export default User