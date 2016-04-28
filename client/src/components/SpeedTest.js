import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'

class SpeedTest extends Component {
  constructor(props) {
    super(props)
  }

  // Prepare stage for drawing
  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas)
    this.stage.x = 140
    this.stage.y = 140

    this.draw(this.props.speed)
  }

  // Create the drawing logic
  draw(speed) {
    var outerRadius = 135;
    var smallLineRadius = 130;
    var bigLineRadius = 115;
    var textRadius = 90;
    var innerRadius = 70;
    var increase = 1;

    this.stage.removeAllChildren();

    var j = 180;
    for(var i = 0; i>=-Math.PI; i = i- (20*Math.PI/180)){
        let pil = new createjs.Shape();
        var fromX = Math.cos(i-2*Math.PI/180) * outerRadius;
        var fromY = Math.sin(i-2*Math.PI/180) * outerRadius;
        var fromX2 = Math.cos(i+2*Math.PI/180) * outerRadius;
        var fromY2 = Math.sin(i+2*Math.PI/180) * outerRadius;
        var toX  = Math.cos(i) * bigLineRadius;
        var toY = Math.sin(i) * bigLineRadius;
        pil.graphics.beginFill("white");
        pil.graphics.moveTo(fromX, fromY);
        pil.graphics.lineTo(fromX2, fromY2);
        pil.graphics.lineTo(toX,toY);
        pil.graphics.lineTo(fromX, fromY);
        this.stage.addChild(pil);

        if(j%40 == 0 && j<=120) {
            var text = new createjs.Text(j, "20px sans-serif", "white");
            text.x = (Math.cos(i) * textRadius)-15;
            text.y = Math.sin(i) * textRadius;
            text.textBaseline = "alphabetic";
            this.stage.addChild(text);
        }
        j= j-20;
    }

      let innerLine = new createjs.Shape();
      innerLine.graphics.beginStroke("white");
      innerLine.graphics.arc(0,0,innerRadius,0,Math.PI, true);
      this.stage.addChild(innerLine);

      var FromX = (Math.cos((speed-180)*Math.PI/180)*outerRadius);
      var FromY = (Math.sin((speed-180)*Math.PI/180)*outerRadius);
      var ToX = (Math.cos((speed-178)*Math.PI/180)*innerRadius);
      var ToY = (Math.sin((speed-178)*Math.PI/180)*innerRadius);
      var ToX2 = (Math.cos((speed-182)*Math.PI/180)*innerRadius);
      var ToY2 = (Math.sin((speed-182)*Math.PI/180)*innerRadius);
      let nail = new createjs.Shape();
      nail.graphics.beginFill("red");
      nail.graphics.moveTo(ToX, ToY);
      nail.graphics.lineTo(ToX2, ToY2);
      nail.graphics.lineTo(FromX, FromY);
      nail.graphics.lineTo(ToX,ToY);
      this.stage.addChild(nail);

      var speedText = new createjs.Text(Math.round(speed), "36px sans-serif", "white");
      var speedX;
      if(speed > 99){
          speedX = -25;
      }else{
          speedX = -15;
      }
      speedText.x = speedX;
      speedText.y = 0;
      speedText.textBaseline = "alphabetic";
      this.stage.addChild(speedText);

    this.stage.update()
  }

  render() {
    // Extract props
    //const { speed } = this.props

    // Draw on props update
    //if (speed) {
      //this.draw(speed)
    //}

    return (
      <div>
        <canvas 
          className="container"
          ref="canvas"
          width={275}
          height={175} />
      </div>
    )
  }
}

export default SpeedTest
