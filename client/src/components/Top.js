import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'

const Top = ({ speed }) => (
  <div styleName="container">
    <CanvasTest speed={speed} />
  </div>
)

export default CSSModules(Top, styles)
