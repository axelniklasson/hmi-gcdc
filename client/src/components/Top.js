import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Top'
import MainScreen from './MainScreen'
import MiniMap from './MiniMap'

const Top = ({ ego, vehicles }) => (
  <div styleName="container">
    {/*<MiniMap ego={ ego } vehicles={ vehicles } />*/}
    <MainScreen ego={ ego } vehicles={ vehicles } />
  </div>
)

export default CSSModules(Top, styles)
