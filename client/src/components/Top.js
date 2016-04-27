import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'

const Top = ({ ego, vehicles }) => (
  <div styleName="container">
      <CanvasTest ego={ ego } vehicles={ vehicles } />
  </div>
)

export default CSSModules(Top, styles)
