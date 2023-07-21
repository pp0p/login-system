interface IConfog {
  port: number;
  jwtSecert: string;
  mongoUri: string;
  corsOption: {
    origin: string | string[];
    credentials: boolean;
  };
}
export default IConfog;
