import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import Login from '../screens/AuthPages/Login';
import SignUP from '../screens/AuthPages/SignUP';

import FindProfessional from '../screens/JobScreens/FindProfessional';
import PaintingJob from '../screens/JobScreens/PaintingJob';

import PaintingJob1 from '../screens/JobScreens/PaintingJob1';
import PaintingJob2 from '../screens/JobScreens/PaintingJob2';
import BathroomFittingJob1 from '../screens/JobScreens/BathRoomFittingJob1';
import BathroomFittingJob2 from '../screens/JobScreens/BathroomFittingJob2';
import BathroomFittingJob3 from '../screens/JobScreens/BathroomFittingJob3';

// Recruiter Screens
import ContactInformation from '../screens/RecruiterScreens/AccountSettingsScreens/ContactInformation';
import ManageAccount from '../screens/RecruiterScreens/AccountSettingsScreens/ManageAccount';
import Notifications from '../screens/RecruiterScreens/AccountSettingsScreens/Notifications';
import PreviousJobs from '../screens/RecruiterScreens/AccountSettingsScreens/PreviousJobs';
import ChangePassword from '../screens/RecruiterScreens/AccountSettingsScreens/ChangePassword';
import ContactCenter from '../screens/RecruiterScreens/ContactCenter';
import PostedJobs from '../screens/RecruiterScreens/PostedJobs';
import JobDetail from '../screens/RecruiterScreens/PostedJobs/JobDetail';

// User Screens
import ProfileDetails from '../screens/UserScreens/AccountSettingsScreens/ProfileDetails';
import CompanyDetails from '../screens/UserScreens/AccountSettingsScreens/CompanyDetails';
import ManageUserAccount from '../screens/UserScreens/AccountSettingsScreens/ManageAccount';
import UserNotifications from '../screens/UserScreens/AccountSettingsScreens/Notifications';
import AppliedJobs from '../screens/UserScreens/AccountSettingsScreens/AppliedJobs';
import PaymentMethod from '../screens/UserScreens/AccountSettingsScreens/PaymentMethod';
import UserContactCenter from '../screens/UserScreens/ContactCenter';
import SetUpProfile from '../screens/SetUpProfile';
import SavedLeads from '../screens/UserScreens/SavedLeads';
import TopJobForYou from '../screens/UserScreens/TopJobForYou';

// User And Recruiter chat Screens share same chat layout component
import UserChat from '../screens/UserScreens/UserChat/index.';
import RecruiterChat from '../screens/RecruiterScreens/RecruiterChat';

const AppRouter = () => {
  return (
    // <Router basename='/connect24'>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Auth Screens */}
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUP />} />

        <Route path='/painting-job' element={<PaintingJob />} />

        {/* Find Jobs || Find Professionls */}
        <Route path='/find-professionals' element={<FindProfessional />} />

        {/* <Route path='/painting-job-1' element={<PaintingJob1 />} />
        <Route path='/painting-job-2' element={<PaintingJob2 />} />
        <Route
          path='/bathroom-fitting-job-1'
          element={<BathroomFittingJob1 />}
        />
        <Route
          path='/bathroom-fitting-job-2'
          element={<BathroomFittingJob2 />}
        />
        <Route
          path='/bathroom-fitting-job-3'
          element={<BathroomFittingJob3 />}
        /> */}

        {/* Recruiter Screens */}
        <Route
          path='/recruiter/account-setting/contact-info'
          element={<ContactInformation />}
        />
        <Route
          path='/recruiter/account-setting/manage-account'
          element={<ManageAccount />}
        />
        <Route
          path='/recruiter/account-setting/notifications'
          element={<Notifications />}
        />
        <Route
          path='/recruiter/account-setting/previous-jobs'
          element={<PreviousJobs />}
        />
        <Route
          path='/recruiter/account-setting/change-password'
          element={<ChangePassword />}
        />

        <Route path='/recruiter/contact-center' element={<ContactCenter />} />
        <Route path='/recruiter/chat' element={<RecruiterChat />} />

        <Route path='/recruiter/posted-jobs' element={<PostedJobs />} />
        <Route path='/recruiter/posted-jobs/detail' element={<JobDetail />} />

        {/* User Dashboard Dashboard */}
        <Route
          path='/user/account-setting/profile-details'
          element={<ProfileDetails />}
        />
        <Route
          path='/user/account-setting/company-details'
          element={<CompanyDetails />}
        />
        <Route
          path='/user/account-setting/manage-account'
          element={<ManageUserAccount />}
        />
        <Route
          path='/user/account-setting/notifications'
          element={<UserNotifications />}
        />
        <Route
          path='/user/account-setting/applied-jobs'
          element={<AppliedJobs />}
        />
        <Route
          path='/user/account-setting/payment-method'
          element={<PaymentMethod />}
        />

        <Route path='/user/saved-leads' element={<SavedLeads />} />
        <Route path='/user/contact-center' element={<UserContactCenter />} />
        <Route path='/user/chat' element={<UserChat />} />

        <Route path='/user/top-job-for-you' element={<TopJobForYou />} />
        <Route path='/set-up-profile' element={<SetUpProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
