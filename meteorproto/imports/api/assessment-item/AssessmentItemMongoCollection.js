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

var AssessmentItemSchema = new SimpleSchema({
  // The type of item, eg. Multiple Choice, Short Answer, Essay, Project
  type: {
    type: String
  },
  question: {
    type: String,
    defaultValue: ""
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
    type: [String],
    defaultValue: []
  },
  attributes: {
    type: Object,
    blackbox: true
  }
});

var AssessmentItemMongoCollection = new Mongo.Collection(
  "assessment_items"
);

AssessmentItemMongoCollection.attachSchema(AssessmentItemSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentItemMongoCollection._ensureIndex({"path": 1});
  }
});

export default AssessmentItemMongoCollection