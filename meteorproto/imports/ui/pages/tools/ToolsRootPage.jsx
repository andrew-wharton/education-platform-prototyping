import React from 'react';
import { Meteor } from 'meteor/meteor';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import './ToolsRootPage.less';

export const ToolsRootPage = React.createClass({

  render() {

    //<MainToolBar />
    return (
      <div className="tools-root-page">
        <main>
          {
            this.props.children
          }
        </main>
      </div>
    );
  }

});