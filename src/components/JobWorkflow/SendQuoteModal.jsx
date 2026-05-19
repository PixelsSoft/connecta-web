import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios';
import { API_ENDPOINTS } from '../../config/api';

const SendQuoteModal = ({ show, onHide, jobId, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) < 1) {
      toast.error('Enter a valid amount');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.QUOTES(jobId), {
        amount: Number(amount),
        message,
        valid_until: validUntil || null,
      });

      if (response.data.success) {
        toast.success('Quote sent to customer');
        setAmount('');
        setMessage('');
        setValidUntil('');
        onSuccess?.();
        onHide();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send quote');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Send Quote</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="text-muted small mb-3">
            Send your price offer to the customer. They can accept and pay via Stripe.
          </p>
          <div className="inputGroup mb-3">
            <label className="form-label">Amount (CHF) *</label>
            <input
              type="number"
              className="form-control"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              required
            />
          </div>
          <div className="inputGroup mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Scope, timeline, materials included..."
            />
          </div>
          <div className="inputGroup">
            <label className="form-label">Valid until (optional)</label>
            <input
              type="date"
              className="form-control"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="customBtn btn-outline" onClick={onHide}>
            Cancel
          </button>
          <button type="submit" className="customBtn btn-bgRed" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Quote'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default SendQuoteModal;


