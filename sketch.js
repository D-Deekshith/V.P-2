var dog,dogSitImg,dogStand,dogStandImg;
var database;
var dogFood;
var foods;
var feedButton,addButton;
var food;
var feedTime;
var getState,gameState;

function preload(){
  dogSitImg = loadImage("images/dogImg.png");
  dogStandImg = loadImage("images/dogImg1.png");
}

function setup(){
  database = firebase.database();
    createCanvas(900,500);
    dog = createSprite(650,250,10,10);
    dog.addImage("dog",dogStandImg);
    dog.scale = 0.15;

    dogFood = database.ref("dog/Food");
    dogFood.on("value",readStock);      

    feedTime = database.ref("fedTime");
    feedTime.on("value",(data)=>{
      lastFeed = data.val();
})

    food = new Milk();

    feedButton = createButton("Feed the dog");
    feedButton.position(685,100);
    feedButton.mousePressed(feedDog,
      dog.addImage("dog",dogStandImg) );

    addButton = createButton("Add food");
    addButton.position(795,100);
    addButton.mousePressed(addFood,
      dog.addImage("dog",dogSitImg));

    foods = 0;
}

function draw(){
    background("green");

    drawSprites();
    
    fill(255,255,254);
    textSize(20);
    strokeWeight(0.7);
    stroke(255)

    if(feedTime >= 12){
      text("last Feed : " + feedTime % 12 + " PM", 350,30);
    }

    else if(feedTime == 0){
      text("last Feed : 12 AM",350,30);
    }

    else if(feedTime <12){
      text("last Feed : " + feedTime + " AM" + 350, 30);
    }

    textSize(25);
    fill(255);
    textFont("lucida calligraphy");
    strokeWeight(0.6);
    stroke(255)
    text("Food remaining : "+foods,150,170);
    text("",70,50);
  }

    function readStock(data){
      foods = data.val();
      food.updateFoodStock(foods);
    }

    function feedDog(){
      dog.addImage("happy dog",dogStandImg);

      foods--;

      if(foods < 0){
        foods = 0;
      }

      database.ref("dog/").update({
        Food : foods
      })

      feedTime = hour();
    }

    function addFood(){
      dog.addImage("dog",dogStandImg);
      foods++

      food.display();
      
      database.ref('dog/').update({
        Food:foods
      })
    }