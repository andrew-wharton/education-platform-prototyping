FROM ubuntu:16.04
MAINTAINER Andrew Wharton <andrew@whartonlabs.com>

# Copy the contents of our build scripts directory to the image
COPY bin/install_dependencies.sh /var/tmp/install_dependencies.sh
RUN bash /var/tmp/install_dependencies.sh