// Initialize express app
import express  from "express";
const app = express();
import {find, findById, insert, update, remove} from './users/model.js'
import bodyParser from "body-parser";
app.use(bodyParser.json())



// GET ALL USERS

app.get('/api/users',async (req,res) =>{
    const allUsers = await find()
    res.json(allUsers)
})

// GET USER BY ID
app.get('/api/user/id',async (req,res) =>{
    const user = await findById(req.params.id)
    if (user) {
         res.json(user)
    }else{
      res.status(400).json({massege:'this user not found'})
}
})



// CREATE A NEW USER
app.post('/api/users',async (req,res) =>{
    const newUser = req.body
    const newUsers = await insert(newUser)
    if (newUsers) {
         res.json(newUser)
  }else{
    res.status(404).json({massege:'user not found'})
}
})




// UPDATE A USER
app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updateduser = req.body
    try{
        const Updateuser = await update(userId, Updateuser);
       if(Updateuser){
           res.json(Updateuser);     
       }else{
        res.status(404).json({ error: ' not found' });
       }
    }catch (err) {
        console.error('Error Updating user Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})



// DELETE A USER
app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        const DelateUser = await remove(userId);
       if(DelateUser){
           res.json({message :'User delete successfully'});
          
       }else{
        res.status(404).json({ error: 'User not found' });
       }

    }catch (err) {
        console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})





// export default app
export default app;