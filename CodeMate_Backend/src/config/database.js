const mongoose=require("mongoose");
const connectDb=async()=>{
 await mongoose.connect("mongodb+srv://qureshimoh23:fqRrf3L0PmvxVm3w@cluster0.7nvqb0c.mongodb.net/devTin");

}

module.exports=connectDb;
