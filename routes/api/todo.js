const express = require('express');
const router = express.Router();


//@Test GET
//@desc Testing the route
//@state Public
router.get('/test', (req, res) => res.json({
   message: 'done'
}))



module.exports = router;