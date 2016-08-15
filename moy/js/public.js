/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-19 17:33:09
 * @version $Id$
 */

$(function (){

	/*加载公共头部开始*/
	$('#header').load('http://121.43.229.113:8083/pcpage/header.html',function (){
		if (location.href.indexOf('index.html') != -1)
		{
			$('.home_page').addClass('active');
		}
		else if (location.href.indexOf('experience') != -1)
		{
			$('.exper').addClass('active');
		}
		else if (location.href.indexOf('details') != -1)
		{
			$('.raiders').addClass('active');
		}
		else if (location.href.indexOf('active') != -1)
		{
			$('.act').addClass('active');
		}
		else if (location.href.indexOf('recruit') != -1)
		{
			$('.recruit').addClass('active');
		}
		/*最新消息效果开始*/
		;(function($){
		 $.fn.textSlider = function(options){
		   var defaults = { //初始化参数
		      scrollHeight:25,
		      line:1,
		      speed:'normal',
		      timer:3000
		   };
		   var opts = $.extend(defaults,options);
		   this.each(function(){
		     var timerID;
		     var obj = $(this);
		     var $ul = obj.children("ul");
		     var $height = $ul.find("li").height();
		     var $Upheight = 0-opts.line*$height;
		     obj.hover(function(){
		       clearInterval(timerID);
		     },function(){
		       timerID = setInterval(moveUp,opts.timer);
		       });
		     function moveUp(){
		       $ul.animate({"margin-top":$Upheight},opts.speed,function(){
		          for(i=0;i<opts.line;i++){ //只有for循环了才可以设置一次滚动的行数
		           $ul.find("li:first").appendTo($ul);
		          }
		         $ul.css("margin-top",0);
		       });
		     };
		     timerID = setInterval(moveUp,opts.timer);
		     });
		   };
		})(jQuery)
		$(".news").textSlider({
		    line:1
		 });
		/*最新消息效果结束*/
		

		var username = getCookieValue("username");
			var password = getCookieValue("password");
			if (username && password) {
				// console.log($('.success_after'));
				// console.log($('.log_success'));
				$('.success_after').hide();
				$('.log_success').show();
				$.ajax({
					url:'http://192.168.1.62:8080/shaping/user/cookLoadUser',//获取元素列表的地址
					type:'POST',
					dataType:'jsonp',
					jsonp:"callback",
				    jsonpCallback:"callBackCook",
				    data:{
				    	code:username,
				    	password:password
				    },
				    success:function(data){
				    	// console.log(data);
				    	if (data.data != 'success')
						{
							// alert('网络错误');
							return;
						}
						else
						{
							// alert(123);
							
				            $('.login a img').attr('src','http://121.43.229.113:8081/shaping'+data.user.pic);
						}
					}
				});
			}
		/*登录点击开始*/
		$('.login').click(function (){
			//登录注册框出现的动画效果
			// console.log($('body').scrollTop());
			if ($(window).scrollTop() > 10 && $ ('body').scrollTop() < 110)
			{
				//console.log(999);
				$('body').scrollTop(150);
				$('.login_box').css({'top':'0','zIndex':1000});
				$('.login_box').animate({'right':0},300);
				$('body').animate({'marginRight':'100px'},600);
				$('body').css('overflow','hidden');
			}
			else if ($(window).scrollTop() > 80)
			{	
				$('.login_box').css({'top':'0','zIndex':1000});
				$('.login_box').animate({'right':0},300);
				$('body').animate({'marginRight':'100px'},600); 
				$('body').css('overflow','hidden');
			}
			else
			{
				//console.log('else');
				$('.login_box').css({'top':'95px','zIndex':1000});
				$('.login_box').animate({'right':0},300);
				$('body').animate({'marginRight':'100px'},600);
				$('body').css('overflow','hidden');
			}

			var username = getCookieValue("username");
			var password = getCookieValue("password");
			var sessionId=getCookieValue("sessionId");
			var uid=getCookieValue("uid");
			//获取当前时间
	        var oDate=new Date();
	        var month=oDate.getMonth();
	        var date=oDate.getDate();
	        
	        var h=oDate.getHours();
	        var m=oDate.getMinutes();   
	        var s=oDate.getSeconds();
	        var time=toDub(month)+'-'+toDub(date)+'&nbsp'+toDub(h)+':'+toDub(m);
			if (sessionId) {
				// console.log($('.success_after'));
				// console.log($('.log_success'));
				$('.success_after').hide();
				$('.log_success').show();
				$.ajax({
					url:'http://192.168.1.62:8080/shaping/user/cookLoadUser',//获取元素列表的地址
					type:'POST',
					dataType:'jsonp',
					jsonp:"callback",
				    jsonpCallback:"callBackCook",
				    data:{
				    	code:username,
				    	password:password
				    },
				    success:function(data){
				    	// console.log(data);
				    	if (data.data != 'success')
						{
							// alert('网络错误');
							return;
						}
						else
						{
							// alert(123);
							$('.log_success .user_pic img').attr('src',''+'http://121.43.229.113:8081/shaping'+data.user.pic+'');
				            $('.user_name').html(data.user.name);
				            $('#res_time').html(data.user.registTime);
				            $('#last_time').html(time);
				            $('.login a img').attr('src','http://121.43.229.113:8081/shaping'+data.user.pic);
						}
					}
				});
				// alert('success');
			} else {
				// alert("nonono");
				$('.zc_sidebar').show();
				$('.dl_sidebar').hide();
				$('.find_password').hide();
				$('.log_success').hide();
			}

			/*$('#close').mouseenter(function (){
				$(this).css('transform','rotate(180deg)');
			});*/



			/*已有账号，登录*/
			$('.reg_had a').click(function (){
				$(this).parents('.zc_sidebar').css({'display':'none'});
				$('.dl_sidebar').css({'display':'block'});
			});

			/*还没有账号，注册*/
			$('.reg').click(function (){
				$(this).parents('.dl_sidebar').css({'display':'none'});
				$('.zc_sidebar').css({'display':'block'});
			});

			/*忘记密码*/
			$('.forget_password').click(function (){
				$(this).parents('.dl_sidebar').css({'display':'none'});
				$('.find_password').css({'display':'block'});
			});

			//返回
			$('.back').click(function (){
				$(this).parents('.find_password ').css({'display':'none'});
				$('.dl_sidebar ').css({'display':'block'});
			});


			$('.reg_list input').click(function (){
				$(this).parents('.reg_list li').find('span').hide();
			});
			$('.reg_list span').click(function (){
				$(this).hide();
				$(this).parents('.reg_list li').find('input').focus();
			});

			$('.reg_list input').blur(function (){
				if ($(this).val() == '')
				{
					$(this).parents('.reg_list li').find('span').show();
				}
			});

			/*注册开始*/
			reg();
			function reg()
			{
				//手机号码验证
					var bol = "";
				$('#phone').blur(function (){
					var reg = /^1[34578][0-9]{9}$/ig;
				    var value = $("#phone").val();
				    bol = reg.test(value);
				    if (bol) {
				        $("#phone-p").css("display", "none");
				    } else {
				        $("#phone-p").css("display", "block");
				    }
				});
				
				/*密码验证*/
				var bol1 = "";
				$('#password').blur(function (){
					
					var reg1 = /^[0-9a-zA-Z]{6,20}$/g;
				    var reg2 = /[0-9]/g;
				    var reg3 = /[a-zA-Z]/g;
				    var value = $("#password").val();
				    bol1 = reg1.test(value) && reg2.exec(value) && reg3.exec(value);
				    if (bol1) {
				        $("#password-p").css("display", "none");
				    } else {
				        $("#password-p").css("display", "block");
				    }
				});

				//密码确认
					var bol3 = "";
				$('#readpass').blur(function (){
					var value1 = $("#password").val();
				    var value2 = $("#readpass").val();
				    if (value1 === value2) {
				        $("#readpass-p").css("display", "none");
				        bol3 = true;
				    } else {
				        $("#readpass-p").css("display", "block");
				        bol3 = false;
				    }
				});

				//验证码
					
					var code = 0;
					var musterCode = 0;
					var n=60;
        			var bFlag=false;
				$('#getcode').click(function (){
					// console.log('hhhhh');
					//var hre = location.href.slice(0, location.href.indexOf("/shaping"));
					if (!bol) {
				        alert("请输入正确的手机号");
				        return false;
				    }

				    bFlag=true;
		            var _this=$(this);
		            $(this).html(n+'秒后重新发送');

		            var timer=setInterval(function (){
		                n--;
		                _this.html(n+'秒后重新发送');
		                if (n==0)
		                {
		                    _this.html('重新发送');
		                    clearInterval(timer);
		                    n=5;
		                    bFlag=false;
		                }
		            },1000);
				    $.ajax({
				        url:'http://192.168.1.62:8080/shaping/user/getCodePc',
				        //async: true,
				        dataType: "jsonp",
			            jsonp:"callback",
        				jsonpCallback:"callBackCode",
				        data: {
				            phone:$("#phone").val()
				        },
				        success: function (data) {
				        	// console.log(data);
				            if (data.status == "error") {
				               return false;
				            }
				            //musterCode = data.musterCode;
				            code = data.code;
				            // alert(code);

				            /* 	 $("#order")[0].href="http://192.168.1.157:8080/manage/hospital/queryAllHospital"; */
				        }
				    });
				});
				//验证码验证
				
					var bol2 = "";
				$('#yz').blur(function (){
					var value1 = $("#yz").val();
				    if (value1 == code || musterCode == value1) {
				        $("#yz-p").css("display", "none");
				        bol2 = true;
				    } else {
				        $("#yz-p").css("display", "block");
				        bol2 = false;
				    }
				});
				//注册
				$('#reg_btn').click(function (){
					// console.log(bol + "," + bol1 + "," + bol2 + "," + bol3);
				    if (bol && bol1 && bol2 && bol3) {
				        var phone = $("#phone").val();
				        var password = hex_md5($("#password").val());
				        //var hidden = $("#hidden").val();
				        $.ajax({
				            url: 'http://192.168.1.62:8080/shaping/user/addUserPc',
				            async: true,
					        dataType: "jsonp",
				            jsonp:"callback",
	        				jsonpCallback:"callBackAdd",
				            data: {
				                code: phone,
				                password: password
				            },
				            success: function (data) {
				            	// console.log(data);
				                if (data.status == "-203") {
				                    $("#reg-p").css("display", "block");
				                }else if(data.status == "success"){
				                    //location.href=hre+"/shaping"+data.url;
				                    //alert('successsssss');
				                    $('.success_after').hide();
				                    $('.dl_sidebar').show();
				                }else{
				                    alert("网络异常")
				                }
				            }
				        });
				    } else {
				        // alert("请确认您的信息！");
				    }
				});
			}
			/*注册结束*/

			/*登录开始*/
			sign();
			function sign()
			{
				//手机号码验证
				var signBol="";
				$('#sign_phone').blur(function (){
					var reg=/^1[34578][0-9]{9}$/ig;
				    var value=$("#sign_phone").val();
				    signBol=reg.test(value);
				    if(signBol){
				        $("#sign_phone-p").css("display","none");
				    }else{
				        $("#sign_phone-p").css("display","block");
				    }
				});

				//密码验证
					//var bol1="";
				$('#sign_password').blur(function (){
					var reg1=/^[0-9a-zA-Z]{6,20}$/g;
				    var reg2=/[0-9]/g;
				    var reg3=/[a-zA-Z]/g;
				    var value=$("#sign_password").val();
				    bol1=reg1.test(value)&&reg2.exec(value)&&reg3.exec(value);
				    if(bol1){
				        $("#sign_password-p").css("display","none");
				    }else{
				        $("#sign_password-p").css("display","block");
				    }
				});

				//var hre=location.href.slice(0,location.href.indexOf("/shaping"));
				$("#sign_in").click(function(){
				    var phone=$("#sign_phone").val();
				    var password=hex_md5($("#sign_password").val());
				    // alert(phone);
				    // console.log(password);
				    //var hidden=$("#hidden").val();
				    //if(signBol&&bol1){
				        $.ajax({
				            async: true,
				            type:'POST',
				            url:'http://192.168.1.62:8080/shaping/user/loadUserPc',
				            dataType: "jsonp",
				            jsonp:"callback",
	        				jsonpCallback:"callBackLoad",
	        				data: {
					            code: phone,
					            password:password
					        },
				            success: function (data) {
				            	console.log(data);
				            	var userId=data.user.id;
				            	var url=window.location.href;
				            	var userImg=data.user.pic;
				            	// console.log(userId);
				            	if (data.status == "success")
				            	{	
				            		$('.success_after').hide();
				            		$('.log_success').show();
				            		//location.href=url+'&userId='+userId;
				            		$('.log_success .user_pic img').attr('src',''+'http://121.43.229.113:8081/shaping'+userImg+'');
				            		$('.user_name').html(data.user.name);

				            		setCookie("username", phone,1,'/');
									setCookie("password", password, 1,'/');
									setCookie("sessionId",data.sessionId,1,'/');
									setCookie("uid",data.user.id,1,'/');
									setCookie("upic",data.user.pic,1,'/');
				            	}
				                else if (data.status == "-205"){
				                     alert("用户名不存在");
				                }else if(data.status == "-204"){
				                    alert("密码错误");
				                }else{
				                    alert("网络错误");
				                }
				            }
				        });
				    //}
				});
			}
			/*登录结束*/

			/*找回密码开始*/
			find();
			function find()
			{
				//手机号码验证
					var bol = "";
				$('#find_phone').blur(function (){
					var reg = /^1[34578][0-9]{9}$/ig;
				    var value = $("#find_phone").val();
				    bol = reg.test(value);
				    if (bol) {
				        $("#find_phone-p").css("display", "none");
				    } else {
				        $("#find_phone-p").css("display", "block");
				    }
				});

				//验证码
					var code = 0;
					var musterCode = 0;
					var n=60;
        			var bFlag=false;
				$('#find_code').click(function (){
					// console.log('hhhhh');
					//var hre = location.href.slice(0, location.href.indexOf("/shaping"));
					if (!bol) {
				        alert("请输入正确的手机号");
				        return false;
				    }
				    if (bFlag)
		            {
		                return;
		            }
		            bFlag=true;
		            var _this=$(this);
		            $(this).html(n+'秒后重新发送');

		            var timer=setInterval(function (){
		                n--;
		                _this.html(n+'秒后重新发送');
		                if (n==0)
		                {
		                    _this.html('重新发送');
		                    clearInterval(timer);
		                    n=5;
		                    bFlag=false;
		                }
		            },1000);
				    $.ajax({
				        url:'http://192.168.1.62:8080/shaping/user/getCodePc',
				        //async: true,
				        dataType: "jsonp",
			            jsonp:"callback",
        				jsonpCallback:"callBackCode",
				        data: {
				            phone:$("#find_phone").val()
				        },
				        success: function (data) {
				        	// console.log(data);
				            if (data.status == "error") {
				               return false;
				            }
				            //musterCode = data.musterCode;
				            code = data.code;
				            // alert(code);

				            /* 	 $("#order")[0].href="http://192.168.1.157:8080/manage/hospital/queryAllHospital"; */
				        }
				    });
				});
				//验证码验证
					var bol2 = "";
				$('#find_yz').blur(function (){
					var value1 = $("#find_yz").val();
				    if (value1 == code || musterCode == value1) {
				        $("#find_yz-p").css("display", "none");
				        bol2 = true;
				    } else {
				        $("#find_yz-p").css("display", "block");
				        bol2 = false;
				    }
				});

				/*密码验证*/
				var bol1 = "";
				$('#find_psw').blur(function (){
					
					var reg1 = /^[0-9a-zA-Z]{6,20}$/g;
				    var reg2 = /[0-9]/g;
				    var reg3 = /[a-zA-Z]/g;
				    var value = $("#find_psw").val();
				    bol1 = reg1.test(value) && reg2.exec(value) && reg3.exec(value);
				    if (bol1) {
				        $("#find_psw-p").css("display", "none");
				    } else {
				        $("#find_psw-p").css("display", "block");
				    }
				});

				//密码确认
					var bol3 = "";
				$('#find_readpass').blur(function (){
					var value1 = $("#find_psw").val();
				    var value2 = $("#find_readpass").val();
				    if (value1 === value2) {
				        $("#find_readpass-p").css("display", "none");
				        bol3 = true;
				    } else {
				        $("#find_readpass-p").css("display", "block");
				        bol3 = false;
				    }
				});


				$('#change').click(function (){
					// console.log(bol + "," + bol1 + "," + bol2 + "," + bol3);
					    if (bol && bol1 && bol2 && bol3) {
					        var phone = $("#find_phone").val();
					        var password = hex_md5($("#find_psw").val());
					        //var hidden = $("#hidden").val();
					        $.ajax({
					            url: 'http://192.168.1.62:8080/shaping/user/modifyPasswordPc',
					            async: true,
						        dataType: "jsonp",
					            jsonp:"callback",
		        				jsonpCallback:"callBackmodify",
					            data: {
					                code: phone,
					                password: password,
					            },
					            success: function (data) {
					            	// console.log(data);
					                if (data.status == "-203") {
					                    alert('用户名已存在')
					                }else if(data.status == "success"){
					                    //location.href=hre+"/shaping"+data.url;
					                    $('.success_after').hide();
				                    	$('.dl_sidebar').show();
					                    alert('修改成功');
					                }else{
					                    alert("网络异常")
					                }
					            }
					        });
					    } else {
					        // alert("请确认您的信息！");
					    }
				});
				
			}
			/*找回密码结束*/

				


			


			//点击空白处触发
			$(document).click(function (e) {
		        $target = $(e.target);
		        if(!$target.closest('.common').hasClass('common')){
		            $('.login_box').animate({'right':'-400'},600); 
					$('body').animate({'marginRight':'0'},300);
					$('body').css('overflow','auto');
					$('.zc_sidebar').css({'display':'block'});
					$('.dl_sidebar,.find_password,log_success').css({'display':'none'});
		        }
		    }); 


			/*热门活动自动播放选项卡开始*/
			var hotBtn=$('.hot_nav div');
			var hotDiv=$('.ha_con li');
			$('.hot_nav').on('mouseenter','div',function (){
				// console.log($(this).index());
				hotBtn.removeClass('active');
				$('.ha_con li').removeClass('active');
				$(this).addClass('active');
				$('.ha_con li').eq($(this).index()).addClass('active');
			});
			//var now=0; // 当前
			/*for (var i=0; i<hotBtn.length; i++)
			{
				hotBtn.mouseenter(function (){
					now=i;
					tab();

				});
			}

			
			var timer=setInterval(next, 2000);

			$('.ha_con').mouseenter(function (){
				console.log(123);
				clearInterval(timer);
			});
			$('.ha_con').mouseleave(function (){
				console.log(223);
				timer=setInterval(next, 1000);
			});

			$('.hot_nav').mouseenter(function (){
				console.log(123);
				clearInterval(timer);
			});
			$('.hot_nav').mouseleave(function (){
				console.log(223);
				timer=setInterval(next, 1000);
			});
			
			function next()
			{
				now++;
				
				if (now == 3)
				{
					now=0;
				}
				
				
				
			}

			function tab()
			{
				for (var i=0; i<aBtn.length; i++)
				{
					aBtn[i].className='';
					aDiv[i].className='';
				}
				aBtn[now].className='active';
				aDiv[now].className='active';
			}*/

			/*热门活动自动播放选项卡结束*/

			hot();
			function hot(){
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
		                    //alert('右部网络错误');
		                    return;
		                }
		                else
		                {
		                    
		                    //var oCon=diaryLists.content;
		                        //o=o.split('#');
		                    var diaryLists=data.diaryLists;
		                    for (var i=0; i<3; i++)
		                    {
		                        var n=i+1;
		                        var oCon=diaryLists[i].content;
		                        	oCon=oCon.split('#');
		                        $('.ha_con').append('<li>'
							                    +'<a href="../pcpage/details.html?id='+diaryLists[i].id+'">'
							                        +'<div class="ha_pic"><img src="'+'http://121.43.229.113:8081/shaping'+diaryLists[i].homePagePic+'" alt=""></div>'
							                        +'<div class="hot_tit clearfix">'
							                            +'<h6>'+diaryLists[i].title+'</h6>'
							                            +'<i>'+diaryLists[i].createTime+'</i>'
							                        +'</div>'
							                        +'<p>'+oCon[0]+'</p>'
							                    +'</a>'
							                +'</li>');
		                    }
		                    $('.ha_con li:first').addClass('active');

		                       	// console.log(oB);
		                }
		            },
		            error:function (data){
		                //alert('右部网络错误2');
		            }
		        });
			}

		});


	});
	/*加载公共头部结束*/

	/*加载公共底部开始*/
	$('#footer').load('http://121.43.229.113:8083/pcpage/footer.html');
	/*加载公共底部结束*/

	/*加载公共登录注册开始*/
	$('#login').load('http://121.43.229.113:8083/pcpage/login.html',function(){
		/*回到顶部开始*/
		$(".top_btn").click(function(){  
		    $('body,html').animate({scrollTop:0},1000);  
		    return false;  
		});

		$('.qr_btn').hover(function (){
			$('.qr').show();
		},function (){
			$('.qr').hide();
		});
		/*回到顶部结束*/
	});
	/*加载公共登录注册结束*/

	// console.log($('body').scrollTop());
	
	 $(window).scroll(function(){  
		// console.log('滚动'+$('body').scrollTop());
	    if ($(window).scrollTop()>100)
	    {  
	        $('.nav_box').css({
	        	'position':'fixed',
	        	'top':0,
	        	'left':0,
	        	'zIndex':100
	        });
	    }  
	    else  
	    {  
	        $('.nav_box').css('position','static');
	    }  

	    var top=$('.my').position().top;
	    var srScroll=$('body').scrollTop();
	    // console.log(top);
	    if ($(window).scrollTop() > top-800)
	    {
	    	$(".top_box").show(); 
	    }
	    else
	    {
	    	$(".top_box").hide(); 
	    }

	});  

	 

	


    /*底部评论最多*/
	most();
	function most(){
		var url='http://192.168.1.62:8080/shaping/pcFirst/queryPcFirstListSort';
		$.ajax({
			url:url,
			type:'POST',
			dataType:'jsonp',
			jsonp:"callback",
	        jsonpCallback:"callBack",
	        success:function (data){
	        	// console.log(data);
	        	if (data.status != 'success')
				{
					// alert('网络错误');
					return;
				}
				else
				{
					var aList=data.list;
					for (var i=0; i<aList.length; i++)
					{
						var ty=null;
							if (aList[i].type == '0')
							{
								ty='../pcpage/experience.html?id=';
							}
							else if (aList[i].type == '1')
							{
								ty='../pcpage/details.html?id=';
							}
						$('.most_list').append('<li class="clearfix">'
	    					+'<a href="'+ty+''+aList[i].otherId+'"><div class="pic">'
	    						+'<img src="'+'http://121.43.229.113:8081/shaping'+aList[i].firstPic+'" alt="">'
	    					+'</div>'
	    					+'<div class="comment_con">'
	    						+'<h6>'+aList[i].title+'</h6>'
	    						+'<p class="clearfix">'
	    							+'<i>'+aList[i].createTime+'</i>'
	    							+'<em></em>'
	    							+'<span>'+aList[i].readNumbers+'</span>'
	    						+'</p>'
	    					+'</div></a>'
	    				+'</li>');
					}
				}
	        },
	        error:function (data){
	            // alert('网络错误');
	        }
		});
	}


	function toDub(n)
    {
        return n<10 ? '0'+n : ''+n;
    }


	function setCookie(name,value,hours,path){   
	    var name = escape(name);   
	    var value = escape(value);   
	    var expires = new Date();   
	    expires.setTime(expires.getTime() + hours*3600000);   
	    path = path == "" ? "" : ";path=" + path;   
	    _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();   
	    document.cookie = name + "=" + value + _expires + path;   
	}   
	//获取cookie值    方法
	function getCookieValue(name){   
	    var name = escape(name);   
	    //读cookie属性，这将返回文档的所有cookie   
	    var allcookies = document.cookie;          
	    //查找名为name的cookie的开始位置   
	    name += "=";   
	    var pos = allcookies.indexOf(name);       
	    //如果找到了具有该名字的cookie，那么提取并使用它的值   
	    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败   
	        var start = pos + name.length;                  //cookie值开始的位置   
	        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置   
	        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie   
	        var value = allcookies.substring(start,end);  //提取cookie的值   
	        return unescape(value);                           //对它解码         
	        }      
	    else return "";                                             //搜索失败，返回空字符串   
	}   

});





