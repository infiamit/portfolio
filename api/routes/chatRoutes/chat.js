var express = require('express');
var router = express.Router();
var path = require('path');
/* GET users listing. */
router.get('/', function (req, res) {
   res.json({success:true});
});

module.exports = router;