/**
 * Created by Administrator on 2016/10/19.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serialize()
    $.post('/login', data, function(res){
        if(res.code == 'success'){
            alert(res.message)
            if(res.code == 'success'){
                location.href = '/'
            }
        }else{
            alert(res.message)
        }

    })
})