import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import createjs from 'createjs-collection'
import CSSModules from 'react-css-modules'
import styles from '../styles/Acceleration'

class Acceleration extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas)
  }

  draw(acceleration) {    this.stage.removeAllChildren()


    if(acceleration>0){
      var green = 255;
      for(var i = 135; i>=0;i--){
        var color = "rgb(0,";
        color = color +green;
        color = color +",0)";
            let innerLine = new createjs.Shape();
            innerLine.graphics.beginStroke(color);
            innerLine.graphics.arc(150,150,i,-Math.PI/2 + (12.5*acceleration*Math.PI/180),-Math.PI/2, true);
            this.stage.addChild(innerLine);
            green = green-3;
      }
    }else{
      var red = 255;
      for(var i = 135; i>=0;i--){
        var color = "rgb(";
        color = color + red;
        color = color + ",0,0)";
        console.log(color);
            let innerLine = new createjs.Shape();
            innerLine.graphics.beginStroke(color);
            innerLine.graphics.arc(150,150,i,-Math.PI/2,-Math.PI/2 + (acceleration*12.5*Math.PI/180), true);
            this.stage.addChild(innerLine);
            red = red-3;
      }
    }

    var circle = new createjs.Shape();
    circle.graphics.beginFill("white");
    circle.graphics.drawCircle(150,150,10);
    this.stage.addChild(circle);

    // Scale the acceleration to present pixels
    //let scaledAcc = acceleration * 25

    // Draw white background
    //let base = new createjs.Shape()
    //base.graphics.beginFill('White').drawRect(80,100,140,10)
    //this.stage.addChild(base)

    // Draw Acc or Dec
    //if (acceleration > 0) {
     // let acc = new createjs.Shape()
    //  acc.graphics.beginFill('Green').drawRect(150,100,scaledAcc,10)
    //  this.stage.addChild(acc)
    //} else if (acceleration < 0) {
    //  let scaledDec = scaledAcc * (-1)
     // let dec = new createjs.Shape()
     // base.graphics.beginFill('Red').drawRect(150-scaledDec,100,scaledDec,10)
     // this.stage.addChild(dec)
    //}

    this.stage.update()
  }

  render() {
    let acceleration = this.props.acceleration
    if(acceleration) {
      this.draw(acceleration)
    }

    return (
      <div styleName="container">
        <div styleName="circle">
          <canvas
            className="container"
            ref="canvas"
            width={244}
            height={131} />
        </div>
      </div>
    )
  }
}

export default CSSModules(Acceleration, styles)
