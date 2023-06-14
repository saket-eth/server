const router = require("express").Router();

router.use("/signup", require("./signup.routes"));
router.use("/login", require("./login.routes"));
router.use("/house", require("./house.routes"));

module.exports = router;
