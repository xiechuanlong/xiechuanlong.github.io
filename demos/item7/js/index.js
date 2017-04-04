//定义整个数据模型
var TodoModel=Backbone.Model.extend({
	initialize:function(){
	},
	defaults:{
		completedAll:false,
		totle:0,    //todo-add中的数据
		list:[],    //todo-list中的数据
		completedItem:0,   //todo-footer中的数据
		remainItem:0,
		state:0             //0表示All 1表示active 2表示completed
	}
})
//todo-add视图
var TodoAddView=Backbone.View.extend({
	initialize:function(){
		this.listenTo(todoModel,"change:completedAll",this.render);//总数发生改变时重新渲染
		this.listenTo(todoModel,"change:totle",this.render);//总数发生改变时重新渲染
	},
	events:{
		"keyup #new-todo":"addList",
		"click #toggle-all":"toggleAll"
	},
	template:_.template($("#todo-add-template").html()),
	render:function(){
		var data={};
		if(this.model){
			data=this.model.toJSON();
		}
		this.$el.html(this.template(data));
	},
	addList:function(e){
		var value=this.$el.find("#new-todo").val();
		if(e.keyCode==13 && value!=""){
			this.$el.find("#new-todo").val("");
			newList={title:value,completed:false,edit:false};
			listArray=this.model.get("list").slice(0);
			listArray.push(newList);
			this.model.set({list:listArray});    //只有set改变属性时才会触发change事件                                                 //this.model.get("list").push(newList)不会触发change事件
			var totle=this.model.get("totle")+1; //总数加一
			this.model.set({totle:totle});
			var remainItem=this.model.get("remainItem")+1;
			this.model.set({remainItem:remainItem});//添加一个后completedAll为false
			this.model.set({completedAll:false});
		}
	},
	toggleAll:function(e){
		if($(e.target)[0].checked){
			this.model.set({completedAll:true});
			for(var i=0;i<$(".todo-item").length;i++){
				if($(".todo-item .toggle").eq(i)[0].checked==false){
					$(".todo-item .toggle").eq(i).trigger("click");
				}
			}
		}
		if($(e.target)[0].checked==false && this.model.get("remainItem")==0){
			for(var i=0;i<$(".todo-item").length;i++){				
				$(".todo-item .toggle").eq(i).trigger("click");
			}
		}
	}
})
//创建todo-List视图
var TodoListView=Backbone.View.extend({
	initialize:function(){
		this.listenTo(todoModel,"change:list",this.render);//监听list改变即添加或删除todo条目时重新渲染todo-add
	},
	template:_.template($("#todo-item-template").html()),
	events:{
		"dblclick .todo-item p":"editTodo",
		"mouseenter .todo-item":"appear",
		"mouseleave .todo-item":"disappear",
		"keyup .todo-item .edit":"editCompleted",
		"bulr .todo-item .edit":"editCompleted",
		"click .todo-item .destory":"destory",
		"click .todo-item .toggle":"toggleItem"
	},
	render:function(){ 
		var data={};
		if(this.model){
			data=this.model.toJSON();
		}
		this.$el.html(this.template(data));
		return this.$el;
	},
	editTodo:function(e){
		var index=this.$el.find("p").index($(e.target));
		var listArray=[];
		listArray=$.extend(true,listArray,this.model.get("list")); //深拷贝需要对数组进行
		listArray[index].edit=true;
		this.model.set({list:listArray});
	},
	appear:function(e){
		var index=this.$el.find(".todo-item").index($(e.target));
		this.$el.find("img").eq(index).css("display","inline-block");

	},
	disappear:function(e){
		var index=this.$el.find(".todo-item").index($(e.target));
		this.$el.find("img").eq(index).css("display","none");

	},
	editCompleted:function(e){
		if(e.type=="focusout" || (e.keyCode==13 && value!="")){ //keyup事件
			var value=$(e.target).val();
			var listArray=[];
			listArray=$.extend(true,listArray,this.model.get("list"));
			var index=$(".todo-item").index($(e.target).parent());
			listArray[index].edit=false;
			listArray[index].title=value;
			this.model.set({list:listArray});                                                
		}
	},
	destory:function(e){
		var index=$(".todo-item").find("img").index(e.target);
		var listArray=[];
			listArray=$.extend(true,listArray,this.model.get("list"));
		if($(".todo-item .toggle").eq(index)[0].checked==false){  //若未进行完成选中则先触发选中
			$(".todo-item .toggle").eq(index).trigger("click");
			}
			listArray.splice(index,1);
			this.model.set({list:listArray}); 
		var totle=this.model.get("totle")-1;
		var completedItem=this.model.get("completedItem")-1;  //删除时彻底减一
			this.model.set({totle:totle});
			this.model.set({completedItem:completedItem});
	},
	toggleItem:function(e){     //全选与单选之间切换怎样的逻辑关系呢
		var index=$(".todo-item").find(".toggle").index(e.target);
		  var listArray=[];
		  var listArray=$.extend(true,listArray,this.model.get("list"));
		  	 listArray[index].completed=!listArray[index].completed;
		 	 this.model.set({list:listArray});
		 	 if(!$(e.target)[0].checked){     //选中变为未选中
			 	 var remainItem=this.model.get("remainItem")+1;
				 var completedItem=this.model.get("completedItem")-1;
			 	 this.model.set({remainItem:remainItem});
			 	 this.model.set({completedItem:completedItem});
			 	 if(remainItem!=0){
			 	 	this.model.set({completedAll:false});
			 	 }
			 	
		 	 }else{                              //未选中变为选中
		 	 	 var remainItem=this.model.get("remainItem")-1;
				 var completedItem=this.model.get("completedItem")+1;
				 if(remainItem==0){
				 	this.model.set({completedAll:true});
				 }
			 	 this.model.set({remainItem:remainItem});
			 	 this.model.set({completedItem:completedItem});
		 	 }
		 var state=this.model.get("state");
		 if(state==0){
		 	$(".footer .all").trigger("click");
		 }else if(state==1){
		 	$(".footer .active").trigger("click");
		 }else{
		 	$(".footer .completed").trigger("click");
		 }
	 }
})

//创建todo-footer视图
var TodoFooterView=Backbone.View.extend({
	initialize:function(){
		this.listenTo(todoModel,"change:remainItem",this.render);//监听总的为完成条目变化时重新渲染add-footer部分
		this.listenTo(todoModel,"change:completedItem",this.render);//监听总的为条目变化时重完成已经新渲染add-footer部分
		this.listenTo(todoModel,"change:totle",this.render);
	},
	events:{
		"click .footer .clear-completed":"clearCompleted",
		"click .footer .all":"displayAll",
		"click .footer .active":"displayActive",
		"click .footer .completed":"displayCompleted"
	},
	template:_.template($("#footer-template").html()),
	render:function(){
		var data={};
		if(this.model){
			data=this.model.toJSON();
		}
		this.$el.html(this.template(data));
	},
	displayActive:function(){
		var listArray=this.model.get("list");
		for(var i=0;i<listArray.length;i++){
			if(listArray[i].completed==true){
				$(".todo-item").eq(i).css("display","none");
			}else{
				$(".todo-item").eq(i).css("display","inline-block");
			}
		}
		$(".footer span").removeClass("current");
		$(".footer .active").addClass("current");
		this.model.set({state:1});
	},
	displayAll:function(){
		var listArray=this.model.get("list");
		for(var i=0;i<listArray.length;i++){
				$(".todo-item").eq(i).css("display","inline-block");
			}
		$(".footer span").removeClass("current");
		$(".footer .all").addClass("current");
		this.model.set({state:0});
	},
	displayCompleted:function(){
		var listArray=this.model.get("list");
		for(var i=0;i<listArray.length;i++){
			if(listArray[i].completed==false){
				$(".todo-item").eq(i).css("display","none");
			}else{
				$(".todo-item").eq(i).css("display","inline-block");
			}
		}
		$(".footer span").removeClass("current");
		$(".footer .completed").addClass("current");
		this.model.set({state:2});
	},
	clearCompleted:function(e){
		var listArray=[];
		var listArray=$.extend(true,listArray,this.model.get("list"));
		// $(".todo-item .toggle").filter(":checked").nextAll("img").each(function(i){ //为什么这样不行呢？
		// 	$(this).trigger("click");       
		// })
		// for(var i=0;i<listArray.length;i++){
		// 	if(listArray[i].completed==true){
		// 		console.log($(".todo-item img").eq(i))
		// 		$(".todo-item img").eq(i).trigger("click");
		// 	}
		// }
	},
})
//渲染页面  app入口
var todoModel=new TodoModel();
var todoAddView=new TodoAddView({el:$("#todo-add"),model:todoModel});
var todoListView=new TodoListView({el:$("#todo-list"),model:todoModel});
var todoFooterView=new TodoFooterView({el:$("#todo-footer"),model:todoModel});
todoAddView.render();
todoListView.render();
todoFooterView.render();