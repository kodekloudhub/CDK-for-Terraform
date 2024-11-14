import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { iamRole, provider } from '@cdktf/provider-aws';
import { LambdaFunction } from './constructs/LambdaFunction';
import * as path from 'path';
import { getConstructName } from './utils/utils';
import { LambdaRestApi } from './constructs/LambdaRestApi';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });

    const functionNamePicker = new LambdaFunction(this, 'lambda-funtion', {
      functionName: getConstructName(this, 'api'),
      bundle: './function-name-picker',
      handler: 'index.handler',
    });

    const lambdaRestApi = new LambdaRestApi(this, `lambda-rest-api`, {
      handler: functionNamePicker.lambdaFunction,
      stageName: 'dev',
    });

    new TerraformOutput(this, `namePickerApiUrl`, {
      value: lambdaRestApi.url,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-name-picker');
app.synth();
