var mongoose= require("mongoose");

mongoose.connect('mongodb://'+process.env.dbuser+':'+process.env.dbpassword+'@ds137631.mlab.com:37631/singhportfolio' ,{ useNewUrlParser: true });
var db= mongoose.connection;
var userSchema= mongoose.Schema({
name:{
    type: String
},
email: {
    type: String
},
phone:{
    type:String
},
message:{
    type:String
} 
});

var ContactForm= module.exports = mongoose.model('ContactForm', userSchema);


