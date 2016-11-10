// 定义展示任务的视图类
define([
    'backbone','template','jquery','jquery-ui'
], function(B, Tem, $) {
    return B.View.extend({
        el:'section',
        events:{
            'click label':'changeCompleteState'
        },
        changeCompleteState:function(ev){
            // console.log('...................')
            // 修改这条数据的conplete字段
            // console.log(ev)
            // 找到点击的label对应的input的id
            var label = ev.currentTarget
            var id = this.$(label).prev().attr('id')
            // console.log(id)
            // 找到id对应的数据
            var task = this.model.find(function(item){
                return item.get('id') == id
            })
            // console.log(task)
            // 根据input是否选中,修改这条数据的complete
            // 注意attr 与 prop 获取属性值的区别
            var complete = this.$(label).prev().prop('checked')
            // console.log(!complete)
            task.set('complete',!complete)
            // 把修改保存到服务端
            task.save()
        },
        initialize:function(){
            this.render()
            // 监听add事件,重新渲染页面
            this.listenTo(this.model,'add',this.render)
            //  设置排序
            this.$('#sortable').sortable({
                // placeholder:'placeholder',
                start:function(){
                    console.log('开始排序')
                    $('footer>span').removeClass('fa fa-plus-circle fa-2x').addClass('fa fa-trash-o fa-2x')
                },
                stop:function(){
                    console.log('结束排序')
                    $('footer>span').removeClass('fa fa-trash-o fa-2x').addClass('fa fa-plus-circle fa-2x')
                },
                // 与另一个区域产生联系,可以跨区域排序
        //  注意:另一个区域要支持排序
                // 值为另一个区域的选择器
                connectWith:'footer',
                // 保存排序的位置
                // 只修改移动的数据A的index,其他数据的index不变
                // 如果A跑到了ul的外面,就无操作;
                // 如果A在ul的内部,有如下三种情况:
                //    1.如果A移动到最上面,index修改为A下面的数据的index-1
                //    2.如果A移动到中间,index修改为A上下两个shu7ju的index的和去平均值
                //    3.如果A移动到最下面,index就修改为A上面的数据的index+1
                
                // 当被移动的圆度重新放在一个位置时,会触发的事件
                // para1:事件对象
                // para2:事件涉及到的界面元素;其中有item属性,是一个jQuery对象
                update:function(event,ui){
                    console.log('调整顺序了')
                    // console.log(arguments)
                    // 找到被移动的元素
                    var li = ui.item
                    // 移动到ul的外面了,无操作
                    if(li.parent()[0]!= this.$('ul')[0]){
                        return
                    }
                    var currentId = li.find('input').attr('id')
                    var task = this.model.find(function(item){
                        return item.get('id') == currentId
                    })
                    var index
                    // 移动到最上面
                    if(li.index() == 0){
                        console.log('移动到最上面了')
                        // 找到写一个标签,找到id,找到对应的数据
                        var id = li.next().find('input').attr('id')
                        // console.log(id)
                        // 根据id找到数据
                        var nextTask = this.model.find(function(item){
                            return item.get('id') == id
                        })
                        // 从数据中获取index
                        var nextIndex = nextTask.get('index')
                        // 当前数据的index
                        index = nextIndex - 1
                        // 找到当前数据,然后修改index
                        // var currentId = li.find('input').attr('id')
                        // var task = this.model.find(function(item){
                        //     return item.get('id') == currentId
                        // })
                        task.set('index',index)
                        task.save()
                        
                    }
                    // 移动到中间
                    if(li.index() > 0 && li.index() < this.$('ul li').length - 1){
                        console.log('kkkkkkkkkk')
                        // 上一个数据的index
                        var prevId = li.prev().find('input').attr('id')
                        var prevTask = this.model.find(function(item){
                            return item.get('id') == prevId
                        })
                        var prevIndex = prevTask.get('index')
                        // 下一个数据的index
                        var nextId = li.next().find('input').attr('id')
                        var nextTask = this.model.find(function(item){
                            return item.get('id') == nextId
                        })
                        var nextIndex = nextTask.get('index')
                        
                        index = (prevIndex + nextIndex) / 2
                        
                        task.set('index',index)
                        task.save()
                    }
                    // 移动到最下面
                    if(li.index() == this.$('ul li').length - 1){
                        console.log('ffffff')
                        // 找到最后一个的id
                        var lastId = li.last().prev().find('input').attr('id')
                        var lastTask = this.model.find(function(item){
                            return item.get('id') == lastId
                        })
                        var lastIndex = lastTask.get('index')
                        
                        // 当前数据的index
                        index = lastIndex + 1
                        task.set('index',index)
                        task.save()
                    }
                    
                }.bind(this)
            })
        },
        render:function(){
            console.log('监听到changeDate事件了')
            // 获取当前日期的数据进行展示
            this.model.fetch().done(function(data){
                // console.log(this.model.toJSON())
                // 渲染页面
                var html = Tem('list',{arr:this.model.toJSON()})
                // console.log(html)
                $('section ul').html(html)
                // console.log(this.model.toJSON())
            }.bind(this)).fail(function(error){
                alert('请尝试重新刷新页面!')
            })
        }
    })
})