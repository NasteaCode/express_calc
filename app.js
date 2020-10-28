/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const {
  NotFoundError,
  BadRequestError
} = require("./expressError");
const {
  convertStrNums
} = require("./utils");
const {
  findMean,
  findMedian,
  findMode
} = require("./stats");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res, next) {
  try {
    if (req.query.nums === undefined) {
      throw new BadRequestError(MISSING);
    };
    const nums = req.query.nums.split(",");
    let convertedNums = convertStrNums(nums);
    return res.json({
      response: {
        operation: "mean",
        value: findMean(convertedNums)
      }
    });
  } catch (error) {
    return next(error);
  }
})

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res, next) {
  try {
    if (req.query.nums === undefined) {
      throw new BadRequestError(MISSING);
    };
    const nums = req.query.nums.split(",");
    let convertedNums = convertStrNums(nums);
    return res.json({
      response: {
        operation: "median",
        value: findMedian(convertedNums)
      }
    });
  } catch (error) {
    return next(error);
  }
})


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res, next) {
  try {
    if (req.query.nums === undefined) {
      throw new BadRequestError(MISSING);
    }
    const nums = req.query.nums;
    let convertedNums = convertStrNums(nums).split(",");
    return res.json({
      response: {
        operation: "mode",
        value: findMode(convertedNums)
      }
    });
  } catch (error) {
    return next(error);
  }
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({
    error: {
      message,
      status
    }
  });
});



module.exports = app;