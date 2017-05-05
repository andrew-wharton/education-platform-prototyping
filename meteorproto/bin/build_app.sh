#!/usr/bin/env bash
set -e

echo "Building application"
APP_PATH=/var/tmp/app
COPIED_APP_PATH=/var/tmp/copied-app
BUNDLE_DIR=/var/tmp/bundled-app
BUILT_APP_PATH=/opt/built_app

# Sometimes, directly copied folder cause some wierd issues, this fixes that...
echo "Copying app to temporary directory for building"
cp -R $APP_PATH $COPIED_APP_PATH
cd $COPIED_APP_PATH

echo "Running pre-build 'meteor npm install'"
meteor npm install

echo "Running 'meteor build'"
meteor build --directory $BUNDLE_DIR --unsafe-perm

cd $BUNDLE_DIR/bundle/programs/server/

echo "Running post-build 'npm install'"
npm install

echo "Copying bundle to directory from where it will be run"
mv $BUNDLE_DIR/bundle $BUILT_APP_PATH

echo "Removing original source code and intermediate build artifacts"
rm -rf $APP_PATH
rm -rf $COPIED_APP_PATH
rm -rf $BUNDLE_DIR

echo "Removing Meteor installation"
rm -rf ~/.meteor
rm /usr/local/bin/meteor