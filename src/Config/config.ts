import dotenv from "dotenv";
import IConfig from "../Interfaces/Config.interface";
dotenv.config();


export const config: IConfig = {
  jwtSecert: String(process.env.JWT_SECERT),
  mongoUri: String(process.env.MONGO_URI),
  port: Number(process.env.PORT) || 5000,
  corsOption: {
    origin: "http://localhost:5173",
    credentials: true,
  },
};
