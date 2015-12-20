This file shows this project's api/server routes.

The below information is structured thus:

```
Prefix
HTTP Verb    URI Pattern    serverController#action
HTTP Verb    URI Pattern    serverController#action
etc.
```

```
"Index"
GET  /api/       indexController#getIndex
GET  /api/check  indexController#isLoggedIn
GET  /api/info   indexController#getInfo

dest
GET  /api/dest/        destController#getDestination
GET  /api/dest/venues  destController#getVenues

group
GET     /api/group/       groupController#getUserGroups
GET     /api/group/users  groupController#getMembers
GET     /api/group/all    groupController#getInfo
POST    /api/group/       groupController#createGroup
POST    /api/group/set    groupController#setDestination
POST    /api/group/add    groupController#addMember
DELETE  /api/group/user   groupController#removeMember

rating
POST  /api/rating/         ratingController#addRating
POST  /api/rating/mod      ratingController#modifyRating
POST  /api/rating/user     ratingController#addUserRating
POST  /api/rating/usermod  ratingController#modifyUserRating
```

#The following API calls are seen on the [coggle](https://coggle.it/diagram/VnER1WcWk3oeczUt)

## DEST
GET  /api/dest/        destController#getDestination
  Get basic city info
  query: destination permalink
  response: city object

GET  /api/dest/venues  destController#getVenues
  Get all venues at a specific destination
  query: destination permalink
  response: array of venue objects


## GROUP
GET  /api/group  groupController#
  Get all groups to select groups from dropdown
  query: user object
  response: array of group objects
POST  /api/group
  Create group
  data: groupName, userInfo object, destination permalink
POST  /api/group
  Add participant (tentative)
  data: group object, user object, participant email


## ITIN
GET  /api/itin
  Get all itinerary
  query: groupId, userId
  response: array of venue objects
POST  /api/itin
  Add to itinerary
  data: groupId, userId
POST  /api/itin
  Add dates to itinerary
  data: groupId, userId, fromDate, toDate


## RATINGS
GET  /api/ratings
  Get all ratings in current group
  query: userId, groupId
  response: array of venue objects

POST  /api/ratings
  data: userId, groupId, rating
