//do 1 start
class Boat
{
    
constructor(x,y,width, height, boatPos)
{

    var options=
    {
        restitution:0.8,
        friction:1,
        density:1,
    };

    this.body = Bodies.rectangle(x,y,width, height, options);
    this.width = width;
    this.height = height;

    this.boatPosition = boatPos;
    this.image = loadAnimation('assets/boat1.png', 'assets/boat2.png', 'assets/boat3.png', 'assets/boat4.png')
  
    World.add(myWorld, this.body);

}
    display()
    {
    
        
        var pos = this.body.position;
        var angle = this.body.angle;
        push();

       // translate(pos.x, pos.y);
        //rotate(angle);
        imageMode(CENTER);
        //physics body will take line 14 and image will take different y pos
        animation(this.image,pos.x, this.boatPosition, this.width, this.height);
        
        
        pop();
        
    }


    remove(index)
    {

        Matter.World.remove(myWorld, boats[index].body);
        boats.splice(index,1);
    }
}