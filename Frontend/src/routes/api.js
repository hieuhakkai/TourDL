const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const userController = require('../controllers/userController');
const tourController = require('../controllers/tourController');
const paymentController = require('../controllers/paymentController');
const provinceController = require('../controllers/provinceController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

const initAPIs = (app) => {
  router.get('/transports', transportController.handleGetValues);
  router.post('/transports', transportController.handleCreate);
  router.get(
    '/users-top',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPIAdmin,
    userController.handleGetTopUser
  );
  router.get(
    '/tours',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPIAdmin,
    tourController.handleGetTourType
  );
  router.get('/tours/:id', tourController.handleGetTourDetail);
  router.get(
    '/users/:id',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPI,
    userController.handleGetInfo
  );
  router.get('/provinces', provinceController.handleGetAll);
  // Post tour
  router.post(
    '/tour-order',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPI,
    tourController.handleOrderTour
  );
  router.post(
    '/payment',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPI,
    paymentController.handleCreateOrder
  );
  router.post('/auth/login', authController.handleLogin);
  router.post(
    '/auth/logout',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPI,
    (req, res) => {
      res.clearCookie('SessionID', { path: '/' });
      res.status(200).json({
        message: 'OK',
      });
    }
  );
  router.put(
    '/users/:id',
    authMiddleware.validateAPI,
    authMiddleware.authorizationAPI,
    validateMiddleware.validateDataUser,
    userController.handleUpdateInfo
  );
  return app.use('/api/v1/', router);
};

module.exports = initAPIs;
