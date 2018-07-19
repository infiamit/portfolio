var express = require('express');
var router = express.Router();
var path = require('path');
/* GET users listing. */
router.get('/', function (req, res) {

    //  res.sendFile(path.resolve('index.html'));  OR
    if(req.session.user){
        res.render('./chatViews/index', {
            user: req.session.user.username
        });
    }else
    res.redirect("/chat/login");
  
});
router.get('/logout', function (req, res) {
    req.session.destroy();
     res.send("logged out successfully");
  
});

router.get('/login', require('../controllers/chat').login);
router.post('/login', require('../controllers/chat').loginComplete);
router.get('/signup', require('../controllers/chat').signup);
router.post('/signup', require('../controllers/chat').signupComplete);

module.exports = router;