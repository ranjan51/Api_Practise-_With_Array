const express = require("express")
require('dotenv').config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT 
let data:any[] = []

app.get('/',(req:any,res:any) => {
  res.send({
    message:"Below are the Items",
    data,
  })
})

app.post('/additem',(req:any,res:any) => {
    const {name,age} = req.body
    const id = Date.now()
     const newProduct = data.push({name,age,id})
  
     res.send({
        message:"successfully posted",
        newProduct
     })
})

app.put('/putItem/:id',(req:any,res:any)=>{
    const {id}  = req.params 
    const {name,age} = req.body
    const founduser:any = data.find((x) => x.id === Number(id))
    if(founduser) 
    {
        founduser.name = name;
        founduser.age = age
        res.json({
            message: "update successfully",
            founduser,
        })
    }   
    else{
        res.send({
            message: "Failed to update"
        })
    } 
})

app.delete('/delete/:id',(req:any,res:any) => {
      const {id} = req.params
      const deleteddata = data.filter((X:any)  => X.id !== Number(id))
       data = deleteddata
       res.send({
        message:"delete",
           data
       })
})


app.listen(PORT,()=>
 {
    console.log("server is running on",`${PORT}`)
})