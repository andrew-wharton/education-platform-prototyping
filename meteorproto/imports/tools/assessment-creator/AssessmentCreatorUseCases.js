"use strict";

import _ from 'lodash';
import vasync from 'vasync';
import VError from 'verror';
import assert from 'assert-plus';
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
  createAssessment(assessment, callback) {
    try {

      assert.object(assessment, 'assessment');
      assert.optionalFunc(callback, 'callback');

      var templateAssessment = {
        title: "",
        itemIds: [],
        tags: [],
        attributes: {}
      };

      _.extend(templateAssessment, assessment);

      this._assessmentCollection.insert(assessment, function(err, assessmentId) {
        if(err) {
          callback(new VError(err, "AssessmentCreatorUseCases.createAssessment.create"));
        } else {
          callback(null, assessmentId);
        }
      });

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
   * @param callback
   */
  deepCloneAssessment({assessmentId, ownerId}, callback) {
    try {

      assert.string(assessmentId, 'assessmentId');
      assert.string(ownerId, 'ownerId');
      assert.optionalFunc(callback, 'callback');

      var assessmentToClone = this._assessmentCollection.findOne(assessmentId);

      if(assessmentToClone) {

        var clonedItemIds = [];

        vasync.waterfall([
          function cloneAssessmentItems(next) {

            var assessmentItems = this._assessmentItemCollection.find({
              id: {
                $in: assessmentToClone.itemsIds
              }
            }).fetch();

            assessmentItems.forEach(function(it) {
              it.parentId = it._id;
              it._id = Random.id();
              clonedItemIds.push(it._id);
            });

            this._assessmentItemCollection.rawCollection().insert(
              assessmentItems,
              {
                removeEmptyStrings: false
              },
              next
            );
          },
          function cloneAssessment(numberOfDocsInserted, next) {

            // Add a 'link' back to the assessment from which it was cloned
            assessmentToClone.parentId = assessmentToClone._id;
            assessmentToClone._id = Random.id();
            assessmentToClone.itemIds = clonedItemIds;
            assessmentToClone.ownerId = ownerId;

            this._assessmentCollection.insert(
              assessmentToClone,
              function handleResult(err, clonedAssessmentId) {
                if(err) {
                  callback(new VError(err, 'cloneAssessment->handleResult'));
                } else {
                  callback(null, clonedAssessmentId);
                }
              }
            );
          }
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