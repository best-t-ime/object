$('form').submit(function(ev){
    ev.preventDefault()
    //判断两次输入的密码是否一致,如果一致,判断用户名是否已注册
    var pass = $(':password').map(function(){
        return $(this).val()
    })
    //console.log(pass)
    if( pass[0] == pass[1] ){
        //console.log('两次密码输入一致')
        var data = $(this).serialize()
        //判断username是否已注册
        $.post('/register', data, function(res){
            console.log(res)
            //console.log(json.message)
            if( res.code == 'success' ){
                alert(res.message)
                if(res.code == 'success'){
                    location.href = 'login.html'
                }
            } else{
                alert(res.message)
            }
        })
    } else{
        //console.log('密码不一致')
        alert('两次输入的密码不一致,请重新输入')
    }
})