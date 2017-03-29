/**
 * Created by xcl on 2016/3/16.
 */
/*¼ÆËã·ÖÖµ*/
function DataObj(){
    this.fruitNum=0;
    this.score=0;
    this.blueNum=0;
    this.gameOver=false;
    this.gameBegin=false;
    this.alpha=0;
}
DataObj.prototype.addScore=function(){
    this.score+=100*this.fruitNum+100*this.blueNum;
    if(this.score<4000){
        babyFish.grade=1;
    }else if(8000>this.score && (this.score>=4000)                              ){
        babyFish.grade=2;
    }else if(10000>this.score && this.score>=8000){
        babyFish.grade=3;
    }else if(12000>this.score && this.score>=10000){
        babyFish.grade=4;
    }else if(14000>this.score && this.score>=12000){
        babyFish.grade=5;
    }else{
        babyFish.grade=6;
    }
    this.fruitNum=0;
    data.blueNum=0;
};
DataObj.prototype.draw=function(){
    var w=canWidth;
    var h=canHeight;

    ctx1.save();
    ctx1.fillStyle="white";
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    ctx1.fillText("blueNum: "+this.blueNum,w*0.5,h-80);
    ctx1.fillText("oraNum: "+(this.fruitNum-this.blueNum),w*0.5,h-50);
    ctx1.fillText("Score: "+this.score,80,50);
    ctx1.fillText("Grade: "+babyFish.grade,80,100);
    if(data.gameOver){
        this.alpha+=deltaTime*0.0005;
        if(this.alpha>1) this.alpha=1;
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("GAME OVER ",w*0.5,h*0.5);
    }
    ctx1.restore();
    ctx1.save();
    ctx1.fillStyle="white";
    ctx1.font="18px Verdana";
    if(!data.gameOver && (babyFish.babyBodyCount>15))
    {
        ctx1.fillText("Mom,help!",babyFish.x,babyFish.y-30);
    }
    ctx1.restore();
};