const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController'); // Adjust the path as needed
const Payment = require('../models/paymentModel');

// Mock the Payment model
jest.mock('../models/paymentModel');

describe('Payment Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('createPayment', () => {
    it('should create a payment successfully', async () => {
      req.body = {
        userId: 'userId123',
        bookingId: 'bookingId123',
        amount: 100,
        paymentMethod: 'Credit Card',
      };

      Payment.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}),
      }));

      await createPayment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Payment created successfully',
        payment: expect.any(Object),
      });
    });

    it('should handle internal server errors during payment creation', async () => {
      req.body = {
        userId: 'userId123',
        bookingId: 'bookingId123',
      };
      Payment.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Internal error')),
      }));

      await createPayment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('getAllPayments', () => {
    it('should return all payments', async () => {
      Payment.find.mockResolvedValue([{}]); // Mock payments found

      await getAllPayments(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ payments: expect.any(Array) });
    });

    it('should handle internal server errors when fetching payments', async () => {
      Payment.find.mockRejectedValue(new Error('Internal error'));

      await getAllPayments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('getPaymentById', () => {
    it('should return a payment by ID', async () => {
      req.params.id = 'paymentId123';
      Payment.findById.mockResolvedValue({}); // Mock payment found

      await getPaymentById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ payment: expect.any(Object) });
    });

    it('should return 404 if payment not found', async () => {
      req.params.id = 'paymentId123';
      Payment.findById.mockResolvedValue(null); // No payment found

      await getPaymentById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Payment not found' });
    });

    it('should handle internal server errors during payment fetch', async () => {
      req.params.id = 'paymentId123';
      Payment.findById.mockRejectedValue(new Error('Internal error'));

      await getPaymentById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('updatePayment', () => {
    it('should update a payment successfully', async () => {
      req.params.id = 'paymentId123';
      req.body = { amount: 200 };
      Payment.findByIdAndUpdate.mockResolvedValue({}); // Mock updated payment found

      await updatePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Payment updated successfully',
        payment: expect.any(Object),
      });
    });

    it('should return 404 if payment not found during update', async () => {
      req.params.id = 'paymentId123';
      Payment.findByIdAndUpdate.mockResolvedValue(null); // No payment found

      await updatePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Payment not found' });
    });

    it('should handle internal server errors during payment update', async () => {
      req.params.id = 'paymentId123';
      Payment.findByIdAndUpdate.mockRejectedValue(new Error('Internal error'));

      await updatePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('deletePayment', () => {
    it('should delete a payment successfully', async () => {
      req.params.id = 'paymentId123';
      Payment.findByIdAndDelete.mockResolvedValue({}); // Mock payment found and deleted

      await deletePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Payment deleted successfully' });
    });

    it('should return 404 if payment not found during delete', async () => {
      req.params.id = 'paymentId123';
      Payment.findByIdAndDelete.mockResolvedValue(null); // No payment found

      await deletePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Payment not found' });
    });

    it('should handle internal server errors during payment delete', async () => {
      req.params.id = 'paymentId123';
      Payment.findByIdAndDelete.mockRejectedValue(new Error('Internal error'));

      await deletePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});

// touch __tests__/paymentController.test.js
