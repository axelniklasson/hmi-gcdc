import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import createjs from 'createjs-collection'
import CSSModules from 'react-css-modules'
import styles from '../styles/Acceleration'

class Accelerometer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas)
  }

  draw(acceleration) {    
    this.stage.removeAllChildren()

    if(acceleration>0){
      var green = 255;
      for(var i = 127; i>=0;i--){
        var color = "rgb(0,";
        color = color +green;
        color = color +",0)";
            let innerLine = new createjs.Shape();
            innerLine.graphics.beginStroke(color);
            innerLine.graphics.arc(140,137,i,-Math.PI/2 + (12.5*acceleration*Math.PI/180),-Math.PI/2, true);
            this.stage.addChild(innerLine);
            green = green-3;
      }
    }else{
      var red = 255;
      for(var i = 127; i>=0;i--){
        var color = "rgb(";
        color = color + red;
        color = color + ",0,0)";

            let innerLine = new createjs.Shape();
            innerLine.graphics.beginStroke(color);
            innerLine.graphics.arc(140,137,i,-Math.PI/2,-Math.PI/2 + (acceleration*12.5*Math.PI/180), true);
            this.stage.addChild(innerLine);
            red = red-3;
      }
    }

    this.stage.update()
  }

  render() {
    var { acceleration, egoFlags } = this.props;
    
    if(acceleration) {
      this.draw(acceleration)
    }

    return (
      <div styleName="container">
        <div styleName="circle">
          <canvas
            className="container"
            ref="canvas"
            width={275}
            height={131} />
        </div>
      </div>
    )
  }
}

export default CSSModules(Accelerometer, styles)
