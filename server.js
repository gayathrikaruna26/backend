const express = require("express");
const cors = require("cors");
const { CheckSignInFunction } = require('./CheckSignInFunction');
const{GetUserDataFunction} = require("./GetUserDataFunction")
const app = express();

app.use(cors());
app.use(express.json());

//---------Port Number
const PORT = 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post("/CheckLogin", async (req, res) => {
  try {
    const receivedUserData = req.body;
    console.log(receivedUserData);

    const data = await CheckSignInFunction(receivedUserData);

    if (data) {
      res.json({ message: "User Found" });
    } else if (data === null) {
      res.json({ message: "User Not Found" });
    } else {
      res.status(400).json({ message: "Unexpected Error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error("Server Error:", error);
  }
});



//-------- getting whole data from db to frontend
app.get("/WholeData", async (req, res) => {
  try {
    const sendUserData = await GetUserDataFunction();
    res.json(sendUserData);
  } catch (error) {
    console.error("Send User Data Api Failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


