import React from 'react';
import { Meteor } from 'meteor/meteor';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import './ReportingRootPage.less';

export const ReportingRootPage = React.createClass({

  render() {
    return (
      <div className="reporting-root-page">
        <MainToolBar />
        <main>
          <h1>Reporting</h1>
        </main>
      </div>
    );
  }

});