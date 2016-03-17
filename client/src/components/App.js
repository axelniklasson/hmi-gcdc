import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/App'
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

export default CSSModules(App, styles)
