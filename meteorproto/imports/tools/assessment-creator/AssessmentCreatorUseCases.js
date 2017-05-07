"use strict";

import _ from 'lodash';
import vasync from 'vasync';
import VError from 'verror';
import assert from 'assert-plus';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import AssessmentItem from '/imports/api/assessment-item/AssessmentItem.js';
import { AssessmentItemType }
  from '/imports/api/assessment-item/AssessmentItemType.js';

/**
 * Responsible for implementing the application functionality required for the
 * assessment creation and editing.
 *
 */
export class AssessmentCreatorUseCases {

  constructor({assessmentCollection, assessmentItemCollection}) {
    this._assessmentCollection = assessmentCollection;
    this._assessmentItemCollection = assessmentItemCollection;
  }

  /**
   *
   * @param assessment
   * @param {function} callback
   */
  createAssessment({assessment, ownerId}, callback) {
    try {

      assert.object(assessment, 'assessment');
      assert.optionalFunc(callback, 'callback');

      var templateAssessment = {
        title: "",
        itemIds: [],
        tags: [],
        attributes: {},
        ownerId: ownerId
      };

      _.extend(templateAssessment, assessment);

      this._assessmentCollection.insert(
        templateAssessment,
        function handleInsertResult(err, assessmentId) {
          if(err) {
            callback(new VError(err, "AssessmentCreatorUseCases.createAssessment->handleInsertResult"));
          } else {
            callback(null, assessmentId);
          }
        }
      );

    } catch(err) {
      setTimeout(function() {
        callback(new VError(err, "AssessmentCreatorUseCases.createAssessment"));
      }, 0);
    }
  }

  /**
   * Creates a copy of the Assessment and all it's AssessmentItems, setting the
   *
   *
   * @param {object} args
   * @param {string} args.assessmentId
   * @param {string} args.ownerId
   * @param {function} callback
   */
  deepCloneAssessment({assessmentId, ownerId}, callback) {
    try {

      var self = this;

      assert.string(assessmentId, 'assessmentId');
      assert.string(ownerId, 'ownerId');
      assert.optionalFunc(callback, 'callback');

      var assessmentToClone = this._assessmentCollection.findOne(assessmentId);

      if(assessmentToClone) {

        var clonedItemIds = [];

        vasync.waterfall([
          Meteor.bindEnvironment(function cloneAssessmentItems(next) {

            var assessmentItems = self._assessmentItemCollection.find({
              _id: {
                $in: assessmentToClone.itemIds
              }
            }).fetch();

            assessmentItems.forEach(function(it) {
              it.parentId = it._id;
              it._id = Random.id();
              clonedItemIds.push(it._id);
            });

            self._assessmentItemCollection.rawCollection().insert(
              assessmentItems,
              next
            );
          }),
          Meteor.bindEnvironment(function cloneAssessment(numberOfDocsInserted, next) {

            // Add a 'link' back to the assessment from which it was cloned
            assessmentToClone.parentId = assessmentToClone._id;
            assessmentToClone._id = Random.id();
            assessmentToClone.itemIds = clonedItemIds;
            assessmentToClone.ownerId = ownerId;

            self._assessmentCollection.insert(
              assessmentToClone,
              function handleResult(err, clonedAssessmentId) {
                if(err) {
                  callback(new VError(err, 'cloneAssessment->handleResult'));
                } else {
                  callback(null, clonedAssessmentId);
                }
              }
            );
          })
        ], function handleWaterfallResult(err, result) {
          if(err) {
            callback(
              new VError(err, "AssessmentCreatorUseCases.deepCloneAssessment" +
                "->handleWaterfallResult")
            );
          } else {
            callback(null, result)
          }
        });

      } else {
        callback(new VError(err, "AssessmentCreatorUseCases.deepCloneAssessment"))
      }

    } catch(err) {
      setTimeout(function() {
        callback(new VError(err, "AssessmentCreatorUseCases.deepCloneAssessment"));
      }, 0);
    }
  }

  /**
   *
   * @param assessmentId
   * @param newValue
   * @param callback
   */
  updateAssessmentTitle(assessmentId, newValue, callback) {
    this._assessmentCollection.update(
      {
        _id: assessmentId
      },
      {
        $set: {
          title: newValue
        }
      },
      function handleResult(err, numberOfDocsUpdated) {
        if(err) {
          callback(new VError(err, "AssessmentCreatorUseCases.updateAssessmentTitle"));
        } else {
          callback(null, numberOfDocsUpdated);
        }
      }
    );
  }

  /**
   * Adds a new assessment item to an existing assessment
   *
   * @param assessmentId
   * @param item
   * @param cb
   */
  addNewItemToAssessment(assessmentId, item, cb) {

    var templateItem = new AssessmentItem().toObject();

    _.extend(templateItem, item);
    templateItem.ownerId = Meteor.userId();

    var itemId = this._assessmentItemCollection.insert(templateItem);

    this._assessmentCollection.update(
      {
        _id: assessmentId
      },
      {
        $push: {
          "itemIds": itemId
        }
      }
    );

  }

  /**
   *
   * @param assessmentItemId
   * @param value
   */
  updateAssessmentItemQuestion(assessmentItemId, value) {
    this._assessmentItemCollection.update(
      {
        _id: assessmentItemId
      },
      {
        $set: {
          question: value
        }
      }
    );
  }

  /**
   *
   * @param assessmentItemId
   * @param choice
   */
  addChoiceToAssessmentItem(assessmentItemId, choice) {

    choice.identifier = Random.id();

    this._assessmentItemCollection.update(
      {
        _id: assessmentItemId,
        // Choices can only be added to multi choice questions
        type: AssessmentItemType.MULTIPLE_CHOICE
      },
      {
        $push: {
          'choices': choice
        }
      }
    );
  }

  /**
   *
   */
  updateAssessmentItemChoiceAnswer(context, answer) {
    this._assessmentItemCollection.update(
      {
        _id: context.assessmentItemId,
        'choices.identifier': context.choiceIdentifier
      },
      {
        $set: {
          'choices.$.answer': answer
        }
      }
    );
  }

  updateAssessmentItemChoiceIsCorrect(context, isCorrect) {
    this._assessmentItemCollection.update(
      {
        _id: context.assessmentItemId,
        'choices.identifier': context.choiceIdentifier
      },
      {
        $set: {
          'choices.$.isCorrect': isCorrect
        }
      }
    );
  }

  removeAssessmentItemChoiceAnswer(context) {
    this._assessmentItemCollection.update(
      {
        _id: context.assessmentItemId
      },
      {
        $pull: {
          'choices': {
            identifier: context.choiceIdentifier
          }
        }
      }
    );
  }

}