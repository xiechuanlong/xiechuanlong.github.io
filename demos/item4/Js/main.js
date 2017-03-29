/**
 * Created by xcl on 2016/3/15.
 */
var can1;
var can2;

var ctx1;
var ctx2;

var btn;

var lastTime;
var deltaTime;

var bgPic=new Image();

var canWidth;
var canHeight;

var ane;
var fruit;

var monFish;

var mousex;
var mousey;

var babyFish;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var bigTail=[];
var bigEye=[];
var bigBodyOra=[];
var bigBodyBlue=[];

var data;

var wave;
var hello;

var dust;
var dustPic=[];
window.onload=game;

function game(){
    init();         //初始化
    lastTime=Date.now();
    deltaTime=0;
    gameloop();
}

function init(){
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");                //鱼  特效圆圈 dust 分值统计
    can2=document.getElementById("canvas2");  //绘制背景,海葵，果实
    ctx2=can2.getContext("2d");
    btn=document.getElementById("btn");
    btn.style.display="block";            //javascript载入后再显示

    EventUtil.addHandler(can1,"mousemove",mouseMoveHandler); //鼠标移动获取鼠标位置
    EventUtil.addHandler(btn,"click",mouseClick);  //鼠标点击游戏开始
    canWidth=can1.width;
    canHeight=can1.height;
    bgPic.src="./src/background.jpg";
    ane=new AneObject();
    ane.init();

    fruit=new FruitObject();
    fruit.init();

    monFish=new MonFish();
    monFish.init();

    mousex=canWidth*0.5;
    mousey=canHeight*0.5;

    babyFish=new BabyFish();
    babyFish.init();
        //babyFish
    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="./src/babyTail"+i+".png";
    }

    for(var j=0;j<2;j++){
        babyEye[j]=new Image();
        babyEye[j].src="./src/babyEye"+j+".png";
    }

    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="./src/babyFade"+i+".png";
    }
            //bigFish
    for(var i=0;i<8;i++){
        bigTail[i]=new Image();
        bigTail[i].src="./src/bigTail"+i+".png";
    }
    for(var j=0;j<2;j++){
        bigEye[j]=new Image();
        bigEye[j].src="./src/bigEye"+j+".png";
    }
    for(var i=0;i<8;i++){
        bigBodyOra[i]=new Image();
        bigBodyBlue[i]=new Image();
        bigBodyOra[i].src="./src/bigSwim"+i+".png";
        bigBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
    }

    data=new DataObj();
        //ctx1样式不需要放入循环中
    ctx1.font="20px Verdana";
    ctx1.textAlign="center";//left\center\right

    wave=new WaveObj();
    wave.init();
    hello=new HelloObj();

    dust=new DustObj();
    dust.init();

    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="./src/dust"+i+".png";
    }


}

function gameloop(){
    requestAnimFrame(arguments.callee);
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40){
        deltaTime=40;
    }
    background();

    ane.draw();

    fruit.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);
    monFish.draw();
    collisionCheck();
    monBabyCollisionCheck();
    babyFish.draw();

    data.draw();
    wave.draw();
    hello.draw();
    dust.draw();
}

/*鼠标移动*/
function mouseMoveHandler(){
    event=EventUtil.getEvent(event);
    if((!data.gameOver) && data.gameBegin){
        if(event.offsetX||event.layerX){        //IE和火狐下不一样
            mousex=event.offsetX==undefined ? event.layerX : event.offsetX;
            mousey=event.offsetY==undefined ? event.layerY : event.offsetY;
        }
    }
}

function mouseClick(){
    event=EventUtil.getEvent(event);
    data.gameBegin=true;
    btn.style.display="none";
}