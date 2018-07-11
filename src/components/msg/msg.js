import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
@connect(
  state=>state
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 按照聊天用户分组，根据chatid
    const chatList = Object.values(msgGroup)
    return (
      <div>
          {chatList.map(v => {
            console.log(v)
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unreadNum = v.filter(v => !v.read && v.to === userid).length
            if (!userInfo[targetId]) {
              return null
            }
            return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                >
                  {lastItem.content}
                  <Brief>{userInfo[targetId].name}</Brief>
                </Item>
              </List>
            )
          })}
      </div>
    )
  }
}

export default Msg