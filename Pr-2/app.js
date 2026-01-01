const express = require('express')
const port = 8000
const app = express()
app.set("view engine","ejs")
app.use(express.static('public'))
app.use(express.urlencoded())

let todos = [
    {
        id:"1",
  title: 'meeting',
  desc: 'meeting with client',
  priority: 'low',
  category: 'work',
  status: 'pending',
  date: '2025-12-31'
},
    {
  id:"2",
  title: 'meeting',
  desc: 'meeting with client',
  priority: 'low',
  category: 'work',
  status: 'pending',
  date: '2025-12-31'
}

]


app.get('/',(req,res)=>{
    return res.render('index',{todos})
})

app.get('/add-task',(req,res)=>{
    return res.render("add")
})

app.post('/add-todo',(req,res)=>{


   todos.push({
    ...req.body,
    id:(todos.length+1).toString()
   })
   res.redirect('/')
})


app.get('/delete-todo/:id',(req,res)=>{
let id = req.params.id
todos =  todos.filter((todo)=> todo.id !==id);
return res.redirect('/')
})


app.get('/edit-todo/:id',(req,res)=>{
let id = req.params.id
let todo =  todos.find((todo)=> todo.id ==id);
return res.render('edittodo',{todo})
})


app.post('/update-todo/:id',(req,res)=>{
let id = req.params.id
 let update =  todos.map((todo)=>{
        if(todo.id == id){
            return{
                ...req.body,
                id:id,
            }
        }else{
            return todo
        }
    })

    todos = update

    res.redirect('/')
})




app.listen(port,()=>{
    console.log(`Server start at http://localhost:${port}`)
})