const mysql = require("mysql")
const pool = require("../sql/connection")
const { handleSQLError } = require("../sql/error")

const listParks = (req, res) => {
    pool.query("SELLECT * FROM parks", (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.json(rows)
    })
}

const showPark = (req, res) => {
    let sql = "SELECT * FROM users WHERE id = 1"

    sql = mysql.format(sql, [req.params.id])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        res.json(rows)
    })
}

const createPark = () => {

}

const deletePark = () => {

}

module.exports = {
    listParks,
    showPark,
    createPark,
    deletePark
}