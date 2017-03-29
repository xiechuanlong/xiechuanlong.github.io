/**
 * Created by xcl on 2016/3/15.
 */
/*建立果实对象并绘制*/
function FruitObject(){
    this.active=[];
    this.x=[];
    this.y=[];
    this.anyNum=[];  //长在哪个海葵
    this.len=[];    //每个果实长度
    this.speed=[];
    this.fruitType=[];
    this.blue=new Image();
    this.orange=new Image();
}
FruitObject.prototype.num=30;
FruitObject.prototype.init=function(){
    for(var i=0;i<this.num;i++){
       this.active[i]=true;
        this.x[i]=0;
        this.y[i]=0;
        this.anyNum[i]=0;
        this.fruitType[i]="";
        this.speed[i]=Math.random()*0.15+0.03;//[0.03,0.18]
    }
    this.blue.src="./src/blue.png";
    this.orange.src="./src/fruit.png";
};
FruitObject.prototype.draw=function(){
    fruitMoniter();                         //在画每一帧之前监控池中只有15个果实
    for(var i=0;i<this.num;i++){
        if(this.fruitType[i]=="blue"){
            var pic=this.blue;
        }else{
            pic=this.orange;
        }
        if(this.active[i]){
            if(this.len[i]<15){   //生长
                var nob=this.anyNum[i];
                this.x[i]=ane.headx[nob];
                this.y[i]=ane.heady[nob];
                this.len[i]+=0.01*deltaTime;
            }else{
                this.y[i]-=this.speed[i]*deltaTime;
            }
            ctx2.drawImage(pic,this.x[i]-this.len[i]*0.5,this.y[i]-this.len[i]*0.5-this.speed[i],this.len[i],this.len[i]);
            if(this.y[i]<10){
                this.active[i]=false;
            }
        }

    }
};
FruitObject.prototype.born=function(i){
        this.anyNum[i]=Math.floor(Math.random()*ane.num);
        this.x[i]=ane.headx[ this.anyNum[i]];
        this.y[i]=ane.heady[ this.anyNum[i]];
        this.len[i]=0;
        this.active[i]=true;
        if(Math.random()<0.2){
            this.fruitType[i]="blue";
        }else{
            this.fruitType[i]="orange";
        }

};
FruitObject.prototype.death=function(i){
    this.active[i]=false;
};
function fruitMoniter(){
    var num=0;
    for(var i=0;i<fruit.num;i++) {
        if (fruit.active[i]) {
            num++;
        }
    }
    if(num<18){     //池中有18个果实
        sendFruit(); //Send fruit
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.active[i]){
            fruit.born(i);
            return;
        }
    }
}