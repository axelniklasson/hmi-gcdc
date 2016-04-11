
var ctx;
var speed = 0;
var outerRadius = 70;
var smallLineRadius = 65;
var bigLineRadius = 60;
var textRadius = 50;
var innerRadius = 40;
var increase = 1;

init() {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.translate(outerRadius,outerRadius);
    window.requestAnimationFrame(draw);
}

function draw(){
    ctx.fillStyle="black";
    ctx.fillRect(-outerRadius,-outerRadius,outerRadius*2,outerRadius*2);

    if(increase == 1){
        speed = speed + 1;
        if(speed == 180){
            increase = 0;
        }
    }else{
        speed = speed-1;
        if(speed == 0){
            increase = 1;
        }
    }

    ctx.beginPath();
    var x = 0; // x coordinate
    var y = 0; // y coordinate
    var anticlockwise = true; // clockwise or anticlockwise

    ctx.arc(x, y, outerRadius, 0, Math.PI, anticlockwise);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x,y,innerRadius,0,Math.PI, anticlockwise);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "30px sans-serif";
    ctx.fillStyle = "white";

    var speedX;
    if(speed > 99){
        speedX = -25;
    }else{
        speedX = -15;
    }
    ctx.fillText(speed, speedX,0);

    ctx.font = "8px sans-serif";

    for(i = 0, j = 180; i>=-Math.PI; i = i- (20*Math.PI/180), j= j-20){
        ctx.beginPath();
        var fromX = Math.cos(i-1*Math.PI/180) * outerRadius;
        var fromY = Math.sin(i-1*Math.PI/180) * outerRadius;
        var fromX2 = Math.cos(i+1*Math.PI/180) * outerRadius;
        var fromY2 = Math.sin(i+1*Math.PI/180) * outerRadius;
        var toX  = Math.cos(i) * bigLineRadius;
        var toY = Math.sin(i) * bigLineRadius;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(fromX2, fromY2);
        ctx.lineTo(toX, toY);
        ctx.lineTo(fromX, fromY);
        ctx.fill();
        ctx.closePath();
        var textX = Math.cos(i) * textRadius;
        var textY = Math.sin(i) * textRadius;
        ctx.fillText(j, textX-6, textY);
    }

    for(i = -10*Math.PI/180; i>=-Math.PI; i = i- (20*Math.PI/180)){
        ctx.beginPath();
        var fromX = Math.cos(i) * outerRadius;
        var fromY = Math.sin(i) * outerRadius;
        var toX  = Math.cos(i) * bigLineRadius;
        var toY = Math.sin(i) * bigLineRadius;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.closePath();
    }

    for(i = -5*Math.PI/180; i>=-Math.PI; i = i- (10*Math.PI/180)){
        ctx.beginPath();
        var fromX = Math.cos(i) * outerRadius;
        var fromY = Math.sin(i) * outerRadius;
        var toX  = Math.cos(i) * smallLineRadius;
        var toY = Math.sin(i) * smallLineRadius;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.closePath();
    }

    ctx.beginPath();
    var FromX = (Math.cos((speed-180)*Math.PI/180)*outerRadius);
    var FromY = (Math.sin((speed-180)*Math.PI/180)*outerRadius);
    var ToX = (Math.cos((speed-178)*Math.PI/180)*innerRadius);
    var ToY = (Math.sin((speed-178)*Math.PI/180)*innerRadius);
    var ToX2 = (Math.cos((speed-182)*Math.PI/180)*innerRadius);
    var ToY2 = (Math.sin((speed-182)*Math.PI/180)*innerRadius);
    ctx.moveTo(ToX, ToY);
    ctx.lineTo(ToX2, ToY2);
    ctx.lineTo(FromX, FromY);
    ctx.lineTo(ToX,ToY);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();


    window.requestAnimationFrame(draw);

}

