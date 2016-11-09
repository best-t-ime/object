/**
 * Created by Administrator on 2016/10/20.
 */
console.log($.cookie())
    $('form').submit(function(ev){
        ev.preventDefault()
        var data = new FormData(this)

        $.post({
            url:'/add',
            data:data,
            contentType:false,  //默认的格式是 application/x-www-form-urlencoded
            processData:false, // 默认发送到服务器的数据，会发生数据转换，防止自动转换数据格式
            success:function(res){
//                console.log(res)
                if(res.code == 'success'){
                    console.log(res.message)
                    alert(res.message)
                    location.href = '/'
                }
            }
        })
    })