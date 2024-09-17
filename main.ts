import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';

const app = new App();
new NamePickerStack(app, 'cdktf-name-picker');
app.synth();
