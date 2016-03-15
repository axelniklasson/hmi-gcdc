import React from 'react'

const socket = require('socket.io-client')('http://localhost:3000');

class Speed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0
    }
  }

  componentDidMount() {
    socket.on('data', (msg) => {
      this.setState({speed: msg[0]})
    })
  }

  render() {
    return (
      <div>
        {this.state.speed}
      </div>
    )
  }
}

export default Speed
