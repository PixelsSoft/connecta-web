import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import { useTranslation } from "react-i18next";
import { fetchCategoriesWithSubcategories } from "../../store/slices/categorySlice";
import axiosInstance from "../../utils/axios";
import { API_ENDPOINTS } from "../../config/api";
import CustomModal from "../../components/CustomModal";
import { Col, Row } from "react-bootstrap";
import "./PostaJob.css";

const TOTAL_STEPS = 4;

const StepLabels = ["Service", "Details", "Schedule", "Review"];

const PostaJob = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesWithSubcategories, loading } = useSelector((state) => state.category);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    location: "",
    budget: "",
    preferredDate: "",
    preferredTime: "",
  });

  const { t } = useTranslation("common");

  useEffect(() => {
    if (categoriesWithSubcategories.length === 0) {
      dispatch(fetchCategoriesWithSubcategories());
    }
  }, [dispatch, categoriesWithSubcategories.length]);

  const matched = useMemo(() => {
    if (!categoriesWithSubcategories || categoriesWithSubcategories.length === 0) return null;
    return categoriesWithSubcategories.find((cat) => cat.slug === category) || null;
  }, [category, categoriesWithSubcategories]);

  // Load subcategories when matched category is ready
  useEffect(() => {
    if (!matched) return;
    setLoadingSubcategories(true);
    setSelectedSubcategory("");
    setQuestions([]);
    setQuestionAnswers({});
    if (matched.subcategories && matched.subcategories.length > 0) {
      setSubcategories(matched.subcategories);
    } else {
      setSubcategories([]);
    }
    setLoadingSubcategories(false);
  }, [matched]);

  const handleSubcategoryChange = async (subcategoryName) => {
    if (!subcategoryName) {
      setSelectedSubcategory("");
      setQuestions([]);
      setQuestionAnswers({});
      return;
    }
    setSelectedSubcategory(subcategoryName);
    setQuestions([]);
    setQuestionAnswers({});

    const subcategory = matched?.subcategories?.find((sub) => sub.name === subcategoryName);
    if (!matched?.id || !subcategory) return;

    setLoadingQuestions(true);
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.CATEGORIES.QUESTIONS(matched.id, subcategory.id)
      );
      if (response.data.success && response.data.data) {
        setQuestions(response.data.data);
      } else {
        setQuestions([]);
      }
    } catch {
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleQuestionAnswer = (questionId, answer) => {
    setQuestionAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to post a job");
      setShowModal(true);
      return;
    }
    if (user.user_type !== "customer") {
      toast.error("Only customers can post jobs.");
      return;
    }

    setSubmitting(true);
    try {
      const subcategoryObj = matched?.subcategories?.find((s) => s.name === selectedSubcategory);

      const data = new FormData();
      data.append("category_id", matched.id);
      if (subcategoryObj?.id) data.append("subcategory_id", subcategoryObj.id);
      data.append("title", formData.jobTitle || `${matched.name} - ${selectedSubcategory}`);
      data.append("description", formData.description || "");
      data.append("location", formData.location || "");
      data.append("budget", formData.budget || "");
      if (formData.preferredDate) data.append("preferred_date", formData.preferredDate);
      if (formData.preferredTime) data.append("preferred_time", formData.preferredTime);
      data.append("questions_answers", JSON.stringify(questionAnswers));
      images.forEach((img) => data.append("images[]", img));

      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.CREATE, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Job posted successfully!");
        navigate("/user/posted-jobs");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to post a job");
        setShowModal(true);
      } else {
        toast.error(error.response?.data?.message || "Failed to post job");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  if (loading && categoriesWithSubcategories.length === 0) {
    return (
      <DefaultLayout2>
        <div className="paj-loading">
          <div className="spinner-border text-danger" role="status" />
          <p>Loading...</p>
        </div>
      </DefaultLayout2>
    );
  }

  if (!matched) {
    return (
      <DefaultLayout2>
        <div className="paj-loading">
          <h4>Category not found</h4>
          <Link to="/find-professionals" className="paj-btn-primary mt-3">
            Back to Categories
          </Link>
        </div>
      </DefaultLayout2>
    );
  }

  return (
    <DefaultLayout2>
      <div className="paj-wrapper">
        {/* Progress Bar */}
        <div className="paj-progress-bar-wrap">
          <div className="paj-progress-bar-track">
            <div className="paj-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="paj-steps-labels">
            {StepLabels.map((label, i) => (
              <div
                key={i}
                className={`paj-step-label ${step > i + 1 ? "done" : ""} ${step === i + 1 ? "active" : ""}`}
              >
                <div className="paj-step-dot">
                  {step > i + 1 ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span className="paj-step-text">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="paj-card">
          {/* Step 1 — Service & Questions */}
          {step === 1 && (
            <div className="paj-step-content">
              <div className="paj-step-head">
                <h2>What type of {matched.name} do you need?</h2>
                <p>Select the specific service and answer a few quick questions.</p>
              </div>

              <div className="paj-field">
                <label>Select {matched.name} type</label>
                {loadingSubcategories ? (
                  <div className="paj-loading-inline">Loading...</div>
                ) : (
                  <select
                    className="paj-select"
                    value={selectedSubcategory}
                    onChange={(e) => handleSubcategoryChange(e.target.value)}
                  >
                    <option value="">— Choose a service —</option>
                    {subcategories.map((sub, i) => (
                      <option key={i} value={sub.name}>{sub.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {selectedSubcategory && (
                <div className="paj-questions">
                  {loadingQuestions ? (
                    <div className="paj-loading-inline">Loading questions...</div>
                  ) : questions.length > 0 ? (
                    questions.map((q, i) => (
                      <div className="paj-field" key={q.id || i}>
                        <label>{i + 1}. {q.question}</label>
                        <textarea
                          className="paj-textarea"
                          rows={3}
                          placeholder="Describe in detail..."
                          value={questionAnswers[q.id || i] || ""}
                          onChange={(e) => handleQuestionAnswer(q.id || i, e.target.value)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="paj-hint">No additional questions for this service.</p>
                  )}
                </div>
              )}

              <div className="paj-actions">
                <button
                  className="paj-btn-primary"
                  onClick={nextStep}
                  disabled={!selectedSubcategory || loadingQuestions}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Job Details */}
          {step === 2 && (
            <div className="paj-step-content">
              <div className="paj-step-head">
                <h2>Tell us about the job</h2>
                <p>Provide details so professionals can understand your needs.</p>
              </div>

              <div className="paj-field">
                <label>Job Title</label>
                <input
                  type="text"
                  className="paj-input"
                  name="jobTitle"
                  placeholder={`e.g. ${matched.name} needed in my home`}
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="paj-field">
                <label>Description</label>
                <textarea
                  className="paj-textarea"
                  name="description"
                  rows={4}
                  placeholder="Describe your project in detail..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <Row>
                <Col md={6}>
                  <div className="paj-field">
                    <label>Location</label>
                    <input
                      type="text"
                      className="paj-input"
                      name="location"
                      placeholder="City or address"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="paj-field">
                    <label>Budget (optional)</label>
                    <input
                      type="text"
                      className="paj-input"
                      name="budget"
                      placeholder="e.g. $500"
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
              </Row>

              <div className="paj-field">
                <label>Upload Photos (optional)</label>
                <input
                  type="file"
                  className="paj-input"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {images.length > 0 && (
                  <p className="paj-hint">{images.length} file(s) selected</p>
                )}
              </div>

              <div className="paj-actions paj-actions--between">
                <button className="paj-btn-outline" onClick={prevStep}>← Back</button>
                <button
                  className="paj-btn-primary"
                  onClick={nextStep}
                  disabled={!formData.description}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Schedule */}
          {step === 3 && (
            <div className="paj-step-content">
              <div className="paj-step-head">
                <h2>When do you need it done?</h2>
                <p>Set your preferred date and time for the job.</p>
              </div>

              <Row>
                <Col md={6}>
                  <div className="paj-field">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      className="paj-input"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="paj-field">
                    <label>Preferred Time</label>
                    <input
                      type="time"
                      className="paj-input"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
              </Row>

              <div className="paj-actions paj-actions--between">
                <button className="paj-btn-outline" onClick={prevStep}>← Back</button>
                <button className="paj-btn-primary" onClick={nextStep}>Next →</button>
              </div>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 4 && (
            <div className="paj-step-content">
              <div className="paj-step-head">
                <h2>Review your job posting</h2>
                <p>Check the details before submitting.</p>
              </div>

              <div className="paj-review-list">
                <div className="paj-review-item">
                  <span className="paj-review-label">Category</span>
                  <span className="paj-review-value">{matched.name}</span>
                </div>
                <div className="paj-review-item">
                  <span className="paj-review-label">Service Type</span>
                  <span className="paj-review-value">{selectedSubcategory}</span>
                </div>
                {formData.jobTitle && (
                  <div className="paj-review-item">
                    <span className="paj-review-label">Job Title</span>
                    <span className="paj-review-value">{formData.jobTitle}</span>
                  </div>
                )}
                {formData.description && (
                  <div className="paj-review-item paj-review-item--block">
                    <span className="paj-review-label">Description</span>
                    <span className="paj-review-value">{formData.description}</span>
                  </div>
                )}
                {formData.location && (
                  <div className="paj-review-item">
                    <span className="paj-review-label">Location</span>
                    <span className="paj-review-value">{formData.location}</span>
                  </div>
                )}
                {formData.budget && (
                  <div className="paj-review-item">
                    <span className="paj-review-label">Budget</span>
                    <span className="paj-review-value">{formData.budget}</span>
                  </div>
                )}
                {(formData.preferredDate || formData.preferredTime) && (
                  <div className="paj-review-item">
                    <span className="paj-review-label">Schedule</span>
                    <span className="paj-review-value">
                      {formData.preferredDate} {formData.preferredTime}
                    </span>
                  </div>
                )}
                {images.length > 0 && (
                  <div className="paj-review-item">
                    <span className="paj-review-label">Photos</span>
                    <span className="paj-review-value">{images.length} file(s)</span>
                  </div>
                )}
                {questions.length > 0 && Object.keys(questionAnswers).length > 0 && (
                  <div className="paj-review-qa">
                    <p className="paj-review-qa-title">Your Answers</p>
                    {questions.map((q, i) => (
                      <div className="paj-review-item paj-review-item--block" key={q.id || i}>
                        <span className="paj-review-label">{q.question}</span>
                        <span className="paj-review-value">
                          {questionAnswers[q.id || i] || <em className="text-muted">Not answered</em>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="paj-actions paj-actions--between">
                <button className="paj-btn-outline" onClick={prevStep}>← Back</button>
                <button
                  className="paj-btn-success"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Posting..." : "Post Job ✓"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="paj-trust">
          <div className="paj-trust-item">
            <span className="paj-trust-icon">📋</span>
            <p>Post your job for free</p>
          </div>
          <div className="paj-trust-item">
            <span className="paj-trust-icon">👷</span>
            <p>Verified professionals</p>
          </div>
          <div className="paj-trust-item">
            <span className="paj-trust-icon">⭐</span>
            <p>Rated & reviewed experts</p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <CustomModal show={showModal} onHide={() => setShowModal(false)} title="Login Required">
        <div className="text-center py-3">
          <p className="mb-4">You need to be logged in to post a job.</p>
          <div className="d-flex flex-column gap-3">
            <button
              className="btn btn-danger w-100"
              onClick={() => { setShowModal(false); navigate("/login", { state: { from: window.location.pathname } }); }}
            >
              Login
            </button>
            <button
              className="btn btn-outline-danger w-100"
              onClick={() => { setShowModal(false); navigate("/sign-up"); }}
            >
              Create Account
            </button>
            <button className="btn btn-secondary w-100" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    </DefaultLayout2>
  );
};

export default PostaJob;
