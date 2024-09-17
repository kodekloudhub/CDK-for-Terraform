import { App } from 'cdktf';
import { PreReqStack } from './stacks/PreReqStack';
import { BACKEND_NAME, PROJECT_NAME } from './main';

const app = new App();

new PreReqStack(app, BACKEND_NAME, { backendName: BACKEND_NAME });

app.synth();
