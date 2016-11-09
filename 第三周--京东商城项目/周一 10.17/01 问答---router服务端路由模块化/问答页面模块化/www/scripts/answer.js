/**
 * Created by Administrator on 2016/9/20.
 */
var petname = $.cookie('petname')
if( petname ){
    $('.dropdown-toggle').find('span').last().text(petname)
} else {
    $('.dropdown-toggle').removeAttr('data-toggle').find('span').last().click(function(){
        location.href = 'login.html'
    })
}
$('.dropdown-menu li').last().click(function(){

    $.get('/user/signout', null, function(res){
        if( res == 'success' ){
            location.href = '/'
        }
    })
})
$('form').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serialize()
    $.post('/answer', data, function(res){
        //console.log(res)
        $('.modal-body').text(res)
        $('.modal').modal('show').on('hidden.bs.modal', function(){
                location.href = '/'
        })
    })
})