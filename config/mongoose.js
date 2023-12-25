const mongoose=require('mongoose');
const env=require('./environment');
let db;
async function main(){
    // mongoose.js and environment.js
    db = await mongoose.connect(`mongodb+srv://aryannayak9131:AhGzJJtziaZKPCYo@cluster0.luuffqt.mongodb.net/${env.db}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           });
} 
 
main().then(()=>{
    console.log("DB connected");
}).catch(err => console.log(err));

module.exports=db;
