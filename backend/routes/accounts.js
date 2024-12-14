const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

// Route to get all accounts
router.get('/accounts', accountsController.getAllAccounts);

router.put('/accounts/:acc_id', accountsController.updateAccount);

module.exports = router;