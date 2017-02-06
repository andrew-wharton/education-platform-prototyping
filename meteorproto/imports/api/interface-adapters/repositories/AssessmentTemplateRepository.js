/**
 * Created by andrew on 6/2/17.
 */
var AssessmentTemplateRepository = new Mongo.Collection("assessment_templates");

// TODO add schema
//AssessmentTemplateRepository.attachSchema(Schema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentTemplateRepository._ensureIndex({"path": 1});
  }
});

export { AssessmentTemplateRepository }