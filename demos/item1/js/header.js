/**
 * Created by xcl on 2016/4/17.
 */
$(document).ready(function(){
    $(".search_text").bind("focus",function(){
        $(".tishi").hide();
    }).bind("blur",function(){
        $(".tishi").show();
    });

    //图片滚动
    var picScall,index=1;
    var li_width;
    $(".pic_big").hover(function(){
        clearInterval(picScoll);
    },function(){
        picScoll=setInterval(function(){
            if(index=="5") {index=0;}
            showPic(index);
            index++;
        },3000);
    }).trigger("mouseleave");
    $(".pic_small li").each(function(i,lists){
        this.index=i;
        $(this).bind("click",function(){
            showPic(this.index);
            index=this.index+1;
        })
    })

    //中间右部分list上下滚动
    var listScoll;
    $(".body1_right_mid ul").hover(function(){
        clearInterval(listScoll);
    },function(){
        listScoll=setInterval(function(){
             $(".body1_right_mid ul li").last().css({"height":0,"opacity":0})
                                                .prependTo($(".body1_right_mid ul"));
            $(".body1_right_mid ul li").first().animate({"height":$(".body1_right_mid ul li").last().height()},2000,function(){
                $(this).animate({"opacity":1},1000);
            });
        },4000);
    }).trigger("mouseleave");

    //活动部分动画
    var actIndex=1;
    $(".active").hover(function(){
        clearInterval(activePic);
    },function(){
        activePic=setInterval(function(){
            if(actIndex==3) {actIndex=0;}
            showActPic(actIndex);
            actIndex++;
        },3000);
    }).trigger("mouseleave");
    $(".active p span").each(function(i,lists){
        this.index=i;
        $(this).click(function(){
            showActPic(this.index);
            actIndex=this.index+1;
        });
    });
});
function showPic(index){
    var li_width=$(".pic_big li").eq(0).width();
    $(".pic_big").animate({left:-index*li_width},500);
    $(".pic_small li").removeClass("on").eq(index).addClass(("on"));
}
function showActPic(index){
    $(".active img").animate({"opacity":0},500,function(){
        $(".active img").eq(index).animate({"opacity":1},300);
    });
    $(".active p span").removeClass("activeList")
                       .eq(index).addClass("activeList");
}