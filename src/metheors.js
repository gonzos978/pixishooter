/**
 * Created by adnan on 11/6/2017.
 */
function Metheor(_pixi)
{
    this.pixi = _pixi;
    this.buffer = [];
    this.imgTexture = null;
}

Metheor.prototype.initMetheors = function(_num)
{
    if(_num == undefined)
        _num = 10;

    this.imgTexture = new this.pixi.Texture.fromImage("img/rock.png");

    for(var i=0;i<_num;i++)
    {
        m = new this.pixi.Sprite( this.imgTexture);
        m.anchor.set(.5);
        this.metheorRandomize(m);
        this.buffer.push(m);
    }
}

Metheor.prototype.getMetheor = function(){

    var m;
    if(this.buffer.length>0)
    {
        return this.buffer.shift();
    }else
    {
        m = new this.pixi.Sprite( this.imgTexture);

        return m;
    }
}
Metheor.prototype.setMetheor=function(m)
{
    this.buffer.push(m);
}


Metheor.prototype.metheorRandomize=function(_item)
{
    var ratio=_item.height/_item.width;
    _item.width = Math.random()*100;
    if(_item.width<30)
    {
        _item.width=30;
    }
    _item.height = _item.width*ratio;
}