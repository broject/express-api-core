const exp = require('express');
// let app;
// global.app solution will work well, but I want to propose an alternative.
// Unless you are well aware of the drawbacks of global variables and have weighted the trade-offs, 
// I would avoid it when you can. 
// An approach which might also solve the issue but has better traceability is the singleton module approach:
// function instance() {
//     app = app || require('express')();
//     return app;
// };

export class SingletonApp {

    constructor() {
        this.app = exp();
        console.log('* SingletonApp *');
    }

    instance(dirname) {
        this.app = this.app || exp();
        if (dirname) this.app.set('__dirname', dirname);
        return this.app;
    }
}

export const Site = new SingletonApp();
export const App = Site.instance();
export const method = App;
export const app = App;
export default Site;
