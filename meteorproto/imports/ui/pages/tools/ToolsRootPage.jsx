import React from 'react';
import { Meteor } from 'meteor/meteor';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import './ToolsRootPage.less';

export const ToolsRootPage = React.createClass({

  render() {
    return (
      <div className="tools-root-page">
        <MainToolBar />
        <main>
          {
            this.props.children
          }
        </main>
      </div>
    );
  }

});