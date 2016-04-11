import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Speed'

class Speedometer extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    var { speed } = this.props;
    var ctx;
    var outerRadius = 70;
    var smallLineRadius = 65;
    var bigLineRadius = 60;
    var textRadius = 50;
    var innerRadius = 40;
    var increase = 1;


    return (
      <div styleName="container">

      </div>

    )
  }
}

export default CSSModules(Speedometer, styles)
