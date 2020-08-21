const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("hello its working");
});

module.exports = router;
