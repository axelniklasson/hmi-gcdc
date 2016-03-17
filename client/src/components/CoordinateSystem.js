import React, { Component } from 'react'

// const socket = require('socket.io-client')('http://localhost:3000');
const offsetX = -60;
const offsetY = -50;

class CoordinateSystem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicleX: offsetX,
      vehicleY: offsetY,
    }
  }

  // componentDidMount() {
  //   socket.on('data', (msg) => {
  //     this.setState({
        // vehicleX: offsetX + parseFloat(msg[2]),
        // vehicleY: offsetY - parseFloat(msg[3])
  //     })
  //   })
  // }

  render() {
    return (
      <div>
        <svg style={{background:"#EFEFEF"}} width="500" height="500" viewBox="-250 -250 500 500">
          <image x={this.state.vehicleX} y={this.state.vehicleY} width="120" height="100" 
          xlinkHref="http://cdn.flaticon.com/png/256/798.png" 
          orient="auto"></image>
        </svg>
      </div>
    )
  }

}

export default CoordinateSystem
