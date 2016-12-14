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
    if(req.query.name == null) {
        res.send('Record Company name is null');
    }
    else {
        recComp_dal.getById(req.query.name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('recComp/recCompViewByName', {'result': result});
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
    if(req.query.name == "") {
        res.send('Record Company Name must be provided.');
    }
    else if(req.query.founded == "") {
        res.send('Founded year must be provided');
    }
    else if(req.query.street == "") {
        res.send('A street must be provided');
    }
    else if(req.query.city == "") {
        res.send('A city must be provided');
    }
    else if(req.query.state == "") {
        res.send('A state must be provided');
    }
    else if(req.query.country == "") {
        res.send('A country must be provided');
    }
    else if(req.query.website == "") {
        res.send('A website must be provided');
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
    if(req.query.name == null) {
        res.send('A Record Company Name is required');
    }
    else {
        recComp_dal.edit(req.query.name, function(err, result){
            console.log(result);
            res.render('recComp/recCompUpdate', {name: result[0]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.name == null) {
        res.send('A Record Company Name is required');
    }
    else {
        recComp_dal.getById(req.query.name, function(err, recComp){
            //recComp_dal.getAll(function(err, recComp) {
            res.render('recComp/recCompUpdate', {record_comp: recComp[0]});
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
    if(req.query.name == null) {
        res.send('name is null');
    }
    else {
        recComp_dal.delete(req.query.name, function(err, result){
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