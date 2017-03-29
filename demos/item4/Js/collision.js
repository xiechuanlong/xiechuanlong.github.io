/**
 * Created by xcl on 2016/3/16.
 */
/*判断大鱼和果实的碰撞*/
function collisionCheck(){
    if((!data.gameOver) && data.gameBegin){
        for(var i=0;i<fruit.num;i++){
            if(fruit.active[i]){
                var length=calLength2(monFish.x,monFish.y,fruit.x[i],fruit.y[i]);
                if(length<600){
                    fruit.death(i);
                    data.fruitNum++;
                    monFish.bigBodyCount++;
                    if(monFish.bigBodyCount>7){
                        monFish.bigBodyCount=7;
                    }
                    if(fruit.fruitType[i]=="blue"){    //吃的是蓝色果实
                        data.double=2;
                        data.blueNum++;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}
/*判断大鱼和小鱼的碰撞*/
function monBabyCollisionCheck(){
    var length=calLength2(monFish.x,monFish.y,babyFish.x,babyFish.y);
    if((!data.gameOver) && data.gameBegin){
        if((length<900)&&data.fruitNum){
            //小鱼恢复体力
            babyFish.babyBodyCount=0;
            data.addScore();//计算分值
            monFish.bigBodyCount=0;
            hello.born(babyFish.x,babyFish.y);
        }
    }
}