/**
 * Created by Administrator on 2016/10/21.
 */

$('.shop').click(function(){
    //confirm('queding')
    var shopid = $(this).attr('data-id')
    //console.log(id)
    $.cookie('shopid', shopid)
    if($.cookie('shopid')){
        $.get('/shopping', null, function(res){
            console.log(res)
            if(res.result == 1){
                alert(res.message)
            } else{
                alert(res.message)
            }
        })
    }

})