(function($){
	$(document).ready(function(){
		var todoJSON={} //json数据用来存储todo事项
		var first=0;//指定第一次添加todo用来删除todo模板
		var flag1=1;//用来标志在执行单个completed时active数为0还是select-all这两种情况
			//设定初始状态值F5刷新时有缓存
			$("#todo-all-select").attr("checked",false);
			$("#todo-content").val("");
			//给todo-list 下的li以及todo-control添加事件
			//鼠标划过时事件
			$(".todo-items").hover(function(){
				$(this).find("img").css("display","inline-block");
			},function(){
				$(this).find("img").css("display","none");
			})
			//checkbox点击切换完成与未完成事件
			$(".todo-items #todo-select").click(function(){
				if($(this)[0].clickTimes%2==0){
					$(this).next("p").css({"color":"#c4c4c4","text-decoration":"line-through"});
					this.clickTimes++;
					CreateTodo.prototype.totleActive--;
					this.active=false;
					$(".todo-control .active-number").text(CreateTodo.prototype.totleActive);
					//当前处于active状态触发该事件
					$(".todo-control span").each(function(i){    
						if($(this).hasClass("current") && i==1){
								$(this).trigger("click");
						}
					})
				}else{
					$(this).next("p").css({"color":"black","text-decoration":"none"});
					this.clickTimes--;
					CreateTodo.prototype.totleActive++;
					this.active=true;
					$(".todo-control .active-number").text(CreateTodo.prototype.totleActive);
					if(CreateTodo.prototype.totleActive==CreateTodo.prototype.totleNumber){
						$(".todo-control .clear-completed").css("display","none");
					}
					//若当前处于completed状态则触发该事件
					$(".todo-control span").each(function(i){
						if($(this).hasClass("current") && i==2){
							$(this).trigger("click");
						}
					})
				}
				if(CreateTodo.prototype.totleActive==CreateTodo.prototype.totleNumber){
					$(".todo-control .clear-completed").css("display","none");
				}else{
					$(".todo-control .clear-completed").css("display","inline-block");
				}
				//单个check反过来影响select-all事件
				if(CreateTodo.prototype.totleActive==0 && $("#todo-all-select")[0].clickTimes==0){
					$("#todo-all-select").trigger("click");
					$("#todo-all-select")[0].clickTimes=1;
				}
				if(CreateTodo.prototype.totleActive==1 && $("#todo-all-select")[0].clickTimes==1){
					flag1=0;        //用来标志selectall 触发点击事件但不执行操作
					$("#todo-all-select").trigger("click");
					flag1=1;
					$("#todo-all-select")[0].clickTimes=0;
				}
			});
			//删除已经完成的事件
				$(".todo-items img").click(function(){
					//前面未被选中时 active数应该减一
					if($(this).prevAll("input")[0].active==true){
						CreateTodo.prototype.totleActive--;
					}
					$(this).parent().remove();
					CreateTodo.prototype.totleNumber--;
					$(".todo-control .active-number").text(CreateTodo.prototype.totleActive);
					//没有todo后隐藏control DIv再添加模板
					if($(".todo-list li").length==0){
						$(".todo-control").css("display","none");
						$("#todo-all-select").css("display","none");
						location.reload();
					}
				})
			//todo添加的事件
			$("#todo-content").keyup(function(e){
				if(e.keyCode==13 && $(this).val()!=""){
					$(".todo-control").css("display","block")
					var value=$(this).val();
					$(this).val("");
					var newTodo=new CreateTodo(value);
					var newTodoEle=newTodo.create();
					todoJSON["active"]=true;
					todoJSON["value"]=value;
					$(".todo-control .active-number").text(CreateTodo.prototype.totleActive);
					if(first==0){
					//如果添加了至少一个todo就移除model
					$("#todo-all-select").css("display","inline-block");
					model=$(".todo-list li:first").detach();
					first++;
					}
				}
			})
			//todo中全选事件
			$("#todo-all-select")[0].clickTimes=0;
			$("#todo-all-select").click(function(){
				if($("#todo-all-select")[0].clickTimes%2==0){
					$("#todo-all-select")[0].clickTimes++;
					$(".todo-items #todo-select").each(function(i){
							if(this.active==true){
								$(this).trigger("click");
							}
					})
				}else{
					if(flag1==1){
						$("#todo-all-select")[0].clickTimes--;
						$(".todo-items #todo-select").each(function(i){
							$(this).trigger("click");
					})
					$(".todo-control .active-number").text(CreateTodo.prototype.totleActive);
					}
				}
			})
			//todo-list中双击编辑事件
			$(".todo-items").delegate("p","dblclick",function(){
				var value=$(this).text();
				var $p=$(this);
				act=$(this).prevAll("#todo-select")[0].active;
				var $replaceInput=$("<input type='text' class='replace' />");
				$replaceInput.val(value);
				$(this).replaceWith($replaceInput);
				$($replaceInput).focus();
			})
			$(".todo-items").delegate(".replace","blur keyup",function(e){
				var value=$(this).val();
				if(value!="" ){
					if(e.type=="focusout" || (e.type=="keyup" && e.keyCode==13)){
						$p=$("<p></p>").text(value)
						$(this).replaceWith($p);
						if(!act){
							$p.css({"color":"#c4c4c4","text-decoration":"line-through"});
						}
					}
				}
			})


        //todo-control部分事件
        $(".todo-control .all").click(function(){    //all事件
        	$(this).siblings("span").removeClass("current");
        	$(this).addClass("current");
        	$(".todo-items").each(function(i){
        			$(this).css("display","block");
        	})
        })

        $(".todo-control .active").click(function(){   //active事件
        	$(this).siblings("span").removeClass("current");
        	$(this).addClass("current");
        	$(".todo-items").each(function(i){
        		if($(this).find("input")[0].active==false){
        			$(this).css("display","none");
        		}else{
        			$(this).css("display","block");
        		}
        	})
        })
        $(".todo-control .completed").click(function(){
        	$(this).siblings("span").removeClass("current");
        	$(this).addClass("current");
        	$(".todo-items").each(function(i){
        		if($(this).find("input")[0].active==true){
        			$(this).css("display","none");
        		}else{
        			$(this).css("display","block");
        		}
        	})
        })
   		$(".todo-control .clear-completed").click(function(){
   			$(this).css("display","none");
   			$(".todo-items").each(function(i){
   				if($(this).find("input")[0].active==false){
   					$(this).remove();
   				}
   				$(".todo .all").trigger("click");
   			})
			//没有todo后隐藏control DIv再添加模板
			if($(".todo-list li").length==0){
				$(".todo-control").css("display","none");
					$("#todo-all-select").css("display","none");
					location.reload();	
			}
   		})
	//创建一个生成li的对象
	function CreateTodo(value){
		this.value=value;
	}
	CreateTodo.prototype.totleNumber=0;
	CreateTodo.prototype.totleActive=0;
	CreateTodo.prototype.create=function(){
		CreateTodo.prototype.totleNumber++;
		CreateTodo.prototype.totleActive++;
		var $newTodoEle=$(".todo-items:first").clone(true);
			//用来进行checkbox的click切换事件
			$newTodoEle.find("input")[0].clickTimes=0;
			$newTodoEle.find("input")[0].active=true;
			$newTodoEle.find("p").text(this.value);
			$($newTodoEle).css("display","block").appendTo($(".todo-list ul"));
			return $newTodoEle;
		}
	})
})(jQuery);