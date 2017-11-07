/**
 * Created by adnan on 11/2/2017.
 */

var imported = document.createElement('script');
imported.src = 'src/helper.js';
document.head.appendChild(imported);


var type = "webGL";
var app;
var loader;
var resources;
var img;
var shipPlayer;
var maxPosX;
var mouse;
var manager;
var speed = 0.8;
var bulletSpeed = 4;
var maxBullets = 5;
var playerDefaultX;
var isGameStart = false;
var bullet;
var bullets = [];
var mainContainer;
var startContainer;
var bulletContainer;
var enemyContainer;
var ui;
var enemys;
var mInterval;
var tickTime = 2000;
var enemiesHolder = [];
var enemySpeed = 5;
var gameOver;
var currentEnemy;
var collider;
var mutils;
var points=0;

if(PIXI.utils.isWebGLSupported()==false)
{
    type='canvas';
}

PIXI.utils.sayHello(type);

window.onload = function()
{
    include("src/Spaceship.js");
    include("src/ui.js");
    include("src/metheors.js");
    include("src/gameover.js");
    include("src/collider.js");
    include("src/mutils.js");

    app = new PIXI.Application(480,800,{backgroundColor:0xffCC00});
    document.getElementById("display").appendChild(app.view);
    document.body.appendChild(app.view);

    mouse = app.renderer.plugins.interaction.mouse.global;

    loader = new PIXI.loaders.Loader();
    loader.add('bcg','img/bcg.jpg')
        .add('ship','img/spaceship.png')
        .add('rock','img/rock.png')
        .add('btt','img/button.png')
        .add('bullet','img/bullet.png');

    loader.load(function(loader,resources)
    {
        onAssetLoaded(resources);
    });

}

function onAssetLoaded(res)
{
    var text = PIXI.Texture.fromImage('img/bcg.jpg');

    img = new PIXI.TilingSprite(text, app.renderer.width, app.renderer.height);

    var proportion = img.height/img.width;
    app.stage.addChild(img);

    setup();

    createStartScreen();

    app.ticker.add(function(delta)
    {
        update(delta);
    });

}

function setup() {

    collider = new Collider();
    enemys = new Metheor(PIXI);
    enemys.initMetheors(30);

    mutils = new Mutils();

    ui = new UI(PIXI,app);
    ui.init();
}

function gameStart(_op)
{
    switch(_op)
    {
        case 0:
            app.stage.removeChild(startContainer);
          break;
        case 1:
            gameOver.removeScreen();
         break;
    }

    bullets=[];
    enemiesHolder = [];
    mainContainer = new PIXI.Container();

    bulletContainer = new PIXI.Container();

    enemyContainer = new PIXI.Container();
    mainContainer.addChild(bulletContainer);
    mainContainer.addChild(enemyContainer);
    app.stage.addChild(mainContainer);

    let ship = new Spaceship(PIXI);
    ship.create("img/spaceship.png");
    shipPlayer = ship.img;
    playerDefaultX = shipPlayer.x;
    mainContainer.addChild(shipPlayer);

    shipPlayer.y = 800-shipPlayer.height;
    maxPosX = app.stage.width-shipPlayer.width;
    shipPlayer.interactive=true;
    shipPlayer.buttonMode=true;
    shipPlayer.on('mousemove',movePlayer);

    manager = new PIXI.interaction.InteractionManager(app.renderer);
    manager.onMouseMove = movePlayer();



    isGameStart = true;

    mInterval = setInterval(addEnemy,tickTime);

    //document.addEventListener("mousedown",onClick)
    app.stage.interactive = true;
    app.stage.on("click",onClick);
}


function movePlayer()
{
  if(isGameStart == false)
  {
      return;
  }

    if(manager.mouse.global.x>=0&&manager.mouse.global.x<=maxPosX)
    {
        if(shipPlayer.x>=maxPosX)
        {
            shipPlayer.x=maxPosX;
        }
        shipPlayer.x = manager.mouse.global.x;//*speed;
    }

}

function onClick(e)
{
    if(bullets.length>=maxBullets){
        return;
    }else{
        createBullet();
    }
    e.stopPropagation();
}

function update(delta)
{
    if(isGameStart==false)
    {
        return;
    }
    if(bullets.length>0)
    {
        for(var i=0;i<bullets.length;i++)
        {
            bullets[i].y-=bulletSpeed;

            if(currentEnemy!=null)
            {
                if(collider.checkCollisions(bullets[i],currentEnemy))
                {
                    bulletContainer.removeChild(bullets[i]);
                    bullets.splice(i,1);
                    enemyContainer.removeChild(currentEnemy);
                    enemiesHolder.splice(currentEnemy.id,1);
                    currentEnemy = null;
                    addPoints();
                    break;
                }
            }
            if(bullets[i].y<0)
            {
                bulletContainer.removeChild(bullets[i]);
                bullets.splice(i,1);
            }

        }
    }
    //move rocks
    for(var j= 0;j<enemiesHolder.length;j++)
    {
        currentEnemy = enemiesHolder[j];
        currentEnemy.id=j;
        currentEnemy.y+=enemySpeed;
        currentEnemy.rotation+=0.1 * delta;
        if(collider.checkCollisions(currentEnemy,shipPlayer))
        {
            isGameStart = false;
            showGameOver();
        }else{

            if(currentEnemy.y+currentEnemy.height>app.stage.height)
            {
                enemys.setMetheor(currentEnemy);
            }
        }
    }
    img.tilePosition.y+=2;
}

function createBullet()
{

    bullet = new PIXI.Sprite.fromImage('img/bullet.png');

    bullet.x = shipPlayer.x+shipPlayer.width/2;
    bullet.y = shipPlayer.y;

    bullets.push(bullet);
    bulletContainer.addChild(bullet);
}

function  addEnemy()
{

    var m = enemys.getMetheor();
    m.x = mutils.randomRange(50,app.stage.width- m.width);//50+(Math.random()*());
    m.y= -m.height;
    enemyContainer.addChild(m);

    enemiesHolder.push(m);
}

function  showGameOver()
{
    clearInterval(mInterval);
    score = 0;
    ui.updateScore(score);
    ui.hide();

    app.stage.removeChild(mainContainer);
    mainContainer=null;

    gameOver = new GameOver(PIXI,app);
    window.addEventListener("foo",playAgain);
    gameOver.showScreen();
}

function playAgain()
{
    console.log("Play Again");
    ui.show();
    gameStart(1)
}

function addPoints()
{
    points++;
    ui.updateScore(points);
}

function createStartScreen()
{
    startContainer = new PIXI.Container();
    app.stage.addChild(startContainer);
    var tf=new PIXI.Text("START GAME",{  fontFamily : 'Arial',
        fontSize: 34,
        fill : 0xff1010,
        align : 'center'});
    startContainer.addChild(tf);
    tf.x=app.stage.width/2-tf.width/2;
    tf.y=app.stage.height/2-tf.height/2;

    var btt = PIXI.Sprite.fromImage('img/button.png');
    btt.interactive=true;
   btt.on("pointerdown",pClick);
    btt.x=app.stage.width/2-btt.width/2;
    btt.y=tf.y+tf.height+20;
    startContainer.addChild(btt);

}

function pClick()
{
    console.log("click");
    app.stage.removeChild(startContainer);
    startContainer = null;
    gameStart(0);
}