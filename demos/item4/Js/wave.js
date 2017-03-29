/**
 * Created by xcl on 2016/3/17.
 */
/*大鱼吃果实特效*/
function WaveObj(){
    this.x=[];
    this.y=[];
    this.alive=[];
    this.r=[];
}
WaveObj.prototype.num=10;
WaveObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.r[i]=0;
    }
};
WaveObj.prototype.draw=function(){
    ctx1.save();
    ctx1.lineWidth=2;
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
               //draw
            this.r[i]+=deltaTime*0.04;
            if(this.r[i]>40){
                this.r[i]=40;
                this.alive[i]=false;
            }
            var alpha=1-this.r[i]/40;
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
            ctx1.closePath();
            ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
};
WaveObj.prototype.born=function(x,y){
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            this.alive[i]=true;//born
            this.r[i]=10;
            this.x[i]=x;
            this.y[i]=y;
            return;
        }
    }
}