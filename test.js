const Database = require("./index");
const db = new Database();

db.set("a", "b");
console.log(db.get("a"));
db.delete("a");
console.log(db.get("a"));
