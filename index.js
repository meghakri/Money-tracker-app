var express =  require( "express")

var bodyParser = require("body-parser")

var mongoose = require("mongoose")



const app= express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://money database/MoneyList',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db=mongoose.connection
db.on('error',()=>console.log("Error in connecting to the Data Base"))
db.once('open',()=>console.log("connected to Data Base"))
app.post("/add",(req,res)=>{
    var category_select=req.body.category_select
    var amount_input=req.body.amount_input
    var info=req.body.info
    var date_input=req.body.date_input
   
    var data={
        "Category":category_select,
        "Amount":amount_input,
        "Info":info,
        "Date":date_input
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        
        if(err){
            throw err;
        }
        console.log("record Inserted Successfully")
    })
}
)
app.get("/",(req,res)=> {
    res.set({
        "Allow-access-Allow_orgin":'*'
    })
    return res.redirect('index.html')

}).listen(5000)

console.log("listening on port 5000")