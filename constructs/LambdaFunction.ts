// The quick brown fox jumped over the lazy dog!
import { iamRole, iamRolePolicyAttachment, lambdaAlias, lambdaFunction } from '@cdktf/provider-aws';
import { LambdaFunctionConfig } from '@cdktf/provider-aws/lib/lambda-function';
import { AssetType, TerraformAsset } from 'cdktf';
import { execSync } from 'child_process';
import { Construct } from 'constructs';
import * as path from 'path';

interface LambdaFunctionProps extends Omit<LambdaFunctionConfig, 'role' | 'filename'> {
  bundle: string;
  functionName: string;
}

export class LambdaFunction extends Construct {
  public readonly lambdaFunction: lambdaFunction.LambdaFunction;

  constructor(scope: Construct, id: string, { functionName, bundle, ...rest }: LambdaFunctionProps) {
    super(scope, id);

    const asset = new TerraformAsset(this, 'lambda-asset', {
      path: path.join(process.env.INIT_CWD!, bundle),
      type: AssetType.ARCHIVE,
    });

    // Create IAM role for Lambda
    const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
      name: `${functionName}-execution-role`,
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      }),
    });

    // ToDo: Attach policy to the role
    // This policy attachment grants Lambda function basic required permissions (e.g: Logging in CloudWach):
    // policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaExecutionRolePolicy', {
      role: lambdaRole.name,
      policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    });

    // ToDo: Create Lambda function
    this.lambdaFunction = new lambdaFunction.LambdaFunction(this, 'lambda-function', {
      functionName,
      role: lambdaRole.arn,
      runtime: 'nodejs18.x',
      timeout: 30,
      filename: asset.path,
      ...rest,
    });
  }
}
