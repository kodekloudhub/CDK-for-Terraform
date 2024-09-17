import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { LambdaFunction } from './constructs/LambdaFunction';
import { provider } from '@cdktf/provider-aws';
import * as path from 'path';
import { getConstructName } from './utils/utils';
import { LambdaRestApi } from './constructs/LambdaRestApi';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'ap-southeast-1',
    });

    const functionRoulette = new LambdaFunction(this, 'lambda-function', {
      bundle: './function-roulette',
      functionName: getConstructName(this, 'api'),
      handler: 'index.handler',
    });

    const lambdaRestApi = new LambdaRestApi(this, 'lambda-rest-api', {
      handler: functionRoulette.lambdaFunction,
      stageName: 'dev',
    });

    new TerraformOutput(this, 'rouletteApiUrl', {
      value: lambdaRestApi.url,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-roulette');
app.synth();
