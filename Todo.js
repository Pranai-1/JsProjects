const express = require('express');
const bodyParser = require('body-parser');
const port=4000
const path=require("path")
const app = express();

app.use(bodyParser.json());
let todos=[]
let idx=0;
app.get('/todos',(req,res)=>{
  
  res.status(200).json(todos)
})

app.get('/todos/:id',(req,res)=>{
  let idx1=parseInt(req.params.id)
  let temp=null;
  for(let i=0;i<todos.length;i++){
    if(todos[i].id==idx1){
          temp=todos[i]     
          break;
    }
  }
  if(temp){
    res.status(200).json(temp)
  }else{
    res.status(404).send("Not Found")
  }
})



app.post('/todos',(req,res)=>{
  const body=req.body
 let obj={
  id   :++idx,
  title :  body.title,
  completed: body.completed,
  description: body.description
 }
 todos.push(obj)
 
   res.status(201).json(obj)
})


app.put('/todos/:id',(req,res)=>{
  const body=req.body
  let updatedID=parseInt(req.params.id)
  const todo=todos.find(todo=>todo.id===updatedID)
  
 if(todo){
  todo.title =body.title
  todo.description=body.description
  todo.completed= body.completed
   res.status(200).send('OK')
 }
})


app.delete('/todos/:id',(req,res)=>{
  const body=req.body
  let deletedID=parseInt(req.params.id)
  const todo=todos.find(todo=>todo.id===deletedID)
  
 if(todo){
  todos= todos.filter(item => item.id !== todo.id);
 res.status(200).json(deletedID)
 }else{
   res.status(404).json('Not Found')
 }
})
app.get('/',(req,res)=>{
    const filePath=path.join(__dirname,"Todoindex.html")
    res.sendFile(filePath)
})


app.listen(port,()=>{console.log(`Started at  ${port}`)})