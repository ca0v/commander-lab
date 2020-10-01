"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockApplesCommand = void 0;
class StockApplesCommand {
    constructor() {
        this.name = "stock <appleType> <quantity>";
    }
    options() {
        return [{ key: "post", about: "create apple type if it does not exist" }];
    }
    action(appleType, quantity) {
        console.log("StockApplesCommand", {
            appleType,
            quantity,
        });
    }
}
exports.StockApplesCommand = StockApplesCommand;
