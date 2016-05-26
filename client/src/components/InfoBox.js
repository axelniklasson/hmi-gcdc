import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoBox'
import images from '../images'

class InfoBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { flags } = this.props;

    let message = "";
    let icon = {};

    let testMessage = "Intersection. Incoming vehicle from the Right";
    let testIcon = images.intersectionRight;

    switch(flags) {
      case flags[5] === 1: // Construction site discovered
        message = "Construction site ahead";
        icon = images.construction;
      case flags[9] === 1 && flags[10] === 1: // Incoming vehicle, right
        message = "Intersection. Incoming vehicle from the Right";
        icon = images.intersectionRight;
      case flags[9] === 1 && flags[10] === 1: // Incoming vehicle, left
        message = "Intersection. Incoming vehicle from the Left";
        icon = images.intersectionLeft;
      case flags[12] === 1: // EV incoming
        message = "Emergency vehicle approaching";
        icon = images.emergency;
      case flags[14] === 1: // In yieldning position
        message = "Emergency vehicle passing";
        icon = images.emergency;
      case flags[12] === 0 && flags[14] === 1: // EV gone, In yieldning position
        message = "Emergency vehicle passed";
        icon = images.emergency;
      default:
        message = "";
    }
    
    return (
      <div styleName="container"> 
        <img src={testIcon} />
        <div styleName="text">{testMessage}</div>
      </div>
    )
  }
}

export default CSSModules(InfoBox, styles)
