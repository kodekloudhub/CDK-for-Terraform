import { Construct } from 'constructs';
import { TerraformOutput } from 'cdktf';
import { LambdaFunction } from '../constructs/LambdaFunction';
import { LambdaRestApi } from '../constructs/LambdaRestApi';
import { getConstructName } from '../utils/utils';
import { AwsBaseStack } from './AwsBaseStack';

export class NamePickerStack extends AwsBaseStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

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
