<<<<<<< HEAD
import React, { useState } from "react";
import COLXXL10 from "../../../components/COLXXL10";
import { LuPhone } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/Layouts/UserLayout";
import { useTranslation } from "react-i18next";
=======
import React from 'react';
import COLXXL10 from '../../../components/COLXXL10';
import { LuPhone } from 'react-icons/lu';
import { FaRegEnvelope } from 'react-icons/fa6';
import UserLayout from '../../../components/Layouts/UserLayout';
>>>>>>> origin/Working-on-flow

const ContactCenter = () => {
  const { t } = useTranslation("common");
  const [activeSection, setActiveSection] = useState("faqs");
  const [settings, setSettings] = useState({
    language: "en",
    notifications: true,
  });

  const handleSettingsChange = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle save changes logic
    console.log("Settings saved:", settings);
  };

  const sidebarLinks = [
    { id: "faqs", label: t("helpCenter.faqs") },
    { id: "contactSupport", label: t("helpCenter.contactSupport") },
    { id: "reportProblem", label: t("helpCenter.reportProblem") },
    { id: "termsConditions", label: t("helpCenter.termsConditions") },
    { id: "privacyPolicy", label: t("helpCenter.privacyPolicy") },
  ];

  const settingsLinks = [
    { id: "language", label: t("helpCenter.language") },
    { id: "notifications", label: t("helpCenter.notifications") },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "faqs":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.faqs")}</h4>
            <p>Frequently Asked Questions content will go here...</p>
          </div>
        );
      case "contactSupport":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.contactSupport")}</h4>
            <div className="row">
              <div className="col-lg-4 mb-3">
                <div className="contact__center-box">
                  <div className="contact__center-box-header">
                    <div className="contact__center-box-header-icon">
                      <LuPhone />
                    </div>
                    <h4>{t("recruiter.call")}</h4>
                  </div>
                  <div className="contact__center-box-content">
                    <h5>
                      <a href="tel:+44 225 25148">+44 225 25148</a>
                    </h5>
                    <p>{t("recruiter.callDescription")}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="contact__center-box">
                  <div className="contact__center-box-header">
                    <div className="contact__center-box-header-icon">
                      <FaRegEnvelope />
                    </div>
                    <h4>{t("recruiter.emailSales")}</h4>
                  </div>
                  <div className="contact__center-box-content">
                    <h5>
                      <a href="mailto:Sales@connectedforlife.com">
                        Sales@connectedforlife.com
                      </a>
                    </h5>
                    <p>{t("recruiter.emailSalesDescription")}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="contact__center-box">
                  <div className="contact__center-box-header">
                    <div className="contact__center-box-header-icon">
                      <FaRegEnvelope />
                    </div>
                    <h4>{t("recruiter.emailAdmin")}</h4>
                  </div>
                  <div className="contact__center-box-content">
                    <h5>
                      <a href="mailto:Admin@connectedforlife.com">
                        Admin@connectedforlife.com
                      </a>
                    </h5>
                    <p>{t("recruiter.emailAdminDescription")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="#" className="customBtn btn-bgGreen">
                {t("helpCenter.contactSupportButton")}
              </Link>
            </div>
            <p className="text-muted small mt-3">
              <em>{t("helpCenter.supportResponseTime")}</em>
            </p>
          </div>
        );
      case "reportProblem":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.reportProblem")}</h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="inputGroup">
                    <label htmlFor="problemSubject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="problemSubject"
                      placeholder="Enter subject"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="inputGroup">
                    <label htmlFor="problemCategory" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-control form-select"
                      id="problemCategory"
                    >
                      <option>Technical Issue</option>
                      <option>Account Issue</option>
                      <option>Payment Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="inputGroup">
                    <label htmlFor="problemDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="problemDescription"
                      rows="5"
                      placeholder="Describe the problem..."
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="customBtn btn-bgRed">
                    Submit Report
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      case "termsConditions":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.termsConditions")}</h4>
            <p>Terms & Conditions content will go here...</p>
          </div>
        );
      case "privacyPolicy":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.privacyPolicy")}</h4>
            <p>Privacy Policy content will go here...</p>
          </div>
        );
      case "language":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.language")}</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="inputGroup">
                  <label htmlFor="language" className="form-label">
                    {t("helpCenter.language")}
                  </label>
                  <select
                    className="form-control form-select"
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingsChange("language", e.target.value)
                    }
                  >
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="it">Italian</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSaveChanges}
                className="customBtn btn-bgRed"
              >
                {t("helpCenter.saveChanges")}
              </button>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.notifications")}</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="inputGroup">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="notifications"
                      checked={settings.notifications}
                      onChange={(e) =>
                        handleSettingsChange("notifications", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="notifications">
                      {t("helpCenter.notifications")}{" "}
                      {settings.notifications ? "(On)" : "(Off)"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSaveChanges}
                className="customBtn btn-bgRed"
              >
                {t("helpCenter.saveChanges")}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <section className="accountSettings-sec">
        <div className="container">
          <div className="row justify-content-center">
            <COLXXL10>
              <div className="row">
                <div className="col-md-12">
                  <div className="sec-head">
                    <h2>{t("helpCenter.title")}</h2>
                    <p className="mt-2">{t("helpCenter.subtext")}</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-4">
                  <div className="accountSettings-sideBar me-xl-5 me-lg-4">
                    <div className="mb-4">
                      <h5 className="mb-3">Sections</h5>
                      {sidebarLinks.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`accountSettings-sideBar-item ${
                            activeSection === item.id ? "active" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h5 className="mb-3">Settings</h5>
                      {settingsLinks.map((item) =>
                        item.path ? (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="accountSettings-sideBar-item"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <div
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`accountSettings-sideBar-item ${
                              activeSection === item.id ? "active" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                          >
                            {item.label}
                          </div>
                        )
                      )}
                    <div className='contact__center-box-content'>
                      <h5>
                        <a href='tel:+44 225 25148'>+44 225 25148</a>
                      </h5>
                      <p>You can call us 24/7 for instant assistance</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-8">
                  {renderContent()}
                </div>
              </div>
            </COLXXL10>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default ContactCenter;
