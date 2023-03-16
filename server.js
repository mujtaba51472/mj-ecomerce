const app = require("./app");
const dotevn = require("dotenv");
const connectingDb = require("./db/connectedDb");

// config
dotevn.config();
connectingDb(process.env.DB_URL);
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
