import { Construct } from 'constructs';
import { App, S3Backend, TerraformOutput, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import { LambdaFunction } from '../constructs/LambdaFunction';
import { LambdaRestApi } from '../constructs/LambdaRestApi';
import { getConstructName } from '../utils/utils';
import * as path from 'path';
import * as fs from 'fs';
import { BACKEND_NAME } from '../main';

export class NamePickerStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'ap-southeast-1',
    });

    const prereqStateFile = path.join(process.env.INIT_CWD!, `./terraform.${BACKEND_NAME}.tfstate`);

    let prereqState = null;
    try {
      prereqState = JSON.parse(fs.readFileSync(prereqStateFile, 'utf-8'));
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new Error(`Could not find prerequisite state file: ${prereqStateFile}`);
      }
      throw error;
    }

    // Only one backend is supported by Terraform
    // S3 Backend - https://www.terraform.io/docs/backends/types/s3.html
    new S3Backend(this, {
      bucket: prereqState.outputs.bucket.value, // Get from output of prerequisite state file
      dynamodbTable: prereqState.outputs.dynamodbTable.value, // Get from output of prerequisite state file
      region: 'ap-southeast-1',
      key: id, // The name of this stack
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
