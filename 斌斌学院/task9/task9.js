window.onload=function(){
	var myRoot=document.getElementById('root'),
		btns=document.getElementsByTagName('button'),
		timer=null,
		arr=[],
		divs=document.getElementsByTagName('div'),
		values=[];   //保存每个div节点中的文本

		//前序排序
		function preOrder(node){
			if(!(node==null)){
				arr.push(node);
				for(var i=0; i<node.children.length; i++){
					preOrder(node.children[i]);
				}
			}
		}

		//后序排序
		function lastOrder(node){
			if(!(node==null)){
				for(var i=0;i<node.children.length;i++){
					lastOrder(node.children[i]);
				}
				arr.push(node);
			}
		}

		//重置
		function reset(){
			clearInterval(timer);
			arr=[];
			values=[];
			for(var i=0; i<divs.length; i++){
				divs[i].style.background='white';
			}
		}

		//打印
		function changeColor(){
			var i=0;
			arr[i].style.background='red';
			timer=setInterval(function(){
				if(i<arr.length-1){
					arr[i].style.background='white';
					arr[i+1].style.background='red';
					i++;
				}else{
					arr[i].style.background='white';
					clearInterval(timer);
				}
			},500)
		}

		//前序遍历绑定事件
		btns[0].onclick=function(){
			reset();
			preOrder(myRoot);
			changeColor();
		}

		//后序遍历绑定事件
		btns[1].onclick=function(){
			reset();
			lastOrder(myRoot);
			changeColor();
		}

		//取值
		function getValue(){
			for(var i=0; i<divs.length; i++){
				values.push(divs[i].firstChild.nodeValue);
			}
		}

		//搜索
		function mySearch(){
			var input=document.getElementsByTagName('input')[0].value;
			var i=0;
			arr[i].style.background='red';
			timer=setInterval(function(){
				if(i<arr.length-1){
					if(values[i]==input){
						alert('find the element!');
						clearInterval(timer);
						return true;
					}else{
						arr[i].style.background='white';
						arr[i+1].style.background='red';
						i++;
					}
				}else{
					clearInterval(timer);
					arr[i].style.background='white';
					alert('can not find the element!');
				}
			},500)
		}

		//搜索绑定事件
		btns[2].onclick=function(){
			reset();
			getValue();
			preOrder(myRoot);
			mySearch();
		}

		//给每个div元素绑定选中事件??????
		/*for(var i=0; i<divs.length; i++){
			divs[i].onclick=function(){
				divs[i].style.background='grey';
			}
		}*/

		var target;      //储存被选中的节点
		myRoot.onclick=function(event){
			reset();
			target=event.target;
			target.style.background='grey';
		}

		//增加节点
		btns[3].onclick=function(){
			var input=document.getElementsByTagName('input')[1].value;
			var newNode=document.createElement('div');
			newNode.innerHTML=input;
			target.appendChild(newNode);
		}

		//删除节点
		btns[4].onclick=function(){
			target.parentNode.removeChild(target);
		}
}

