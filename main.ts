import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';

export const PROJECT_NAME = 'cdktf-name-picker';
export const BACKEND_NAME = `${PROJECT_NAME}-prereq`;

const app = new App();
new NamePickerStack(app, PROJECT_NAME);
app.synth();
