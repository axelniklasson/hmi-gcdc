import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoActions'

class InfoActions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { egoFlags } = this.props;
    var message = '';

    return (
      <div styleName="container">
        <div styleName="circle">
          <div styleName="inner-box">
            <div styleName="text">
              {message}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(InfoActions, styles)
