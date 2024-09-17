import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { LambdaFunction } from './constructs/LambdaFunction';
import { provider } from '@cdktf/provider-aws';
import * as path from 'path';

export const getConstructName = (scope: Construct, id: string) => `${TerraformStack.of(scope)}-${id}`.toLowerCase();

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'ap-southeast-1',
    });

    new LambdaFunction(this, 'lambda-function', {
      // bundle: './function-roulette/index.js',
      bundle: './function-roulette',
      // filename: path.join('./function-roulette/index.js.zip'),
      functionName: getConstructName(this, 'api'),
      handler: 'index.handler',
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-roulette');
app.synth();
