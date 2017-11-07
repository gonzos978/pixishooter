/**
 * Created by adnan on 11/3/2017.
 */
function Spaceship(_pixi)
{

    this.pixi = _pixi;
    this.life = 5;
    this.name = "spaceship";
    this.img = null;
}

Spaceship.prototype = {

    saySomething:function(){
       console.log(this.pixi.renderer);
    },
    create: function (_path)
    {
       this.img = PIXI.Sprite.fromImage(_path);
       let ratio = img.height/img.width;
       this.img.width = 100;
       this.img.height = 100*ratio;
    }

}