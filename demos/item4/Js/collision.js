/**
 * Created by xcl on 2016/3/16.
 */
/*�жϴ���͹�ʵ����ײ*/
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
                    if(fruit.fruitType[i]=="blue"){    //�Ե�����ɫ��ʵ
                        data.double=2;
                        data.blueNum++;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}
/*�жϴ����С�����ײ*/
function monBabyCollisionCheck(){
    var length=calLength2(monFish.x,monFish.y,babyFish.x,babyFish.y);
    if((!data.gameOver) && data.gameBegin){
        if((length<900)&&data.fruitNum){
            //С��ָ�����
            babyFish.babyBodyCount=0;
            data.addScore();//�����ֵ
            monFish.bigBodyCount=0;
            hello.born(babyFish.x,babyFish.y);
        }
    }
}