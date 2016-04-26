import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import CanvasTest from './CanvasTest'

const Top = ({ ownVehicle, vehicle1, vehicle2 }) => (
  <div styleName="container">
      <CanvasTest ownVehicle={ownVehicle} vehicle1={vehicle1} vehicle2={vehicle2}/>
  </div>
)

export default CSSModules(Top, styles)
