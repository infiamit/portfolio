var mongoose = require("mongoose");

mongoose.connect('mongodb://' + process.env.dbuser + ':' + process.env.dbpassword + '@ds137631.mlab.com:37631/singhportfolio', {
    useNewUrlParser: true
});
var db = mongoose.connection;
var signupSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    username: {
        type: String
    }
});

var SignupChat = module.exports = mongoose.model('SignupChat', signupSchema);