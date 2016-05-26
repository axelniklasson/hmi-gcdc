import React from 'react'
import CSSModules from 'react-css-modules'
import images from '../images'
import styles from '../styles/ZoomButtons'

const ZoomButtons = ({ updateScale }) => (
  <div styleName="container">
    <img src={images.zoomIn} onClick={ () => updateScale(1) } />
    <img src={images.zoomOut} onClick={ () => updateScale(0) } />
  </div>
)

export default CSSModules(ZoomButtons, styles)
