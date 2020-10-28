/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils");
const { findMean } = require("./stats");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// process JSON body=> req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res, next) {
  try {
    if(req.query.nums === undefined) {
      throw new BadRequestError(MISSING);
    };
    const nums = req.query.nums;
    let answer = convertStrNums(nums);
    return res.json({
      response: {
        operation: "mean",
        value : findMean(answer)
      }
    });
  // return res.send(`The mean is ${req.params.response}`)
  } 
})

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;