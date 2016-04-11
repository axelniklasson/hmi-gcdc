import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/App'

import Top from './Top'
import Bottom from './Bottom'

const socket = require('socket.io-client')('localhost:3000');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0,
      acceleration: 0,
      lat: 0,
      northing: 0,
      easting: 0
    }
  }

  componentDidMount() {
    socket.on('data', (msg) => {
      this.setState({
        speed: msg[7]['value'],
        acceleration: msg[8]['value'],
        lat: msg[12]['value'],
        northing: msg[14]['value'],
        easting: msg[15]['value']
      })
    })
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="top">
          <Top 
            speed={this.state.speed}
            northing={this.state.northing}
            easting={this.state.easting}/>
        </div>
        <div styleName="bottom">
          <Bottom speed={this.state.speed} acceleration={this.state.acceleration} />
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
