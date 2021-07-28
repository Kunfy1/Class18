var ground, trex, trexrunning, groundimg, trexcollided, invisibleground;
var cloud, cloudimg, cloudgroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameover,gameoverimg,restart,restartimg;

var obstacle, obstaclegroup;
var score = 0;
var gamestate = "play";
var play = 1;
var end = 0;

function preload() {
  groundimg = loadImage("ground2.png");
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadImage("trex_collided.png");
  cloudimg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("trexrunning", trexrunning);
  trex.addAnimation("collided",trexcollided);
  trex.scale = 0.5;
  trex.x = 50;

  ground = createSprite(width/2, height-50, width, 20);
  ground.addImage(groundimg);
  ground.x = ground.width / 2;
  
  gameover=createSprite(width/2-10,height/2-30);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5; 
  
  restart=createSprite(width/2,height/2);
  restart.addImage(restartimg);
  restart.scale=0.5;
  
  

  

  invisibleground = createSprite(width/2, height-30, width, 10);
  invisibleground.visible = false;
  


  obstaclegroup = createGroup();

  cloudgroup = createGroup();
    trex.setCollider("rectangle",0,20,20,50);
  trex.debug=true
}

function draw() {
  background(180);

  text("score " + score, 500, 50);

  if (gamestate === "play") {
    gameover.visible=false;
    restart.visible=false;
    trex.changeAnimation("trexrunning",trexrunning);
    score = score + Math.round(frameCount / 60);
    ground.velocityX = -(4+3*score/50);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    
      if(touches.length>0 || keyDown("space")&& trex.y>=height-120){
        trex.velocityY=-10;
        touches=[]
      }
    

    trex.velocityY = trex.velocityY + 0.8;
    createClouds();
    createObstacle();
    if (obstaclegroup.isTouching(trex)) {
      gamestate = end;
    }
  } else if (gamestate === end) {
    gameover.visible=true;
    restart.visible=true;
    trex.changeAnimation("collided", trexcollided);
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    if(touches.length>0|| keyDown("space")){
      reset();
      touches=[]
    }
  }

  trex.collide(invisibleground);
  drawSprites();
}

function createClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+30, height+300, 40, 10);
    cloud.addImage(cloudimg);
    cloud.y = Math.round(random(10, 60));
    cloud.scale = 0.4;
    cloud.velocityX = -2;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 200;
    cloudgroup.add(cloud);
  }
}
function createObstacle() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(400, height-60, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);

    var selectobstacles = Math.round(random(1, 6));

    switch (selectobstacles) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
  }
}
function reset(){
  gamestate="play";
  gameover.visible=false;
  restart.visible=false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score=0;
}
