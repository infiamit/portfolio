var ContactForm = require('../models/contactform');
 
 module.exports = function(req,res,next){
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
     res.render('index', { error: error , title: 'My Portfolio' });
      
    }else{
      var newContact= new ContactForm({
        name:name,
         email:email,
         phone:phone,
        message:message
      });
      
      newContact.save();
      res.render('index', { title: 'My Portfolio', success:'Your Message Successfully Received...' });

    }
    
   }