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

    var message = "";

    if(flags[6] === 1) { // Request to merge
      message = "Preparing to change lane";
    } else if(flags[7] === 1) {// Performing merge
      message = "Changing lane";
    } else if((flags[9] === 1 && flags[11] === 1) || flags[12] === 1 || flags[14] === 1) {
      message = "Yielding";
    } else if(flags[9] === 1 && !flags[11] === 1) {
      message = "Not Yielding";
    } else if(flags[12] === 0 && flags[14] === 1) {
      message = "Returning to position";
    } else {
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
