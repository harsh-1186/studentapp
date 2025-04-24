const express=require('express');
const cors=require('cors');
const fs=require('fs').promises;
// const config = require('config');

const app=express();
const port=3005;
app.use(express.json());
app.use(cors()); //allow cross origin
app.get("/",(req,res)=>{
res.send("Welcome to Express Framework Server");
})

app.post("/msg",(req,res)=>{
    res.send("Hii, Hitting the /msg api");
})

app.post("/register",async(req,res)=>{
    let arr=[];
const {name,email,password}=req.body;
const data1=await fs.readFile('student.json',{encoding:'utf-8'});
                arr=JSON.parse(data1);

                const result=arr.find(ele=>ele.email==email);
               console.log(result);
               if(result){
                console.log("Inside statue true");
                
                return res.json({msg:"Email is already registerd"})
               }
         else{
               arr.push({name,email,password});
               console.log(arr);
           await fs.writeFile('student.json',JSON.stringify(arr,null,2));
           res.json({msg:"Registration done successfully!!!"});
         }

})


app.post("/login",async(req,res)=>{
let arr=[];
    const {email,password}=req.body;
    console.log(email+password);
    const data1=await fs.readFile('student.json',{encoding:'utf-8'});
       arr=JSON.parse(data1);
       const result=arr.find(ele=>ele.email==email && ele.password==password);
       if(result){
        
        res.json({msg:"success"});
       }
       else{
        
        res.json({msg:"user is invalid, email or password is incorrect"});
       }


})
app.get("/admin/show",async(req,res)=>{
    try{
const data=await fs.readFile('student.json',{encoding:'utf-8'});
      const sdata= JSON.parse(data);
      res.json({msg:sdata})
    }catch(err){
        res.json({msg:err.message})
    }
})
app.get("/admin/showByEmailId/:email", async (req, res) => {
  const emailid = req.params.email;

  try {
      const data = await fs.readFile('student.json', { encoding: 'utf-8' });
      const arr = JSON.parse(data);

      const result = arr.find(ele => ele.email === emailid);

      if (!result) {
          return res.status(404).json({ msg: "Email ID not found" });
      }

      res.json({ msg: result });
  } catch (err) {
      console.error("Error in showByEmailId:", err.message);
      res.status(500).json({ msg: "Internal Server Error" });
  }
});
app.delete("/admin/deleteByEmailId/:email", async (req, res) => {
  const emailid = req.params.email.trim(); // Remove any leading/trailing spaces
  let arr = [];

  try {
      // Read the current data from the student.json file
      const data = await fs.readFile('student.json', { encoding: 'utf-8' });
      arr = JSON.parse(data);

      // Log the data for debugging purposes
      console.log("All student data:", arr);

      // Use toLowerCase() to make the comparison case-insensitive
      const index = arr.findIndex(ele => ele.email.toLowerCase().trim() === emailid.toLowerCase());

      if (index === -1) {
          return res.json({ msg: "Email not found" });
      }

      // Log the student found at the index
      console.log("Student to delete:", arr[index]);

      // Remove the student from the array
      arr.splice(index, 1);

      // Write the updated array back to the file
      await fs.writeFile('student.json', JSON.stringify(arr, null, 2));

      // Send a success response
      res.json({ msg: "Student successfully deleted" });

  } catch (err) {
      console.error("Error deleting student:", err.message);
      res.status(500).json({ msg: "Internal Server Error" });
  }
});


app.listen(port,()=>{
    console.log("Express server is running on::"+port)
})