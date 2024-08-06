// timesheet.route.js
const { Router } = require('express');
const timesheetController = require('../controllers/timesheet.controller');

const router = Router();

router.get('/last', timesheetController.last);
router.get('/date/:date', timesheetController.timesheetByDate);
router.get('/this-week', timesheetController.timesheetThisWeek);
router.get('/range-date/:startDate/:endDate', timesheetController.timesheetByRangeDate);
router.get('/check-valid/:year/:month', timesheetController.checkTimesheet);

router.put('/update/:id', timesheetController.updateTimesheet);

router.post('/bulk', timesheetController.bulk);

router.delete('/delete/:id', timesheetController.deleteTimesheet);

module.exports = router;
