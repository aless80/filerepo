# AWS-React-File-Repo 

**WORK IN PROGRESS**
React app for uploading/downloading files using AWS cloud services (Cognito User Pools, S3 storage, Apollo GraphQL API, etc)

<!--
DONE 20191017: downloadable files in ProjectList by setting public folder as public in aws console.
TODO: test what I wrote in README > Additional configurations , in particular the bucket name
TODO: no download for private files

TODO: metadata; the get method in my Storage.js returns the whole object, I would just need the metadata. apparently, one can use AWS.S3.headObject but i do not know how. https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
  See code in ProjectList using AWS.S3 (configuration to be fixed)


TODO
* Greetings bar: put sign out in navbar
* Greetings bar: username is ugly. Auth.updateUserAttributes(user, {
    'email': 'me@anotherdomain.com',
    'family_name': 'Lastname'
    });
* check if I should use AWS.S3 
* query files by metadata
-->

## Installation
#### Intall Amplify CLI
<pre>
<b>npm install -g @aws-amplify/cli</b>
</pre>

#### Configure Amplify
<pre>
<b>amplify configure</b>          #create or select a user for this project (e.g. 'myapp')
? region:  <b>eu-central-1</b>
Specify the username of the new IAM user:
? user name:  <b>aless80</b>
Enter the access key of the newly created user:
? accessKeyId:  <b>AKIABCD**********</b>
? secretAccessKey:  <b>abcd1234********************</b>
This would update/create the AWS Profile in your local machine
? Profile Name:  <b>aless80</b>
</pre>

The second command configures the AWS access credentials, AWS Region and sets up a new AWS User Profile.

#### Install this react app

A new react app needs additional aws packages such as: 
```aws-amplify aws-amplify-react```. These packages are already present in package.json and can be automatically installed with:

<pre>
cd react-file-repo
npm run install
</pre>

#### Amplify initialization
<pre>
<b>amplify init</b>
? Enter a name for the project <b>filerepo</b>
? Enter a name for the environment <b>env</b>
? Choose your default editor: <b>Visual Studio Code</b>
? Choose the type of app that you're building <b>javascript</b>
? What javascript framework are you using <b>react</b>
? Source Directory Path: <b>src</b>
? Distribution Directory Path: <b>build</b>
? Build Command:  <b>npm run-script build</b>
? Start Command: <b>npm run-script start</b>
Using default provider  awscloudformation
? Do you want to use an AWS profile? <b>Yes</b>
? Please choose the profile you want to use <b>aless80</b>
</pre>

This creates a bucket in [AWS S3](https://s3.console.aws.amazon.com/s3) called `filerepo-env-<number>-deployment`.

#### Add Amazon CloudFront Hosting
<pre>
<b>amplify add hosting</b>
? Select the environment setup: <b>PROD (S3 with CloudFront using HTTPS)</b>
? hosting bucket name <b>filerepo-hosting</b>
? index doc for the website <b>index.html</b>
? error doc for the website <b>index.html</b>
</pre>

This creates a bucket in [AWS S3](https://s3.console.aws.amazon.com/s3) called `filerepo-hosting-projenv`.

#### Add Amazon Cognito User Pools
<pre>
<b>amplify add auth</b>
Do you want to use the default authentication and security configuration? <b>Default configuration</b>
How do you want users to be able to sign in? <b>Username</b>
Do you want to configure advanced settings? <b>No, I am done</b>>
</pre>

#### Add AWS S3 storage:
<pre>
<b>amplify add storage</b>
? Please select from one of the below mentioned services <b>Content (Images, audio, video, etc.)</b>
? Please provide a friendly name for your resource that will be used to label this category in the project: <b>filerepo</b>
? Please provide bucket name: <b>filerepo</b>
? Who should have access: <b>Auth and guest users</b>
? What kind of access do you want for Authenticated users? <b>create/update, read, delete</b>
? What kind of access do you want for Guest users? <b>read</b>
? Do you want to add a Lambda Trigger for your S3 Bucket <b>No</b>
</pre>

This creates a bucket in [AWS S3](https://s3.console.aws.amazon.com/s3) called `filerepo-env`.

<!--
#### Add an Apollo GraphQL API
<pre>
<b>amplify add api</b>
? Please select from one of the below mentioned services <b>GraphQL</b>
? Provide API name: <b>filerepo</b>
? Choose an authorization type for the API </b>Amazon Cognito User Pool </b>
Use a Cognito user pool configured as a part of this project</b>
? Do you have an annotated GraphQL schema? <b>No</b>
? Do you want a guided schema creation? <b>Yes</b>
? What best describes your project: <b>Single object with fields (e.g., “Todo” with ID, name, description)</b>
? Do you want to edit the schema now? <b>No</b>
</pre>

The API schema stored in `amplify/backend/api/file-repo/schema.graphql` can be modified and updated on the cloud using ```amplify push```.

Open the [AWS AppSync web console](https://console.aws.amazon.com/appsync) and click on the `filerepo-env` API where you can run queries or edit the schema. To run queries, log in with User Pools using ClientId from `src/aws-exports.js`.

The schema used for this project is: 
```
type Project @model {
  id: ID!
  user: String!
  name: String!
  language: String
  description: String
  created_at: Int
}
```
Examples of GraphQL mutations: 
```
mutation addProj {
    createProject(input:{name:"First Project", user:"aless80", description:"Test"}) {
        id
        user
        name
    }
}

mutation updateProj {
    updateProject(input:{id:"1", language:"Python"}) {
        id
        user
        name
        language
    }
}
```

Examples of GraphQL queries: 

```
query myQuery {
  listProjects {
    items{
      id
      name
      description
    }
  }
}

query getIt {
  getProject(id: 1) {
    id
    name
  }
}
```
-->

<!--
#### Add a REST API: 
<pre>
<b>amplify add api</b>
? Please select from one of the below mentioned services <b>REST</b>
? Provide a friendly name for your resource to be used as a label for this category in the project: <b>restapi</b>
? Provide a path (e.g., /items) <b>/projects</b>
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: <b>restfunction</b>
? Provide the AWS Lambda function name: <b>restfunction</b>


? Choose the function template that you want to use:
 <b>CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)</b>
? Choose a DynamoDB data source option <b>Create a new DynamoDB table</b>

Welcome to the NoSQL DynamoDB database wizard
This wizard asks you a series of questions to help determine how to set up your NoSQL database table.

? Please provide a friendly name for your resource that will be used to label this category in the project: <b>dynamoDB</b>
? Please provide table name: <b>projectTable</b>

You can now add columns to the table.

? What would you like to name this column: <b>user_id</b>
? Please choose the data type: <b>string</b>
? Would you like to add another column? <b>Yes</b>
? What would you like to name this column: <b>language</b>
? Please choose the data type: <b>string</b>
? Would you like to add another column? <b>Yes</b>
? What would you like to name this column: <b>permission</b>
? Please choose the data type: <b>string</b>
? Would you like to add another column? <b>Yes</b>
? What would you like to name this column: <b>created_at</b>
? Please choose the data type: <b>number</b>
? Would you like to add another column? <b>Yes</b>
? What would you like to name this column: <b>Comment</b>
? Please choose the data type: <b>string</b>
? Would you like to add another column? <b>Yes</b>
? What would you like to name this column: <b>file</b>
? Please choose the data type: <b>string</b>
? Would you like to add another column? <b>Yes</b>
? What would you like to name this column: <b>edited</b>
? Please choose the data type: <b>number</b>
? Would you like to add another column? <b>No</b>
? Please choose partition key for the table: <b>user_id</b>
? Do you want to add a sort key to your table? <b>Yes</b>
? Please choose sort key for the table: <b>created_at</b>
? Do you want to add global secondary indexes to your table? <b>No</b>
? Do you want to add a Lambda Trigger for your Table? <b>No</b>
Succesfully added DynamoDb table locally
? Do you want to access other resources created in this project from your Lambda function? <b>No</b>
? Do you want to edit the local lambda function now? <b>No</b>
Succesfully added the Lambda function locally
? Restrict API access <b>Yes</b>
? Who should have access? <b>Authenticated users only</b>
? What kind of access do you want for Authenticated users? <b>create, read</b>
? Do you want to add another path? <b>No</b>
Successfully added resource restapi locally
</pre>

The code for the lambda function implementing the API is located at ```react-file-repo/amplify/backend/function/restfunction/src/app.js```.

.... In the AWS console the API Gateway should show the API Gateway with your given name listed here. Click on your API and it opens detail page of that API. In the navigation breadcrump, there will be the name of your API like “caltrack”, note down this string, we will need that to call this API from our app.
-->
#### Push to AWS Amplify: 

<pre>
<b>amplify push</b>
</pre>


#### Additional configurations
##### Make a bucket public
This software will upload files to a /public folder in that bucket. To allow anybody to download the files in that folder you will have to grant it public access. To do this manually: 
* Go to the [AWS Management Console](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwin9ZnQwK3kAhUNkMMKHSyBAcQQFjAAegQIERAC&url=https%3A%2F%2Faws.amazon.com%2Fconsole%2F&usg=AOvVaw3L5ZM1L-1k3SwMWi6qm9p5)
* Navigate to _S3_ > _filerepo-env_ bucket > Select the _public_ folder > Click the _Actions_ tab > _Make public_

To do the same programmatically try this (I have not tested it yet):
<pre>
aws s3api put-object-acl --bucket filerepo-env --key public --acl public-read
</pre>
<!--
TODO: bucket ok? I download from href={`https://ccsestoragebucket-env.s3.eu-central-1.amazonaws.com/public/${file.key}
-->

##### Edit a bucket's CORS
This programs can store metadata in S3. To retrieve them, you will have to add CORS. To do this manually: 
* Go to the [AWS Management Console](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwin9ZnQwK3kAhUNkMMKHSyBAcQQFjAAegQIERAC&url=https%3A%2F%2Faws.amazon.com%2Fconsole%2F&usg=AOvVaw3L5ZM1L-1k3SwMWi6qm9p5)
* Navigate to _S3_ > Select the _filerepo-env_ bucket > _Permissions_ > CORS configuration > Add the following entries: 
&nbsp;<pre>
<ExposeHeader>x-amz-meta-comment</ExposeHeader>
<ExposeHeader>x-amz-meta-level</ExposeHeader>
</pre>

To do the same programmatically try this (I have not tested it yet):

<pre>
aws s3api get-bucket-cors --bucket filerepo-env
</pre>



## Launch the app
Launch the app with ```npm run start``` and go to [http://localhost:3000/](http://localhost:3000/).

Create a user with an associated email address. Get the verification code to confirm the user. Finally sign in to use the app.

## Documentation

#### AWS documentation
[AWS Amplify Authentication](https://aws-amplify.github.io/docs/js/authentication)

[AWS Amplify Storage](https://aws-amplify.github.io/docs/js/storage)

[AWS Amplify API](https://aws-amplify.github.io/docs/ios/api)

[GraphQL Transform](https://aws-amplify.github.io/docs/cli-toolchain/graphql)

#### Tutorials

[Tutorial Amplify](https://read.acloud.guru/build-your-own-multi-user-photo-album-app-with-react-graphql-and-aws-amplify-18d9cfe27f60)

[Tutorial Serverless REST API](https://read.acloud.guru/serverless-functions-in-depth-507439b4be88)

[Using AWS SDK in Node.js](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)

[Add Amplify backend to React App](https://hnp.dev/Beginner-Guide-How-to-add-Aplify-backend-to-your-React-project-with-ease/)


## Generate new AWS credentials
Browse to [AWS IAM console](https://console.aws.amazon.com/iam/home#/users/aless80?section=security_credentials) > Security credentials tab > Access keys section > Create access key. You can download the csv and place it in /src, which is git ignored. 

Configure the AWS CLI with your using the access keys: ```aws configure``` 


## Start
Use one of the following to start the front-end: 

```
npm start
nodemon start
```

To start the Node.js backend:

```
cd backend
nodemon server.js
```

## Build, Eject

Build the app for production to the `build` folder:
```
npm run build
```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Remove the single build dependency from your project (note: Once you `eject`, you can’t go back!):

```
npm run eject
```
