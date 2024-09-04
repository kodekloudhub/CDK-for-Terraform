import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { provider, file } from '@cdktf/provider-local';
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialize the local provider
    new provider.LocalProvider(this, 'local', {});

    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');

    const projectName = 'project-1';

    const basePath = `${projectDirectory}/${projectName}`;

    const readMeFile = new file.File(this, 'readme-file', {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project.`,
    });

    // Create the package.json file with basic content
    new file.File(this, 'package-json-file', {
      filename: `${basePath}/package.json`,
      content: JSON.stringify(
        {
          name: projectName,
          version: '1.0.0',
          main: 'index.js',
          scripts: {
            start: 'node index.js',
          },
        },
        null,
        2
      ),
    });

    // Output the readMeFile content
    new TerraformOutput(this, 'readMeContent', {
      value: readMeFile.content,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
