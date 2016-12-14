var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM record_comp;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(record_comp_id, callback) {
    var query = 'SELECT * FROM record_comp WHERE record_comp_id = ?';
    var queryData = [record_comp_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO record_comp (first_name, last_name, email, record_comp_id) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.first_name, params.last_name, params.email, params.record_comp_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(record_comp_id, callback) {
    var query = 'DELETE FROM record_comp WHERE record_comp_id = ?';
    var queryData = [record_comp_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE record_comp SET first_name = ?, last_name = ?, email = ? WHERE record_comp_id = ?';
    var queryData = [params.first_name, params.last_name, params.email, params.record_comp_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS record_comp_getinfo;
 DELIMITER //
 CREATE PROCEDURE record_comp_getinfo (_record_comp_id int)
 BEGIN
 SELECT * FROM record_comp WHERE record_comp_id = _record_comp_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL record_comp_getinfo (4);
 */

exports.edit = function(record_comp_id, callback) {
    var query = 'CALL record_comp_getinfo(?)';
    var queryData = [record_comp_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};