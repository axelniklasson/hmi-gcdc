import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'

const Top = () => (
  <div styleName="container">
    <div styleName="road-single"></div>
  </div>
)

export default CSSModules(Top, styles)
