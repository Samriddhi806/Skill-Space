// models/Assignment.js
const { ObjectId } = require('mongodb');

module.exports = {
  admin_id: ObjectId,
  employee_id: ObjectId,
  test_id: ObjectId,
  assigned_at: { type: Date, default: Date.now }
};
