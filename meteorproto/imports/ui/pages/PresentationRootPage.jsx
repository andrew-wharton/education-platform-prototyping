import React from 'react';
import { Meteor } from 'meteor/meteor';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import './PresentationRootPage.less';

export const PresentationRootPage = React.createClass({

  render() {
    return (
      <div className="presentation-root-page">
        <MainToolBar />
        <main>
          <h1>Presentation</h1>
        </main>
      </div>
    );
  }

});