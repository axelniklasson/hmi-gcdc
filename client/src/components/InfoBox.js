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

    var message = "";
    var icon = images.empty;

    if(flags[5] === 1) {
      message = "Construction site ahead";
      icon = images.construction;
    } else if(flags[9] === 1 && flags[10] === 1) {
      message = "Intersection. Incoming vehicle from the Right";
      icon = images.intersectionRight;
    } else if(flags[9] === 1 && flags[10] === 1) {
      message = "Intersection. Incoming vehicle from the Left";
      icon = images.intersectionLeft;
    } else if(flags[12] === 1) {
      message = "Emergency vehicle approaching";
      icon = images.emergency;
    } else if(flags[14] === 1) {
      message = "Emergency vehicle passing";
      icon = images.emergency;
    } else if(flags[12] === 0 && flags[14] === 1) {
      message = "Emergency vehicle passed";
      icon = images.emergency;
    } else {
      message = "";
      icon = images.empty;
    }
    
    return (
      <div styleName="container">
        <img src={icon} />
        <div styleName="text">{message}</div>
      </div>
    )
  }
}

export default CSSModules(InfoBox, styles)
