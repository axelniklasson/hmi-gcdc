import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'

const Top = ({ speed, lat }) => (
  <div styleName="container">
    <CanvasTest speed={speed} lat={lat} />
  </div>
)

export default CSSModules(Top, styles)
