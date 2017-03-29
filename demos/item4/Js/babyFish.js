/**
 * Created by xcl on 2016/3/16.
 */
function BabyFish(){
    this.x=0;
    this.y=0;
    this.angle=0;

    this.babyTailTimer=0;
    this.babyTailCounter=0;

    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyeInterval=1000;

    this.babyBodyTimer=0;
    this.babyBodyCount=0;

    this.grade=1;  //游戏等级，控制小鱼身体变色时间（1:300ms  2:250ms ）
}
BabyFish.prototype.init=function(){
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5;
    this.angle=Math.PI;

};
BabyFish.prototype.draw=function(){
    this.x=lerpDistance(monFish.x,this.x,0.99);
    this.y=lerpDistance(monFish.y,this.y,0.99);

    var deltax=monFish.x-this.x;
    var deltay=monFish.y-this.y;
    var beta=Math.atan2(deltay,deltax)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.9);
    // baby Tail
    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50){
        this.babyTailCounter=(this.babyTailCounter+1)%8;
        this.babyTailTimer%=50;
    }

    //baby Eye
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        this.babyEyeTimer%=this.babyEyeInterval;
        if(this.babyEyeCount==0){
            this.babyEyeInterval=Math.random()*1500+1000;
        }else{
            this.babyEyeInterval=200;
        }
    }

    //baby Body
    var gradeRelateTime=300-(this.grade-1)*40;
    this.babyBodyTimer+=deltaTime;
    if((this.babyBodyTimer>gradeRelateTime) && data.gameBegin){
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=gradeRelateTime;
        if(this.babyBodyCount>19){
            this.babyBodyCount=19;
            data.gameOver=true; //game over;
        }
    }
    var currentTail=babyTail[this.babyTailCounter];
    var currentEye=babyEye[this.babyEyeCount];
    var currentBody=babyBody[this.babyBodyCount];
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(currentBody,-currentBody.width*0.5,-currentBody.height*0.5);
    ctx1.drawImage(currentEye,-currentEye.width*0.5,-currentEye.height*0.5);
    ctx1.drawImage(currentTail,-currentTail.width*0.5+23,-currentTail.height*0.5);
    ctx1.restore();
};