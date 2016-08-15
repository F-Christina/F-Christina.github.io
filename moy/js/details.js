/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-15 10:20:42
 * @version $Id$
 */

$(function (){
    $('.review').on('mouseover','li',function (){
        $(this).find('.re_button').show();
    });
    $('.review').on('mouseout','li',function (){
        $(this).find('.re_button').hide();
    });

    $('.review_con').on('mouseover','.re_con',function (){
        $(this).find('.re_btn').show();
    });
    $('.review_con').on('mouseout','.re_con',function (){
        $(this).find('.re_btn').hide();
    });

    var sessionId=getCookieValue("sessionId");
    if (sessionId)
    {
        var upic=getCookieValue("upic");
        console.log(upic);
        $('.userpic img').attr('src','http://121.43.229.113:8081/shaping'+upic);
    }
    else
    {
        $('.userpic img').attr('src','../img/details/upic.png');
    }


    // var documentHeight = 0;
    // var topPadding = 15;
    // var offset = $(".bot_fixed").offset();
    // documentHeight = $(document).height();
    // $(window).scroll(function() {
    //     var sideBarHeight = $("#bot_fixed").height();
    //     if ($(window).scrollTop() > offset().top) {
    //         var newPosition = ($(window).scrollTop() - offset.top) + topPadding;
    //         var maxPosition = documentHeight - (sideBarHeight + 368);
    //         if (newPosition > maxPosition) {
    //             newPosition = maxPosition;
    //         }
    //         $("#bot_fixed").stop().animate({
    //             marginTop: newPosition
    //         });
    //     } else {
    //         $("#bot_fixed").stop().animate({
    //             marginTop: 0
    //         });
    //     };
    // });

    /*$(window).scroll(function(){  
        console.log($('body').scrollTop());
        if ($(window).scrollTop()>=1500){  
            console.log('到1500啦');
            $('.bot_fixed').css({
                'position':'fixed',
                'top':'5%',
                'left':'65%',
                'width':'320px'
            })
        }  
        else  
        {  
            $('.bot_fixed').css({
                'position':'',
                'top':'5%',
                'left':'65%',
                'width':'320px'
            })
        }  
    });  */
	function getParam(paramName) {
        paramValue = "";
        isFound = false;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
            arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
            i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf("=") > 0) {
                    if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    }
    
	var otherId=getParam('id');
    var URL='http://192.168.1.62:8080/shaping/diary/queryDiaryDetail?id='+otherId;
    //alert(URL);
    $.ajax({
        url:URL,//获取元素列表的地址
		type:'POST',
		dataType:'jsonp',
		jsonp:"callback",
        jsonpCallback:"callBack3",
        success:function(data){
        	if (data.status != 'success')
            {
                alert('左部网络错误');
                return;
            }
            var con=data.diaryList.diary.content;
            var pic=data.diaryList.diary.pic;
            con=con.split('#');
            pic=pic.split(',');
            if (data.diaryList.linkUrl == '' || data.diaryList.linkUrl == null)
            {
            	$('.movie').html('<img src="'+'http://121.43.229.113:8081/shaping'+pic[0]+'" />');
            }
            else
            {
            	$('.movie').append('<embed src="http://yuntv.letv.com/bcloud.swf'
                                        +'" allowFullScreen="true" quality="high"  width="1200" height="724" align="middle" allowScriptAccess="always" flashvars="uu=esnueu60d5&vu=c8d28ab244&pu=06EF21CBF0&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>')
            }

            pic.splice(0,1);
            for (var key in pic)
            {
                pic[key] = con[key]+'^_^'+pic[key]
            }
            // console.log(pic);
            for (key in pic)
            {
                pic [key] = pic[key].split('^_^');
                $('.ml_con').append('<p>'+pic[key][0]+'</p><img src="'+'http://121.43.229.113:8081/shaping'+pic[key][1]+'" />')
            }

            $('.comment h6 i').html(data.diaryList.countComments);

            //评论与回复
            var dirArr=data.diaryList.diaryCommentsList;
            for (dirkey in dirArr)
            {
                var dirTime=dirArr[dirkey].diaryComments.createTime;
                dirTime=dirTime.substring(5,16);
                var appends='<li data-id="'+dirArr[dirkey].diaryComments.id+'" class="clearfix">'
	                +'<div class="userpic">'
	                    +'<img src="'+'http://121.43.229.113:8081/shaping'+dirArr[dirkey].diaryComments.userPic+'" alt="">'
	                +'</div>'
	                +'<div class="review_con">'
	                    +'<p>'+dirArr[dirkey].diaryComments.userName+' <i>'+dirTime+'</i></p>'
	                    +'<p>'+dirArr[dirkey].diaryComments.content+'</p>';


                

                var repArr=dirArr[dirkey].replyVOs;
                for (repkey in repArr)
                {
                    var repTime=repArr[repkey].createTime;
                    repTime=repTime.substring(5,16);
                    appends+='<div class="reply">'
	                        +'<div class="re_con clearfix">'
	                            +'<div class="userpic">'
	                                +'<img src="img/details/userpic.jpg" alt="">'
	                            +'</div>'
	                            +'<div class="review_con">'
	                                +'<p>'+repArr[repkey].userName+' <i>'+repTime+'</i></p>'
	                                +'<p>'+repArr[repkey].content+'</p>'
	                            +'</div>'
	                        +'</div>'
	                    +'</div>';
                }

                appends+='</div><span class="re_button">回复</span></li>';
                $('.review').append(appends);
            }

        },
        error:function (data){
            alert('左部网络错误2');
        }
    });

    var top = $('#fixed_box').position().top*2;
    var footTop = $('.main_left').position().top*3 - parseFloat($('.reading').css('marginTop').replace(/auto/, 0));
     
    var maxY = footTop;
     
    $(window).scroll(function(evt) {
        var y = $(this).scrollTop();
        console.log('y'+y)
        console.log('top'+top)
        console.log('maxY'+maxY)
        if (y > top) {
            if (y < maxY) {
                $('#fixed_box').addClass('fixed').removeAttr('style');
            } else {
                $('#fixed_box').removeClass('fixed').css({
                    position: 'absolute',
                    top: (maxY - top) + 'px'
                });
            }
        } else {
            $('#fixed_box').removeClass('fixed');
        }
    });


    /*发表评论*/
    $('#fa_button').click(function (){
        // console.log('fabiao');
        //获取当前时间
        var oDate=new Date();
        var month=oDate.getMonth();
        var date=oDate.getDate();
        
        var h=oDate.getHours();
        var m=oDate.getMinutes();   
        var time=toDub(month)+'-'+toDub(date)+'&nbsp'+toDub(h)+':'+toDub(m);
        var sessionId=getCookieValue("sessionId");
        var uid=getCookieValue("uid");


        $('.comm_con textarea').html('');
        var str=$('.comm_con textarea').val();

        if (uid)
        {
            if (str == '')
            {
                alert('发表不能为空');
            }
            else
            {   
                $.ajax({         
                    url:'http://192.168.1.62:8080/shaping/diary/commentDiaryPc',
                    type:'POST',
                    dataType:'jsonp',
                    jsonp:"callback",
                    jsonpCallback:"callbackComment",
                    data:{
                        diaryId:otherId,//详情id 82
                        userId:uid,
                        content:str
                    },
                    success:function (data){

                        if (sessionId)
                        {console.log(data);
                            console.log('发表成功');
                            if (data.status == 'success')
                            {
                                console.log('ajaxsuccess');
                                //var diaryId=dataUser.id;
                                $('.review').append('<li class="clearfix">'
                                    +'<div class="userpic">'
                                        +'<img src="'+'http://121.43.229.113:8081/shaping'+data.userPic+'" alt="">'
                                    +'</div>'
                                    +'<div class="review_con">'
                                        +'<p>'+data.userName+' <i>'+time+'</i></p>'
                                        +'<p>'+str+'</p>'
                                    +'</div>'
                                    +'<span class="re_button">回复</span>'
                                +'</li>');
                            
                            $('#fa_box').val(''); 


                            }
                        }
                        
                    },
                    error:function (data)
                    {
                        // alert('网络错误');
                    }
                }); 
            }
        }
        else
        {
            alert('请登录');
        }
        

        // if (dataUser != null)
        // {
        //     if (str == '')
        //     {
        //         alert('发表不能为空');
        //     }
        //     else
        //     {   
        //         $.ajax({         
        //             url:URL,
        //             type:'POST',
        //             dataType:'jsonp',
        //             jsonp:"callback",
        //             jsonpCallback:"callBack",
        //             data:{
        //                 'diaryId':diaryid,
        //                 "userId":userId,
        //                 "content":str,
        //                 'type':0
        //             },
        //             success:function (data){
        //                 console.log('发表成功');
        //                 if (data.status == 'success')
        //                 {
        //                     console.log('ajaxsuccess');
        //                     var diaryId=dataUser.id;
        //                     var repTime=repArr[repkey].createTime;
        //                     repTime=repTime.substring(5,16);
        //                     $('.review').append('<li class="clearfix">'
        //                             +'<div class="userpic">'
        //                                 +'<img src="'+'http://121.43.229.113:8081/shaping'+dirArr[dirkey].diaryComments.userPic+'" alt="">'
        //                             +'</div>'
        //                             +'<div class="review_con">'
        //                                 +'<p>'+dirArr[dirkey].diaryComments.userName+' <i>'+repTime+'</i></p>'
        //                                 +'<p>'+repArr[repkey].content+'</p>'
        //                             +'</div>'
        //                             +'<span class="re_button">回复</span>'
        //                         +'</li>');
                            
        //                     $('#fa_box').val('');    
        //                 }
        //             },
        //             error:function (data)
        //             {
        //                 alert('网络错误');
        //             }
        //         }); 
        //     }
        // }
        // else
        // {
        //     console.log('back');
        //     //返回登录页面
        //     //backCall("m://my.com/?type=denglu", "myapp://denglu");
        // }    
    });
    /*$('.re_button').click(function (){
        alert(999)
    });*/

    var commentId=null;
    $('.review').on('click','.re_button',function (){
            $('.reply_box').show();
            that=$(this).prev();
            commentId=$(this).parents('li').attr('data-id');
            // console.log(commentId);
    }); 

    /*回复*/
    $('.reply_box').on('click',' .rep_btn',function (){
        // console.log('huifu');
        //获取当前时间
        var oDate=new Date();
        var month=oDate.getMonth();
        var date=oDate.getDate();
        
        var h=oDate.getHours();
        var m=oDate.getMinutes();   
        var time=toDub(month)+'-'+toDub(date)+'&nbsp'+toDub(h)+':'+toDub(m);

        //console.log(that.next());
        var str=$('.reply_middle textarea').val();
        var sessionId=getCookieValue("sessionId");
        var uid=getCookieValue("uid");

        if (uid)
        {
            if(str == '')
            {
                alert('回复不能为空');
            }
            else
            {
                // console.log('huifuchenggong')
                $.ajax({
                    url:'http://192.168.1.62:8080/shaping/diary/replayDiaryPc',
                    type:'POST',
                    dataType:'jsonp',
                    jsonp:"callback",
                    jsonpCallback:"callbackReplay",
                    data:{
                        commentId:commentId,//评论ID
                        userId:uid,
                        content:str
                    },
                    success:function (data){
                        if (sessionId)
                        {
                            if (data.status == 'success'){

                            // console.log('回复成功');
                            // console.log(that);
                                that.append('<div class="reply">'
                                    +'<div class="re_con clearfix">'
                                        +'<div class="userpic">'
                                            +'<img src="'+'http://121.43.229.113:8081/shaping'+data.userPic+'" alt="">'
                                        +'</div>'
                                        +'<div class="review_con">'
                                            +'<p>'+data.userName+' <i>'+time+'</i></p>'
                                            +'<p>'+str+'</p>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>');

                                $('.reply_box').hide();
                                $('.reply_middle textarea').html(' ');
                            }     
                        }
                        
                        
                    },
                    error:function (data){
                        alert('网络错误');
                    }
                });
            }
        }
        else
        {
            alert('请登录');
        }
        











        // if (dataUser != null)
        // {
        //     if(str == '')
        //     {
        //         alert('回复不能为空');
        //     }
        //     else
        //     {
        //         $.ajax({
        //             url:href+'/shaping/diary/replayDiary',
        //             type:'POST',
        //             dataType:'json',
        //             data:{
        //                 'commentId':commentId,//评论ID
        //                 "userId":userId,
        //                 "content":str
        //             },
        //             success:function (data){
        //                 console.log('回复成功');
        //                 if (data.status == 'success'){
        //                     that.append('<ul><li class="rev_rep reps"><div class="clearfix"><p class="rev_name">'+dataUser.name+'&nbsp;<i>回复</i>&nbsp;'+that.find('.rev_name').html()+'</p><p class="rev_time">'+time+'</p></div><div class="re_s">'+str+'</div></li></ul>');
        //                         $('.announce').show();
        //                         $('.rep').hide();
        //                         $('#re_box').val('');
        //                 }     
        //             },
        //             error:function (data){
        //                 alert('网络错误');
        //             }
        //         });
        //     }
        // }
        // else
        // {
        //     //返回登录页面
        //     backCall("m://my.com/?type=denglu", "myapp://denglu");
        // }
    });
    $('.rep_close').click(function (){
        $('.reply_box').hide();
    });
    $('.reply_middle').click(function (){
        $(this).find('p').hide();
        $(this).find('textarea').focus();
    });

    var oT=$('.reply_middle textarea');
    var oP=$('.rep_bottom p')
    var total=600;
    oT.focus(function (){
        window.timer=setInterval(function (){
            var n=total-oT.val().length;
            oP.html('还可输入'+n+'个字符');
        },30);
    });
    oT.blur(function (){
        clearInterval(timer);
    });
    right();
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
                    //alert('右部网络错误');
                    return;
                }
                else
                {
                    var diaryLists=data.diaryLists;
                    for (var i=0; i<3; i++)
                    {
                        var n=i+1;
                        $('#hot_act').append('<li><a href="../moyan/details.html?id='+diaryLists[i].id+'">'
                            +'<img src="'+'http://121.43.229.113:8081/shaping'+diaryLists[i].homePagePic+'" alt="">'
                            +'<div class="hover_opa"></div>'
                            +'<i class="mr_sort">'+n+'</i>'
                            +'<div class="heading">'
                                +'<p>'+diaryLists[i].title+'</p>'
                                +'<div>'
                                    +'<i>'+diaryLists[i].createTime+'</i>'
                                    +'<i>攻略精品</i>'
                                +'</div>'
                            +'</div>'
                        +'</a></li>');
                    }


                    for (var j=3; j<6; j++)
                    {
                        var n=j-2;
                        $('#m_boutique').append('<li><a href="../moyan/details.html?id='+diaryLists[i].id+'">'
                            +'<img src="'+'http://121.43.229.113:8081/shaping'+diaryLists[j].homePagePic+'" alt="">'
                            +'<div class="hover_opa"></div>'
                            +'<i class="mr_sort">'+n+'</i>'
                            +'<div class="heading">'
                                +'<p>'+diaryLists[j].title+'</p>'
                                +'<div>'
                                    +'<i>'+diaryLists[j].createTime+'</i>'
                                    +'<i>攻略精品</i>'
                                +'</div>'
                            +'</div>'
                        +'</a></li>'); 
                    }
                }
            },
            error:function (data){
                //alert('右部网络错误2');
            }
        });
    }
    /*右部分结束*/

    /*相关阅读开始*/
    reading();
    function reading(){
        var url='http://192.168.1.62:8080/shaping/diary/queryDiaryListSort1?page=2';
        $.ajax({
            url:url,
            type:'POST',
            dataType:'jsonp',
            jsonp:"callback",
            jsonpCallback:"callback2",
            success:function (data){
                // console.log(data);
                if (data.status != 'success')
                {
                    alert('网络错误');
                    return;
                }
                var diaryLists=data.diaryLists;
                for (var i=0; i<3; i++)
                {
                    $('#reading').append('<li><a href="../moyan/details.html?id='+diaryLists[i].id+'">'
                            +'<img src="'+'http://121.43.229.113:8081/shaping'+diaryLists[i].homePagePic+'" alt="">'
                            +'<div class="hover_opa"></div>'
                            +'<p>'+diaryLists[i].title+'</p>'
                        +'</a></li>');
                }

            },
            error:function (data){
                // alert('网络错误');
            }
        });
    }
    /*相关阅读结束*/





     function toDub(n)
    {
        return n<10 ? '0'+n : ''+n;
    }

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