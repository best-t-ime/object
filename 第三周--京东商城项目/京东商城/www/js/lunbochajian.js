/**
 * Created by Administrator on 2016/9/29.
 */
$.fn.opt = function(options){
    this.each(function(i, ele){
        show( ele, options )
    })
    return this
}
var show = function(ele, options){

    var defs = {
        firUlclass: 'imgbox',
        sedUlclass:'num',
        sedLiclass:'num-sty',
        speed:'1500',
        time:'8000'
    }
    var setting = $.extend( defs, options )
    var $ele = $(ele),
        $firU = $('.' + defs.firUlclass , $ele),
        $sedU = $('.' + defs.sedUlclass , $ele),
        $sedL = defs.sedLiclass,
        $speed = defs.speed,
        $time = defs.time,
        $len = $firU.children().length,
        $hei = $firU.children().width()
    var i = 0
    var timer = null
    function play(){
        i++
        if( i >= $len ){
            i = 0
        }
        autoP(i)
    }


    function autoP(i){
        $firU.stop().animate({
            left: -$hei * i
        }, $speed, function(){
            $sedU.children().eq(i).addClass($sedL).siblings().removeClass()
            $firU.css('left', '0').children().first().appendTo($firU)
        })
    }

    function tim(){
        timer = setInterval(play, $time)
    }

    //自动轮播
    play()
    tim()

    $sedU.children().hover(function(){
        clearInterval(timer)
        var ind = $(this).index()
        autoP(ind)
    },function(){
        i = $(this).index()
        play()
        tim()
    })

}