import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Speed'
import SpeedTest from './SpeedTest'

class Speed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { speed, loading } = this.props;

    if(loading){
      return (
       <div styleName="container">
        <div styleName="circle">
          
        </div>
      </div>
     )
   }else{
          return (
       <div styleName="container">
        <div styleName="circle">
          <SpeedTest speed={speed}/>
        </div>
      </div>
     )
   }
  }
}

export default CSSModules(Speed, styles)
