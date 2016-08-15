/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-18 14:49:30
 * @version $Id$
 */

$(function (){

	
		var url='http://192.168.1.62:8080/shaping/dictionary/dictionaryListPc';
		$.ajax({
			url:url,
			type:'POST',
			dataType:'jsonp',
			jsonp:"callback",
	        jsonpCallback:"jsonpCallback",
	        success:function (data){
	        	console.log(data);
	        	if (data.status != 'success')
				{
					// alert('网络错误');
					return;
				}
				else
				{
					var aList=data.data;
					console.log(aList);
					var locaStr=window.location.href;
					var locaArr=locaStr.split('?');
					console.log(locaArr[1]);
					console.log(locaArr[2]);
					locaArr=[locaArr[1],locaArr[2]];
					locaArr=locaArr.join('?');
					console.log(locaArr);
					$('iframe').attr('src',locaArr);
						
					
				}
			}
	});
	

});