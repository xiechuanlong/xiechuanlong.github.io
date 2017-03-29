/**
 * Created by xcl on 2016/3/16.
 */
function MonFish(){
     this.x=0;
     this.y=0;
    this.angle=0;
     this.bigBody=new Image();

    this.bigTailTimer=0;
    this.bigTailCount=0;

    this.bigEyeTimer=0;
    this.bigEyeCount=0;
    this.bigEyeInterval=1000;

    this.bigBodyCount=0;
}
MonFish.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=Math.PI;
    this.bigBody.src="./src/bigSwim0.png";

};
MonFish.prototype.draw=function(){
        //lerp x,y 系数越小反应越快
    this.x=lerpDistance(mousex,this.x,0.98);
    this.y=lerpDistance(mousey,this.y,0.98);
        //lerp angle
    var deltax=mousex-this.x;
    var deltay=mousey-this.y;
    var beta=Math.atan2(deltay,deltax)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.8);
        //tail
    this.bigTailTimer+=deltaTime;
    if(this.bigTailTimer>50){
        this.bigTailCount=(this.bigTailCount+1)%8;
        this.bigTailTimer%=50;
    }
       //eye
    this.bigEyeTimer+=deltaTime;
    if(this.bigEyeTimer>this.bigEyeInterval){
        this.bigEyeCount=(this.bigEyeCount+1)%2;
        this.bigEyeTimer%=this.bigEyeInterval;
        if(this.bigEyeCount==0){
            this.bigEyeInterval=Math.random()*1500+1000;
        }else{
            this.bigEyeInterval=200;
        }
    }

    var currentTail=bigTail[this.bigTailCount];
    var currentEye=bigEye[this.bigEyeCount];
    var currentBodyOra=bigBodyOra[this.bigBodyCount];
    var currentBodyBlue=bigBodyBlue[this.bigBodyCount];
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    if(data.blueNum!=0){   //吃到的是蓝色果实就一直是蓝的了
        ctx1.drawImage(currentBodyBlue,-currentBodyBlue.width*0.5,-currentBodyBlue.height*0.5);
    } else{
        ctx1.drawImage(currentBodyOra,-currentBodyOra.width*0.5,-currentBodyOra.height*0.5);
    }
    ctx1.drawImage(currentEye,-currentEye.width*0.5,-currentEye.height*0.5);
    ctx1.drawImage(currentTail,-currentTail.width*0.5+30,-currentTail.height*0.5);
    ctx1.restore();
};