/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.login_table + '` ( \
    `username` VARCHAR(45) NOT NULL, \
    PRIMARY KEY (`username`) \
    ) ');

console.log('Success: ' + dbconfig.login_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.client_table + '` ( \
    `idclient` INT NOT NULL, \
    `name` VARCHAR(45) NOT NULL, \
    `prefix` VARCHAR(45) NOT NULL, \
    `degree` VARCHAR(45) NULL, \
    `description` VARCHAR(45) NULL, \
    `section` VARCHAR(45) NULL, \
    `client_iduser` INT NOT NULL, \
    PRIMARY KEY (`idclient`, `client_iduser`) \
      ) ');

console.log('Success: ' + dbconfig.client_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.time_slot_table + '` ( \
    `idtime_slot` INT NOT NULL, \
    `day` VARCHAR(45) NOT NULL, \
    `inTime` VARCHAR(45) NOT NULL, \
    `outTime` VARCHAR(45) NOT NULL, \
    PRIMARY KEY (`idtime_slot`) \
    ) ');

console.log('Success: ' + dbconfig.time_slot_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.ClientOrg_table + '` ( \
    `idClientOrg` INT NOT NULL, \
    `orgName` VARCHAR(45) NOT NULL, \
    `owner` VARCHAR(45) NOT NULL, \
    PRIMARY KEY (`idClientOrg`) \
    ) ');

console.log('Success: ' + dbconfig.ClientOrg_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.channelling_center_table + '` ( \
    `idchannelling_center` INT NOT NULL, \
    `centerName` VARCHAR(45) NOT NULL, \
    `address` VARCHAR(45) NOT NULL, \
    `telNo` VARCHAR(45) NOT NULL, \
    `ClientOrg_idClientOrg` INT NOT NULL, \
    PRIMARY KEY (`idchannelling_center`, `ClientOrg_idClientOrg`) \
    ) ');

console.log('Success: ' + dbconfig.channelling_center_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.client_available_time_slot_table + '` ( \
    `id` INT NOT NULL, \
    `client_idclient` INT NOT NULL, \
    `channelling_center_idchannelling_center` INT NOT NULL, \
    `time_slot_idtime_slot` INT NOT NULL, \
    PRIMARY KEY (`id`, `client_idclient`, `channelling_center_idchannelling_center`, `time_slot_idtime_slot`) \
    )');

console.log('Success: ' + dbconfig.client_available_time_slot_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `iduser` VARCHAR(45) NOT NULL, \
    `password` VARCHAR(45) NOT NULL, \
    `name` VARCHAR(45) NOT NULL, \
    `address` VARCHAR(45) NOT NULL, \
    `tele` VARCHAR(45) NOT NULL, \
    `email` VARCHAR(45) NOT NULL, \
    `regDate` VARCHAR(45) NOT NULL, \
    PRIMARY KEY (`iduser`) \
)');

console.log('Success: ' + dbconfig.users_table + ' Created')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.client_channelling_user_table + '` ( \
    `channelling_center_time_slot_id` INT NOT NULL, \
    `user_iduser` INT NOT NULL, \
    PRIMARY KEY (`channelling_center_time_slot_id`, `user_iduser`) \
)');

console.log('Success: ' + dbconfig.client_channelling_user_table + ' Created')

console.log('Success: Database Created!')

connection.end();
