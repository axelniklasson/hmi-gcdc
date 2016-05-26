import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoActions'
import images from '../images'

class InfoActions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { flags } = this.props;

    let message = "";

    switch(flags) {
      case flags[6] === 1: // Request to merge
        message = "Preparing to change lane";
      case flags[7] === 1: // Performing merge
        message = "Changing lane";
      case flags[9] === 1 && flags[11] === 1: // Intersection
        message = "Yielding";
      case flags[12] === 1: // EV incoming
        message = "Yielding";
      case flags[14] === 1: // In yielding position
        message = "Yielding";
      case flags[9] === 1 && !flags[11] === 1: // Intersection
        message = "Not Yielding";
      case flags[12] === 0 && flags[14] === 1: // EV gone, In yieldning position
        message = "Returning to position";
      default:
        message = "";
    }

    return (
      <div styleName="container">
        <div styleName="circle">
          <div styleName="inner-box">
            <div styleName="text">{message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(InfoActions, styles)
