/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-18 14:49:30
 * @version $Id$
 */

$(function (){

	/*列表鼠标移入动画开始*/
	$('.list_con').on('mouseover','li',function (){
	   	//$(this).find('img').stop().animate({"width":'120%'},1000);
	   	$(this).find('.opa_box').stop().animate({opacity:0},500).css({filter:"Alpha(Opacity=0)"});
	   	$(this).find('.hover_opa').show();
  	}).mouseout(function(){
   		//$(this).find('img').stop().animate({"width":'100%'},1000);
   		$(this).find('.opa_box').stop().animate({opacity:0.5},500).css({filter:"Alpha(Opacity=50)"});
   		$(this).find('.hover_opa').hide();
  	});
  	/*列表鼠标移入动画结束*/
	
	//var href = location.href.slice(0, location.href.indexOf("/shaping"));
	var flag = 1;
	ajax_load_data();
	$('.more a').click(function(){
	        ajax_load_data();
	});
	function ajax_load_data(){
		
		var URL='http://192.168.1.62:8080/shaping/pcFirst/queryPcFirstList';
        $.ajax({
            url:URL+'?page='+flag,//获取元素列表的地址
			type:'POST',
			dataType:'jsonp',
			jsonp:"callback",
	        jsonpCallback:"jsonpCallback",
            success:function(data){
            	// console.log(data);
            	if (data.status != 'success')
				{
					alert('网络错误');
					return;
				}
				else
				{
					flag++;
					// console.log(flag);
					// console.log(URL+'?page='+flag);
					if (data.size < 7)
					{
						$('.more a').hide();
					} 

					var result='';
					var aList=data.list;

					if (flag%2 == 0)
					{	
						var ty=null;
						if (aList[0].type == '体验')
						{
							ty='../pcpage/experience.html?id=';
						}
						else if (aList[0].type == '攻略')
						{
							ty='../pcpage/details.html?id=';
						}
						// alert('../pcpage/details.html?str=123');
						result += '<div>'
						 +'<ul class="first_line clearfix">'
							+'<li class="list_longer">'
		                        +'<a href="'+ty+''+aList[0].otherId+'" target="_blank">'
		                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[0].firstPic+'" alt="">'
		                            +'<div class="opa_box"></div>'
		                            +'<div class="hover_opa"></div>'
		                            +'<div class="list_tit opa">'
		                                +'<h6>'+aList[0].title+'</h6>'
		                                +'<div class="check clearfix">'
		                                    +'<i>'+aList[0].createTime+'</i>'
		                                    +'<i class="type">'+aList[0].type+'</i>'
		                                    +'<i class="see"></i>'
		                                    +'<b>'+aList[0].readNumbers+'</b>'
		                                +'</div>'
		                            +'</div>'
		                        +'</a>'
		                    +'</li>';
		                    if (aList.length >= 2)
		                    {
		                    	var ty=null;
								if (aList[1].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[1].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                    	result += '<li class="mr_none list_short">'
			                        +'<a href="'+ty+''+aList[1].otherId+'" target="_blank">'
			                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[1].firstPic+'" alt="">'
			                            +'<div class="opa_box"></div>'
			                            +'<div class="hover_opa"></div>'
			                            +'<div class="list_tit opa">'
			                                +'<h6>'+aList[1].title+'</h6>'
			                                +'<div class="check clearfix">'
			                                    +'<i>'+aList[1].createTime+'</i>'
			                                    +'<i>'+aList[1].type+'</i>'
			                                    +'<i class="see"></i>'
			                                    +'<b>'+aList[1].readNumbers+'</b>'
			                                +'</div>'
			                            +'</div>'
			                        +'</a>'
			                    +'</li>';
		                    }
		                    result += '</ul>  ';
		                	if (aList.length >= 3)
		                	{
		                		var ty=null;
								if (aList[2].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[2].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result += '<ul class="second_lines clearfix">'
				                    +'<li>'
				                        +'<a href="'+ty+''+aList[2].otherId+'" target="_blank">'
				                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[2].firstPic+'" alt="">'
				                            +'<div class="opa_box"></div>'
				                            +'<div class="hover_opa"></div>'
				                            +'<div class="list_tit opa">'
				                                +'<h6>'+aList[2].title+'</h6>'
				                                +'<div class="check clearfix">'
				                                    +'<i>'+aList[2].createTime+'</i>'
				                                    +'<i>'+aList[2].type+'</i>'
				                                    +'<i class="see"></i>'
				                                    +'<b>'+aList[2].readNumbers+'</b>'
				                                +'</div>'
				                            +'</div>'
				                        +'</a>'
				                    +'</li>';
		                	}

		                	if (aList.length >= 4)
		                	{
		                		var ty=null;
								if (aList[3].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[3].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<li>'
		                       +'<a href="'+ty+''+aList[3].otherId+'" target="_blank">'
		                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[3].firstPic+'" alt="">'
		                            +'<div class="opa_box"></div>'
		                            +'<div class="hover_opa"></div>'
		                            +'<div class="list_tit opa">'
		                                +'<h6>'+aList[3].title+'</h6>'
		                                +'<div class="check clearfix">'
		                                    +'<i>'+aList[3].createTime+'</i>'
		                                   +'<i>'+aList[3].type+'</i>'
		                                    +'<i class="see"></i>'
		                                    +'<b>'+aList[3].readNumbers+'</b>'
		                                +'</div>'
		                            +'</div>'
		                        +'</a>'
		                    +'</li>';
		                	}
		                	if (aList.length >= 5)
		                	{
		                		var ty=null;
								if (aList[4].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[4].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<li class="mr_none">'
			                        +'<a href="'+ty+''+aList[4].otherId+'" target="_blank">'
			                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[4].firstPic+'" alt="">'
			                            +'<div class="opa_box"></div>'
			                            +'<div class="hover_opa"></div>'
			                            +'<div class="list_tit opa">'
			                                +'<h6>'+aList[4].title+'</h6>'
			                                +'<div class="check clearfix">'
			                                    +'<i>'+aList[4].createTime+'</i>'
			                                    +'<i>'+aList[4].type+'</i>'
			                                    +'<i class="see"></i>'
			                                    +'<b>'+aList[4].readNumbers+'</b>'
			                                +'</div>'
			                            +'</div>'
			                        +'</a>'
			                    +'</li>';
		                	}

		                	result += '</ul>  ';
		                	if (aList.length >= 6)
		                	{
		                		var ty=null;
								if (aList[5].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[5].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result += '<ul class="third_lines clearfix">'
					                    +'<li>'
					                        +'<a href="'+ty+''+aList[5].otherId+'" target="_blank">'
					                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[5].firstPic+'" alt="">'
					                            +'<div class="opa_box"></div>'
					                            +'<div class="hover_opa"></div>'
					                            +'<div class="list_tit opa">'
					                                +'<h6>'+aList[5].title+'</h6>'
					                                +'<div class="check clearfix">'
					                                    +'<i>'+aList[5].createTime+'</i>'
					                                    +'<i>'+aList[5].type+'</i>'
					                                    +'<i class="see"></i>'
					                                    +'<b>'+aList[5].readNumbers+'</b>'
					                                +'</div>'
					                            +'</div>'
					                        +'</a>'
					                    +'</li>';
		                	}

		                	if (aList.length >= 7)
		                	{
		                		var ty=null;
								if (aList[6].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[6].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<li class="mr_none">'
				                        +'<a href="'+ty+''+aList[6].otherId+'" target="_blank">'
				                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[6].firstPic+'" alt="">'
				                            +'<div class="opa_box"></div>'
				                            +'<div class="hover_opa"></div>'
				                            +'<div class="list_tit opa">'
				                                +'<h6>'+aList[6].title+'</h6>'
				                                +'<div class="check clearfix">'
				                                    +'<i>'+aList[6].createTime+'</i>'
				                                    +'<i>'+aList[6].type+'</i>'
				                                    +'<i class="see"></i>'
				                                    +'<b>'+aList[6].readNumbers+'</b>'
				                                +'</div>'
				                            +'</div>'
				                        +'</a>'
				                    +'</li>';
	                	}
	                	result += '</ul>'
	                   +'</div>';
					}
					else if (flag%2 == 1)
					{	
						// console.log(aList.length+'卡马甲马甲');
						var ty=null;
						if (aList[0].type == '体验')
						{
							ty='../pcpage/experience.html?id=';
						}
						else if (aList[0].type == '攻略')
						{
							ty='../pcpage/details.html?id=';
						}
						result += '<div>'
						 +'<ul class="second_lines clearfix">'
				                    +'<li>'
				                        +'<a href="'+ty+''+aList[0].otherId+'" target="_blank">'
				                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[0].firstPic+'" alt="">'
				                            +'<div class="opa_box"></div>'
				                            +'<div class="hover_opa"></div>'
				                            +'<div class="list_tit opa">'
				                                +'<h6>'+aList[0].title+'</h6>'
				                                +'<div class="check clearfix">'
				                                    +'<i>'+aList[0].createTime+'</i>'
				                                    +'<i>'+aList[0].type+'</i>'
				                                    +'<i class="see"></i>'
				                                    +'<b>'+aList[0].readNumbers+'</b>'
				                                +'</div>'
				                            +'</div>'
				                        +'</a>'
				                    +'</li>';
		                    if (aList.length >= 2){
		                    	var ty=null;
								if (aList[1].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[1].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                    	result +='<li>'
		                        +'<a href="'+ty+''+aList[1].otherId+'" target="_blank">'
		                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[1].firstPic+'" alt="">'
		                            +'<div class="opa_box"></div>'
		                            +'<div class="hover_opa"></div>'
		                            +'<div class="list_tit opa">'
		                                +'<h6>'+aList[1].title+'</h6>'
		                                +'<div class="check clearfix">'
		                                    +'<i>'+aList[1].createTime+'</i>'
		                                   +'<i>'+aList[1].type+'</i>'
		                                    +'<i class="see"></i>'
		                                    +'<b>'+aList[1].readNumbers+'</b>'
		                                +'</div>'
		                            +'</div>'
		                        +'</a>'
		                    +'</li>';
		                    }
		                	if (aList.length >= 3){
		                		if (aList[2].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[2].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result += '<li>'
		                        +'<a href="'+ty+''+aList[2].otherId+'" target="_blank">'
		                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[1].firstPic+'" alt="">'
		                            +'<div class="opa_box"></div>'
		                            +'<div class="hover_opa"></div>'
		                            +'<div class="list_tit opa">'
		                                +'<h6>'+aList[2].title+'</h6>'
		                                +'<div class="check clearfix">'
		                                    +'<i>'+aList[2].createTime+'</i>'
		                                   +'<i>'+aList[2].type+'</i>'
		                                    +'<i class="see"></i>'
		                                    +'<b>'+aList[2].readNumbers+'</b>'
		                                +'</div>'
		                            +'</div>'
		                        +'</a>'
		                    +'</li>';
		                	}
		                    result += '</ul>';

		                	if (aList.length >= 4){
		                		if (aList[3].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[3].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<ul class="third_lines clearfix">'
					                    +'<li>'
					                        +'<a href="'+ty+''+aList[3].otherId+'" target="_blank">'
					                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[3].firstPic+'" alt="">'
					                            +'<div class="opa_box"></div>'
					                            +'<div class="hover_opa"></div>'
					                            +'<div class="list_tit opa">'
					                                +'<h6>'+aList[3].title+'</h6>'
					                                +'<div class="check clearfix">'
					                                    +'<i>'+aList[3].createTime+'</i>'
					                                    +'<i>'+aList[3].type+'</i>'
					                                    +'<i class="see"></i>'
					                                    +'<b>'+aList[3].readNumbers+'</b>'
					                                +'</div>'
					                            +'</div>'
					                        +'</a>'
					                    +'</li>';
		                	}
		                	if (aList.length >= 5){
		                		if (aList[4].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[4].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<li class="mr_none">'
				                        +'<a href="'+ty+''+aList[4].otherId+'" target="_blank">'
				                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[4].firstPic+'" alt="">'
				                            +'<div class="opa_box"></div>'
				                            +'<div class="hover_opa"></div>'
				                            +'<div class="list_tit opa">'
				                                +'<h6>'+aList[4].title+'</h6>'
				                                +'<div class="check clearfix">'
				                                    +'<i>'+aList[4].createTime+'</i>'
				                                    +'<i>'+aList[4].type+'</i>'
				                                    +'<i class="see"></i>'
				                                    +'<b>'+aList[4].readNumbers+'</b>'
				                                +'</div>'
				                            +'</div>'
				                        +'</a>'
				                    +'</li>';
		                	}

		                	result += '</ul>  ';
		                	if (aList.length >= 6)
		                	{
		                		if (aList[5].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[5].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result += '<ul class="second_lines clearfix">'
				                    +'<li>'
				                        +'<a href="'+ty+''+aList[5].otherId+'" target="_blank">'
				                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[5].firstPic+'" alt="">'
				                            +'<div class="opa_box"></div>'
				                            +'<div class="hover_opa"></div>'
				                            +'<div class="list_tit opa">'
				                                +'<h6>'+aList[5].title+'</h6>'
				                                +'<div class="check clearfix">'
				                                    +'<i>'+aList[5].createTime+'</i>'
				                                    +'<i>'+aList[5].type+'</i>'
				                                    +'<i class="see"></i>'
				                                    +'<b>'+aList[5].readNumbers+'</b>'
				                                +'</div>'
				                            +'</div>'
				                        +'</a>'
				                    +'</li>';
		                	}

		                	if (aList.length >= 7)
		                	{
		                		if (aList[6].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[6].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<li>'
		                        +'<a href="'+ty+''+aList[6].otherId+'" target="_blank">'
		                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[6].firstPic+'" alt="">'
		                            +'<div class="opa_box"></div>'
		                            +'<div class="hover_opa"></div>'
		                            +'<div class="list_tit opa">'
		                                +'<h6>'+aList[6].title+'</h6>'
		                                +'<div class="check clearfix">'
		                                    +'<i>'+aList[6].createTime+'</i>'
		                                   +'<i>'+aList[6].type+'</i>'
		                                    +'<i class="see"></i>'
		                                    +'<b>'+aList[6].readNumbers+'</b>'
		                                +'</div>'
		                            +'</div>'
		                        +'</a>'
		                    +'</li>';
	                		}
	                		if (aList.length >= 8)
		                	{
		                		if (aList[7].type == '体验')
								{
									ty='../pcpage/experience.html?id=';
								}
								else if (aList[7].type == '攻略')
								{
									ty='../pcpage/details.html?id=';
								}
		                		result +='<li>'
		                        +'<a href="'+ty+''+aList[7].otherId+'" target="_blank">'
		                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[7].firstPic+'" alt="">'
		                            +'<div class="opa_box"></div>'
		                            +'<div class="hover_opa"></div>'
		                            +'<div class="list_tit opa">'
		                                +'<h6>'+aList[7].title+'</h6>'
		                                +'<div class="check clearfix">'
		                                    +'<i>'+aList[7].createTime+'</i>'
		                                   +'<i>'+aList[7].type+'</i>'
		                                    +'<i class="see"></i>'
		                                    +'<b>'+aList[7].readNumbers+'</b>'
		                                +'</div>'
		                            +'</div>'
		                        +'</a>'
		                    +'</li>';
	                		}
	                	result += '</ul>'
	                   +'</div>';
					}

				
		                var $boxes = $(result);
						$('.list_con').append($boxes);
					}

					$('.first_line ').on('click','li',function (){
						//alert($(this).find('.type').html());
					});
				     
            },
            error:function (data){
	            // alert('网络错误');
	        }
        });
    }
	//瀑布流结束
	
	




});