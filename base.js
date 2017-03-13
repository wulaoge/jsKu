//为每个操作都创建一个新的实例对象
var $=function(args){
	return new Base(args);
}
// 基础Base对象
function Base(args){
	this.elements=[];//存放返回元素的数组
	//id获取
	this.getId=function(id){
		this.elements.push(document.getElementById(id)) ;
		return this;//返回当前对象,实现连缀功能
	};
	this.getTagName=function(tag){
		var tags=document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			this.elements.push(tags[i]);
		}
		return this;
	};
	//className 获取
	this.getClassName=function(ClassName){
		var all=document.getElementsByTagName('*');//获取全部元素节点
		for(var i=0;i<all.length;i++){
			if(all[i].className==ClassName)
				{
					this.elements.push(all[i]);
				}
		}
		return this;
	}
	//某一个元素
	this.getElement=function(num){
		var element=this.elements[num];
		this.elements=[];
		this.elements[0]=element;
		return this;
	}
	//类CSS选择器的$()
	if(typeof args=='string'){
		switch(args.charAt(0)){
			case '#':
				this.getId(args.substring(1));
			break;
			case '.':
				this.getClassName(args.substring(1));
			break;
			default:
				this.getTagName(args);
		}

	}else if(typeof args=='object'){
		if(args!=undefined){
			this.elements.push(args);
		}
	}

}
//继承Base对象原型，并添加方法
//css方法
Base.prototype.css=function(attr,value) {
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length==1){
			if(typeof window.getComputedStyle!="undefined"){//w3c
				return window.getComputedStyle(this.elements[i],null)[attr];
			}
		}else if(typeof this.elements[i].currentStyle!='undefined'){//IE兼容
			return this.elements[i].currentStyle[attr];
		}

		this.elements[i].style[attr]=value;
	}
	return this;
};
//html方法
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}//获取HTML值
		this.elements[i].innerHTML=str;//设置HTML值
	}
	return this;
}
//click方法
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].onclick=fn;
	}
	return this;
}	
//addClass方法
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].className+=className;
	}
	return this;
}
//removeClass方法
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i]==className){
			this.elements[i].className=" ";
		}
	}
}
//hover方法
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].mouseover=over;
		this.elements[i].mouseout=out;
	}
	return this;
}
//show
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
}
//hide
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
}
//元素居中
Base.prototype.center=function(){
	for(var i=0;i<this.elements.length;i++){
		var eWidth=this.elements[i].offsetWidth;//元素的宽度
		var eHeight=this.elements[i].offsetHeight;//元素的高度
		var left=(document.documentElement.clientWidth-eWidth)/2;
		var top=(document.documentElement.clientHeight-eHeight)/2;
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	}
	return this;
}
//浏览器大小计算
Base.prototype.resize=function(fn){
	window.onresize=fn;
	return this;
}
// 元素拖动
Base.prototype.drag=function(){
 	for(var i=0;i<this.elements.length;i++){
 		this.elements[i].onmousedown=function(e){
 			var e=e||window.event;//IE兼容
			var that=this;
			var disX=e.clientX-that.offsetLeft;//鼠标距离拖动元素左侧的位置
			var disY=e.clientY-that.offsetTop;//鼠标距离拖动元素上方的位置
			document.onmousemove=function(e){
				var left=e.clientX-disX;
				var top=e.clientY-disY;	
				//无法拖拽出屏幕
				if(left<0){
					that.style.left=0;
				}else if(left>document.documentElement.clientWidth-that.offsetWidth){
					that.style.left=document.documentElement.clientWidth-that.offsetWidth;
				}else{
					that.style.left=left+'px';
				}
				if(top<0){
					that.style.top=0;
				}else if(top>document.documentElement.clientHeight-that.offsetHeight){
					that.style.top=document.documentElement.clientHeight-that.offsetHeight;
				}else{
					that.style.top=top+'px';
				}
				document.onmouseup=function(){					
					this.onmousemove=null;
					this.onmousedown=null;
				}
			}
			return false;
 		}
 	}
 	return this
 }
				
// 				// if(elemLeft<0){
// 				// 	elemLeft=0;
// 				// }else if(elemLeft>document.documentElement.clientWidth-that.offsetWidth){
// 				// 	elemLeft=document.documentElement.clientWidth-that.offsetWidth;
// 				// }
// 				// if(elemTop<0){
// 				// 	elemTop=0;
// 				// }else if(elemTop>document.documentElement.clientHeight-that.offsetHeight){
// 				// 	elemTop=document.documentElement.clientHeight-that.offsetHeight;
// 				// }
// 			}
// 			document.onmouseup=function(){
// 				this.onmousemove=null;
// 				this.onmousedown=null;
// 			}
