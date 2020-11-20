//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");
  dogImage3 = loadImage("dogImg2.jpg");
  bgImg = loadImage("bg.jpg");
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 500);

  
  dog = createSprite(250, 350, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20)

  
  
}


function draw() {  
  background(bgImg);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImage2);
  }

  if(keyWentUp(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImage);
  }

  if(keyWentDown(DOWN_ARROW)) {
    dog.addImage(dogImage3);
  }

 

  drawSprites();
  fill(0)
stroke("black");
text("food remaining :"+foodS,200,200);


}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })


}


