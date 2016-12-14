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
    var query = 'INSERT INTO artist (band_name, singer_name, date_formed, origin_city,' +
        ' origin_state, genre, website) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.band_name, params.singer_name, params.date_formed, params.origin_city,
                     params.origin_state, params.genre, params.website];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(band_name, callback) {
    var query = 'DELETE FROM artist WHERE band_name = ?';
    var queryData = [band_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE artist SET singer_name = ?, date_formed = ?, genre = ?, website' +
        ' = ? WHERE band_name = ?';
    var queryData = [params.singer_name, params.date_formed, params.genre, params.website, params.band_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS artist_getinfo;
 DELIMITER //
 CREATE PROCEDURE artist_getinfo (_band_name int)
 BEGIN
 SELECT * FROM artist WHERE band_name = _band_name;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL artist_getinfo (4);
 */

exports.edit = function(band_name, callback) {
    var query = 'CALL artist_getinfo(?)';
    var queryData = [band_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};