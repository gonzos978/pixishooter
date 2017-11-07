/**
 * Created by adnan on 11/7/2017.
 */
function Collider(){};

Collider.prototype.checkCollisions = function(ob1,ob2)
{

    if(ob1.x < ob2.x + ob2.width &&
        ob1.x + ob1.width > ob2.x &&
        ob1.y < ob2.y + ob2.height &&
        ob1.height + ob1.y > ob2.y)
    {
        return true;
    }

    return false;
}

Collider.prototype.circleCollider = function(c1,c2)
{
    var dx = c1.x - c2.x;
    var dy = c1.y - c2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {

        return true;
    }

    return false;
}
