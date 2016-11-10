// 定义header对应的视图类
define([
    'backbone','jquery-ui'
], function(B) {
    return B.View.extend({
        el:'header',
        // 初始化操作
        initialize:function(){
            // 设置单选的按钮建
            this.$('#radio').buttonset()
            // 设置日历
            this.$('#radio6').datepicker()
            // 设置h1的初始值
            var now = new Date()
            var week = this.getWeek(now.getDay())
            this.$('h1').text(now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + '  ' + '星期' + week)
        },
        getWeek:function(num){
            var week = ['日','一','二','三','四','五','六']
            return week[num]
        },
        events:{
            // 监听输入事件,修改日期
            // not选择器,排除第六个input
            // 点击日历的时候没有修改日期
            'input input:not(#radio6)':'changeDate',
            // 选择日历上的日期,(也就是输入框的内容发生了改变)也修改日期
            'change #radio6':'changeDate'
        },
        changeDate:function(){
            console.log('changeDate')
            // 找到被选中的input是第几个input
            var index = this.$('input:checked').index()/2
            // console.log(index)
            // 今天
            var now = new Date()
            // 昨天
            now.setDate(now.getDate()-1)
            // 昨天加上index就是选中的日期,(日历是不对的)
            now.setDate(now.getDate()+index)
            if(index == 5){
                // 说明选中的是日历
                now = this.$('#radio6').datepicker('getDate')
                // console.log(now)
            }
            // 重新渲染h1
            // var now = new Date()
            var week = this.getWeek(now.getDay())
            this.$('h1').text(now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + '  ' + '星期' + week)
            
            // 记录选中的日期
            this.shareDate.date = now
            // 触发改变日期的事件
            this.shareDate.trigger('changeDate')
        }
    })
});