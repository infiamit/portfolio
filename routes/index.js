var express = require('express');
var router = express.Router();
var ContactForm = require('../models/contactform');
/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('index', { title: 'My Portfolio' });
});


router.post('/', function(req,res,next){
  var name=req.body.name;
  var email=req.body.email;
  var phone=req.body.phone;
  var message=req.body.message;
  
  req.checkBody('name','Email Required').notEmpty();
  req.checkBody('email','Wrong Email Address').isEmail();
  req.checkBody('phone','Invalid Phone Number').notEmpty();
  req.checkBody('message','Message Field Required').notEmpty();

  var error=req.validationErrors();
  if(error){
    res.render('index', { error: error ,title: 'My Portfolio' });
  }else{
    var newContact= new ContactForm({
      name:name,
       email:email,
       phone:phone,
      message:message
    });
    newContact.save();
    console.log(process.env.dbpassword);
  }
  
  res.render('index', { title: 'My Portfolio', success:'Your Message Successfully Received...' });
});

module.exports = router;
