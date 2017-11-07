/**
 * Created by adnan on 11/6/2017.
 */
function GameOver(_pixi,app)
{
    this.pixi = _pixi;
    this.app = app;
    this.container = null;
    this.evtName="onOver";
    this.overEvent = new Event("onOver");
    this.dummy={};
}
GameOver.prototype.txtStyle = {

    fontFamily : 'Arial',
    fontSize: 24,
    fill : 0xffffff,
    align : 'center'
}
GameOver.prototype.showScreen = function()
{
    this.overEvent = new CustomEvent("onOver");
    this.container = new this.pixi.Container();
    this.app.stage.addChild(this.container);

    var tf = new this.pixi.Text("GAME OVER",this.txtStyle);
    tf.x=this.app.stage.width/2-tf.width/2;
    tf.y=this.app.stage.height/2-tf.height/2;
    this.container.addChild(tf);

    var btt = this.pixi.Sprite.fromImage('img/button.png');
    btt.x=this.app.stage.width/2-btt.width/2;
    btt.y=tf.y+tf.height+10;
    btt.interactive=true;
    btt.buttonMode=true;
    tf = new this.pixi.Text("PLAY AGAIN",this.txtStyle);
    btt.addChild(tf);
    btt.on('pointerdown',this.onClick);
    this.container.addChild(btt);
}

GameOver.prototype.removeScreen=function()
{
    this.app.stage.removeChild(this.container);
}

GameOver.prototype.onClick = function(e)
{
    console.log("FOO "+this.txtStyle);
    window.dispatchEvent(new Event("foo"));
}