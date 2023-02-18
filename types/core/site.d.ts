import * as core from "express-serve-static-core";

export class SingletonApp {
    public instance(): core.Express;
}

declare const Site: SingletonApp;
declare const App: core.Express;
declare const method: core.Express;
declare const app: core.Express;

export { Site, App, method, app };
export default SingletonApp;