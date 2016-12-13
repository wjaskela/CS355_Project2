var express = require('express');
var router = express.Router();


// View About page
router.get('/', function(req, res) {
    res.render('about/about');
});

module.exports = router;