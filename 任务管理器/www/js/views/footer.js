define([
    'backbone'
], function(B) {
    return B.View.extend({
        el:'footer',
        initialize:function(){
            // 让footer支持排序
            this.$el.sortable({
                receive:function(event,ui){
                    console.log('接收到另一个区域的标签')
                    // 删除标签对应的数据
                    var id = ui.item.find('input').attr('id')
                    var task = this.model.find(function(item){
                        return item.get('id') == id
                    })
                    // 删除数据(destory:销毁)
                    task.destroy()
                    // 删除这个标签
                    ui.item.remove()
                }.bind(this)
            })
        },
        events:{
            // 点击加号
            'click span':'showEditBox',
            // 点击提交按钮
            'click button':'commit'
        },
        showEditBox:function(){
            this.$('#editBox').show()
            this.$('span').hide()
        },
        commit:function(){
            this.$('#editBox').hide()
            this.$('span').show()
            // 提交数据
            var content = this.$('input').val()
            if( content.length == 0 ){
                return
            }
            // 清空输入框
            this.$('input').val('')
            // console.log(this.shareDate.date)
            // 从共享数据中获取时间this.shareDate.date
            var date = this.shareDate.date
            var time = date.getFullYear()*10000 + (date.getMonth() + 1) * 100 + date.getDate() + ''
            // console.log(time)
            var complete = false
            // 获取当前数据对应的序号
            // 从数据库中获取当前日期的所有数据,最后一条数据的index加1,就是这条数据的index
            var index = 0
            console.log(this.model)
            if(this.model.models.length > 0){
                // 找到所有的数据
                var data = this.model.models
                // 获取数据书目
                var length = data.length
                // 获取最后一条数据
                var lastData = data[length - 1]
                index = lastData.get('index')
            }
            index++
          // 保存数据
            // creat方法会根据填入的参数,新建模型对象,模型创建成功会添加到集合中,同时保存数据到服务端
            // 添加到集合中的时候,会触发add事件(默认为创建完就触发)
            // 添加参数{wait:true}保证,当数据保存到服务端成功之后才添加到集合中
            // 保存到服务端成功触发  sync
            // 保存到服务端失败触发  error
            this.model.create({
                content:content,
                time:time,
                complete:complete,
                index:index
            },{wait:true})
        }
    })
});