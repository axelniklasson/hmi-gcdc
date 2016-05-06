import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'

class CanvasTest extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    this.stage.x = canvas.width / 2;
    this.stage.y = canvas.height / 2;
    this.number = 0;
    this.outerRadius = 10;
    this.innerRadius = 0;
    this.stepDegree = 5;
    this.numberOfLines = (Math.PI*2)/(this.stepDegree*Math.PI/180);
    this.draw();
  }

  // Prepare stage for drawing
 

  // Create the drawing logic
  draw() {
      var gradient = new createjs.Bitmap(images.gradient);
      gradient.x = -220;
      this.stage.addChild(gradient);
      this.stage.update();
    this.makeBig(this);
    }

  load(that){

    var loading = setInterval(function(){
      that.stage.removeAllChildren();
      var counter = 0;
      for(var i = -Math.PI/2; i<=Math.PI*2-Math.PI/2; i = i+(that.stepDegree*Math.PI/180)){
        let line = new createjs.Shape();
        var fromX = Math.cos(i)*that.outerRadius;
        var fromY = Math.sin(i)*that.outerRadius;
        var toX = Math.cos(i)*that.innerRadius;
        var toY = Math.sin(i)*that.innerRadius;
        if(counter > that.number){
          line.graphics.beginStroke("white");
        }else{
          line.graphics.beginStroke("green");
        }
        line.graphics.moveTo(fromX, fromY);
        line.graphics.lineTo(toX, toY);
        that.stage.addChild(line);
        counter++;
      }

      counter = 0;
      for(var i = Math.PI/2; i>=-Math.PI*2 + Math.PI/2; i = i-(that.stepDegree*Math.PI/180)){
        let line = new createjs.Shape();
        var fromX = Math.cos(i)*that.outerRadius;
        var fromY = Math.sin(i)*that.outerRadius +220;
        var toX = Math.cos(i)*that.innerRadius;
        var toY = Math.sin(i)*that.innerRadius +220;
        if(counter > that.number){
          line.graphics.beginStroke("white");
        }else{
          line.graphics.beginStroke("green");
        }
        line.graphics.moveTo(fromX, fromY);
        line.graphics.lineTo(toX, toY);
        that.stage.addChild(line);
        counter++;
      }

      var gradient = new createjs.Bitmap(images.gradient);
      gradient.x = -220;
      that.stage.addChild(gradient);
      that.stage.update();
      if(that.number < that.numberOfLines){
        that.number++;
      }else{
        clearInterval(loading);
        that.makeSmall(that);

      }
    }, 100);

  }

  makeSmall(that){
     var makeSmall = setInterval(function(){
          that.stage.removeAllChildren();
          for(var i = -Math.PI/2; i<=Math.PI*2-Math.PI/2; i = i+(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius;
            line.graphics.beginStroke("green");
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
         }
          for(var i = Math.PI/2; i>=-Math.PI*2 + Math.PI/2; i = i-(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius +220;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius +220;
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
          }
          if(that.outerRadius < 1){
            clearInterval(makeSmall);
           that.drawEgo(that);
          }else{
             that.outerRadius = that.outerRadius -5;
             that.innerRadius = that.innerRadius -5;
             that.stage.update();
          }
    }, 100);
  }

    makeBig(that){
     var makeBig = setInterval(function(){
          that.stage.removeAllChildren();
          for(var i = -Math.PI/2; i<=Math.PI*2-Math.PI/2; i = i+(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius;
            line.graphics.beginStroke("white");
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
         }
          for(var i = Math.PI/2; i>=-Math.PI*2 + Math.PI/2; i = i-(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius +220;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius +220;
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
          }
          if(that.outerRadius > 110){
            clearInterval(makeBig);
            that.load(that);
          }else{
             that.outerRadius = that.outerRadius +5;
             that.innerRadius = that.innerRadius +5;
             that.stage.update();
          }
    }, 100);
  }

  drawEgo(that){
    var vehicleHeight = 4635;
    var vehicleWidth = 2097;
    var roadWidth = 4000;
    var scale = 0;
    var steps = 0.0275/0.0005;
    var egoX = 0;
    var egoY = 0;
    var xEgoStep = -((vehicleWidth*0.0275)/2)/steps;
    var roadX = 0;
    var roadY = 0;
    var xRoadStep = (-(roadWidth*0.0275)/2 + (vehicleWidth * 0.0275)/2)/55;
    var yStep = 40/steps;

    console.log(steps);
    var step = 0;
    var drawEgo = setInterval(function() {
      that.stage.removeAllChildren();

      
      var road = new createjs.Bitmap(images.road);
      road.scaleX = (roadWidth/120)*scale;
      roadX = roadX +xRoadStep + xEgoStep;
      roadY = roadY + yStep;
      road.x = roadX;
      road.y = roadY;
      that.stage.addChild(road);
      var ego = new createjs.Bitmap(images.transport);
      ego.scaleX = (vehicleWidth / 100) * scale;
      ego.scaleY = (vehicleHeight / 178) * scale;
      egoX = egoX + xEgoStep;
      egoY = egoY + yStep;
      ego.x = egoX;
      ego.y = egoY;
      that.stage.addChild(ego);


      that.stage.update();


      if(scale > 0.0275){
        clearInterval(drawEgo);
      }else{
        scale = scale+0.0005;
      }



    },100);
  }


  render() {
    return (
      <div>
        <canvas 
          className="container"
          ref="canvas"
          width={ 768 }
          height={ 1024 } />
      </div>
    )
  }
}

export default CanvasTest
