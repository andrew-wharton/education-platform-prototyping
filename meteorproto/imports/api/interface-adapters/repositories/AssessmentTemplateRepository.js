/**
 * Created by andrew on 6/2/17.
 */
SimpleSchema.debug = true;

var AssessmentTemplateSchema = new SimpleSchema({
  title: {
    type: String
  },
  items: {
    type: [String]
  },
  tags: {
    type: [String]
  },
  attributes: {
    type: Object,
    blackbox: true
  }
});

var AssessmentTemplateRepository = new Mongo.Collection("assessment_templates");

AssessmentTemplateRepository.attachSchema(AssessmentTemplateSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentTemplateRepository._ensureIndex({"field": 1});
  }
});

export { AssessmentTemplateRepository }