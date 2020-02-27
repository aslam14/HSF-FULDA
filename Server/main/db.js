const mysql = require('mysql');
const pool = mysql.createConnection({
    host: '3.134.103.215',
    user: 'remote',
    database: 'GDSD_schema',
    password: 'Remote2019@',
    port: 3306
});
pool.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

module.exports = pool;