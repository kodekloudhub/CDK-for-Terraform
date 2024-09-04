import { Construct } from 'constructs';
import { file } from '@cdktf/provider-local';

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  readonly readMeFile: file.File;

  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);

    const { projectName, projectDirectory } = props;
    const basePath = `${projectDirectory}/${projectName}`;

    // Create the README file with the project name inside
    this.readMeFile = new file.File(this, 'ReadmeFile', {
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

    // Create the .gitignore file
    new file.File(this, 'gitignore-file', {
      filename: `${basePath}/.gitignore`,
      content: `node_modules/\ndist/\n`,
    });
  }
}
