var app=app||{};

//头部组件

app.Header=React.createClass({
	handlerKeyUp:function(event){
		event=event||window.event;
		if(event.keyCode === 13){
			var title=event.target.value;
			if(!title){
				return false;
			}
			event.target.value="";
			this.props.addTodo(title);
		} 
	},

	handlerEdit:function(event){
		if(event.keyCode === 13){
			var title=event.target.value;
			if(!title){
				return false;
			}
			this.props.addTodo(title);
		} 
	},

	render:function(){
		return (
			<input className="add-new-todo" type="text" placeholder="what need to do ?" onKeyUp={this.handlerKeyUp} autofocus />
		)
	}
});

//Main部分组件
var Item=React.createClass({
	getInitialState:function(){
		return {
			editTitle:this.props.todoItem.title
		}
	},

	//删除一个todo的事件函数
	handlerDelItem:function(event){
		this.props.delTodoItem(this.props.index);
	},

	//鼠标移入的数据函数
	handlerMouseOver:function(){
		if(this.refs.deleButton){
			ReactDOM.findDOMNode(this.refs.deleButton).style.display="inline-block";	
		}
	},

	//鼠标移除时的事件函数
	handlerMouseOut:function(){
		if(this.refs.deleButton){
			ReactDOM.findDOMNode(this.refs.deleButton).style.display="none";	
		}
	},

	//点击切换完成与未完成状态
	handlerToggle:function(){
		let isCompleted=!this.props.todoItem.isCompleted;
		this.props.itemCompleteToggle(this.props.index,isCompleted);
	},

	//双击编辑
	itemEdit:function(){
		if(this.refs.deleButton){
			ReactDOM.findDOMNode(this.refs.deleButton).style.display="none";	
		}
		this.props.itemEdit(this.props.index);
	},

	//编辑完成
	itemEditCompleted:function(event){
		var title=event.target.value;
		if(event.keyCode === 13 || event.type=="blur"){
			if(!title){
				return false;
			}
			this.props.itemEditCompleted(this.props.index,title);
		}else{
			this.setState({editTitle:title});
		}
	},

	blurEditCompleted:function(event){
		this.itemEditCompleted(event);
	},

	render:function(){
		let ele;
		let styleObj=this.props.todoItem.isCompleted?{color:"gray",textDecoration:"line-through"}:{};
		if(this.props.todoItem.isEdit){
			ele=<input className="editItem"  defaultValue={this.state.editTitle}  onKeyUp={this.itemEditCompleted} onBlur={this.blurEditCompleted} autofocus />
		}else{
					
				ele=<p onDoubleClick={this.itemEdit} style={styleObj}> {this.props.todoItem.title}	<button ref="deleButton"  onMouse className="del" onClick={this.handlerDelItem}>删除</button></p>
			 
		}
		return (
				<li className="item"
					onMouseOver={this.handlerMouseOver}
					onMouseOut={this.handlerMouseOut}
				>
					<input className="item-toggle" type='checkbox' checked={this.props.todoItem.isCompleted} onChange={this.handlerToggle}/>
					{ele}
				</li>
			)
	}
});

app.Main=React.createClass({
	render:function(){
		return (
			<div>
				<ol className="todo-items">
					{this.props.todos.map((item,index)=>{
						return <Item delTodoItem={this.props.delTodoItem}  todoItem={item} key={index} index={index} itemCompleteToggle={this.props.itemCompleteToggle} itemEdit={this.props.itemEdit} itemEditCompleted={this.props.itemEditCompleted}/>
					})}
				</ol>
			</div>
		)
	}
})

//Footer部分组件
app.Footer=React.createClass({
	handlerToggleAll:function(){
		this.props.itemsToggleAll(this.props.isAllCompleted);
	},
	handlerDelAllCompleted:function(){
		this.props.delAllCompleted();
	},
	render:function(){
		return (
				<div className="footer">
					<p>
						<input type="checkbox" checked={this.props.isAllCompleted} onChange={this.handlerToggleAll}/>
						<span>{this.props.isCompletedCount}个已经完成/{this.props.totleCount} 总数</span>
						<button className="clearAll" onClick={this.handlerDelAllCompleted}>删除已完成</button>
					</p>
				</div>
			)
	}
})



//整个Todo-App组件
app.App=React.createClass({

	getInitialState:function(){
		//运用bendilocalStorage模拟存储数据
		this.db = new LocalDb('React-Todos');
		return {
			todos:this.db.get("todos") || [],
			isAllCompleted:false,
		}
	},

	//添加一个todo时的数据变化
	addTodo:function(newTodoTitle){
		var o={};
		o.title=newTodoTitle;
		o.isCompleted=false;
		o.isEdit=false;
		this.state.todos.push(o);
		this.setState({todos:this.state.todos});
	},

	//删除一个todo时的数据变化
	delTodoItem:function(index){
		this.state.todos.splice(index,1);
		this.setState({todos:this.state.todos})
	},

	//toggle一个item时完成状态数据变化
	itemCompleteToggle:function(index,isCompleted){
		this.state.todos[index].isCompleted=isCompleted;
		this.state.todos[index].isEdit=false;
		this.setState({todos:this.state.todos});
	},

	//双击item编辑事件
	itemEdit:function(index){
		this.state.todos[index].isEdit = true;
		this.setState({todos:this.state.todos})
	},

	//编辑完成
	itemEditCompleted:function(index,value){
		this.state.todos[index].title=value;
		this.state.todos[index].isEdit=false;
		this.setState({todos:this.state.todos})
	},

	//togglleAll改变整个完成状态的事件
	itemsToggleAll:function(isAllCompleted){
		let itemsState=this.state.todos.map((item)=>{
			item.isCompleted=!isAllCompleted;
			return item;
		});
		this.setState({todos:itemsState});
	},

	//删除所有已完成item的事件
	delAllCompleted:function(){
		this.setState({todos:this.state.todos.filter((item)=>{
			return item.isCompleted === false;
		})})
	},
	shouldComponentUpdate:function(){
	// 	this.headerEvent={
	// 		addTodo=addTodo
	// 	};
	// 	this.mainEvent={
	// 		delTodoItem:delTodoItem,
	// 		itemCompleteToggle:itemCompleteToggle,
	// 		itemEdit:itemEdit,
	// 		itemEditCompleted:itemEditCompleted,
	// 	};
	// 	this.footerEvent={
	// 		itemsToggleAll:itemsToggleAll,
	// 		delAllCompleted:delAllCompleted
	// 	}

	//同步数据库数据
		this.db.set("todos",this.state.todos);
		return true;
	},
	render:function(){
		let isCompletedCount = this.state.todos && (this.state.todos.filter((todo)=>todo.isCompleted)).length || 0;
		let totleCount=this.state.todos.length || 0;
		if(totleCount && ( isCompletedCount === totleCount )){
			this.state.isAllCompleted = true;
		}else{
			this.state.isAllCompleted=false;
		}
		this.db.set("isAllCompleted",this.state.isAllCompleted);
		return (
				<div>
					<h1>React TODO </h1>
					<div id="app">
						<app.Header addTodo={this.addTodo}/>
						<app.Main  todos={this.state.todos} delTodoItem={this.delTodoItem} itemCompleteToggle={this.itemCompleteToggle} itemEdit={this.itemEdit} itemEditCompleted={this.itemEditCompleted}/>
						<app.Footer delAllCompleted={this.delAllCompleted} itemsToggleAll={this.itemsToggleAll} isCompletedCount={isCompletedCount} totleCount={totleCount} isAllCompleted={this.state.isAllCompleted}/>
					</div>
				</div>
			)
	}
})
ReactDOM.render(<app.App />,document.getElementById("todo-app"));


