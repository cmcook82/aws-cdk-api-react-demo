# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

---

## Project setup

### Assumptions:

- You havde an AWS account setup with an environment set and being used, `aws s3 ls`
- `npm install -g aws-cdk` make sure cdk is installed
- `cdk bootstrap aws://<account>/<region>` setup cdk in your connected environment, follow aws docs to help add ID and region

### Getting the API setup:

- Create GitHub project and repo and clone locally
- `cd demo-aws-api`
- `cdk init --language typescript`
- `npm i aws-cdk-lib` for latest core cdk libraries
- `npm i -D @types/aws-lambda` for development extras
- `npm run watch` optional - in a new terminal to keep an eye on our coding
- `mkdir lambdas` and add `demo-api.ts` with our lambda code in it
- `lib/demo-aws-api-stack.ts` and add the setup for our lambda and api gateway location
- ... Rename the stack class again to the original
- `npm run build` rebuild the api scripts from typescript, and test before we make an action
- `cdk synth` to process our code and prepare the cloudformation stack data for aws
- `test/demo-aws-api.tets.ts` and update the test code to check for our lambda
- `.env` make the file for storing our aws account creds outside the code
- `bin/demo-api-stack.ts` and update the import, stack name `DemoAwsApiStack` and add the environment for deployment
- `npm run test` to run the test, may need to tweak node version

### Auto deployment:

- `mkdir .github && cd .github && mkdir workflows && cd workflows && touch main.yml`
- Paste in basic aws code
- Add `secrets and variables / actions` into the repo settings: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_ACCOUNT_ROLE`
- Get the API url from the output of the `cdk deploy` command, or view in the AWS API Gatewway pages.
- `cdk destroy` to remove the whole stack fromm aws like we were never here

### Using the data:

- root `tsconfig.json`, exclude "website"
- `npx create-react-app website --template typescript` initialise the ReactJS project as "website"
- `cd website`
- `npm run start`
- `npm i react-minimal-pie-chart`
- Open `/src/App.tsx`
- Open `App.css` and add style
- Paste in basic demo code and run
- `nvm use 16` and `npm i` to make sure we're all on the same version of react and update package-lock
- Craete `components/cake` folder, create `index.ts` and `cake.tsx` file, with fuller demo
