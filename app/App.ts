import { Command } from "commander";
export class App {
  run() {
    const program = new Command();
    program.option(
      "-g, --greeting [greeting]",
      "print this greeting to the console",
      "hello world!"
    );

    program.parse(process.argv);
    console.log(program.greeting);
  }
}
