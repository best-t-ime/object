// 定义一个集合类
define([
    'backbone','../models/task'
], function(B,Task) {
    return B.Collection.extend({
        model:Task,
        url:function(){
            var date = this.shareDate.date
            return '/tasks/' + (date.getFullYear()*10000 + (date.getMonth() + 1) * 100 + date.getDate() + '')
        },
        // 数据解析
        parse:function(data){
            return data.data
        }
    })
})