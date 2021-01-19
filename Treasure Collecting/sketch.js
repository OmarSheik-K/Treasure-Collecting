var path,boy,cash,diamonds,jewellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 0;
var END = 1;
var playstate;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
 
//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("GameOver", endImg);
boy.frameDelay = 16; //the animation was really fast
boy.scale=0.08;
boy.setCollider("rectangle", -30, 0, 1250, 1250, 0); //the default collider was unfair
//boy.debug = true;
  
playstate = PLAY;
   
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges = createEdgeSprites();
  boy.collide(edges);
  
  if(playstate == PLAY) {
     
    createCash();
    createDiamonds();
    createJewellery();
    createSword();

  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection = treasureCollection + 50;
  }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
      }
    else if(jewelleryG.isTouching(boy)) {
      jewelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
      }
    else if(swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      playstate = END;
      }
  
  }
  else if(playstate == END) {
    cashG.destroyEach();
    diamondsG.destroyEach();
    jewelleryG.destroyEach();
    boy.changeAnimation("GameOver", endImg);
    boy.scale = 0.75;
    boy.x = 200;
    boy.y = 200;
    
  }
    
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
 

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 80 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 150;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}