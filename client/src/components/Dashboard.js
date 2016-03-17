import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Dashboard'

import Speed from './Speed'
import InfoActions from './InfoActions'
import Acceleration from './Acceleration'

const Dashboard = () => (
  <div styleName="container">
    <Speed />
    <InfoActions />
    <Acceleration />
  </div>
)

export default CSSModules(Dashboard, styles)
