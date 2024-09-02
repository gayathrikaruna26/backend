const { MongoClient } = require("mongodb");

const url = "mongodb+srv://gayathrikaruna89:DybN4bfXp5pkDU8e@cluster0.iyp4m.mongodb.net/";
const client = new MongoClient(url);
async function GetUserDataFunction() {
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    const result = await collection.find({}).toArray();
    console.log("Data fetch successful");
    return result;
  } catch (error) {
    console.error("Error occurred while reading from MongoDB:", error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = { GetUserDataFunction };  

