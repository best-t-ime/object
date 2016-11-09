/**
 * Created by Administrator on 2016/10/20.
 */
$('.remove').click(function(){
    var result = confirm('您确定删除该商品么')
    var id = $(this).attr('data-id')
    console.log(id)
    if(result){
        $.get('/remove/'+id, null, function(res){
            //console.log(res.result)
            if(res.result == 1){
                //alert('删除成功')
                location.reload()
            }else{
                location.reload()
            }
        })
    }
})