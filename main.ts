import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-local';
import * as path from 'path';
import { ProjectFolder } from './constructs/ProjectFolder';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialize the local provider
    new provider.LocalProvider(this, 'local', {});

    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');

    const projectName = 'project-1';

    const projectFolder = new ProjectFolder(this, 'project-folder', {
      projectName,
      projectDirectory,
      ignoreFiles: ['dist', 'node_modules'],
    });

    // Output the readMeFile content
    new TerraformOutput(this, 'readMeContent', {
      value: projectFolder.readMeFile.content,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
