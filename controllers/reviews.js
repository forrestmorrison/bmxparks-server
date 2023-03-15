const mysql = require("mysql")
const pool = require("../sql/connection")
const { handleSQLError } = require("../sql/error")

const getAllReviews = (req, res) => {
    pool.query("SELECT * FROM reviews", (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.json(rows)
    })
}

const showReview = (req, res) => {
    fetchReviewById(req.params.id, res)
  }

const fetchReviewById = (id, res) => {
    let sql = "SELECT * FROM reviews WHERE id = ?"

    sql = mysql.format(sql, [id])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      res.json(rows[0]);
    })
  }


  const createReview = (req, res) => {
    const { comment, rating, user_id, park_id } = req.body;
    
    let sql = "INSERT INTO reviews (comment, rating, user_id, park_id) VALUES (?,?,?,?)"

    sql = mysql.format(sql, [comment, rating, user_id, park_id])

    pool.query(sql, (err, result) => {
        console.log('results', result)
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('park already exists')
          return handleSQLError(res, err)
        }
        return fetchReviewById(result.insertId, res)
    })
}

const deleteReviewById = (req, res) => {
  let sql = "DELETE FROM reviews WHERE id = ?"

  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
    getAllReviews,
    showReview,
    createReview,
    deleteReviewById
}