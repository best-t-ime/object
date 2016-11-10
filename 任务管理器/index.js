const express = require('express'),
      bodyParser = require('body-parser'),
      Task = require('./db.js')

const app = express()
app.use(express.static('www'))
app.use(bodyParser.json())

// 查询数据
app.get('/tasks/:time',(req, res)=>{
      var time = req.params.time
      // console.log(time)
      // 查询获取该日期下的数据,返回客户端
      Task.find({time:time}).sort({'index':1}).then(function(data){
            data = data.map(function(item,index,arr){
                  // console.log(item._id)
                  return {
                        id:item._id.toString(),
                        content:item.content,
                        complete:item.complete,
                        time:item.time,
                        index:item.index
                  }
            })
            res.json({result:1,data:data})
      }).catch(function(error){
            res.json({result:0,message:error.message})
      })
})

// 查询数据是否存在,如果存在就修改数据;
// 如果不存在就添加数据
app.post('/tasks/:time',(req, res)=>{
      var task = new Task(req.body)
      task.save().then(function(){
            res.json({result:1,message:'保存数据成功'})
      }).catch(function(error){
            res.json({result:0,message:error.message})
      })
})

app.put('/tasks/:time/:id',(req,res)=>{
      Task.findByIdAndUpdate(req.params.id,{complete:req.body.complete,index:req.body.index})
      .then(function(data){
            res.json({result:1})
      }).catch(function(error){
            console.log(error)
            res.json({result:0})
      })
})

app.delete('/tasks/:time/:id',(req,res)=>{
      Task.findByIdAndRemove(req.params.id).then(function(){
            res.json({result:1})
      }).catch(function(){
            res.json({result:0})
      })
})


app.listen(1236,()=>console.log('监听的是1236端口'))