import React from 'react';
import { formatMoney, QUOTE_STATUS_BADGE } from '../../utils/jobStatus';
import './JobWorkflow.css';

const QuoteCard = ({
  quote,
  showActions,
  onAccept,
  onReject,
  processing,
}) => {
  const pro = quote.professional || {};

  return (
    <div className={`quote-card ${quote.status === 'accepted' ? 'quote-card--accepted' : ''}`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h5 className="mb-1">{pro.name || 'Professional'}</h5>
          <p className="quote-card__meta mb-0">{pro.email}</p>
        </div>
        <span className={`badge ${QUOTE_STATUS_BADGE[quote.status] || 'bg-secondary'}`}>
          {quote.status}
        </span>
      </div>
      <p className="quote-card__amount mb-2">{formatMoney(quote.amount, quote.currency)}</p>
      {quote.message && <p className="mb-2">{quote.message}</p>}
      {quote.valid_until && (
        <p className="quote-card__meta mb-2">
          Valid until: {new Date(quote.valid_until).toLocaleDateString()}
        </p>
      )}
      {showActions && quote.status === 'pending' && (
        <div className="d-flex gap-2 flex-wrap mt-3">
          <button
            type="button"
            className="customBtn btn-bgRed flex-fill"
            disabled={processing}
            onClick={() => onAccept(quote.id)}
          >
            Accept & Pay
          </button>
          <button
            type="button"
            className="customBtn btn-outline flex-fill"
            disabled={processing}
            onClick={() => onReject(quote.id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;


