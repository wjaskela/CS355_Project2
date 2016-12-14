var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    //var query = 'SELECT * FROM album;';
    var query = 'SELECT * FROM viewAlbumWithArtist;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAllAlbums = function(callback) {
    var query = 'SELECT * FROM album;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(album_id, callback) {
    var query = 'SELECT * FROM viewAlbumWithArtist WHERE album_id = ?';
    var queryData = [album_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    console.log (params);
    var query1 = 'INSERT INTO album (title, cover_lbl_picture, record_co_name) VALUES' +
        ' (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData1 = [params.title, params.cover_lbl_picture, params.record_co_name];

    connection.query(query1, queryData1, function(err, result) {

        var album_id = result.insertId;

        var queryAA = 'INSERT INTO artist_album (album_id, band_name) VALUES (?, ?)';

        var queryData2 = [album_id, params.band_name];

        connection.query(queryAA, queryData2, function (err, result) {
            callback(err, result);
        });
    });
};


exports.delete = function(album_id, callback) {
    var query = 'DELETE FROM album WHERE album_id = ?';
    var queryData = [album_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE album SET title = ? WHERE album_id = ?';
    var queryData = [params.title, params.album_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS album_getinfo;
 DELIMITER //
 CREATE PROCEDURE album_getinfo (_album_id int)
 BEGIN
 SELECT * FROM album WHERE album_id = _album_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL album_getinfo (4);
 */

exports.edit = function(album_id, callback) {
    var query = 'CALL album_getinfo(?)';
    var queryData = [album_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};