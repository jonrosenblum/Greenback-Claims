const { db } = require("../db");

async function getAllAdminSubmissions() {
    const client = await db.connect();
    try {
      const result = await client.query('SELECT * FROM adminsubmissions');
      return result.rows;
    } finally {
      client.release();
    }
}

//******************************************************************/ 
// Update Notes
//******************************************************************/
async function updateNotes(id, notes) {
  const client = await db.connect();
  try {
    const result = await client.query('UPDATE adminsubmissions SET notes = $1 WHERE id = $2', [notes, id]);
    console.log(`Updated adminsubmissions notes for id ${id}. Affected rows: ${result.rowCount}`);

  } finally {
    client.release();
  }
}
  

module.exports = {
    getAllAdminSubmissions,
    updateNotes
  };
  
