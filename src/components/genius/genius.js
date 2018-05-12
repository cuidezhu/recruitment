import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Genius extends React.Component {

  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    console.log(this.props.userlist)
    return (
      <WingBlank>
        {this.props.userlist.map(v => (

          v.avatar ? <Card key={v._id}>
            <Header
              title={v.usr}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
              {v.desc.split('\n').map(v => (
                <div key={v}>{v}</div>
              ))}
            </Body>
          </Card> : null
        ))}
      </WingBlank>
    )
  }

}

export default Genius