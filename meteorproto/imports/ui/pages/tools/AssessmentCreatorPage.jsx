import React from 'react';
import { Meteor } from 'meteor/meteor';
import { AssessmentCreatorContainer }
  from '/imports/tools/assessment-creator/ui/AssessmentCreator.jsx';
//import './AssessmentCreatorPage.less';

/**
 *
 */
export const AssessmentCreatorPage = React.createClass({

  render() {
    return (
      <AssessmentCreatorContainer
        path="/tools/assessment-creator"
        assessmentId={this.props.params.assessmentId} />
    );
  }

});