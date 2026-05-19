import React, { useEffect, useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';
import { formatMoney } from '../../../utils/jobStatus';

const PaymentsAndEarnings = () => {
  const { t } = useTranslation('common');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.TRANSACTIONS.LIST);
      if (response.data.success) {
        setTransactions(response.data.data.transactions || []);
      }
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const completed = transactions.filter((tx) => tx.status === 'completed');
  const pending = transactions.filter((tx) => tx.status === 'pending');

  const totalEarned = completed.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const pendingTotal = pending.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const getStatusBadge = (status) => {
    const map = {
      completed: 'badge bg-success',
      pending: 'badge bg-warning text-dark',
      failed: 'badge bg-danger',
    };
    return <span className={map[status] || 'badge bg-secondary'}>{status}</span>;
  };

  return (
    <RecruiterAccountSettingLayout>
      <div>
        <div className="sec-head mb-4">
          <h2>{t('recruiter.paymentsAndEarningsTitle')}</h2>
          <p className="mt-2">{t('recruiter.paymentsAndEarningsSubtext')}</p>
        </div>

        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-muted mb-3">Total Earned</h5>
                <h2 className="mb-0 text-success">{formatMoney(totalEarned)}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-muted mb-3">Pending</h5>
                <h2 className="mb-0 text-warning">{formatMoney(pendingTotal)}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-3">{t('recruiter.transactionHistory')}</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>{t('recruiter.jobName')}</th>
                  <th>{t('recruiter.amount')}</th>
                  <th>{t('recruiter.status')}</th>
                  <th>{t('recruiter.date')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm" />
                    </td>
                  </tr>
                ) : transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.job?.title || `Job #${tx.job_id}`}</td>
                      <td className="fw-bold">{formatMoney(tx.amount, tx.currency)}</td>
                      <td>{getStatusBadge(tx.status)}</td>
                      <td>{new Date(tx.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No transactions yet. Complete paid jobs to see earnings here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RecruiterAccountSettingLayout>
  );
};

export default PaymentsAndEarnings;

