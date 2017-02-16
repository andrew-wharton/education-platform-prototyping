/**
 * @fileOverview Application side schema as MongoDB is schemaless
 */
var LessonSchema = new SimpleSchema({

});


var LessonMongoCollection = new Mongo.Collection("lessons");

// TODO add schema
//LessonCollection.attachSchema(LessonSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //LessonMongoCollection._ensureIndex({"path": 1});
  }
});

export { LessonMongoCollection }