import React from 'react';
import { Meteor } from 'meteor/meteor';
import './AssessmentCreator.less';

export const AssessmentCreator = React.createClass({

  render() {
    return (
      <div className="tool-assessment-creator">
        <div>Assessment Creator</div>
        {
          this.props.children
        }
      </div>
    );
  }

});