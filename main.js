score_rw=0;
score_lw=0;
song="";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Posenet has been loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_rw=results[0].pose.keypoints[10].score;
        score_lw=results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+score_lw + " Score Right Wrist = "+score_rw );

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist X= "+leftWristX+" Left wrist Y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist X= "+rightWristX+" Right wrist Y= "+rightWristY);
    }
}

function draw(){
image(video,0,0,600,500);

fill("#00aee3");
stroke("#000000");

if(score_rw>0.2){
circle(rightWristX,rightWristY,35);

if(rightWristY>0 && rightWristY<=100){
    document.getElementById("speed").innerHTML="Speed=0.5x"
    song.rate(0.5);
}
else if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="Speed=1x"
    song.rate(1);
}
else if(rightWristY>200 && rightWristY<=300){
    document.getElementById("speed").innerHTML="Speed=1.5x"
    song.rate(1.5);
}
else if(rightWristY>300 && rightWristY<=400){
    document.getElementById("speed").innerHTML="Speed=2x"
    song.rate(2);
}
else if(rightWristY>400 && rightWristY<=500){
    document.getElementById("speed").innerHTML="Speed=2.5x"
    song.rate(2.5);
}
}


if(score_lw>0.2){
circle(leftWristX,leftWristY,35);

no_lwY=Number(leftWristY);
remove_decimals= floor(no_lwY);
volume=remove_decimals/500;
document.getElementById("vol").innerHTML= "Volume= "+volume;
song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}