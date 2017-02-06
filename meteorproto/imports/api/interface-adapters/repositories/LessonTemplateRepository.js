/**
 * @fileOverview
 */
var LessonRepository = new Mongo.Collection("lessons", {
  transform: function (le) {
    //mediaData.signedDownloadUrl =
    return new Lesson()
  }
});

// TODO add schema
//LessonTemplateRepository.attachSchema(InfoPageSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //LessonTemplateRepository._ensureIndex({"path": 1});
  }
});

export { LessonTemplateRepository }