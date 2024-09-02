const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());



//---------Port Number

app.listen(9001, () => {
  console.log("Server is running on port 9001.");
  });
  
  
  // ----- sign in user
  
  const {CheckSignInFunction} = require("./CheckSignInFunction")
  
  app.post("/CheckLogin",async(req,res)=>{
    const recievedUserData = await req.body
    console.log(recievedUserData)
    const data = await CheckSignInFunction(recievedUserData)
    if (data) {
      res.json({message:"User Found"});
    } else if (data === null) {
      res.json({message:"User Not Found"});
    } else {
      res.status(400).json({ message: "Unexpected Error" });
    }
  })
  


//----------import apifilePath

const { readFunction } = require("./readFunction");

app.get("/readApiData", async (req, res) => {
  try {
    const sendData = await readFunction();
    res.json(sendData);
  } catch (error) {
    console.error("Read Api Failed", error);
  }
});


//--- get donut data
const {getDonutFunction} = require ("./getDonutFunction");

app.get("/getApiData",async(req,res)=>{
  try {
    const sendDonutData = await getDonutFunction();
    res.json(sendDonutData);
  } catch (error) { 
    console.error("Get Donut Data  Failed", error); 
  }
})

//-- delete user function 

const {DeleteDataFunction} = require("./DeleteDataFunction")

app.post("/DeleteApiData",async (req,res)=>{
   const recievedUserData = req.body
   console.log(recievedUserData)
   const data = DeleteDataFunction(recievedUserData)
   res.send({
    message:"New user deleted sucessful"  
  });
})

//-- import filter function

const { filterFunction } = require("./filterFunction");

app.get("/filterApiData", async (req, res) => {
  try {
    const sendFilterData = await filterFunction();
    res.json(sendFilterData);
  } catch (error) {
    console.error("Read Api Failed", error);
  }
});



//--- getting data from frontend using Post method

const {InsertFunction} = require("./insertFunction")

app.post('/InsertApiData',async(req,res)=>{
    const recievedData = req.body
    console.log(recievedData);
    const data = InsertFunction(recievedData)
    res.send({
      message:"New user added to list"  
    });
});

//--- update api data 

const {UpdateDataFunction} = require("./UpdateDataFunction")

app.put('/UpdateApiData',async(req,res)=>{
  const recievedData = req.body
  const data = UpdateDataFunction(recievedData)
  console.log(recievedData)
  
  res.send({
    message:"user Data Updated to list"  
  });
}); 
 

//-------- getting whole data from db to frontend
const{GetUserDataFunction} = require("./GetUserDataFunction")

app.get("/GetUserDataApi",async(req,res)=>{
  try {
    const sendUserData = await GetUserDataFunction();
    res.json(sendUserData);
  } catch (error) {
    console.error("Send User Data Api Failed", error);
  }
})


