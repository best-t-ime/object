/**
 * Created by Administrator on 2016/9/20.
 */
var petname = $.cookie('petname')
if( petname ){
    $('.dropdown-toggle').find('span').last().text(petname)
} else {
    $('.dropdown-toggle').removeAttr('data-toggle').find('span').last().click(function(){
        location.href = 'ask.html'
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
    $.post('/ask', data, function(res){
        $('.modal-body').text(res.message)
        $('.modal').modal('show').on('hidden.bs.modal', function(){
            if( res.code == 'success' ){
                location.href = '/'
            }
        })
    })
})