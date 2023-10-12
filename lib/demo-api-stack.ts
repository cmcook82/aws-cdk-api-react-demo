import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// lambda
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class DemoApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //* setup our lambda script and configure the handler
    const demoApiHandler = new lambda.Function(this, 'DemoApiHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('./lambdas'),
      handler: "demo-api.handler",
      memorySize: 512,
    });

    //* setup our API Gateway interface to use the lambda
    //* note this is a fully open lambda with no auth for demonstration
    const api = new apigateway.RestApi(this, "DemoApi", {
      restApiName: "DemoAPI",
      description: "This is a demo api for sending out random stats.",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: ["*"],
        allowCredentials: true,
        //  allowOrigins: apigateway.Cors.ALL_ORIGINS
      },
      // configure memory, settings, auth etc.
    });

    // add the <root-api>/demoData endpoint resource
    const apiDemoData = api.root.addResource("demoData");

    // allow the GET method on our endpoint
    apiDemoData.addMethod('GET', new apigateway.LambdaIntegration(demoApiHandler));

  }
}
