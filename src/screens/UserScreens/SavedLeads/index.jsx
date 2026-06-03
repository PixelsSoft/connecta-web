import { Navigate } from 'react-router-dom';

/**
 * Legacy route — "Saved Leads" is for professionals only.
 * Customers manage jobs at /user/posted-jobs.
 */
const SavedLeads = () => <Navigate to="/user/posted-jobs" replace />;

export default SavedLeads;
