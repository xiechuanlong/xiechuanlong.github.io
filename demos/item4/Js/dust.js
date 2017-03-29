/**
 * Created by xcl on 2016/3/17.
 */
/*漂浮物*/
function DustObj(){
    this.x=[];
    this.y=[];
    this.amp=[];
    this.noPic=[];
    this.alpah=0;
}
DustObj.prototype.num=30;
DustObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.x[i]=Math.random()*canWidth;
        this.y[i]=Math.random()*canHeight;
        this.amp[i]=20+Math.random()*15;
        this.noPic[i]=Math.floor(Math.random()*7);
    }
    this.alpah=0;
};
DustObj.prototype.draw=function(){
    this.alpah+=deltaTime*0.0007;
    var l=Math.sin(this.alpah);
    for(var i=0;i<this.num;i++){
        var no=this.noPic[i];
      ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);//为什么画不出来(alpah 写成了alpha)
    }
};