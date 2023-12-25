const mongoose=require('mongoose');
const env=require('./environment');
let db;
async function main(){
    db=await mongoose.connect(`mongodb+srv://aryannayak9131:AhGzJJtziaZKPCYo@cluster0.luuffqt.mongodb.net/${env.db}?retryWrites=true&w=majority`)
} 
 
main().then(()=>{
    console.log("DB connected");
}).catch(err => console.log(err));

module.exports=db;
