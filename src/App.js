import React from 'react'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from "./index.redux";

@connect(
  state => ({num: state.counter}),
  { addGun, removeGun, addGunAsync }
)
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>现在有机枪{this.props.num}把</h1>
        <Button onClick={this.props.addGun}>申请武器</Button>
        <Button onClick={this.props.removeGun}>上交武器</Button>
        <Button onClick={this.props.addGunAsync}>拖两秒再给</Button>
      </div>
    )
  }
}


export default App