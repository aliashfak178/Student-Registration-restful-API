const express= require('express');
const app=express();
require('./db/conn');
const Student= require('./models/student');
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('This is a home page')
});

// create a new student
// app.post('/student',(req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e) =>{
//         res.status(400).send(e);
//     })

// });

// create a new student
app.post('/student',async(req,res)=>{
    try{
        console.log(req.body);
        const user = new Student(req.body);

        const CreateUser = await user.save();
        res.send(201).send(CreateUser);
    }
    catch(e){
        res.send(400).send(e);
    }   
});

// read the data of registered
app.get('/student',async(req,res)=>{
        try{
            const studentData = await Student.find();
            res.send(studentData);
        }catch(e){
            res.send(400).send(e); 
        }
});

// get te indivisual student
app.get('/student/:id',async(req,res)=>{
        try{
            const _id = req.params.id;
            const studentData = await Student.findById(_id);

            if(!studentData){
                return res.status(404).send("404 Not Found")
            }
            else{
                res.send(studentData);
            }
        }catch(e){
            res.send(400).send(e); 
        }
});

// Upated the Student Recored using Student ID

app.patch('/student/:id',async(req,res)=>{
        try{
            const _id = req.params.id;
            const UpdateStudent = await Student.findByIdAndUpdate(_id, req.body,{
                new: true
            });
            res.send(UpdateStudent);
        }catch(e){
            res.status(404).send(e);
        }
});

// Delte the Student Recored using Student ID

app.delete('/student/:id',async(req,res)=>{
    try{
        // const _id = req.params.id;
        const DelteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.send().status(400);
        }
        res.send(DelteStudent);
    }catch(e){
        return res.send(e).status(404);
    }
});


app.listen(PORT,()=>{
    console.log(`server are running on port ${PORT}`)
});