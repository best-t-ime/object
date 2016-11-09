/**
 * Created by Administrator on 2016/9/20.
 */
var petname = $.cookie('petname')
if (petname) {
    $('#user').find('span').last().text(petname)
} else {
    $('#user').removeAttr('data-toggle').find('span').last().click(function () {
        location.href = 'login.html'
    })
}
$('.dropdown-menu li').last().click(function () {

    $.get('/user/signout', null, function (res) {
        if (res == 'success') {
            location.href = '/'
        }
    })
})
//如果存在登录用户名，可跳转到提问页面，否则，跳转到登录页面
$('#ask').click(function () {
    if (petname) {
        location.href = 'ask.html'
    } else {
        location.href = 'login.html'
    }
})

$('.main').click(function () {
    //console.log('111')
    //设置某个cookie值,获取到当前点击文件的文件名称
    $.cookie('questions', $(this).attr('questions'))

    location.href = 'answer.html'
})