import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
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
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 按照聊天用户分组，根据chatid
    const chatList = Object.values(msgGroup)
    return (
      <div>
        <List>
          {chatList.map(v => {
            console.log(v)
            const lastItem = this.getLast(v)
            return (
              <Item
                key={lastItem._id}
              >
                {lastItem.content}
                <Brief>用户名</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg