FROM ubuntu:16.04
MAINTAINER Andrew Wharton <andrew@whartonlabs.com>

# Copy the contents of our build scripts directory to the image
COPY bin/install_dependencies.sh /var/tmp/install_dependencies.sh

# Copy across our build script
COPY bin/build_app.sh /opt/build_app.sh
#COPY bin/sensor.sh /usr/local/bin/sensor.sh

# Copy our app source code across.
# This needs to line up with the directory in the build script
COPY ./ /var/tmp/app

# Build our app
RUN bash /opt/build_app.sh

# Copy across the ContainerPilot configuration
#COPY containerpilot.json /etc/containerpilot.json
#ENV CONTAINERPILOT=file:///etc/containerpilot.json

# Tell node to run on port 3000
ENV PORT=3000

# Defines the default command to run when starting the container.
# This needs to line up with the path used in the build script for the built app
ENTRYPOINT [ "node", "/opt/built_app/main.js" ]
#ENTRYPOINT [ "/bin/containerpilot", "node", "--expose-gc", "/opt/built_app/main.js" ]