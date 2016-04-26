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
      ownVehicle: 0,
      vehicle1: 0,
      vehicle2: 0,
      speed: 0,
      acceleration: 0,
      lat: 0,
      northing: 0,
      easting: 0,

      ownNorth: 0,
      ownEast: 0,
      north1: 0,
      north2: 0,
      east1: 0,
      east2: 0
    }
  }

  componentDidMount() {
//    socket.on('data', (msg) => {
//      this.setState({
//        speed: msg[7]['value'],
//        acceleration: msg[8]['value'],
//        lat: msg[12]['value'],
//        northing: msg[14]['value'],
//        easting: msg[15]['value']
//      })
//    })
    socket.on('intersectionData', (msg) =>{
      this.setState({
        ownVehicle: msg[0],
        vehicle1: msg[1],
        vehicle2: msg[2],
        speed: msg[0].speed *3.6,
        acceleration: msg[0].longAcc,
        ownNorth: msg[0].northing,
        ownEast: msg[0].easting,
        north1: msg[1].northing,
        north2: msg[2].northing,
        east1: msg[1].easting,
        east2: msg[2].easting
      })
    })
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="top">
        this.state.ownVehicle
          <Top 
            ownVehicle={this.state.ownVehicle}
            vehicle1={this.state.vehicle1}
            vehicle2={this.state.vehicle2}
          />
        </div>
        <div styleName="bottom">
          <Bottom speed={this.state.speed} acceleration={this.state.acceleration}/>
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
