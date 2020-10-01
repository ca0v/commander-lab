export class StockApplesCommand {
  readonly name = "stock <appleType> <quantity>";

  options() {
    return [{ key: "post", about: "create apple type if it does not exist" }];
  }

  action(appleType: string, quantity: number) {
    console.log("StockApplesCommand", {
      appleType,
      quantity,
    });
  }
}
