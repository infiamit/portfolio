var SignupChat = require('../models/chat');
//var bcrypt = require('bcrypt');

module.exports.loginComplete = function (req, res) {




    var password = req.body.password;
    var username = req.body.username;
    var email = req.body.username;
    req.checkBody('username', 'username/email required').notEmpty();
    req.checkBody('password', 'password required').notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("./chatViews/login", {
            error: error
        });

    } else {
        req.checkBody('username', 'username/email required').isEmail();
        var error = req.validationErrors();
        if (error) {
            SignupChat.findOne({
                username: username
            }, function (error, data) {
                if (error) throw error;
                if (data) {
                  /*  bcrypt.compare(password, data.password, function (error, bool) {
                        if (error) throw error;
                        if (bool == false) {
                            res.render("./chatViews/login", {
                                error: [{
                                    msg: "wrong username/password"
                                }]
                            });
                        } else {

                            req.session.user = {
                                email: data.email,
                                password: data.password,
                                username:username
                            };

                            res.redirect("/chat");
                        }
                    });*/
                } else {
                    res.render("./chatViews/login", {
                        error: [{
                            msg: "wrong username/password"
                        }]
                    });
                }

            });
        } else {
            SignupChat.findOne({
                email: email
            }, function (error, data) {
                if (error) throw error;

                if (!data) {
                    res.render("./chatViews/login", {
                        error: [{
                            msg: "wrong username/password"
                        }]
                    });
                } else {

                   /* bcrypt.compare(password, data.password, function (error, bool) {
                        if (error) throw error;
                        if (bool == false) {
                            res.render("./chatViews/login", {
                                error: [{
                                    msg: "wrong username/password"
                                }]
                            });
                        } else {
                            req.session.user = {
                                email: data.email,
                                password: data.password,
                                username:username
                            };

                            res.redirect("/chat");
                        }
                    });
*/

                }

            });


        }

    }
}



module.exports.login = function (req, res) {
    if (req.session.user) {
        res.redirect("/chat");
    } else {

        res.render("./chatViews/login");
        console.log(req.session);
    }

}
module.exports.signup = function (req, res) {
    if(req.session.user){
        res.redirect("/chat");
    }else{
        res.render("./chatViews/registration");
    }
    
}

module.exports.signupComplete = function (req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    req.checkBody('first_name', 'first Required').notEmpty();
    req.checkBody('last_name', 'last name Required').notEmpty();
    req.checkBody('email', 'Wrong Email Address').isEmail();
    req.checkBody('password', 'password required').notEmpty();
    req.checkBody('password_confirmation', 'password did not match').equals(req.body.password);
    req.checkBody('username', 'username required').notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("./chatViews/registration", {
            error: error
        });

    } else {
        SignupChat.findOne({
            email: email
        }, function (error, result) {
            if (error) throw error;
            console.log(result);
            if (result) {
                res.render("./chatViews/registration", {
                    error: [{
                        msg: "username exist in database"
                    }]
                });
            } else {

              /*  bcrypt.hash(password, 10, function (err, hash) {
                    if (error) throw error;

                    var newSignup = new SignupChat({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        username: username,
                        password: hash
                    });

                    newSignup.save(function (error) {
                        if (error) throw error;

                        req.session.user = {
                            email: email,
                            password: hash,
                            username:username
                        };
                        res.render("./chatViews/registration", {
                            success: "Registration successful"
                        });
                    });
                });

*/

            }
        });


    }



}