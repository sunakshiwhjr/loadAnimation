const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Render = Matter.Render;

var myEngine, myWorld;

var tower, towerImg, ground, cannon, cannonBallImg;
var backgroundImg;
var boat, boatImg;

var balls = [];
//do 5 go to showBoats() line 151
var boats = [];
 

function preload()
{
  towerImg = loadImage("assets/tower.png");
  backgroundImg = loadImage('assets/background.gif');
  cannonBallImg = loadImage('assets/cannonball.png');
  boatImg = loadAnimation('assets/boat1.png', 'assets/boat2.png', 'assets/boat3.png', 'assets/boat4.png')
    
}

function setup(){
    createCanvas(1200,600);
    myEngine = Engine.create();
    myWorld = myEngine.world;


    var render = Render.create({
        element: document.body,
        engine: myEngine,
        options: {
          width: 1200,
          height: 600,
          wireframes: false
        }
      });
      Render.run(render);

    tower = new Tower(150, 380, 190, 330);

    ground = new Ground(600, height-1, 1200,1);
    angle = -PI/4
    cannon = new Cannon(185, 140, 90, 56,angle);

    //do2 without boatPos go to 103
    // boat = new Boat(width-400, height-100,200, 200);

    //with boatPos
   // boat = new Boat(width-400, height-100,200, 200, -100);
   
    
}

function draw(){
    background(backgroundImg);
    Engine.update(myEngine);

    ground.display();

 
    //call the showCannonBalls 
    for(var i=0; i<balls.length; i++)
    {
      showCannonBalls(balls[i], i);
     //continuation C26
      for(var j=0; j<boats.length; j++)
      {
        if(balls[i] !== undefined && boats[j] !== undefined)
        {
          //Matter.SAT.collides(playerObject, groundObject).collided
          // returns either true or false depending on if the two objects are colliding
           var collision = Matter.SAT.collides(balls[i].body, boats[j].body);

           if(collision.collided)
           {
             //define remove inside Boat.js
             boats[j].remove(j);


             Matter.World.remove(myWorld, balls[i].body);
             balls.splice(i,1);
             i--;
           }
        }
      }
    }

  
    tower.display();
    cannon.display();

    //do4  and go to boat.js to do part2 boatPos
   /* Body.setVelocity(boat.body, {
      x:-0.9,
      y:0
    })
    */

    //do 3 & go to line 96
   // boat.display();


   //do 7 and comment line 97 to 105 goto 159
    showBoats();



    textSize(20)
    text(mouseX + "," + mouseY, mouseX,mouseY);
}


//this is the array --> cannonball 
function showCannonBalls(ball, index)
{
    ball.display();

    //remove the ball once it hits the ground or out of the canvas
    if(ball.body.position.x >= width ||ball.body.position.y >=height -50)
    {
      Matter.World.remove(myWorld, ball.body);
      balls.splice(index,1);
    }
}


function keyPressed()
{
  if(keyCode === DOWN_ARROW)
  {
    
    var cannonBall = new CannonBall(cannon.x +10, cannon.y+10, 40);
    balls.push(cannonBall);
  }
}

function keyReleased()
{
    if(keyCode === DOWN_ARROW)
    {
      
     // cannonBall.shoot();
     
     balls[balls.length -1].shoot();
      
    
    }
}

//do 6 and call in 107
function showBoats()
{
  //do 8 and go to 70
  //array length --> when there is atleast 1 boat then the creation of 2,3 & 4 boat
  if(boats.length > 0 )
  {

     if(boats.length < 4 && boats[boats.length -1].body.position.x < width-300)
     {
        var position = [height-130, height-200, height-170];
        var position = random(position);
        var boat = new Boat(width, height-100, 200, 200, position);
        boats.push(boat);
     }

      for(var i=0; i<boats.length; i++)
      {
        Body.setVelocity(boats[i].body, {x: -0.9, y:0});
        boats[i].display();

      }
  }

   else{

    var boat = new Boat(width, height-100, 200,200,height-110);
    boats.push(boat);
   }
}