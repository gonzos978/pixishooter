/**
 * Created by adnan on 11/6/2017.
 */
function UI(_pixi,_app)
{
    this.pixi = _pixi;
    this.app =_app;
    this.scoreLabel = null;
    this.scoreTf = null;
    this.pts=0;
    this.container=new this.pixi.Container();
}

UI.prototype.txtStyle = {

    fontFamily : 'Arial',
    fontSize: 24,
    fill : 0xff1010,
    align : 'center'
}


UI.prototype.init = function()
{
    this.app.stage.addChild(this.container);
     this.scoreLabel = new this.pixi.Text("SCORE:",this.txtStyle);
    this.container.addChild(this.scoreLabel);

    this.scoreTf = new this.pixi.Text("000",this.txtStyle);
    this.scoreTf.x=this.scoreLabel.x+this.scoreLabel.width;
    this.container.addChild(this.scoreTf);
}
UI.prototype.hide = function()
{
    this.container.visible=false;
}
UI.prototype.show = function()
{
    this.container.visible=true;
}

UI.prototype.updateScore = function(_score)
{
    this.pts = _score;
    this.scoreTf.text = this.pts;

    return this.pts;
}