const router = require("express").Router();

router.use("/signup", require("./signup.routes"));

module.exports = router;
