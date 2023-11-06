const connectDB = require('./config/db');
const bcrypt = require("bcryptjs");


connectDB();

const User = require("./models/User");

async function createAdmin () {
  const password="admin@32#";
  const user = new User({
    name: "superadmin",
    employeeId: "000",
    password,
    role: "admin",
  });

const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save();
}

    User.find({name:"superadmin"}).then(function (results) {
    var count = results.length
    if (count==0){
        createAdmin();
        console.log("admin created successfully");
    }
    else {
        console.log("admin already created");
    }
  }).catch(function (err){
    console.log(err);
});