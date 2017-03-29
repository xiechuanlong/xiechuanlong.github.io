/**
 * Created by xcl on 2016/3/15.
 */
/*创建对象，包含数组比创建一个对象数组方便多了
* 1.先画静止的海葵
* 2.让海葵动起来
* */
function AneObject(){
            //root control header (sin函数)
    this.rootx=[];
    this.headx=[];
    this.heady=[];
    this.amp=[];  //振幅
    this.alpah=0;
}
AneObject.prototype.num=50;
AneObject.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.rootx[i]=16*i+Math.random()*15;
        this.headx[i]= this.rootx[i];
        this.heady[i]=canHeight-200-Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }
};
AneObject.prototype.draw=function(){
    this.alpah+=deltaTime*0.0007;
    var l=Math.sin(this.alpah);

    ctx2.save();
    ctx2.globalAlpha=0.6;              //设置透明度
    ctx2.strokeStyle="#3b154e";
    ctx2.lineCap="round";
    ctx2.lineWidth=15;
    for(var i=0;i<this.num;i++){
        this.headx[i]=this.rootx[i]+l*this.amp[i];
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-160,this.headx[i],this.heady[i]);    //贝塞尔曲线
        ctx2.stroke();
    }
    ctx2.restore();
};
