import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Acceleration'

class Acceleration extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { acceleration } = this.props;

    return (
      <div styleName="container">
        <div styleName="circle">
          <div styleName="text-box">
            <div styleName="acceleration">{acceleration}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Acceleration, styles)
