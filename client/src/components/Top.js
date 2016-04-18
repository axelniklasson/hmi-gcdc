import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'

const Top = ({ speed, northing, easting }) => (
  <div styleName="container">
      <CanvasTest speed={speed} northing={northing} easting={easting}/>
  </div>
)

export default CSSModules(Top, styles)
