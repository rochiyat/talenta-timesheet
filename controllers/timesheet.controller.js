// timesheet.controller.js
const moment = require('moment');
const timesheetServices = require('../services/timesheet.service.js');
const { responseSuccess, responseError, dataFormated } = require('../common/utils.js');

export async function last(req, res) {
    try {
        const {cookie} = req.headers;
        if (!cookie) {
            return res.status(500).send('Cookie is required');
        }

        const response = await timesheetServices.lastTimesheet(cookie);
        if (response.status !== 200) {
            return res.status(500).send(response.error);
        }
        return responseSuccess(res, dataFormated(response.data));
    } catch (error) {
        return responseError(res, error);
    }
}
