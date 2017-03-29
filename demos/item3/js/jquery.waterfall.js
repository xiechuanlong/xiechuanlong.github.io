(function($){
	$.fn.extend({
		//实现瀑布流
		"waterfall":function(options){
			options = $.extend({
				"flowNum": 4,      //列数
				"flowWidth": 230, //每列宽度（像素值）
				"defRowNum": 2,   //页面打开时默认显示的行数
				"imgArr": []      //图片信息数组
			}, options);
			var flowNum = options.flowNum;
			var flowWidth = options.flowWidth;
			var defRowNum = options.defRowNum;
			var imgArr = options.imgArr;
			//获取图片数组信息
			var imgIndex = 0; //图片数组当前索引
			var imgCount = imgArr.length; //图片数组总数
			//缓存常用对象
			var $document = $(document);
			var $window = $(window);
			var $wrapDiv = this;
			//创建列
			var $flowDiv = $(createFlow());
			//将flowDiv放入父容器
			$wrapDiv.html($flowDiv);
			//自动撑大以显示滚动条
			$wrapDiv.css("min-height",$window.height());
			//页面打开时默认显示的内容
			autoFill();
			//滚动条事件
			$window.scroll(function(){
				if(isScrollBottom()){
					shortFill(); //最短列填充1张图片
					$wrapDiv.css("min-height",($wrapDiv.height()+20)+"px");//自动撑大滚动条
				}
			});
			//根据列数创建元素
			function createFlow(){
				var str = '<div class="water-flow" style="width: '+flowWidth+'px"></div>';
				return new Array(flowNum+1).join(str);
			}
			//创建图片元素
			function createImage(src){
				return '<div class="water-each"><img src="'+src+'" /></div>';
			}
			//自动填充
			function autoFill(){
				//遍历图片数组
				for(var i=0;i<defRowNum;i++){
					rowFill();
				}
			}
			//填充一行
			function rowFill(){
				for(var i=0;i<flowNum;i++){
					if(imgIndex < imgCount){
						var $imgDiv = $(createImage(imgArr[imgIndex++]));
						$flowDiv.eq(i).append($imgDiv);	
						$imgDiv.fadeIn(500); //以淡入效果显示
					}
				}
			}
			//为最小高度的一列增加一张图片
			function shortFill(){
				if(imgIndex < imgCount){
					var $imgDiv = $(createImage(imgArr[imgIndex++]));
					getShortFlow().append($imgDiv);
					$imgDiv.fadeIn(1000); //以淡入效果显示
				}
			}
			//获取最短的一列
			function getShortFlow(){
				var $flowMin = $flowDiv.eq(0);
				$flowDiv.each(function(){
					if($(this).height() < $flowMin.height()){
						$flowMin = $(this);
					}
				});
				return $flowMin;
			}
			//判断滚动条是否滚动到底部
			function isScrollBottom(){
				return ($document.scrollTop()+250) >= ($document.height()-$window.height());
			}
		}
	});
})(jQuery);
