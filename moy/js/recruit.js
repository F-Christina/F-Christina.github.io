$(function (){
    var bol = "";
    $('#phone').blur(function (){
        var reg = /^1[34578][0-9]{9}$/ig;
        var value = $("#phone").val();
        bol = reg.test(value);
    });

    var bol1 = "";
    $('#email').blur(function (){
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var value = $("#email").val();
        bol1 = reg.test(value);
    });

    var name=$('#name').val();
    var email=$('#email').val();
    var address=$('#address').val();
    var phone=$('#phone').val();
    var text=$('.message textarea').text();
    
    

    $('#send').click(function (){
        var oBoxLength=$('.o_box').length;
        for (var i=0; i<oBoxLength; i++)
        {
            if (oBoxLength == 1)
            {
                var imgArr=$('.uplosd_pic img').eq(i).attr('src');
                console.log(imgCon);
            }
            else
            {
                var imgCon=$('.uplosd_pic img').eq(i).attr('src')+'*_*';
                var str=imgCon;
                var imgArr=str.split('*_*');
                console.log(imgArr);
            }
        }
        
    });

    $.ajax({
        url:'192.168.1.154:8080/shaping/recruit/addRecruit',
        type:'POST',
        dataType:'jsonp',
        jsonp:"callback",
        jsonpCallback:"callBackAddRecruit",
        data:{
            name:name,
            email:email,
            address:address,
            phone:phone,
            text:text
        },
        success:function(data){
            // console.log(data);
            alert('发布成功');
        }
    });


    $('#prvid').on('click','i',function (){
        $(this).parents('.o_box').remove();
    });
});

 
