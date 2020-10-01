import { Command } from "commander";

const acceptableLocaleValues = "en,es".split(",");
const appleTypes = "RD,RIG,GS".split(",");

export class App {
  run() {
    const program = new Command();

    program.storeOptionsAsProperties(false).version("1.0.0");

    // boolean flag
    program.option("-e, --echo", "echo the greeting");

    // flag with [optional] value and a default provided
    program.option(
      "-g, --greeting [greeting]",
      "print this greeting to the console",
      "hello world!"
    );

    // flag with <required> value and a default provided
    program.option("-u, --uid <uid>", "user identifier required");

    // allow multiple input values, validate each one
    program.option(
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
    program.option(
      "-l, --locale <locale>",
      "target locale",
      (value: string) => {
        if (-1 == acceptableLocaleValues.indexOf(value)) throw "invalid locale";
        return value;
      }
    );

    // validate number
    program.option(
      "-c, --cost <number>",
      "maximum you are willing to pay",
      (value) => {
        const result = parseFloat(value);
        if (isNaN(result)) {
          console.error("invalid cost");
          return 0;
        }
      }
    );

    program.parse(process.argv);

    const { echo, greeting, apples, cost, ...others } = program.opts();
    if (!cost || !apples?.length) {
      console.log("nothing to do");
      return;
    }

    console.log({ echo, greeting, apples, others });

    echo && console.log("echo on:", greeting);

    if (apples) {
      console.log("apples", apples);
    }

    if (program.args.length) {
      console.log("args", program.args);
    }
  }
}
