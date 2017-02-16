# education-platform-prototyping

This is a home for note taking, prototyping and testing out ideas related to a 
framework and set of tools for helping teachers to be more efficient and 
effective in the classroom.

# Getting Started

At present we're in the mode of sketching out use cases and requirements as 
well as prototyping some of the use cases to find a useful domain model to
support the functionality we'd like.

## Meteor

Under [/meteorproto](/meteorproto) is a [Meteor](https://www.meteor.com/) 
which will be used as a framework to provide some generic components to support 
the use cases ie. persistence (to MongoDB), server/client connectivity (DDP), 
user auth etc.

### Running the app

0. Clone the repository
0. Install [Meteor](https://www.meteor.com/)
0. `$ cd meteorproto`
0. `$ meteor npm install`
0. `$ meteor`

## Node/Postgres

Under [/nodepostgresproto](/nodepostgresproto) is a framework-less application 
which will implement the same use cases using different persistence, 
server/client connectivity, UI etc. This is mainly as a check to ensure our 
use cases are cleanly separated from the external services.
