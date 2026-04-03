import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/AuthPages/Login";
import SignUP from "../screens/AuthPages/SignUP";
import VerifyOtp from "../screens/AuthPages/VerifyOtp";
import ForgotPassword from "../screens/AuthPages/ForgotPassword";
import ResetPassword from "../screens/AuthPages/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";

import FindProfessional from "../screens/JobScreens/FindProfessional";

import PaintingJob1 from "../screens/JobScreens/PaintingJob1";
import PaintingJob2 from "../screens/JobScreens/PaintingJob2";
import BathroomFittingJob1 from "../screens/JobScreens/BathRoomFittingJob1";
import BathroomFittingJob2 from "../screens/JobScreens/BathroomFittingJob2";
import BathroomFittingJob3 from "../screens/JobScreens/BathroomFittingJob3";

// Recruiter Screens
import ContactInformation from "../screens/RecruiterScreens/AccountSettingsScreens/ContactInformation";
import ManageAccount from "../screens/RecruiterScreens/AccountSettingsScreens/ManageAccount";
import Notifications from "../screens/RecruiterScreens/AccountSettingsScreens/Notifications";
import PreviousJobs from "../screens/RecruiterScreens/AccountSettingsScreens/PreviousJobs";
import PaymentsAndEarnings from "../screens/RecruiterScreens/AccountSettingsScreens/PaymentsAndEarnings";
import ChangePassword from "../screens/RecruiterScreens/AccountSettingsScreens/ChangePassword";
import ContactCenter from "../screens/RecruiterScreens/ContactCenter";
import PostedJobs from "../screens/RecruiterScreens/PostedJobs";
import JobDetail from "../screens/RecruiterScreens/PostedJobs/JobDetail";

// User Screens
import ProfileDetails from "../screens/UserScreens/AccountSettingsScreens/ProfileDetails";
import CompanyDetails from "../screens/UserScreens/AccountSettingsScreens/CompanyDetails";
import ManageUserAccount from "../screens/UserScreens/AccountSettingsScreens/ManageAccount";
import UserNotifications from "../screens/UserScreens/AccountSettingsScreens/Notifications";
import AppliedJobs from "../screens/UserScreens/AccountSettingsScreens/AppliedJobs";
import PaymentMethod from "../screens/UserScreens/AccountSettingsScreens/PaymentMethod";
import UserContactCenter from "../screens/UserScreens/ContactCenter";
import SetUpProfile from "../screens/SetUpProfile";
import SavedLeads from "../screens/UserScreens/SavedLeads";
import TopJobForYou from "../screens/UserScreens/TopJobForYou";
import UserPostedJobs from "../screens/UserScreens/PostedJobs";
import UserJobDetail from "../screens/UserScreens/PostedJobs/JobDetail";

// User And Recruiter chat Screens share same chat layout component
// import UserChat from '../screens/UserScreens/UserChat/index.';
// import RecruiterChat from '../screens/RecruiterScreens/RecruiterChat';
import ChatPage from "../screens/ChatPage";
import PostaJob from "../screens/JobScreens/PostaJob";
import BookService from "../screens/JobScreens/BookService";

const AppRouter = () => {
  return (
    // <Router basename='/connect24'>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Screens */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUP />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/post-a-job/:category" element={<PostaJob />} />
        <Route path="/book-service/:service" element={<BookService />} />

        {/* Find Jobs || Find Professionls */}
        <Route path="/find-professionals" element={<FindProfessional />} />

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

        {/* Recruiter Screens - Only for professionals */}
        <Route
          path="/recruiter/account-setting/contact-info"
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <ContactInformation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/account-setting/manage-account"
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <ManageAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/account-setting/notifications"
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/account-setting/previous-jobs"
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <PreviousJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/account-setting/payments-earnings"
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <PaymentsAndEarnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/account-setting/change-password"
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/recruiter/contact-center" 
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <ContactCenter />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/recruiter/posted-jobs" 
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <PostedJobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/posted-jobs/detail/:id" 
          element={
            <ProtectedRoute allowedRoles={['professional']}>
              <JobDetail />
            </ProtectedRoute>
          } 
        />

        {/* User Dashboard - Only for customers */}
        <Route
          path="/user/account-setting/profile-details"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ProfileDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account-setting/company-details"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CompanyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account-setting/manage-account"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ManageUserAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account-setting/notifications"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <UserNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account-setting/applied-jobs"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <AppliedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account-setting/payment-method"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PaymentMethod />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/user/saved-leads" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <SavedLeads />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/posted-jobs" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <UserPostedJobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/posted-jobs/:id" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <UserJobDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/contact-center" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <UserContactCenter />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/user/top-job-for-you" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <TopJobForYou />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/set-up-profile" 
          element={
            <ProtectedRoute>
              <SetUpProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
