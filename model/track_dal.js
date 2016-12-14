var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM track;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(track_id, callback) {
    var query = 'SELECT * FROM track WHERE track_id = ?';
    var queryData = [track_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByAlbumId = function(album_id, callback) {
    var query = 'SELECT * FROM track WHERE album_id = ?';
    var queryData = [album_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO track (first_name, last_name, email, track_id) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.first_name, params.last_name, params.email, params.track_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(track_id, callback) {
    var query = 'DELETE FROM track WHERE track_id = ?';
    var queryData = [track_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE track SET first_name = ?, last_name = ?, email = ? WHERE track_id = ?';
    var queryData = [params.first_name, params.last_name, params.email, params.track_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS track_getinfo;
 DELIMITER //
 CREATE PROCEDURE track_getinfo (_track_id int)
 BEGIN
 SELECT * FROM track WHERE track_id = _track_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL track_getinfo (4);
 */

exports.edit = function(track_id, callback) {
    var query = 'CALL track_getinfo(?)';
    var queryData = [track_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};