import app from "./index.js";
import dotenv from "dotenv";
// config the dot env
dotenv.config();

const PORT = process.env.PORT || 8000;
// listen the server at the given PORT 
app.listen(PORT, () => {
  console.log("server is listening at port 3000");
});
