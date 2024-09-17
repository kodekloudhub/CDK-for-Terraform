import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import { LambdaFunction } from '../constructs/LambdaFunction';
import { LambdaRestApi } from '../constructs/LambdaRestApi';
import { getConstructName } from '../utils/utils';

export class NamePickerStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'ap-southeast-1',
    });

    const functionNamePicker = new LambdaFunction(this, 'lambda-function', {
      bundle: './function-name-picker', // Path to the folder containing the Lambda code
      functionName: getConstructName(this, 'api'),
      handler: 'index.handler',
    });

    const lambdaRestApi = new LambdaRestApi(this, 'lambda-rest-api', {
      handler: functionNamePicker.lambdaFunction,
      stageName: 'dev',
    });

    new TerraformOutput(this, 'namePickerApiUrl', {
      value: lambdaRestApi.url,
    });
  }
}
