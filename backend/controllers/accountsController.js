const dbp = require('../config/db'); // Database connection

// Get all accounts from the database
exports.getAllAccounts = async (req, res) => {
  try {
    const result = await dbp.query(`
      SELECT 
        acc_id, role, email, username, is_verified, created_at, updated_at 
      FROM accounts_db
    `);
    res.status(200).json({
      success: true,
      message: 'Accounts fetched successfully!',
      accounts: result[0], // Assuming the query returns an array of accounts
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accounts.',
      error: error.message,
    });
  }
};

// Update an account
exports.updateAccount = async (req, res) => {
  const { acc_id } = req.params; // Extract account ID from the request params
  const { role, email, is_verified } = req.body; // Get updated data from the request body

  try {
    const query = `
      UPDATE accounts_db 
      SET role = ?, email = ?, is_verified = ? 
      WHERE acc_id = ?
    `;
    
    // Execute the query to update the account
    const [result] = await dbp.query(query, [role, email, is_verified, acc_id]);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: 'Account updated successfully!',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Account not found.',
      });
    }
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update account.',
      error: error.message,
    });
  }
};
exports.updateAccount = async (req, res) => {
    const { acc_id } = req.params; // Extract account ID from the request params
    const { role, email, is_verified } = req.body; // Get updated data from the request body
  
    try {
      const query = `
        UPDATE accounts_db 
        SET role = ?, email = ?, is_verified = ? 
        WHERE acc_id = ?
      `;
      
      // Execute the query to update the account
      const [result] = await dbp.query(query, [role, email, is_verified, acc_id]);
  
      // Check if any rows were affected
      if (result.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: 'Account updated successfully!',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }
    } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update account.',
        error: error.message,
      });
    }
  };