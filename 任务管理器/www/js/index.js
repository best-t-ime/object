require.config({
    paths:{
        'jquery':'libs/jquery',
        'jquery-ui':'jquery-ui/jquery-ui',
        'underscore':'libs/underscore',
        'template':'libs/template',
        'backbone':'libs/backbone'
    },
    shim:{
        'jquery-ui':['jquery'],
        'backbone':['underscore','jquery']
    }
})

// 导入视图类,新建header对象
require(['views/header','views/footer','collections/taskset','views/list','underscore','backbone'], function(Header,Footer,Taskset,List,_,B){

    var header = new Header()
    var taskset = new Taskset()
    // 把集合与视图关联起来
    var footer = new Footer({model:taskset})
    
    
    // shareDate用来保存header/footer共用的数据
    // 采用shareDate中date属性记录选中的日期
// 注意:在header中changeDate时,需要去修改shareDate.date
    // 继承自B.events,就具有了触发事件的能力
    var shareDate = _.extend({date:new Date()},B.Events)
    
    header.shareDate = shareDate
    footer.shareDate = shareDate
    taskset.shareDate = shareDate
    
    var list = new List({model:taskset})
    // 监听changeDate事件,监听到,重新渲染页面
    list.listenTo(shareDate,'changeDate',list.render)
})