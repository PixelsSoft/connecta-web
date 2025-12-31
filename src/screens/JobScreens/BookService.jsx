import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import JobPostingSec from "../../components/JobPostingSec";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import HomeFooter from "../../components/Layouts/HomeFooter";

import paintingbannerimg from "../../assets/images/painting-banner-img.png";
import jobPostingbannerimg from "../../assets/images/jobPosting-banner-img.png";
import bathroomfittingbanner3 from "../../assets/images/bathroom-fitting-banner-3.png";

const BookService = () => {
  const [step, setStep] = useState(1);
  const { service } = useParams();
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  // Convert service parameter to readable format (e.g., "painting" -> "Painting Service")
  const serviceName = service
    ? service
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") + " Service"
    : "Service";

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
    jobTitle: "",
    description: "",
    location: "",
    budget: "",
    preferredDate: "",
    preferredTime: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle booking submission
    console.log("Booking submitted:", formData);
    navigate("/recruiter/posted-jobs");
  };

  return (
    <DefaultLayout2>
      {step === 1 && (
        <>
          <JobPostingSec
            secTitle={`Book a Professional ${serviceName}`}
            secDescription={t("booking.bookServiceSubtext")}
            rightImg={paintingbannerimg}
          >
            <Row>
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="name" className="form-label fw-600">
                    {t("booking.name")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder={t("booking.name")}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="address" className="form-label fw-600">
                    {t("booking.address")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder={t("booking.address")}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="date" className="form-label fw-600">
                    {t("booking.date")}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="time" className="form-label fw-600">
                    {t("booking.time")}
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-primary px-4 py-2"
                onClick={() => navigate(-1)}
              >
                {t("buttons.back")}
              </button>
              <button className="btn btn-primary px-4 py-2" onClick={nextStep}>
                {t("buttons.next")}
              </button>
            </div>
          </JobPostingSec>
          <HomeFooter />
        </>
      )}

      {step === 2 && (
        <>
          <JobPostingSec
            secTitle={t("booking.provideJobDetails")}
            secDescription={t("booking.jobDetailsSubtext")}
            rightImg={jobPostingbannerimg}
          >
            <div className="inputGroup">
              <label htmlFor="jobTitle" className="form-label fw-600">
                {t("booking.jobTitle")}
              </label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                name="jobTitle"
                placeholder={t("booking.jobTitle")}
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup mt-3">
              <label htmlFor="description" className="form-label fw-600">
                {t("booking.description")}
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                placeholder={t("booking.description")}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <Row className="mt-3">
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="location" className="form-label fw-600">
                    {t("booking.location")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder={t("booking.location")}
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="budget" className="form-label fw-600">
                    {t("booking.budget")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="budget"
                    name="budget"
                    placeholder={t("booking.budget")}
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="preferredDate" className="form-label fw-600">
                    {t("booking.preferredDate")}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="inputGroup">
                  <label htmlFor="preferredTime" className="form-label fw-600">
                    {t("booking.preferredTime")}
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>

            <div className="inputGroup mt-3">
              <label htmlFor="uploadPhotos" className="form-label fw-600">
                {t("booking.uploadPhotosOptional")}
              </label>
              <input
                type="file"
                className="form-control"
                id="uploadPhotos"
                multiple
                accept="image/*"
              />
              <small className="form-text text-muted">
                {t("jobPosting.uploadHelpText")}
              </small>
            </div>

            <p className="text-muted small mt-3">
              <em>{t("booking.bookingTip")}</em>
            </p>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-primary px-4 py-2"
                onClick={prevStep}
              >
                {t("buttons.back")}
              </button>
              <button className="btn btn-primary px-4 py-2" onClick={nextStep}>
                {t("buttons.next")}
              </button>
            </div>
          </JobPostingSec>
          <HomeFooter />
        </>
      )}

      {step === 3 && (
        <>
          <JobPostingSec
            secTitle={t("booking.reviewConfirmBooking")}
            secDescription={t("booking.reviewBookingSubtext")}
            rightImg={bathroomfittingbanner3}
          >
            <div className="review-section">
              <h5 className="mb-3">{t("jobPosting.jobDetails")}</h5>

              <div className="review-item mb-3">
                <strong>{t("booking.serviceType")}:</strong>{" "}
                <span>{serviceName}</span>
              </div>

              {formData.jobTitle && (
                <div className="review-item mb-3">
                  <strong>{t("booking.jobTitle")}:</strong>{" "}
                  <span>{formData.jobTitle}</span>
                </div>
              )}

              {formData.description && (
                <div className="review-item mb-3">
                  <strong>{t("booking.jobDescription")}:</strong>
                  <p className="mt-1 mb-0">{formData.description}</p>
                </div>
              )}

              {formData.address && (
                <div className="review-item mb-3">
                  <strong>{t("booking.address")}:</strong>{" "}
                  <span>{formData.address}</span>
                </div>
              )}

              {(formData.date ||
                formData.time ||
                formData.preferredDate ||
                formData.preferredTime) && (
                <div className="review-item mb-3">
                  <strong>{t("booking.dateTime")}:</strong>{" "}
                  <span>
                    {formData.preferredDate || formData.date}{" "}
                    {formData.preferredTime || formData.time}
                  </span>
                </div>
              )}

              {formData.budget && (
                <div className="review-item mb-3">
                  <strong>{t("booking.estimatedBudget")}:</strong>{" "}
                  <span>{formData.budget}</span>
                </div>
              )}

              <p className="text-muted small mt-4">
                <em>{t("booking.bookingNote")}</em>
              </p>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-outline-primary px-4 py-2"
                  onClick={prevStep}
                >
                  {t("buttons.back")}
                </button>
                <button
                  className="btn btn-success px-4 py-2"
                  onClick={handleSubmit}
                >
                  {t("booking.confirmPostJob")}
                </button>
              </div>
            </div>
          </JobPostingSec>
          <HomeFooter />
        </>
      )}
    </DefaultLayout2>
  );
};

export default BookService;
