const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerBow
var computer, computerBase, computerBow, computerArrow;
var arrows = [];
var compArrows = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
 
  computerBase = new ComputerBase(
    width-300,
    random(450, height - 300),
    180,
    150
  );
  
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );

  computerBow = new ComputerArcher(width-310, computerBase.body.position.y-180, 100, 100);
  //computerArrow = new ComputerArrow(width-310, computerBase.body.position.y-180, 100, 10);
  
  playerBow = new PlayerArcher(340, playerBase.body.position.y-180, 100, 100);
}

function draw() {
  background(180);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  playerBase.display();
  player.display();
  
  computerBase.display();
  computer.display();
  
  playerBow.display();
  computerBow.display();

  for (var i = 0; i < arrows.length; i++) {
    playerShowArrows(arrows[i], i);
  }
  for (var i = 0; i < compArrows.length; i++) {
    compShowArrows(compArrows[i], i);
  }

  //playerArrow.display();
  //computerArrow.display();
}

function keyReleased() {
    if (keyCode === 32) {
        arrows[arrows.length-1].shoot();
    }
    if (keyCode === DOWN_ARROW) {
      console.log(compArrows)
      compArrows[compArrows.length-1].shoot();
    }
}

function keyPressed() {
  if (keyCode === 32) {
      var playerArrow = new PlayerArrow(340, playerBase.body.position.y-180, 100, 10);
      arrows.push(playerArrow);
      console.log(arrows)
  }
  if (keyCode === DOWN_ARROW) {
      var computerArrow = new ComputerArrow(width-310, computerBase.body.position.y-180, 100, 10);
      compArrows.push(computerArrow);
      console.log(compArrows)
    }
}

function playerShowArrows(arrow, i) {
    arrow.display();
    if (arrow.body.position.x >= width-440 || arrow.body.position.y >= height) {
        Matter.World.remove(world, arrow.body)
        arrows.splice(i, 1);        
    }
}

function compShowArrows(arrow, i) {
  arrow.display();
  if (arrow.body.position.x <= 440 || arrow.body.position.y >= height) {
      Matter.World.remove(world, arrow.body)
      compArrows.splice(i, 1);        
  }
}