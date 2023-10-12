import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as DemoApi from '../lib/demo-api-stack';


test('Lambda Created', () => {
  const app = new cdk.App();
  const stack = new DemoApi.DemoApiStack(app, 'DemoTestStack');
  const template = Template.fromStack(stack);

  //const util = require('util');
  //console.log(util.inspect(template, { showHidden: false, depth: null, colors: true }))

  // Assert it creates the function with the correct properties...
  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: "demo-api.handler",
    Runtime: "nodejs16.x",
  });
});


test('API Gateway Created', () => {
  const app = new cdk.App();
  const stack = new DemoApi.DemoApiStack(app, 'DemoTestStack');
  const template = Template.fromStack(stack);

  // Debug
  //const util = require('util');
  //console.log(util.inspect(template, { showHidden: false, depth: null, colors: true }))

  // Assert if creates the API Gateway entry
  template.hasResourceProperties('AWS::ApiGateway::Stage', {
    StageName: 'dev',
  });
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'DemoAPI',
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
  });

});