/**
 * Created by Administrator on 2016/10/19.
 */
    //    判断是否已经登录
var username = $.cookie('username')
//console.log(username)
var isUser = $.cookie('isUser')
//console.log(isUser)
if(username){
    $('.login').text(username)
    $('.signout').css('display', 'block')
    //判断是管理员还是用户,根据角色定义显示的按键
    if(isUser == '管理员'){
        $('.update').css('display', 'block')
        $('.shop').css('display', 'none')
    } else{
        $('.update').css('display', 'none')
        $('.shop').css('display', 'block').click(function(){
            //location.href = 'shopping.html'
        })
    }
} else{
    $('.login').click(function(){
        location.href = 'login.html'
    })
}
//退出请求
$('.signout').click(function(){
    $.get('/signout', null, function(res){
        if(res == 'success'){
            location.href = '/'
        }
    })
})