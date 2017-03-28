var index={
	init:function(){
		this._clock();
	},
	_clock:function(){//clock相关
		var self=this;
		var eWeek=["one","two","three","four","five","six","seven"];//与getDay()得到的数字相对应，并运用与改变img的src.
		var timer=null;
		var oImages=[];
	    var oImg=$("#clock img");
	    for(i=0;i<oImg.length;i++){
	        if(!isNaN(parseInt(oImg[i].alt))){
	            oImages.push(oImg[i]);
	        }
	    }
	    oImages.push(oImg[oImg.length-1]);
	    timer=setInterval(showTime,1000);//每秒钟显示时间(setInterval调动里面的this始终指向window)
	    showTime();     //是刷新时不用等待1s再显示
	    /* 返回一个数组形式的时间*/
		function getTimeArray(){
	        var aChar=[];
	        var aNumber=[];
	        var date=new Date();
	        var year=date.getFullYear();
	        var month=date.getMonth();
	        var day=date.getDate();
	        var hour=date.getHours();
	        var minute=date.getMinutes();
	        var second=date.getSeconds();
	        var week=date.getDay();
	        if(week==0){
	            week=7;
	        }
	        var str=""+year+this._toDouble(month+1)+day+this._toDouble(hour)+this._toDouble(minute)+this._toDouble(second)+week;
	        aChar=str.split("");
	        for(var i=0;i<aChar.length;i++){
	            aNumber[i]=parseInt(aChar[i]);
	        }
	        return aNumber;
	    }
	    /*时间更新并显示*/
	    function showTime(){
	        var clockNumberArray= getTimeArray.apply(index);
	        for(i=0;i<oImages.length;i++) {
	            if(i<oImages.length-1){
	                oImages[i].src = "images/" +clockNumberArray[i] + ".png";
	            }
	            else{
	                oImages[i].src="images/"+eWeek[clockNumberArray[i]-1]+".png";
	            }

	        }
	    }
	},
    _toDouble:function(a) {//将小于10的数字转换成0a的形式的字符串
        if (a < 10) {
            return "0" + a;
        }
        else {
            return "" + a;
        }
    }
}

var clock={
	
}



$(function(){
	index.init();
})