import { Site, App, app } from "../core/site";

export default async (options) => {
    console.log('* test.js is', (Site.instance() == App), (App == app));
}
