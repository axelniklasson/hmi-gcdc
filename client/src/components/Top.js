import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'

const Top = ({ speed, northing, easting }) => (
  <div styleName="container">
      <CanvasTest speed={0} northing={6397675.946148769} easting={320194.38247808425}/>
  </div>
)

export default CSSModules(Top, styles)
