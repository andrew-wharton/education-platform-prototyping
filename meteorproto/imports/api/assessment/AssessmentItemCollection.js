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

var AssessmentItemCollection = new Mongo.Collection(
  "assessment_items"
);

AssessmentItemCollection.attachSchema(AssessmentItemSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentItemCollection._ensureIndex({"path": 1});
  }
});

export { AssessmentItemCollection }