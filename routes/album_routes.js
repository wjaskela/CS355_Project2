var express = require('express');
var router = express.Router();
var album_dal = require('../model/album_dal');
var recComp_dal = require('../model/recComp_dal');
var artist_dal = require('../model/artist_dal');
var track_dal = require('../model/track_dal');


// View All albums
router.get('/all', function(req, res) {
    album_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('album/albumViewAll', { 'result':result });
        }
    });

});

// View the album for the given id
router.get('/', function(req, res){
    if(req.query.album_id == null) {
        res.send('album_id is null');
    }
    else {
        album_dal.getById(req.query.album_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send(result)
                res.render('album/albumViewById', {'result': result});
            }
        });
    }
});

// View the tracks for the given album id
router.get('/tracks', function(req, res){
    //console.log (req.query);
    album_id = req.query['album_id'];
    if(req.query.album_id == null) {
        res.send('album_id is null');
    }
    else {
        console.log (album_id);
        track_dal.getAll(function(err,track) {
            if (err) {
                res.send(err);
            }
            else {
                albumIdArray = [];
                for (i = 0; i < track.length; i++){
                    //console.log (track[i].album_id)
                    if (track[i].album_id == album_id){
                        albumIdArray.push (track[i]);
                    }
                }
                //res.send (albumIdArray);
                //res.send(track);
                res.render('track/trackViewAllByAlbum', {'result': albumIdArray, 'album_id':album_id});
            }
        });
    }
});

// Return the add a new album form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    album_dal.getAllAlbums(function(err,result) {
        artist_dal.getAll(function(err,artist) {
            recComp_dal.getAll(function (err, recComp) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('album/albumAdd', {
                        'album': result,
                        artist: artist,
                        record_comp: recComp
                    });
                }
            });
        });
    });
});

// View the album for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == "") {
        res.send('A Title must be provided.');
    }
    else if(req.query.cover_lbl_picture == "") {
        res.send('A Cover Art picture file (.jpg, .png, etc) must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        album_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/album/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.album_id == null) {
        res.send('An album id is required');
    }
    else {
        album_dal.edit(req.query.album_id, function(err, result){
            console.log(result);
            res.render('album/albumUpdate', {album_id: result[0]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.album_id == null) {
        res.send('An album id is required');
    }
    else {
        album_dal.getById(req.query.album_id, function(err, album){
            //album_dal.getAll(function(err, album) {
            res.render('album/albumUpdate', {album: album[0]});
        });
        //});
    }

});

router.get('/update', function(req, res){
    album_dal.update(req.query, function(err, result){
        res.redirect(302, '/album/all');
    });
});

// Delete a album for the given album_id
router.get('/delete', function(req, res){
    if(req.query.album_id == null) {
        res.send('album_id is null');
    }
    else {
        album_dal.delete(req.query.album_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/album/all');
            }
        });
    }
});

module.exports = router;