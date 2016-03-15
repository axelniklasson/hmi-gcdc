import React from 'react'
import CoordinateSystem from './CoordinateSystem'
import Speed from './Speed'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <CoordinateSystem />
      </div>
    )
  }
}

export default App
