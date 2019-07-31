import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Upload from "./Components/Upload";
import Navbar from "./Components/Navbar";
import ProjectList from "./Components/ProjectList";

// Amplify
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

// Amplify Authentication Customization
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignUp,
  VerifyContact,
  withAuthenticator
} from "aws-amplify-react";
//import { Authenticator, SignIn, Greetings } from "aws-amplify-react";
//import awsconfig from "./aws-exports";

// Amplify API
//import { API } from "aws-amplify";
//import { Connect } from "aws-amplify-react";

// Amplify text Localization and Customization
import { I18n } from "aws-amplify";
const dict = {
  en: {
    Username: "Email",
    "Enter your username": "Enter your email"
  },
  no: {
    Username: "E-post",
    "Enter your username": "Skriv inn e-posten din",
    Password: "Personlig passord",
    "Enter your password": "Skriv inn passordet ditt",
    "Sign in to your account": "Logg på ",
    "Sign In": "Logg på",
    "Sign Up": "Meld på",
    "Forget your password? ": "Glemt passordet ditt? ",
    "Reset password": "Tilbakestill passord",
    "No account? ": "Ingen konto? ",
    "Create account": "Opprett konto"
  }
};
I18n.setLanguage("en");
I18n.putVocabularies(dict);

// Amplify configure
Amplify.configure(aws_exports);
/*Amplify.configure({
  Auth: {
      identityPoolId: awsconfig.aws_cognito_identity_pool_id,
      region: awsconfig.aws_cognito_region,
      userPoolId: awsconfig.aws_user_pools_id,
      userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
      mandatorySignIn: true,
      //authenticationFlowType: "USER_SRP_AUTH"    
  },
  API: {
      endpoints: [
          {
              name: "ccseapi",
              endpoint: awsconfig.aws_cloud_logic_custom.endpoint
          },
          {
              name: "ccsefunction",
              endpoint: "https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/yourFuncName/invocations",
              service: "lambda",
              region: awsconfig.aws_cognito_region
          }
      ]
  },
  Storage: {
        AWSS3: {
            bucket: awsconfig.aws_user_files_s3_bucket,
            region: awsconfig.aws_cognito_region
        }
    }
});*/

/* //test API
API.get("ccseapi", "/projects") 
  .then(res => console.log("API:", res, { queryStringParameters: {} }))
  .catch(err => console.log("API err:", { err }));
*/

class App extends Component {
  state = {
    projects: []
  };
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Upload} />
        <Route path="/upload" component={Upload} />
        <Route path="/projects" component={ProjectList} />
        
        <hr/>
        
      </div>
      </BrowserRouter>
    );
  }
}

/*class AppWithAuth extends Component {
  render() {
    return (
      <div>
        <Authenticator 
        // Optionally hard-code an initial state
        authState="signIn"
        // Pass in an already authenticated CognitoUser or FederatedUser object
        //authData={CognitoUser | "aless80"}
        // Fired when Authentication State changes
        onStateChange={authState =>
          console.log("Authentication State changes: ", authState)
        }
        // An object referencing federation and/or social providers
        // The federation here means federation with the Cognito Identity Pool Service
        //federated={myFederatedConfig}
        // A theme object to override the UI / styling
        //theme={myCustomTheme}
        // Option to hide all the default components
        hideDefault={true}
        >
        <Greetings />
          <SignIn />
          <ConfirmSignIn />
          <RequireNewPassword />
          <SignUp />
          <VerifyContact />
          <ForgotPassword />
          <Loading />
          <App />
        </Authenticator>
      </div>
    );
  }
}*/

//export default App;
export default withAuthenticator(App, { includeGreetings: false }, [
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
  <RequireNewPassword />
]);
