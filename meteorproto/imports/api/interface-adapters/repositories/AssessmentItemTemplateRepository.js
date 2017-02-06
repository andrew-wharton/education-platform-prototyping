/**
 * Created by andrew on 6/2/17.
 */
var AssessmentItemTemplateRepository = new Mongo.Collection("assessment_item_templates");

// TODO add schema
//AssessmentItemTemplateRepository.attachSchema(Schema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentItemTemplateRepository._ensureIndex({"path": 1});
  }
});

export { AssessmentItemTemplateRepository }