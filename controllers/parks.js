const mysql = require("mysql")
const pool = require("../sql/connection")
const { handleSQLError } = require("../sql/error")

const getAllParks = (req, res) => {
    pool.query("SELLECT * FROM parks", (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.json(rows)
    })
}

const showPark = (req, res) => {
    fetchParkById(req.params.id, res)
  }

const fetchParkById = (id, res) => {
    let sql = "SELECT * FROM parks WHERE id = ?"

    sql = mysql.format(sql, [id])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      res.json(rows[0]);
    })
  }


  const createPark = (req, res) => {
    const { name, address, type, access } = req.body;
    
    let sql = "INSERT INTO parks (name, address, type, access) VALUES (?,?,?,?)"

    sql = mysql.format(sql, [name, address, type, access])

    pool.query(sql, (err, results) => {
        console.log('results', results)
        if (err) return handleSQLError(res, err)
        return fetchParkById(results.insertId, res)
    })
}

module.exports = {
    getAllParks,
    showPark,
    createPark,
}