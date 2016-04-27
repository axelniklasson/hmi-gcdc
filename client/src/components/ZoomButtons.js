import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/ZoomButtons'

const ZoomButtons = ({ updateScale }) => (
  <div styleName="container">
    <button styleName="button" onClick={ () => updateScale(1) }>+</button>
    <button styleName="button" onClick={ () => updateScale(0) }>-</button>
  </div>
)

export default CSSModules(ZoomButtons, styles)
