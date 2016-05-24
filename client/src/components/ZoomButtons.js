import React from 'react'
import CSSModules from 'react-css-modules'
import images from '../images'
import styles from '../styles/ZoomButtons'

const ZoomButtons = ({ updateScale }) => (
  <div styleName="container">
    <button onClick={ () => updateScale(1) }><img styleName="button" src={images.zoomIn} /></button>
    <button onClick={ () => updateScale(0) }><img styleName="button" src={images.zoomOut} /></button>
  </div>
)

export default CSSModules(ZoomButtons, styles)
