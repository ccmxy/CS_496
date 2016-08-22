var db = require('../lib/db');
var Comment = require('./Comment.js');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

//Create Schema
var locationSchema = db.Schema({
  city: String,
  state: String,
  _id:false
});
var commentSchema = db.Schema({
  words: String,
  listing_name: String,
  listing_id: ObjectId
});
var listingSchema = db.Schema({
  location: locationSchema,
  comments: [commentSchema],
  name: {type: String, unique: true, required: true},
  noGuests: {type: Number, unique: false},
  price: {type: Number}
});

listingSchema.pre('remove', function(next) {
    Comment.remove({listing_id: this._id}).exec();
    next();
});


//Assign User Object
var myListing = db.mongoose.model('Listing', listingSchema);

//exports
module.exports = myListing;
