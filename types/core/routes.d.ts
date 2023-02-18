import * as core from "express-serve-static-core";
export interface RouteConf {
    /**
     * '/controllers' or '/routes' 
     */
    routes_path: String,
    /**
     * ['/', '/contact:/home/contact', 'api'] 
     */
    routes_area: Array
}
export function Routes(router: core.Router, conf: RouteConf): core.Router;
export default Routes;