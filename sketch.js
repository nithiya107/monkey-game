PLAY = 1;
END = 0;
gameState = PLAY;
var survivalTime = 0;
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage,ground;
var FoodGroup, obstacleGroup
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkey_collided = loadAnimation("sprite_0.png")
}



function setup() {
  monkey = createSprite (80,315,20,20)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  ground = createSprite (400,350,900,10);
  ground.velocityX = -6;
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  monkey.setCollider("circle", 0, 0, 300);
}


function draw() {
background("pink");
  monkey.collide(ground);
  if (gameState === PLAY ){
    ground.x = ground.width/2;
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score, 290,40)
    stroke("black");
    textSize(20);
    fill("black")
    survivalTime = Math.ceil(frameCount/frameRate())
    text("SurvivalTime: "+ survivalTime,50,40)
    if (keyDown("space") && (monkey.y >=300 )){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    obstacles();
    bananas();
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  if (gameState === END){
    monkey.velocityX = 0;
    banana.velocityX = 0;
    obstacle.velocityX = 0;
    banana.lifetime = -1;
    obstacle.lifetime = -1;
    ground.velocityX = 0;
    monkey.changeAnimation ("collided",monkey_collided)
    stroke("black");
    textSize(20);
    fill("black");
    text("GAME OVER!",130,200);
    text("You Only Got "+ score+" bananas", 90,230);
  }
  
  
drawSprites();  
}

function bananas() {
if (frameCount % 120 === 0){
  banana = createSprite (400,200,20,20)
  bananaY = Math.round(random(190,275));
  banana.y = bananaY;
  banana.velocityX = -6;
  banana.addImage(bananaImage);
  banana.scale = 0.05
  banana.lifetime = 100;
  
  FoodGroup.add(banana);
}
if (FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score = score + 1;
}
  
  
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,327.5,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -6;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
  }
}


