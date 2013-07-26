# Introduction and Description

__braamies__ is community-based project management tool. It allows members of a community to submit project ideas that can be solved using IT. Other members of the community with technical skills can then join hands and develop the project till completion.

The basic functionality offerred are as follows

1. Login and authentication
2. User sign up
3. Project creation, update and deletion
4. Project list


# Required Tools

__braamies__ has been developed using [agular.js](http://angularjs.org). We use [node.js](http://nodejs.org) as backend server with [Couchdb](http://http://couchdb.apache.org) as database. In order to run the app you should make sure you have a working version of node and couchdb running.

# Execution

To run __braamies__, first start the database server as follows: <code>couchdb</code>. This will start a couchdb server. It runs on port 5984. You can also create your database on [iris couch](http://www.iriscouch.com), a cloud service for couchdb databases. Whichever database you choose to use the correct the url should be stored in the file data-manager.js (app/server/util). Finally, you can fire the node server in <code>node scripts/braamie.js [local]</code>

Because the code can support both local mode and remote mode, we use an additional argument when running it locally.

# Deployment

We deployed a version of __braamies__ on [nodejistu](https://www.nodejitsu.com). In order to deploy on nodejistu you need to download their command line tool through npm (the nodejs package manager). You also need to signup with jitsu. 
To start using jitsu, you need to log in with <code>jitsu login</code> and enter your credentials
Next,  you need to create the database using iris couch as follows:
<pre><code>
	jitsu databases create couch [database name]
</code></pre>
Note that Nodejitsu supports three database systems: couchdb (couch), redis (redis) and mongodb (mongo).
In couchdb, a database is more like a bucket. In __braamies__ we use two databases: users and projects. Finally, you can deploy the app with the command: <code>jitsu deploy</code>
When everything is done, you should log out with <code>jitsu logout</code>

# Author

[José G. Quenum](mailto: josum@icloud.com)