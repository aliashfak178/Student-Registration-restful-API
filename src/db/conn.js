const mongose= require('mongoose');

 mongose.connect("mongodb://localhost:27017/student-api",{
     useNewUrlParser: true ,
      useUnifiedTopology: true,
      useFindAndModify: false
     } ).then(()=>{
         console.log("DB Connected")
     }).catch((err)=>{
         console.log("No connections")
     })