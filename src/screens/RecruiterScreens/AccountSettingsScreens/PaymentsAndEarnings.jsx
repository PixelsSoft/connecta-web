import React, { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';
import { useTranslation } from 'react-i18next';

const PaymentsAndEarnings = () => {
  const { t } = useTranslation('common');

  // Sample data
  const currentBalance = 1250.50;
  const pendingPayments = 450.00;

  const completedJobsData = [
    {
      id: 1,
      jobName: 'Painting House',
      amount: 850.00,
      status: 'completed',
      date: '2025-02-20',
    },
    {
      id: 2,
      jobName: 'Gardening Service',
      amount: 400.50,
      status: 'completed',
      date: '2025-02-15',
    },
  ];

  const transactionHistoryData = [
    {
      id: 1,
      jobName: 'Painting House',
      amount: 850.00,
      status: 'completed',
      date: '2025-02-20',
    },
    {
      id: 2,
      jobName: 'Gardening Service',
      amount: 400.50,
      status: 'completed',
      date: '2025-02-15',
    },
    {
      id: 3,
      jobName: 'Plumbing Repair',
      amount: 300.00,
      status: 'pending',
      date: '2025-02-10',
    },
    {
      id: 4,
      jobName: 'Electrical Work',
      amount: 150.00,
      status: 'processing',
      date: '2025-02-05',
    },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { class: 'badge bg-success', text: t('recruiter.completed') },
      pending: { class: 'badge bg-warning', text: t('recruiter.pending') },
      processing: { class: 'badge bg-info', text: t('recruiter.processing') },
    };
    const statusInfo = statusMap[status] || { class: 'badge bg-secondary', text: status };
    return <span className={statusInfo.class}>{statusInfo.text}</span>;
  };

  const formatCurrency = (amount) => {
    return `€${amount.toFixed(2)}`;
  };

  return (
    <RecruiterAccountSettingLayout>
      <div>
        <div className='sec-head mb-4'>
          <h2>{t('recruiter.paymentsAndEarningsTitle')}</h2>
          <p className='mt-2'>{t('recruiter.paymentsAndEarningsSubtext')}</p>
        </div>

        {/* Current Balance & Pending Payments */}
        <div className='row mb-4'>
          <div className='col-lg-6 mb-3'>
            <div className='card border-0 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title text-muted mb-3'>{t('recruiter.currentBalance')}</h5>
                <h2 className='mb-0 text-success'>{formatCurrency(currentBalance)}</h2>
              </div>
            </div>
          </div>
          <div className='col-lg-6 mb-3'>
            <div className='card border-0 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title text-muted mb-3'>{t('recruiter.pendingPayments')}</h5>
                <h2 className='mb-0 text-warning'>{formatCurrency(pendingPayments)}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Jobs Section */}
        <div className='mb-5'>
          <h4 className='mb-3'>{t('recruiter.completedJobs')}</h4>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>{t('recruiter.jobName')}</th>
                  <th>{t('recruiter.amount')}</th>
                  <th>{t('recruiter.status')}</th>
                  <th>{t('recruiter.date')}</th>
                  <th>{t('recruiter.viewDetails')}</th>
                </tr>
              </thead>
              <tbody>
                {completedJobsData.length > 0 ? (
                  completedJobsData.map((job) => (
                    <tr key={job.id}>
                      <td>{job.jobName}</td>
                      <td className='fw-bold'>{formatCurrency(job.amount)}</td>
                      <td>{getStatusBadge(job.status)}</td>
                      <td>{job.date}</td>
                      <td>
                        <button className='btn btn-sm btn-outline-primary'>
                          {t('recruiter.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='5' className='text-center text-muted py-4'>
                      No completed jobs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className='mb-4'>
          <h4 className='mb-3'>{t('recruiter.transactionHistory')}</h4>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>{t('recruiter.jobName')}</th>
                  <th>{t('recruiter.amount')}</th>
                  <th>{t('recruiter.status')}</th>
                  <th>{t('recruiter.date')}</th>
                  <th>{t('recruiter.viewDetails')}</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistoryData.length > 0 ? (
                  transactionHistoryData.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.jobName}</td>
                      <td className='fw-bold'>{formatCurrency(transaction.amount)}</td>
                      <td>{getStatusBadge(transaction.status)}</td>
                      <td>{transaction.date}</td>
                      <td>
                        <button className='btn btn-sm btn-outline-primary'>
                          {t('recruiter.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='5' className='text-center text-muted py-4'>
                      No transaction history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tooltip */}
        <div className='mt-4 mb-3'>
          <p className='text-muted small'>
            <em>{t('recruiter.paymentsTooltip')}</em>
          </p>
        </div>

        {/* Buttons */}
        <div className='mt-4'>
          <div className='d-flex gap-3'>
            <button className='customBtn btn-bgGreen'>
              {t('recruiter.withdrawFunds')}
            </button>
          </div>
        </div>
      </div>
    </RecruiterAccountSettingLayout>
  );
};

export default PaymentsAndEarnings;

