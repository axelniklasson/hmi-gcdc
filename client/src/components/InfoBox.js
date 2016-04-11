import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoBox'

class InfoBox extends Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || // alternative standard method  
      (!document.mozFullScreen && !document.webkitIsFullScreen)) { // current working methods  
          if (document.documentElement.requestFullScreen) {
              document.documentElement.requestFullScreen();
          } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullScreen) {
              document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
          }
      } else {
          if (document.cancelFullScreen) {
              document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
          }
    }
  }

  render() {
    return (
      <div styleName="container"> 
        <div styleName="text">
          Some information from the system
        </div>
        <div styleName="text" onClick={ this.handleClick }>
          Fullscreen
        </div>
      </div>
    )
  }
}

export default CSSModules(InfoBox, styles)
