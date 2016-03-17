import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoBox'

class InfoBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div styleName="container"> 
        <div styleName="text">
          Some information from the system
        </div>
        <div styleName="icon">
          ♤
        </div>
      </div>
    )
  }
}

export default CSSModules(InfoBox, styles)
