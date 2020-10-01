import { Command } from "commander";
import { StockApplesCommand } from "./commands/StockApplesCommand";

const acceptableLocaleValues = "en,es".split(",");
const appleTypes = "RD,RIG,GS".split(",");

export class App {
  run() {
    const program = new Command() as Command;

    program.storeOptionsAsProperties(false).version("1.0.0");

    // apparently a default command is needed when commands are being used...
    const search = program
      .command("search", { isDefault: true })
      .action((search: Command) => {
        const { echo, greeting, apples, cost, ...others } = search.opts();
        if (!cost) {
          console.log("no cost");
          return;
        }
        if (!apples?.length) {
          console.log("no apples");
          return;
        }

        console.log({ echo, greeting, apples, others });

        echo && console.log("echo on:", greeting);

        if (apples) {
          console.log("apples", apples);
        }
      });

    // boolean flag
    search.option("-e, --echo", "echo the greeting");

    // flag with [optional] value and a default provided
    search.option(
      "-g, --greeting [greeting]",
      "print this greeting to the console",
      "hello world!"
    );

    // flag with <required> value and a default provided
    search.option("-u, --uid <uid>", "user identifier required");

    // allow multiple input values, validate each one
    search.option(
      "-a, --apples <apples...>",
      "what kind of apples",
      (value, prior: Array<string> | undefined) => {
        if (-1 === appleTypes.indexOf(value)) {
          console.error(`invalid apple type: ${value}`);
          return prior;
        }
        return prior ? [value, ...prior] : [value];
      }
    );

    // validate required item
    search.option("-l, --locale <locale>", "target locale", (value: string) => {
      if (-1 == acceptableLocaleValues.indexOf(value)) throw "invalid locale";
      return value;
    });

    // validate number
    search.option(
      "-c, --cost <number>",
      "maximum you are willing to pay",
      (value) => {
        const result = parseFloat(value);
        if (isNaN(result)) {
          console.error("invalid cost");
          return 0;
        }
        return result;
      }
    );

    this.addCommand(new StockApplesCommand(), program);
    program.parse(process.argv);

    if (program.args.length) {
      console.log("args", program.args);
    }
  }

  private addCommand(handler: StockApplesCommand, program: Command) {
    {
      const [head, ...tail] = handler.name.split(" ");
      const command = new Command(head);
      command.arguments(tail.join(" "));
      handler.options().forEach((o) => command.option(`--${o.key} [key]`));
      command.action((appleType: string, quantity: number) =>
        handler.action(appleType, quantity)
      );
      program.addCommand(command);
    }
  }
}
