const axios = require('../utils/axios.js');
const moment = require('moment');

let orderPage = async (req, res) => {
  try {
    let tourId = req.query.tourId;
    let date = req.query.dateId;
    if (!tourId || !date) {
      return res.render('404.ejs');
    }
    let dataTour;
    try {
      dataTour = await axios.get(
        `http://localhost:3124/api/v1/tours/${tourId}?dateId=${date}`
      );
      let myMoment = moment(dataTour.data.tourCalendars[0].start_date);
      dataTour.data.tourCalendars[0].start_date_format =
        myMoment.format('YYYY-MM-DD');
      if (!dataTour.data.tourCalendars[0].voucher) {
        let option = {
          value: 0,
          type: 1,
        };
        dataTour.data.tourCalendars[0].voucher = option;
      }
    } catch (error) {
      console.log(error);
    }
    return res.render('customer/orderTour.ejs', {
      tour: dataTour.data,
      calendars: dataTour.data.tourCalendars[0],
    });
  } catch (error) {
    console.log(error);
    return res.redirect('/');
  }
};

let editInfoPage = async (req, res) => {
  try {
    let userId = req.params.id;
    let cookies = req.headers.cookie;
    try {
      let dataUser = await axios.get(
        `http://localhost:3124/api/v1/users/${userId}`,
        {
          headers: {
            Cookie: cookies, // Gắn cookie vào trong headers
          },
          withCredentials: true, // Gắn thông tin xác thực
        }
      );
      return res.render('customer/editInfoCustomer.ejs', {
        user: dataUser.data,
      });
    } catch (error) {
      console.log(error);
      return res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    return res.redirect('/');
  }
};
module.exports = {
  orderPage: orderPage,
  editInfoPage: editInfoPage,
};
