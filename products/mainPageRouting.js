const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // <--- testing for this is in productrouting test file
  const main = `     You are at the main page  
       please make http requests to test the app`;

  res.send(main); // <--- needs output
});

module.exports = router;
