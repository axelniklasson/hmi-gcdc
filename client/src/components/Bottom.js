import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Bottom'

import Dashboard from './Dashboard'
import InfoBox from './InfoBox'

class Bottom extends Component {
  render() {
    var { speed, acceleration, flags } = this.props;

    return (
      <div styleName="container">
        <div styleName="dashboard-container">
          <Dashboard speed={speed} acceleration={acceleration} flags={flags} />
        </div>
        <div styleName="info-container">
          <InfoBox flags={flags} />
        </div>
      </div>  
    )
  }
}

export default CSSModules(Bottom, styles)
