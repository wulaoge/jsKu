//为每个操作都创建一个新的实例对象
var $=function(){
	return new Base();
}
// 基础Base对象
function Base(){
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
		this.elements.style.display='none';
	}
	return this;
}
//元素居中
Base.prototype.center=function(){
	for(var i=0;i<this.elements.length;i++){
		var eWidth=this.elements[i].offsetWidth;//元素的宽度
		var eHeight=this.elements[i].height;//元素的高度
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