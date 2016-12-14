var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM artist;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByBand = function(band_name, callback) {
    var query = 'SELECT * FROM artist WHERE band_name = ?';
    var queryData = [band_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO artist (first_name, last_name, email, artist_id) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.first_name, params.last_name, params.email, params.artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(artist_id, callback) {
    var query = 'DELETE FROM artist WHERE artist_id = ?';
    var queryData = [artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE artist SET first_name = ?, last_name = ?, email = ? WHERE artist_id = ?';
    var queryData = [params.first_name, params.last_name, params.email, params.artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS artist_getinfo;
 DELIMITER //
 CREATE PROCEDURE artist_getinfo (_artist_id int)
 BEGIN
 SELECT * FROM artist WHERE artist_id = _artist_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL artist_getinfo (4);
 */

exports.edit = function(artist_id, callback) {
    var query = 'CALL artist_getinfo(?)';
    var queryData = [artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};