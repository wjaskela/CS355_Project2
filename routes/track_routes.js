var express = require('express');
var router = express.Router();
var track_dal = require('../model/track_dal');


// View All tracks
router.get('/all', function(req, res) {
    track_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('track/trackViewAll', { 'result':result });
        }
    });

});

// View the track for the given Album id
router.get('/', function(req, res){
    if(req.query.track_id == null) {
        res.send('track_id is null');
    }
    else {
        track_dal.getById(req.query.track_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('track/trackViewById', {'result': result});
            }
        });
    }
});

// Return the add a new track form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    track_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('track/trackAdd', {'track': result});
        }
    });
});

// View the track for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.track_number == "") {
        res.send('A Track Number must be provided.');
    }
    if(req.query.title == "") {
        res.send('Title must be provided.');
    }
    else if(req.query.duration == "") {
        res.send('Duration must be provided');
    }
    else {
        track_dal.getByAlbumId(req.query, function(err, result) {
            // passing all the query parameters (req.query) to the insert function instead of each individually
            track_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/album/all');
                }
            });
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.track_id == null) {
        res.send('An track id is required');
    }
    else {
        track_dal.edit(req.query.track_id, function(err, result){
            console.log(result);
            res.render('track/trackUpdate', {track_id: result[0]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.track_id == null) {
        res.send('An track id is required');
    }
    else {
        track_dal.getById(req.query.track_id, function(err, track){
            //track_dal.getAll(function(err, track) {
            //res.send(track);
            res.render('track/trackUpdate', {track: track[0]});
        });
        //});
    }

});

router.get('/update', function(req, res){
    track_dal.getByAlbumId(req.query, function(err, result) {
        track_dal.update(req.query, function (err, result) {
        });
        //res.redirect(302, '/album/all');
        var myStr = '/album/tracks/?album_id=' + req.query.album_id;
        res.redirect(302, myStr);
    });
});

// Delete a track for the given track_id
router.get('/delete', function(req, res){
    if(req.query.track_id == null) {
        res.send('track_id is null');
    }
    else {
        track_dal.delete(req.query.track_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/track/all');
            }
        });
    }
});

module.exports = router;