import React from 'react';
import { Meteor } from 'meteor/meteor';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import './PlanningRootPage.less';

export const PlanningRootPage = React.createClass({

  render() {
    return (
      <div className="planning-root-page">
        <MainToolBar />
        <main>
          <h1>Planning</h1>
        </main>
      </div>
    );
  }

});