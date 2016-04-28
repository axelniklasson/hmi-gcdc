import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'
import MiniMap from './MiniMap'

const Top = ({ ego, vehicles }) => (
  <div styleName="container">
    <MiniMap ego={ ego } vehicles={ vehicles } />
    <CanvasTest ego={ ego } vehicles={ vehicles } />
  </div>
)

export default CSSModules(Top, styles)
