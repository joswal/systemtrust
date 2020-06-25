const cors = require('cors')
const app = require("express")();
const mongoose = require("mongoose");

let onlineDbUrl = "mongodb+srv://evimero:evimero123@cluster0-fqzsn.mongodb.net/systemtrust?retryWrites=true&w=majority"

let dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/systemtrust";

//set indexes
mongoose.set("useCreateIndex", true);


//db connection
mongoose .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log(`Connected to ${dbUrl}...`))
.catch(err => console.error(err));

app.use(cors());


require("./startup/routes")(app);

const port = process.env.PORT || 6001;
console.log({ 'environment': app.settings.env });
app.listen(port, () => console.log(`listening on port ${port}`));