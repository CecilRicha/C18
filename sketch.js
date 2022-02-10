var ground, ground_ing
var trex ,trex_running;
var cloud_img
var dummyGround
var cac,cacGroup,cloudGroup
var score = 0
var gameState = "play"
var trex_colloided 
var gameOver, gameOverImg, restart,restartImg
var checkpoint,jump,die
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_ing = loadImage ("ground2.png")
  cloud_img = loadImage ("cloud.png")
  cac1_img = loadImage ("obstacle1.png")
  cac2_img = loadImage ("obstacle2.png")
  cac3_img = loadImage ("obstacle3.png")
  cac4_img = loadImage ("obstacle4.png")
  cac5_img = loadImage ("obstacle5.png")
  cac6_img = loadImage ("obstacle6.png")
  trex_colloided = loadAnimation ("trex_collided.png")
  gameOverImg = loadImage ("gameOver.png")
  restartImg = loadImage ("reload.png")
  checkpoint = loadSound ("checkpoint.mp3")
  jump = loadSound ("jump.mp3")
  die = loadSound ("die.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
 // var r = Math.round(random(1,10));
  //console.log (r)
  //create a trex sprite
  trex = createSprite (200,windowHeight - 10,50,30);
  trex.addAnimation("running",trex_running)
  trex.addAnimation ("killed",trex_colloided)
  trex.debug = true
  trex.setCollider ("rectangle",0,0,50,90)
  trex.scale = 0.75

// create a ground
  ground = createSprite (windowWidth/2,windowHeight - 15,600,60);
  ground.addImage (ground_ing);
 // ground.debug = true

// create dummyGround
dummyGround = createSprite(windowWidth/2,windowHeight - 10,width,10)
dummyGround.visible = false

  // creating group
  cacGroup = new Group()
  // creating cloud group
  cloudGroup = new Group()

  // creating gameOver
  gameOver = createSprite (300,100,30,30)
  gameOver.addImage (gameOverImg)
  gameOver.scale = 0.7
  gameOver.visible = false

  // creating restart
  restart = createSprite (300,70,20,20)
  restart.addImage (restartImg)
  restart.visible = false
  restart.scale = 0.7
}

function draw(){
  background("blue")
 if (gameState == "play"){
   ground.velocityX = -(4 + score/ 100)
   // checkpoint music 
   if ( frameCount % 50 == 0 ){
    checkpoint.play ()
   }
  if (ground.x < 0){
    ground.x = 300;
  }
    // for jumping
  if (keyDown("SPACE") && (trex.isTouching (ground)) || touches.length > 0) {
  trex.velocityY = -7
  jump.play ()
  touches = []
 }

trex.velocityY = trex.velocityY + 0.25
score = frameCount 
  // creating clouds and cactus
  createClouds ()
  createCac ()
  if (cacGroup.isTouching (trex)){
    gameState = "end"
    die.play()
   }
 }
else if (gameState == "end"){
  ground.velocityX = 0
  cloudGroup.setVelocityXEach (0)
  cacGroup.setVelocityXEach (0)
  cloudGroup.setLifetimeEach (-1)
  cacGroup.setLifetimeEach (-1)
  trex.changeAnimation ("killed",trex_colloided)
  gameOver.visible = true
  restart.visible = true
}

 console.log (frameCount)

//  displays scores
  text ("score ="+score,50,30)

trex.collide (dummyGround);

// calling restart function
if (mousePressedOver (restart)){
  reset ()
}

  drawSprites()
}
function reset (){
gameState = "play"
cacGroup.destroyEach ()
cloudGroup.destroyEach ()
gameOver.visible = false
restart.visible = false
trex.changeAnimation ("running",trex_running);
score = 0
frameCount = 0
}
 function createClouds (){
 if (frameCount % 50 == 0){
  var cloud = createSprite (600,100,20,20)
  cloud.velocityX = -4
  cloud.y = Math.round(random(0,100));
  cloud.addImage (cloud_img)
  cloud.scale = 0.78
  cloud.lifetime = 150
  cloudGroup.add (cloud)
 }
}
 function createCac () {
 if (frameCount % 100 == 0){
  var cac = createSprite (width,windowHeight - 35,25,25)
  cac.velocityX = -(4 + score / 100)
  var r = Math.round(random(1,6));
  switch (r){
  case 1: cac.addImage (cac1_img);
  break;
  case 2: cac.addImage (cac2_img);
  break;
  case 3: cac.addImage (cac3_img);
  break;
  case 4: cac.addImage (cac4_img);
  break;
  case 5: cac.addImage (cac5_img);
  break;
  case 6: cac.addImage (cac6_img);
  break;
  }
  cac.scale = 0.5
  cac.lifetime = width/4 
  cacGroup.add (cac)
 }
} 