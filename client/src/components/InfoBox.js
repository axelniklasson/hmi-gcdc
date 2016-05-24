import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoBox'

class InfoBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { egoFlags } = this.props;
    var message = '';
    
    return (
      <div styleName="container"> 
        <div styleName="text">
          {message}
        </div>
        <div styleName="icon">
        </div>
      </div>
    )
  }
}

export default CSSModules(InfoBox, styles)
