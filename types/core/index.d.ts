import { Server } from "net";
export function CreateServer(dirname: String, options: Object): Server;
export function InitModules(activeModules: Array<String>, moduleDir: String): void;
export default CreateServer;