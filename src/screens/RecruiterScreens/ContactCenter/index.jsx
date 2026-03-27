import React, { useState, useEffect } from "react";
import COLXXL10 from "../../../components/COLXXL10";
import { LuPhone } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RecruiterLayout from "../../../components/Layouts/RecruiterLayout";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axios";
import { API_ENDPOINTS } from "../../../config/api";

const ContactCenter = () => {
  const { t } = useTranslation("common");
  const [activeSection, setActiveSection] = useState("faqs");
  const [contactSettings, setContactSettings] = useState({
    contact_phone: "+44 225 25148",
    contact_email: "info@connecta24.com",
    contact_address: "",
    support_hours: "Monday - Friday: 8:00 AM - 6:00 PM",
    support_hours_weekend: "Saturday: 9:00 AM - 2:00 PM",
  });
  const [settings, setSettings] = useState({
    language: "en",
    notifications: true,
  });
  const [faqs, setFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "technical",
    description: ""
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    fetchSettings();
    fetchFaqs();
  }, []);

  useEffect(() => {
    if (activeSection === "termsConditions") {
      fetchPage("terms-conditions");
    } else if (activeSection === "privacyPolicy") {
      fetchPage("privacy-policy");
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "faqs") {
      fetchFaqs();
    }
  }, [selectedCategory]);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SETTINGS.GET_ALL);
      if (response.data.success) {
        setContactSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const params = selectedCategory !== "all" ? { category: selectedCategory } : {};
      const response = await axiosInstance.get(API_ENDPOINTS.FAQS.LIST, { params });
      if (response.data.success) {
        setFaqs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const fetchPage = async (slug) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PAGES.GET(slug));
      if (response.data.success) {
        if (slug === "terms-conditions") {
          setTermsContent(response.data.data.content);
        } else if (slug === "privacy-policy") {
          setPrivacyContent(response.data.data.content);
        }
      }
    } catch (error) {
      console.error("Error fetching page:", error);
    }
  };

  const handleTicketFormChange = (e) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.SUPPORT_TICKETS.CREATE, ticketForm);
      if (response.data.success) {
        setSubmitSuccess(true);
        setTicketForm({
          subject: "",
          category: "technical",
          description: ""
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Failed to submit support ticket. Please try again.");
    }
  };

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
            
            <div className="mb-4">
              <select 
                className="form-control form-select" 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ maxWidth: "300px" }}
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="account">Account</option>
                <option value="payment">Payment</option>
                <option value="technical">Technical</option>
              </select>
            </div>

            {faqs.length > 0 ? (
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header" id={`heading${faq.id}`}>
                      <button
                        className={`accordion-button ${openAccordion === faq.id ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setOpenAccordion(openAccordion === faq.id ? null : faq.id)}
                        aria-expanded={openAccordion === faq.id}
                        aria-controls={`collapse${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${faq.id}`}
                      className={`accordion-collapse collapse ${openAccordion === faq.id ? 'show' : ''}`}
                      aria-labelledby={`heading${faq.id}`}
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No FAQs available for this category.</p>
            )}
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
                      <a href={`tel:${contactSettings.contact_phone}`}>{contactSettings.contact_phone}</a>
                    </h5>
                    <p>{contactSettings.support_hours}</p>
                    <p className="text-muted small">{contactSettings.support_hours_weekend}</p>
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
                      <a href={`mailto:${contactSettings.contact_email}`}>
                        {contactSettings.contact_email}
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
                      <a href={`mailto:${contactSettings.contact_email}`}>
                        {contactSettings.contact_email}
                      </a>
                    </h5>
                    <p>{contactSettings.contact_address}</p>
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
            
            {submitSuccess && (
              <div className="alert alert-success" role="alert">
                Your support ticket has been submitted successfully! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmitTicket}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="inputGroup">
                    <label htmlFor="problemSubject" className="form-label">
                      {t("helpCenter.subject")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="problemSubject"
                      name="subject"
                      value={ticketForm.subject}
                      onChange={handleTicketFormChange}
                      placeholder={t("helpCenter.enterSubject")}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="inputGroup">
                    <label htmlFor="problemCategory" className="form-label">
                      {t("helpCenter.problemCategory")}
                    </label>
                    <select
                      className="form-control form-select"
                      id="problemCategory"
                      name="category"
                      value={ticketForm.category}
                      onChange={handleTicketFormChange}
                      required
                    >
                      <option value="technical">{t("helpCenter.technicalIssue")}</option>
                      <option value="account">{t("helpCenter.accountIssue")}</option>
                      <option value="payment">{t("helpCenter.paymentIssue")}</option>
                      <option value="other">{t("jobPosting.other")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="inputGroup">
                    <label htmlFor="problemDescription" className="form-label">
                      {t("forms.description")}
                    </label>
                    <textarea
                      className="form-control"
                      id="problemDescription"
                      name="description"
                      value={ticketForm.description}
                      onChange={handleTicketFormChange}
                      rows="5"
                      placeholder={t("helpCenter.describeProblem")}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="customBtn btn-bgRed">
                    {t("helpCenter.submitReport")}
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
            {termsContent ? (
              <div dangerouslySetInnerHTML={{ __html: termsContent }} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        );
      case "privacyPolicy":
        return (
          <div>
            <h4 className="mb-3">{t("helpCenter.privacyPolicy")}</h4>
            {privacyContent ? (
              <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
            ) : (
              <p>Loading...</p>
            )}
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
    <RecruiterLayout>
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
                      <h5 className="mb-3">{t("helpCenter.sections")}</h5>
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
                      <h5 className="mb-3">{t("helpCenter.settings")}</h5>
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
                    </div>
                    <div className="contact__center-box-content">
                      <h5>
                        <a href={`tel:${contactSettings.contact_phone}`}>{contactSettings.contact_phone}</a>
                      </h5>
                      <p>{t("recruiter.callDescription")}</p>
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
    </RecruiterLayout>
  );
};

export default ContactCenter;
