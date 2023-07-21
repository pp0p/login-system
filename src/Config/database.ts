import mongoose from "mongoose";
import { config } from "./config";
export default class DataBase {
  private readonly mongoUri: string = config.mongoUri;
  public connect(): void {
    mongoose
      .connect(this.mongoUri)
      .then(() => {
        console.log("[🗄️] Database Connected [🗄️]");
      })
      .catch((error) => {
        console.error("[❌] Database Connection Error: \n", error);
      });
  }
}
