const { MongoClient } = require("mongodb");

const url ="mongodb+srv://gayathrikaruna89:DybN4bfXp5pkDU8e@cluster0.iyp4m.mongodb.net/";

const client = new MongoClient(url);

async function CheckSignInFunction(Userdata) {
  try {
    await client.connect;

    const database = client.db("test");
    const collection = database.collection("users");
    const final = await collection.findOne({
      UserName: Userdata.userName,
      Password: Userdata.password,
      Role:Userdata.Role,
    });
    return final;
  } catch (error) {
    console.error("Error  occurred while deleting from MongoDB:", error);
    throw error;
  }
}

module.exports = { CheckSignInFunction };