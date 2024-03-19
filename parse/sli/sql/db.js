
// import sequelize from "@/parse/db/sequelize";

// try {
//   await sequelize.query(`CREATE DATABASE IF NOT EXISTS pr_db`);
// } catch(e) {
//   console.log("==db error==", e);
// }

const env = require('dotenv').config().parsed;

(async () =>
{
  const mariadb = require("mariadb");

  let conn;
  const pool = mariadb.createPool({
    host: "localhost",
    port: env.MYSQL_PORT, // 3319
    user: env.MYSQL_USER, //"root"
    password: env.MYSQL_PASSWORD,// "root",
    database: env.MYSQL_DB_NAME,// "sbpr",
    // connectionLimit: 5,
  });

  // try
  // {
  //   conn = await pool.getConnection();
  //   let res = await conn.query(`CREATE DATABASE IF NOT EXISTS sbpr`);

  //   res = conn.query(`CREATE TABLE IF NOT EXISTS t1 (
  //     c1 INT,
  //     c2 VARCHAR(10)
  //   )`);
  // } catch (e)
  // {
  //   console.log("==db error==", e);
  // } finally
  // {
  //   if (conn) conn.release();
  // }
})();