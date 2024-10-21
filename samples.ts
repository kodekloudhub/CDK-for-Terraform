// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Use this for make code look pretty and formated
export {};

// ToDo:
// Initialise the local provider

// Create project folder
// Add a README file
// Sample content: # project-1\n\nThis is the project-1 project.

// Demo 2

// ToDo
// Add pacakge.json file
// Sample content JSON.stringify(
//   {
//     name: 'project-1',
//     version: '1.0.0',
//     main: 'index.js',
//     scripts: {
//       start: 'node index.js',
//     },
//   },
//   null,
//   2
// )

// Demo 3
import { Construct } from 'constructs';

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);

    const { projectName, projectDirectory } = props;
  }
}

import { Construct } from 'constructs';
import { file } from '@cdktf/provider-local';

// Copy over from main

export class ProjectFolder extends Construct {
  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);

    const { projectName, projectDirectory } = props;
    const basePath = `${projectDirectory}/${projectName}`;

    // Create the README file with the project name inside
    new file.File(this, 'ReadmeFile', {
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
  }
}
