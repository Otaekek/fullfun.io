var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('games', { title: 'Express' });
});

router.get('/feverkey', function(req, res, next) {
  res.render('games/feverkey', { title: 'Express' });
});

module.exports = router;