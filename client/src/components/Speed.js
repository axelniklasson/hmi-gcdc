import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Speed'

class Speed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { speed } = this.props;

    return (
      <div styleName="container">
        <div styleName="circle">
          <div styleName="text-box">
            <div styleName="speed">{speed}</div>
            <div styleName="gear">R 1 2 3 4 5 6</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Speed, styles)
