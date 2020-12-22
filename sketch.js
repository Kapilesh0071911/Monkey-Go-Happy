
var monkey,monkey_run,monkey_stop;
var banana ,banana_img;
var obstacle,obstacle_img;

var foodGroup,obsGroup,orangeGroup;

var survivalTime,score,chances;
var ground,ground_img;
var gameOver,gameOver_img;
var restart,restart_img;

var START=1;
var PLAY=2;
var END=0;
var gameState=START;


function preload(){
  monkey_run =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  

  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png");
  ground_img=loadImage("ground2.png");
  orange_img=loadImage("orange.png");
  gameOver_img=loadImage("gameover.png");
  restart_img=loadImage("restart.png");

function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(60,325,10,10);  
  monkey.addAnimation("run",monkey_run);
  monkey.scale=0.110;
  monkey.debug=true;
  monkey.setCollider("rectangle",0,0,550,340);
  
  ground=createSprite(200,358,1200,8);
  ground.addImage(ground_img);
  
  foodGroup=new Group();
  obsGroup=new Group();
  orangeGroup=new Group();
  
  survivalTime=10;
  score=0;
  chances=3;
  
  gameOver=createSprite(300,150,10,10)
  gameOver.addImage(gameOver_img);
  gameOver.scale=1.5;
  
}


function draw(){

  background("springgreen");
  
  if(gameState===START) {
   gameOver.visible=false;
   restart.visible=false;
    
   background("lightblue");
   fill("red");
   textSize(20);
   
   monkey.visible=false;
   ground.visible=false;

   if(keyDown("space")) {
     gameState=PLAY;
   }
   
  }
  else if(gameState===PLAY) {
    monkey.visible=false;
    ground.visible=false;
    ground.visible=true;
    monkey.visible=true;
    
    ground.velocityX=-(4+score/10);
    
    if(keyDown("space")&&monkey.y>320){ 
      monkey.velocityY=-11;
      jumpSound.play();
    }
    
    else if(keyDown("UP_ARROW")&&monkey.y>320) {
      monkey.velocityY=-16.5;
      survivalTime=survivalTime-1;
      longjump_sound.play();
    } 
    
    monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }
    if(monkey.isTouching(orangeGroup)){
      orangeGroup.destroyEach();
      score=score+5;
      survivalTime=survivalTime+10;
    } 
    
    if(frameCount%110===0) {
      survivalTime=survivalTime-1;
    }
    
    if(monkey.isTouching(obsGroup)) {
      chances=chances-1;
      obsGroup.destroyEach();
      dieSound.play();
    }
    
    if(score>0 && score%20===0)  { 
      checkPointSound.play();
    }
    
    obstacles();
    food();
    bonusFood();
  }
  else if(gameState===END) {

    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    obsGroup.setVelocityEach(0);
    obsGroup.destroyEach();
  }
  
  if(ground.x<0)  {
    ground.x=ground.width/2;
  }

  monkey.collide(ground);
  
  if(chances===0||survivalTime===0) {
    gameState=END;
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }

  
  drawSprites();
  
  fill("black");
  textSize(18);
  text("Score Board: "+score,20,35);
  text("Survival Time: "+survivalTime,450,35);
  text("Chances: "+chances,250,35);
  
  
}


function obstacles()
{
  if(frameCount%170===0)
  {
  obstacle=createSprite(600,330,10,10);
  obstacle.addImage(obstacle_img);
  obstacle.scale=0.15;
  obstacle.velocityX=-(4+5*score/15);
  obstacle.lifetime=155;
  obsGroup.add(obstacle);
  }
}

function food()
{
  if(frameCount%150===0)
  {
    banana=createSprite(600,Math.round(random(120,270)),10,10);
    banana.addImage(banana_img);
    banana.velocityX=-(3.5+7*score/10);
    banana.scale=0.1;
    banana.lifetime=200;
  }
  
}

function reset(){ 
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  gameOver.visible=false;
  restart.visible=false;

}
}