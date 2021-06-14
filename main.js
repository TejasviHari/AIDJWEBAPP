song="";

leftWristX="";
rightWristX="";

leftWristY="";
rightWristY="";
scoreLeftWrist="";
scoreRightWrist="";

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modeloaded);
    posenet.on("pose",gotPoses);
}

function modeloaded(){
    console.log("Posenet initialized!");
}

function draw(){
    image(video,0,0,600,500);

    fill(255,0,0);
    stroke(255,0,0);

    if(scoreRightWrist>0.2){
circle(rightWristX,rightWristY,20);
if(rightWristY>0 && rightWristY<=100){
    document.getElementById("speed").innerHTML="Speed=0.5";
    song.rate(0.5);
}
else if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="Speed=1";
    song.rate(1);  
}
else if(rightWristY>200 && rightWristY<=300){
    document.getElementById("speed").innerHTML="Speed=1.5";
    song.rate(1.5);
}
else if(rightWristY>300 && rightWristY<400){
    document.getElementById("speed").innerHTML="Speed=2";
    song.rate(2);
}
else if(rightWristY>400){
    document.getElementById("speed").innerHTML="Speed=2.5";
    song.rate(2.5);
}
}


   if (scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    inNumberLeftWristY=Number(leftWristY);
    remove_decimals=floor(inNumberLeftWristY);
    leftWristDivided=remove_decimals/500;
    volume=leftWristDivided*2;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);


}
}

function play(){
    song.play();
    song.setVolume(0.3);
    song.rate(2.5);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
         console.log("Score Left Wrist is "+scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist X:"+leftWristX+", Left wrist Y:"+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist X:"+rightWristX+", Right wrist Y:"+rightWristY)
    }
}