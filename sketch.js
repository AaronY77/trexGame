var cloudGroup,cactusGroup;
var jumpSound,deadSound,checkpointSound
var restart,restarImage,gameover,gamoverImage;
var collidedTrex;
var highscore=0;
var c1,c2,c3,c4,c5,c6;
var gamestate="alive"
var score;
var trex ,trex_running;
var cactus;
var cloud1;var cloud2; var cloud3;
var ground_image;
var ground;
var edges;
var clouds;
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png"); 
ground_image=loadImage("ground2.png");
cloud_image=loadImage("cloud.png");
c1=loadImage("obstacle1.png");
c2=loadImage("obstacle2.png");
c3=loadImage("obstacle3.png");
c4=loadImage("obstacle4.png");
c5=loadImage("obstacle5.png");
c6=loadImage("obstacle6.png");
collidedTrex=loadAnimation("trex_collided.png");
restartImage=loadImage("restart.png")
gameoverImage=loadImage("gameOver.png")
deadSound=loadSound("die.mp3");
jumpSound=loadSound("jump.mp3");
checkpointSound=loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200)
 
   //create a trex sprite
 trex=createSprite(50,130,20,50);
 trex.setCollider("circle",0,0,40)
 trex.addAnimation("running",trex_running);
 trex.addAnimation("dead",collidedTrex);
 trex.scale=0.5; 

 ground=createSprite(200,180,400,5);
 ground.addImage(ground_image);

 platform=createSprite(50,190,50,10);
 platform.visible=false;

 gameover=createSprite(300,75);
 gameover.addImage(gameoverImage);
 gameover.scale=0.5;

 restart=createSprite(300,125);
 restart.addImage(restartImage);
 restart.scale=0.5;

 edges=createEdgeSprites();
 cloudGroup=createGroup();
 cactusGroup=createGroup();

 score=0;
} 



function draw(){
  background("steelblue");
  //displaying the score on the screen
  fill ("black");
  text("Score:"+Math.round(score),470,40);
  if(gamestate=="alive"){
      //moving the ground
      ground.velocityX=-7-score/100;
      //recreating the ground on the right side
      if(ground.x<0){
        ground.x=200;
      }
      //updating the score
      score+=0.3;
      //updating maxscore and displaying
      if(score>highscore){
        highscore=score;
      }
      fill ("black");
      text("Max Score:"+Math.round(highscore),370,40);
      //checking checkpoints
      if(score%200<=0.3&&score>5){
        checkpointSound.play();
      }
      //code to make trex jump
      if(keyDown("space")&&trex.y>160){
        jumpSound.play();
        trex.velocityY=-20;
      }
      //gravity
      trex.velocityY+=1.5;
      //create clouds and create cactuses
      createClouds();
      createCactus(); 
      //if block to check if touching cactus
      if(cactusGroup.isTouching(trex)){
        deadSound.play();
        gamestate="dead";

      }
      //making the gameover and restart disappper
      gameover.visible=false;
      restart.visible=false;
      
      
  }
  else if(gamestate=="dead"){
   trex.velocityY=0;
   //stopping the ground
    ground.velocityX=0;
    //freezing clouds and cactuses in place
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    //stopping clouds and cactuses from disappering due to lifetime
    cloudGroup.setLifetimeEach(-1);
    cactusGroup.setLifetimeEach(-1);
    //changing trex image when collided
    trex.changeAnimation("dead",collidedTrex);
    // making the gameover and restart appear
      gameover.visible=true;
      restart.visible=true;
    //if block to check if restart is pressed
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  trex.collide(platform);


drawSprites();
}



function reset(){
  gamestate="alive";
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
}


function createClouds(x){
if(frameCount%60==0){
  x=createSprite(600,10);
  cloudGroup.add(x);
  x.addImage(cloud_image);
  x.velocityX=-7-score/100;
  x.y=Math.round(random(10,70));
  x.scale=0.6;
  trex.depth=x.depth+1;
  x.lifetime=135;
}

}

function createCactus(){
if(frameCount%80==0){
cactus=createSprite(600,160);
cactusGroup.add(cactus);
cactus.velocityX=-7-score/100;
cactus.lifetime=135;
var y=Math.round(random(1,6));
switch(y){
  case 1:cactus.addImage(c1);
  break;
  case 2:cactus.addImage(c2);
  break;
  case 3:cactus.addImage(c3);
  break;
  case 4:cactus.addImage(c4);
  break;
  case 5:cactus.addImage(c5);
  break;
  case 6:cactus.addImage(c6);
  break;
  default:break;
}
cactus.scale=0.45;
}
}