/**
 * Created by andrew on 6/2/17.
 */
SimpleSchema.debug = true;

var AssessmentSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  itemIds: {
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

var AssessmentMongoCollection = new Mongo.Collection("assessments");

AssessmentMongoCollection.attachSchema(AssessmentSchema);

Meteor.startup(function () {
  if(Meteor.isServer) {
    // TODO add indexes
    //AssessmentMongoCollection._ensureIndex({"field": 1});
  }
});

export default AssessmentMongoCollection