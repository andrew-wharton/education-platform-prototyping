/**
 * @fileOverview Application side schema as MongoDB is schemaless
 */
var LessonSchema = new SimpleSchema({
  startAt: {
    type: Date
  },
  endAt: {
    type: Date,
    optional: true
  },
  program: {
    type: [String]
  }
});


var LessonMongoCollection = new Mongo.Collection("lessons");

// TODO add schema
LessonMongoCollection.attachSchema(LessonSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //LessonMongoCollection._ensureIndex({"path": 1});
  }
});

export { LessonMongoCollection }