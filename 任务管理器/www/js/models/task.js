// 定义任务模型
define([
    'backbone'
], function(B) {
    return B.Model.extend({
        defaults:{
            // 任务内容
            content:'',
            // 任务时间'20161108'
            time:'',
            // 任务是否完成
            complete:false,
            // 任务的顺序
            index:0,
            // backbone会根据id是否存在决定是更新数据还是保存新数据
            // 0 与 null
            // 0表示id的是值为0;null表示的是id没有值
            id:null
        }
    })
})