const mongoose=require('mongoose');
const env=require('./environment');
let db;
async function main(){
    db=await mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`)
} 
 
main().then(()=>{
    console.log("DB connected");
}).catch(err => console.log(err));

module.exports=db;