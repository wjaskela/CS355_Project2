var express = require('express');
var router = express.Router();
var artist_dal = require('../model/artist_dal');


// Search artists
router.get('/search', function(req, res) {
    artist_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('artist/artistViewAll', { 'result':result });
        }
    });

});


// View All artists
router.get('/all', function(req, res) {
    artist_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('artist/artistViewAll', { 'result':result });
        }
    });

});

// View the artist for the given id
router.get('/', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
        artist_dal.getById(req.query.artist_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('artist/artistViewById', {'result': result});
            }
        });
    }
});

// Return the add a new artist form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    artist_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('artist/artistAdd', {'artist': result});
        }
    });
});

// View the artist for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.first_name == "") {
        res.send('First name must be provided.');
    }
    else if(req.query.last_name == "") {
        res.send('Last name must be provided');
    }
    else if(req.query.email == "") {
        res.send('An email must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        artist_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.artist_id == null) {
        res.send('An artist id is required');
    }
    else {
        artist_dal.edit(req.query.artist_id, function(err, result){
            console.log(result);
            res.render('artist/artistUpdate', {artist_id: result[0]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.artist_id == null) {
        res.send('An artist id is required');
    }
    else {
        artist_dal.getById(req.query.artist_id, function(err, artist){
            //artist_dal.getAll(function(err, artist) {
            res.render('artist/artistUpdate', {artist: artist[0]});
        });
        //});
    }

});

router.get('/update', function(req, res){
    artist_dal.update(req.query, function(err, result){
        res.redirect(302, '/artist/all');
    });
});

// Delete a artist for the given artist_id
router.get('/delete', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
        artist_dal.delete(req.query.artist_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});

module.exports = router;