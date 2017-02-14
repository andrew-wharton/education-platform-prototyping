/**
 * @fileOverview
 */
var LessonCollection = new Mongo.Collection("lessons");

// TODO add schema
//LessonCollection.attachSchema(InfoPageSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //LessonCollection._ensureIndex({"path": 1});
  }
});

export { LessonCollection }