/**
 * @fileOverview
 */
var LessonRepository = new Mongo.Collection("lessons", {
  transform: function (lesson) {
    return new Lesson()
  }
});

// TODO add schema
//LessonRepository.attachSchema(InfoPageSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //LessonRepository._ensureIndex({"path": 1});
  }
});

export { LessonRepository }