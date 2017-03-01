/**
 * @fileOverview Application side schema as MongoDB is schemaless
 */
var LessonContentItemSchema = new SimpleSchema({
  type: {
    type: String
  },
  data: {
    type: Object,
    blackbox: true,
    optional: true
  }
});

var LessonContentItemMongoCollection = new Mongo.Collection("lesson_content_items");

//LessonContentItemMongoCollection.attachSchema(LessonContentItemSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //LessonMongoCollection._ensureIndex({"path": 1});
  }
});

export default LessonContentItemMongoCollection