/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-18 14:49:30
 * @version $Id$
 */

$(function (){

	left();
	right();


	/*左部分开始*/
	function left()
	{
		var URL='http://192.168.1.62:8080/shaping/diary/queryDiaryListPc';
		var number=1;
		$.ajax({
			url:URL+'?page='+number,//获取元素列表的地址
			type:'POST',
			dataType:'jsonp',
			jsonp:"callback",
		    jsonpCallback:"callback",
		    success:function(data){
		    	// console.log(data);
		    	if (data.status != 'success')
				{
					// alert('网络错误');
					return;
				}
				else
				{
					var aList=data.diaryLists;
					// console.log(aList);
					for (var i=0; i<aList.length; i++)
					{
						var constr=aList[i].content;
						var conArr=constr.split('#');
						var time=aList[i].createTime;
                            time=time.substring(0,9);
                        var mo=aList[i].linkUrl;
                        	mo=mo.split(',');
                        // console.log(mo);
						// console.log(333);
						$('.ml_list').append('<li><a href="../pcpage/details.html?id='+aList[i].id+'">'
	                        +'<div class="pic_box">'
	                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[i].homePagePic+'" alt="">'
	                            +'<div class="hover_opa"></div>'
	                            +'<div class="main_details">'
	                                +'<h6>'+aList[i].title+'</h6>'
	                                +'<div class="clearfix">'
	                                    +'<i>'+aList[i].userName+'</i>'
	                                    +'<i>'+time+'</i>'
	                                    +'<i>精品攻略</i>'
	                                    +'<i class="main_see"><i></i>'+aList[i].pageView+'</i>'
	                                    +'<i class="comment_number"><i></i>'+aList[i].countComments+'</i>'
	                               +' </div>'
	                            +'</div>'
	                        +'</div>'
	                		
	                        +'<div class="ml_details">'
	                            +'<p>'+conArr[0]+'</p>'
	                            +'<a href="../pcpage/details.html?id='+aList[i].id+'">继续阅读&gt;&gt;</a>'
	                        +'</div>'
	                	+'</a></li>');
					}

					var pagesize = 2;//每页显示几条
				 	var count=data.count;
				    var nowPage = 1;//当前页
				    var Pageslen=Math.ceil(count/pagesize);//总页数
				    // console.log(Pageslen);

				    $('.items').createPage({
				        pageCount:Pageslen,
				        current:1,
				        backFn:function(p){
				            number=p;
				            $.ajax({
								url:URL+'?page='+number,//获取元素列表的地址
								type:'POST',
								dataType:'jsonp',
								jsonp:"callback",
							    jsonpCallback:"callback",
							    success:function(data){
							    	if (data.status != 'success')
									{
										alert('网络错误');
										return;
									}
									else
									{
										var aList=data.diaryLists;
										// console.log(aList);
										$('.ml_list').html(' ');
										for (var i=0; i<aList.length; i++)
										{

											var constr=aList[i].content;
											var conArr=constr.split('#');
											var time=aList[i].createTime;
                            					time=time.substring(0,9);
                            				var mo=aList[i].linkUrl;
                        						mo=mo.split(',');
                        					$('.ml_list').append('<li><a href="../pcpage/details.html?id='+aList[i].id+'"'
							                        +'<div class="pic_box">'
							                            +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[i].homePagePic+'" alt="">'
							                            +'<div class="opa_box"></div>'
							                            +'<div class="main_details">'
							                                +'<h6>'+aList[i].title+'</h6>'
							                                +'<div class="clearfix">'
							                                    +'<i>'+aList[i].userName+'</i>'
							                                    +'<i>'+time+'</i>'
							                                    +'<i>精品攻略</i>'
							                                    +'<i class="main_see"><i></i>'+aList[i].pageView+'</i>'
							                                    +'<i class="comment_number"><i></i>'+aList[i].countComments+'</i>'
							                               +' </div>'
							                            +'</div>'
							                        +'</div>'
							                		
							                        +'<div class="ml_details">'
							                            +'<p>'+conArr[0]+'</p>'
							                            +'<a href="../pcpage/details.html?id='+aList[i].id+'">继续阅读&gt;&gt;</a>'
							                        +'</div>'
							                	+'</a></li>');
											// if (aList[i].linkUrl == '' || aList[i].linkUrl == null)
											// {	
												// console.log(333);
											// 	$('.ml_list').append('<li><a href=""'
							    //                     +'<div class="pic_box">'
							    //                         +'<img src="'+'http://121.43.229.113:8081/shaping'+aList[i].homePagePic+'" alt="">'
							    //                         +'<div class="opa_box"></div>'
							    //                         +'<div class="main_details">'
							    //                             +'<h6>'+aList[i].title+'</h6>'
							    //                             +'<div class="clearfix">'
							    //                                 +'<i>'+aList[i].userName+'</i>'
							    //                                 +'<i>'+time+'</i>'
							    //                                 +'<i>精品攻略</i>'
							    //                                 +'<i class="main_see"><i></i>'+aList[i].pageView+'</i>'
							    //                                 +'<i class="comment_number"><i></i>'+aList[i].countComments+'</i>'
							    //                            +' </div>'
							    //                         +'</div>'
							    //                     +'</div>'
							                		
							    //                     +'<div class="ml_details">'
							    //                         +'<p>'+conArr[0]+'</p>'
							    //                         +'<a href="javascript:;">继续阅读&gt;&gt;</a>'
							    //                     +'</div>'
							    //             	+'</a></li>');
											// 	}
											// else
											// {
											// 	console.log(123);
											// 	$('.ml_list').append('<li>'
							    //                     +'<div class="pic_box">'
							    //                 		+'<div class="movie">'

							    //                 		+'<embed src="http://yuntv.letv.com/bcloud.swf'
											// 					+'" allowFullScreen="true" quality="high"  width="760" height="458" align="middle" allowScriptAccess="always" flashvars="uu='+mo[0]+'&vu='+mo[1]+'&pu=06EF21CBF0&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>'
							    // 				        +'</div>'
							    				        
							    //                     +'</div>'
							    //                     +'<div class="ml_details">'
							    //                         +'<p>'+conArr[0]+'</p>'
							    //                         +'<a href="javascript:;">继续阅读&gt;&gt;</a>'
							    //                     +'</div>'
							    //             	+'</li>');	
											// }
										}
							    	}
							    }
							});
				        }
				    });
				    /*var str = "";
				    for (var i = 1; i <= Pageslen; i++) {
				    	if (i<4){
				    		var c = i === nowPage ? "active" : null;
				        	str += "<li class='" + c + "'>" + i + "</li>";
				    	}
				    	if (i>Pageslen-3){var c = i === nowPage ? "active" : null;
				        str += "<li class='" + c + "'>" + i + "</li>";}
				        
				    }
				    $('.items').html(str);*/


				}
		    },
		    error:function (data){
		        // alert('网络错误');
		    }
		});
	}
	/*左部分结束*/

	/*右部分开始*/
	function right(){
		var url='http://192.168.1.62:8080/shaping/diary/queryDiaryListSort?page=1';
		$.ajax({
			url:url,
			type:'POST',
			dataType:'jsonp',
			jsonp:"callback",
	        jsonpCallback:"callback1",
	        success:function (data){
	        	// console.log(data);
	        	if (data.status != 'success')
				{
					//alert('网络错误');
					return;
				}
				else
				{
					var diaryLists=data.diaryLists;
					for (var i=0; i<2; i++)
					{	
						var n=i+1;
						var time=diaryLists[i].createTime;
                            time=time.substring(0,9);
						$('#hot_act').append('<li><a href="../pcpage/details.html?id='+diaryLists[i].id+'">'
                            +'<img src="'+'http://121.43.229.113:8081/shaping'+diaryLists[i].homePagePic+'" alt="">'
                            +'<div class="hover_opa"></div>'
                            +'<i class="mr_sort">'+n+'</i>'
                            +'<div class="heading">'
                                +'<p>'+diaryLists[i].title+'</p>'
                                +'<div>'
                                    +'<i>'+time+'&nbsp;&nbsp;&nbsp;</i>'
                                    +'<i>攻略精品</i>'
                                +'</div>'
                            +'</div>'
                        +'</a></li>');
					}


					for (var j=2; j<4; j++)
					{
						var n=j-1;
						var time=diaryLists[i].createTime;
                            time=time.substring(0,9);
						$('#m_boutique').append('<li><a href="../pcpage/details.html?id='+diaryLists[i].id+'">'
                            +'<img src="'+'http://121.43.229.113:8081/shaping'+diaryLists[j].homePagePic+'" alt="">'
                            +'<div class="hover_opa"></div>'
                            +'<i class="mr_sort">'+n+'</i>'
                            +'<div class="heading">'
                                +'<p>'+diaryLists[j].title+'</p>'
                                +'<div>'
                                    +'<i>'+time+'&nbsp;&nbsp;&nbsp;</i>'
                                    +'<i>攻略精品</i>'
                                +'</div>'
                            +'</div>'
                        +'</a></li>'); 
					}
				}
	        },
	        error:function (data){
	            //alert('网络错误');
	        }
		});
	}
	/*右部分结束*/

	/*列表分页开始*/
	
	
	
	/*var index;
 	var pagesize = 2;//每页显示几条
 	var
    var nowPage = 1;//当前页
    var Pageslen;//总页数
    var obj = document.getElementById('ml_list').getElementsByTagName("li");
    var news_len=obj.length;
    console.log(obj.length);
    Pageslen = Math.ceil(6/pagesize);*/
    /*upPage(0)
    function upPage(p){
        nowPage = p;
         for(var i=0; i<2; i++){
           obj[i].style.display="none"
        }
        for(var i=p*pagesize; i<(p+1)*pagesize;i++){
            if(obj[i]){
                obj[i].style.display="block"
            }
        }
    }*/

    // 绑定页数
   	/*function bindPage() {
	    var str = "";
	    for (var i = 1; i <= Pageslen; i++) {
	        var c = i === nowPage ? "active" : null;
	        str += "<li class='" + c + "'>" + i + "</li>";
	    }
	    $('.items').html(str);
    }
    bindPage();*/


	/*列表分页结束*/


});