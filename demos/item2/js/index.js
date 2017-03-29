/**
 * Created by xcl on 2016/5/3.
 */
(function($){
    $(document).ready(function(){
        var aliInformation= $(".relative_title").find("span").text();
        var imgFlag=false;
        $(".relative_title").click(function(e){
            var imgSrc;
            var text=$(".detail1 p").eq(0).text();
            var $span=$(this).find("span");
            $span.text()==text?$span.text(aliInformation):$span.text(text);
            imgFlag?imgSrc="images/btn1.jpg":imgSrc="images/btn2.jpg";
            imgFlag=!imgFlag;
            $(this).find("img").attr("src",imgSrc);
            $(".detail1").toggle();
            e.stopPropagation();
        });
        $(".language_title").click(function(e){
            var imgSrc;
            imgFlag?imgSrc="images/btn3.jpg":imgSrc="images/btn2.jpg";
            imgFlag=!imgFlag;
            $(this).find("img").attr("src",imgSrc);
            $(".detail2").toggle();
            e.stopPropagation();
        });
        //nav_detail 样式
        var detailFlag=false;
        $(".nav span").each(function(index,navEle){
            $(this).hover(function(){
                $(".nav_detail").css("display","none").eq(index).css("display","block");
            });
            $(this).click(function(e){
                if(!detailFlag){
                    $(".allnav_detail").animate({height:170},1000);
                    detailFlag=true;
                }else{
                    $(".allnav_detail").animate({height:0},1000);
                    detailFlag=false;
                }
                e.stopPropagation();
            });

        });

        /*body点击事件*/
        $("body").click(function(){
            if(detailFlag){
                $(".nav span").eq(0).trigger("click");
            }
            if($(".detail1").css("display")=="block"){
                $(".relative_title").trigger("click");
            }
            if($(".detail2").css("display")=="block"){
                $(".language_title").trigger("click");
            }
        })
    });
})(jQuery);