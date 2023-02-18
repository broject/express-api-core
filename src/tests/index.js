import { Site, SingletonApp } from "../core/site";

export default async (options) => {
    console.log('* index.js', (Site instanceof SingletonApp));
    require('./test').default();
}
