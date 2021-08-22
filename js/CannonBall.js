class CannonBall
{

    constructor(x,y,r)
    {
        var options = {

            isStatic: true,
            restitution:0.8,
            friction:1.0,
            density:1.0,
        };

        this.image = loadImage("assets/cannonball.png");
        this.body = Bodies.circle(x,y,r, options);
        this.r = r;
        
        this.trajectory = [];

        World.add(myWorld, this.body);
      //  console.log("cannonball:" , this.body)

    }


    shoot()
    {
        

      //set the force and velocity from where the ball will traverse
       var velocity = p5.Vector.fromAngle(cannon.angle);
              /* When we get the velocity from the function we’ll multiply
                the force using the multiply function as we want the
                cannonball to be launched with a great speed.*/


       velocity.mult(20);
       Body.setStatic(this.body, false);
       Body.setVelocity(this.body, {x: velocity.x, y: velocity.y});
    

    }

    display()
    {
       
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.image, 0, 0, this.r, this.r);
        pop();

        //getting the positions of ball and pushing them in the trajectory array
        if(this.body.velocity.x > 0  && this.body.position.x >270)
        {

             var position = [this.body.position.x, this.body.position.y];
             this.trajectory.push(position);

        }

        // setting image to the trajectory

        for(var i=0; i<this.trajectory.length; i++)
        {
          image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }

    }
}