import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios';
import { API_ENDPOINTS } from '../../config/api';
import { formatMoney } from '../../utils/jobStatus';
import './JobWorkflow.css';

const PaymentForm = ({ jobId, paymentIntentId, amount, currency, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
        setSubmitting(false);
        return;
      }

      const intentId = paymentIntent?.id || paymentIntentId;
      const confirmRes = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CONFIRM, {
        job_id: jobId,
        payment_intent_id: intentId,
      });

      if (confirmRes.data.success && confirmRes.data.data?.paid) {
        toast.success('Payment successful!');
        onSuccess?.(confirmRes.data.data.job);
        onClose();
      } else {
        toast.error(confirmRes.data?.message || 'Payment could not be confirmed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-modal-form">
      <p className="payment-modal-amount mb-3">
        Total: <strong>{formatMoney(amount, currency)}</strong>
      </p>
      <div className="payment-element-wrap mb-3">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>
      <div className="d-flex gap-2 flex-wrap">
        <button
          type="button"
          className="customBtn btn-outline flex-fill"
          onClick={onClose}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="customBtn btn-bgRed flex-fill"
          disabled={!stripe || submitting}
        >
          {submitting ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ show, onHide, jobId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentMeta, setPaymentMeta] = useState(null);

  useEffect(() => {
    if (!show || !jobId) {
      setClientSecret(null);
      setStripePromise(null);
      setPaymentMeta(null);
      return;
    }

    const initPayment = async () => {
      setLoading(true);
      setClientSecret(null);
      try {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.INTENT, {
          job_id: jobId,
        });

        if (response.data.success) {
          const data = response.data.data;
          setClientSecret(data.client_secret);
          setPaymentMeta({
            amount: data.amount,
            currency: data.currency,
            jobTitle: data.job_title,
            paymentIntentId: data.payment_intent_id,
          });
          setStripePromise(loadStripe(data.publishable_key));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not load payment form');
        onHide();
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [show, jobId, onHide]);

  return (
    <Modal show={show} onHide={onHide} centered size="md" className="payment-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>Complete Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        {paymentMeta?.jobTitle && (
          <p className="text-muted small mb-3">{paymentMeta.jobTitle}</p>
        )}

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status" />
            <p className="mt-3 mb-0 text-muted">Loading secure payment...</p>
          </div>
        )}

        {!loading && clientSecret && stripePromise && paymentMeta && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#e63946',
                  borderRadius: '8px',
                },
              },
            }}
          >
            <PaymentForm
              jobId={jobId}
              paymentIntentId={paymentMeta.paymentIntentId}
              amount={paymentMeta.amount}
              currency={paymentMeta.currency}
              onSuccess={onSuccess}
              onClose={onHide}
            />
          </Elements>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;

