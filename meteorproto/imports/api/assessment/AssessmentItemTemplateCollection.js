/**
 * Created by andrew on 6/2/17.
 */

SimpleSchema.debug = true;

var ChoiceSchema = new SimpleSchema({
  choiceId: {
    type: String
  },
  answer: {
    type: String
  }
});

var AssessmentItemTemplateSchema = new SimpleSchema({
  // The type of item, eg. Multiple Choice, Short Answer, Essay, Project
  type: {
    type: String
  },
  question: {
    type: String
  },
  choices: {
    type: [ChoiceSchema],
    optional: true
  },
  correctChoices: {
    type: [String],
    optional: true
  },
  taskDescription: {
    type: String,
    optional: true
  },
  tags: {
    type: [String]
  },
  attributes: {
    type: Object,
    blackbox: true
  }
});

var AssessmentItemTemplateCollection = new Mongo.Collection(
  "assessment_item_templates"
);

AssessmentItemTemplateCollection.attachSchema(AssessmentItemTemplateSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentItemTemplateCollection._ensureIndex({"path": 1});
  }
});

export { AssessmentItemTemplateCollection }