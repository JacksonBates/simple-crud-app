var mongodb = require( 'mongodb' );
var mongo = mongodb.MongoClient;
var url = process.env.URL_SHORT_MONGOLAB_URI;

mongo.connect( url, function( err, db ) {
  if ( err ) {
    console.log( 'Error: Could not connect to DB' );
  } else {
    console.log( 'Success: Connected to DB' );
  }
})
