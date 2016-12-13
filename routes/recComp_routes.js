var express = require('express');
var router = express.Router();
var recComp_dal = require('../model/recComp_dal');


// View All recComps
router.get('/all', function(req, res) {
    recComp_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('recComp/recCompViewAll', { 'result':result });
        }
    });

});

// View the recComp for the given id
router.get('/', function(req, res){
    if(req.query.recComp_id == null) {
        res.send('recComp_id is null');
    }
    else {
        recComp_dal.getById(req.query.recComp_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('recComp/recCompViewById', {'result': result});
            }
        });
    }
});

// Return the add a new recComp form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    recComp_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('recComp/recCompAdd', {'recComp': result});
        }
    });
});

// View the recComp for the given id
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
        recComp_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/recComp/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.recComp_id == null) {
        res.send('An recComp id is required');
    }
    else {
        recComp_dal.edit(req.query.recComp_id, function(err, result){
            console.log(result);
            res.render('recComp/recCompUpdate', {recComp_id: result[0]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.recComp_id == null) {
        res.send('An recComp id is required');
    }
    else {
        recComp_dal.getById(req.query.recComp_id, function(err, recComp){
            //recComp_dal.getAll(function(err, recComp) {
            res.render('recComp/recCompUpdate', {recComp: recComp[0]});
        });
        //});
    }

});

router.get('/update', function(req, res){
    recComp_dal.update(req.query, function(err, result){
        res.redirect(302, '/recComp/all');
    });
});

// Delete a recComp for the given recComp_id
router.get('/delete', function(req, res){
    if(req.query.recComp_id == null) {
        res.send('recComp_id is null');
    }
    else {
        recComp_dal.delete(req.query.recComp_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/recComp/all');
            }
        });
    }
});

module.exports = router;