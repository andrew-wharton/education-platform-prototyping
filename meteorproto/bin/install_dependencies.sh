#!/usr/bin/env bash
set -e

echo "Installing build and network/application debug dependencies"
apt-get update -y
apt-get install -y curl bzip2 build-essential python git wget inetutils-ping netcat

#echo "Installing application dependencies"
## TODO lock these dependencies to specific versions so we get more repeatable builds
#apt-get install -y openjdk-8-jre-headless imagemagick poppler-utils

#echo "Installing PhantomJS and it's dependencies"
#apt-get -y install libfreetype6 libfreetype6-dev fontconfig
#ARCH=`uname -m`
#PHANTOMJS_VERSION=2.1.1
#PHANTOMJS_TAR_FILE=phantomjs-${PHANTOMJS_VERSION}-linux-${ARCH}.tar.bz2
#cd /usr/local/share/
#curl -L -O https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-${ARCH}.tar.bz2
#tar xjf $PHANTOMJS_TAR_FILE
#ln -s -f /usr/local/share/phantomjs-${PHANTOMJS_VERSION}-linux-${ARCH}/bin/phantomjs /usr/local/share/phantomjs
#ln -s -f /usr/local/share/phantomjs-${PHANTOMJS_VERSION}-linux-${ARCH}/bin/phantomjs /usr/local/bin/phantomjs
#ln -s -f /usr/local/share/phantomjs-${PHANTOMJS_VERSION}-linux-${ARCH}/bin/phantomjs /usr/bin/phantomjs
#rm $PHANTOMJS_TAR_FILE

echo "Cleaning up apt temporary dependencies"
apt-get autoremove -y

echo " Installing Node.js"
NODE_VERSION=4.4.7
NODE_DIST=node-v${NODE_VERSION}-linux-x64
cd /tmp
curl -O -L http://nodejs.org/dist/v${NODE_VERSION}/${NODE_DIST}.tar.gz
tar xvzf ${NODE_DIST}.tar.gz
rm -rf /opt/nodejs
mv ${NODE_DIST} /opt/nodejs
ln -sf /opt/nodejs/bin/node /usr/bin/node
ln -sf /opt/nodejs/bin/npm /usr/bin/npm

echo "Cleaning out unneeded docs"
rm -rf /usr/share/doc /usr/share/doc-base /usr/share/man /usr/share/locale /usr/share/zoneinfo

echo "Cleaning out package management dirs"
rm -rf /var/lib/cache /var/lib/log

echo "Cleaning out /tmp"
rm -rf /tmp/*

echo "Clear npm cache"
npm cache clear

#echo "Installing ContainerPilot"
#CONTAINERPILOT_VERSION=2.5.1
#CP_SHA1=b56a9aff365fd9526cd0948325f91a367a3f84a1
#curl -Lso /tmp/containerpilot.tar.gz "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz"
#echo "${CP_SHA1} /tmp/containerpilot.tar.gz" | sha1sum -c
#tar zxf /tmp/containerpilot.tar.gz -C /bin
#rm /tmp/containerpilot.tar.gz

echo "Installing Meteor"
export METEOR_NO_RELEASE_CHECK=true
curl https://install.meteor.com/?release=1.4.2.3 | sh