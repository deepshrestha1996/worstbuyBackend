//command
// mongod// driver intialize for mongodb open connection port 27017
//mongo client to connect to opened port


/// all the command to perform in mongo shell after mongo

// >>>>>>> (>)


// show dbs: list all database of connected server
// use <db_name> if(existing db select existion one or create new db)
// db // show selected database
// mongodb stores data in a collextion in document format
// ?so mongo db is a document based database
// documenr is object holding nested key value pair
// any valid object can be saved inside mongodb
// no any schema should be maintained to store in mongodb

//inserting data in collection
// db.<colName>insert(object) 
// db.<colName>insert(array) || db.<cpllName>.insertMany(Array)

// show collections
//// it shows all collection inside database
// fetching data
//db.<collectionName>.find({})// unformatted result
// db.<collectionName>.find({}).pretty()// formatted form
//{} empty object inside find is query to be executed in this case find all(empty query)
// db.<collName>.find({query to be executed}).count()


//////// updateing the document/////////////
//db.<collName>.update({},{},{})////possible cases
//db.<collName>.update({_id: ObjectId("")},{new value to be updated})// with query

//db.<collName>.update({_query_},{_new query_},{multi: true , upsert: true})// other than _id where multiple document can be updated


// to remove

// db.remove({}) remove all data of database
// db.remove({query to be executed});


// drop collection
// db.<collName>.drop();

/// drop database
//  debugger.dropDatabase()// drop entire database

///////////BACKUP AND RESTORE/////////////
// two ways to back up and restore
////// 1 bson structure 
////// 2 json and cv structure

////////1 bson structure///////

/////////////BACKUP/////////////
// mongodump : this will all back up all the database of our system into default dump folder
//mongodump --db <db_name>: this will back up single database
////////selected location//////
// mongodump --db <db_name> --out <filename>/<filename>

///////////////RESTORE//////////////
// mongorestore : will restore all database from default dump folder
//// restore from specific filename other then dump
///// mongorestore <path to destination db containing folder>

//////////2 json or csv strusture///////////
//// /////////////BACKUP///////////////////
/// mongoexport
/// mongoexport --db <dbname> --collection <col_name>--out <path to destination folder> filename.json




///////////////////RESTORE///////////////
///mongoimport :
/// mongoimport --db <sbname> --collection <coll_name> path_to_json_containing_folder file_name.json


///////////CSV/////////////
///////////////////BACKUP///////////////
// mongoexport --db <db_name> --collection <col_name> --type=cvs --fields 'comma, seperated,fields' --out <path_to_destionation_folder>

/////////////// RESTORE////////////
// mongoimport --db <dbName> --collection <collName> path_to_destination_csvfile --headerline




///note:- mongodump and mongorestore
//// mongoexport and mongoimport
// always comes in pair