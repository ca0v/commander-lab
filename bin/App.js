"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const commander_1 = require("commander");
class App {
    run() {
        const program = new commander_1.Command();
        program.option("-g, --greeting [greeting]", "print this greeting to the console", "hello world!");
        program.parse(process.argv);
        console.log(program.greeting);
    }
}
exports.App = App;
