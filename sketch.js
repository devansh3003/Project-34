var dog,happyDog
var database
var foodS
var foodStock

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png")
  dogImg1=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);

  dog = createSprite(250,250,10,10);
 
  dog.addImage(dogImg);
  dog.scale=0.2

  database=firebase.database();
  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(dogImg1);
  }
  drawSprites();
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,150); 
  textSize(13);

  
  fill("white");
  stroke("black");
  textSize(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk",40,100);
  
  
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function readStock(data){
  foodS = data.val();
}
