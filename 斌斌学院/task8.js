window.onload=function(){
	var myRoot=document.getElementById('root'),
		btns=document.getElementsByTagName('button'),
		timer=null,
		arr=[],
		divs=document.getElementsByTagName('div'),
		values=[];   //保存每个div节点中的文本

		function preOrder(node){
			if(!(node==null)){
				arr.push(node);
				for(var i=0; i<node.children.length; i++){
					preOrder(node.children[i]);
				}
			}
		}

		function lastOrder(node){
			if(!(node==null)){
				for(var i=0;i<node.children.length;i++){
					lastOrder(node.children[i]);
				}
				arr.push(node);
			}
		}

		function reset(){
			clearInterval(timer);
			arr=[];
			values=[];
			for(var i=0; i<divs.length; i++){
				divs[i].style.background='white';
			}
		}

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

		btns[0].onclick=function(){
			reset();
			preOrder(myRoot);
			changeColor();
		}

		btns[1].onclick=function(){
			reset();
			lastOrder(myRoot);
			changeColor();
		}

		function getValue(){
			for(var i=0; i<divs.length; i++){
				values.push(divs[i].firstChild.nodeValue);
			}
		}

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

		btns[2].onclick=function(){
			reset();
			getValue();
			preOrder(myRoot);
			mySearch();
		}
}

