import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { LocalProvider } from '@cdktf/provider-local/lib/provider';
import * as path from 'path';
import { file } from '@cdktf/provider-local';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialize the local provider
    new LocalProvider(this, 'local', {});

    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');

    const projectName = 'project-1';

    const basePath = `${projectDirectory}/${projectName}`;

    new file.File(this, 'ReadmeFile', {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project.`,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
