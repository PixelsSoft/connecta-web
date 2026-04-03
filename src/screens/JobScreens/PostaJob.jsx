import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import JobPostingSec from "../../components/JobPostingSec";
import { useTranslation } from "react-i18next";
import { fetchCategoriesWithSubcategories, fetchCategoryById } from "../../store/slices/categorySlice";
import axiosInstance from "../../utils/axios";
import { API_ENDPOINTS } from "../../config/api";
import {
  getSubcategoriesFromCSV,
  getQuestionsFromCSV,
} from "../../utils/csvParser";

import RoomIcon1 from "../../assets/images/1-room-icon.png";
import RoomIcon2 from "../../assets/images/2-room-icon.png";
import RoomIcon3 from "../../assets/images/3-room-icon.png";
import RoomIcon4 from "../../assets/images/4-room-icon.png";

import paintingbannerimg from "../../assets/images/painting-banner-img.png";
import jobPostingbannerimg from "../../assets/images/jobPosting-banner-img.png";
import bathroomfittingbanner3 from "../../assets/images/bathroom-fitting-banner-3.png";
import CustomModal from "../../components/CustomModal";
import { Col, Row } from "react-bootstrap";

const PostaJob = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesWithSubcategories, loading } = useSelector((state) => state.category);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [choice, setChoice] = React.useState("have");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategoriesFromCSV, setSubcategoriesFromCSV] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
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
  const { t } = useTranslation("common");

  // Fetch categories with subcategories on mount
  useEffect(() => {
    if (categoriesWithSubcategories.length === 0) {
      dispatch(fetchCategoriesWithSubcategories());
    }
  }, [dispatch, categoriesWithSubcategories.length]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      toast.error('Please login to post a job');
      setShowModal(true); // Show login modal
      return;
    }

    // Check if user is a customer (only customers can post jobs)
    if (user.user_type !== 'customer') {
      toast.error('Only customers can post jobs. Professionals can apply to jobs.');
      return;
    }

    try {
      const jobData = {
        category_id: matched.id,
        subcategory_id: matched.subcategories?.find(sub => sub.name === selectedSubcategory)?.id,
        title: formData.jobTitle || `${matched.name} - ${selectedSubcategory}`,
        description: formData.description,
        location: formData.location || formData.address,
        budget: formData.budget,
        questions_answers: questionAnswers,
      };

      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.CREATE, jobData);

      if (response.data.success) {
        toast.success('Job posted successfully!');
        navigate('/user/posted-jobs');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to post a job');
        setShowModal(true);
      } else {
        toast.error(error.response?.data?.message || 'Failed to post job');
      }
    }
  };

  // Find matched category from API data
  const matched = useMemo(() => {
    console.log('PostaJob - Looking for category:', category);
    console.log('PostaJob - Available categories:', categoriesWithSubcategories);
    
    if (!categoriesWithSubcategories || categoriesWithSubcategories.length === 0) {
      console.log('PostaJob - No categories loaded yet');
      return null;
    }
    
    const found = categoriesWithSubcategories.find((cat) => cat.slug === category);
    console.log('PostaJob - Matched category:', found);
    return found;
  }, [category, categoriesWithSubcategories]);

  // Load subcategories when component mounts or category changes
  useEffect(() => {
    const loadSubcategories = async () => {
      if (!matched?.name) return;

      setLoadingSubcategories(true);
      setSelectedSubcategory(""); // Reset selection when category changes
      setQuestions([]); // Clear questions
      setQuestionAnswers({}); // Clear answers

      try {
        // Use subcategories from API
        if (matched.subcategories && matched.subcategories.length > 0) {
          setSubcategoriesFromCSV(matched.subcategories.map(sub => ({ name: sub.name })));
        } else {
          // Try CSV as fallback
          const csvSubcategories = await getSubcategoriesFromCSV(matched.name);
          if (csvSubcategories.length > 0) {
            setSubcategoriesFromCSV(csvSubcategories);
          }
        }
      } catch (error) {
        console.error("Error loading subcategories:", error);
        setSubcategoriesFromCSV([]);
      } finally {
        setLoadingSubcategories(false);
      }
    };

    loadSubcategories();
  }, [matched]);

  // Handle subcategory selection
  const handleSubcategoryChange = async (subcategoryName) => {
    if (!subcategoryName) {
      setSelectedSubcategory("");
      setQuestions([]);
      setQuestionAnswers({});
      return;
    }

    setSelectedSubcategory(subcategoryName);
    setQuestions([]); // Clear previous questions
    setQuestionAnswers({}); // Clear previous answers
    
    const categoryId = matched?.id;
    const subcategory = matched?.subcategories?.find(sub => sub.name === subcategoryName);
    
    if (!categoryId || !subcategory) {
      console.error("Category or subcategory not found");
      return;
    }

    setLoadingQuestions(true);
    try {
      console.log(`[PostaJob] Loading questions for category ${categoryId}, subcategory ${subcategory.id}`);
      
      // Fetch questions from API
      const response = await axiosInstance.get(
        API_ENDPOINTS.CATEGORIES.QUESTIONS(categoryId, subcategory.id)
      );
      
      if (response.data.success && response.data.data) {
        const apiQuestions = response.data.data.map(q => q.question);
        console.log(`[PostaJob] API questions found: ${apiQuestions.length}`);
        setQuestions(apiQuestions);
      } else {
        console.log("[PostaJob] No questions found in API response");
        setQuestions([]);
      }
    } catch (error) {
      console.error("[PostaJob] Error loading questions:", error);
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Handle question answer change
  const handleQuestionAnswer = (questionIndex, answer) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading && categoriesWithSubcategories.length === 0) {
    return (
      <DefaultLayout2>
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading categories...</p>
        </div>
      </DefaultLayout2>
    );
  }

  if (!matched) {
    return (
      <DefaultLayout2>
        <div className="container text-center py-5">
          <h3>Category not found</h3>
          <p>The category "{category}" does not exist.</p>
          <Link to="/find-professional" className="btn btn-primary">
            Back to Categories
          </Link>
        </div>
      </DefaultLayout2>
    );
  }

  return (
    <DefaultLayout2>
      {step === 1 && (
        <JobPostingSec
          secTitle={`${t("jobPosting.postJob")} ${matched.name} Job`}
          secDescription={t("jobPosting.getResponses")}
          rightImg={paintingbannerimg}
        >
          <div className="inputGroup">
            <label htmlFor="selectSubcategory" className="form-label fw-600">
              {t("jobPosting.selectCategory")} {matched.name}
            </label>
            {loadingSubcategories ? (
              <div className="text-muted">Loading subcategories...</div>
            ) : (
              <select
                id="selectSubcategory"
                className="form-select form-control"
                aria-label="Select subcategory"
                value={selectedSubcategory}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
              >
                <option value={""} disabled>
                  {t("jobPosting.selectCategory")} {matched.name}
                </option>
                {subcategoriesFromCSV.length > 0
                  ? subcategoriesFromCSV.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))
                  : matched.subcategories && matched.subcategories.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
              </select>
            )}
          </div>

          {/* Dynamic Questions Section - Only show if subcategory is selected */}
          {selectedSubcategory && (
            <div className="dynamic-questions mt-4">
              {loadingQuestions ? (
                <div className="text-muted">Loading questions...</div>
              ) : questions.length > 0 ? (
                <>
                  {/* <h5 className="mb-3">
                    {t("jobPosting.additionalQuestions")}
                  </h5> */}
                  {questions.map((question, index) => (
                    <div className="inputGroup mb-3" key={index}>
                      <label className="form-label fw-600">
                        {index + 1}. {question}
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder={t("jobPosting.pleaseDescribe")}
                        value={questionAnswers[index] || ""}
                        onChange={(e) =>
                          handleQuestionAnswer(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-muted">
                  No questions available for this subcategory.
                </div>
              )}
            </div>
          )}

          {/* <div className="paintingJobContent mt-3">
            <div className="input-group">
              <label className="form-label fw-600">
                {t("jobPosting.howManyRooms")}
              </label>
              <div className="paintingBoxRadioButtons">
                {[
                  {
                    labelId: "for1Room",
                    title: t("jobPosting.oneRoom"),
                    icon: RoomIcon1,
                  },
                  {
                    labelId: "for2Room",
                    title: t("jobPosting.twoRoom"),
                    icon: RoomIcon2,
                  },
                  {
                    labelId: "for3Room",
                    title: t("jobPosting.threeRoom"),
                    icon: RoomIcon3,
                  },
                  {
                    labelId: "for4Room",
                    title: t("jobPosting.fourRoom"),
                    icon: RoomIcon4,
                  },
                ].map((item, index) => (
                  <div className="form-check paintJobRadio" key={index}>
                    <label className="form-check-label" htmlFor={item.labelId}>
                      <div className="form-check-labelContent">
                        <img src={item.icon} alt="" />
                        <span>{item.title}</span>
                      </div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="AditionalVendors"
                        id={item.labelId}
                      />
                    </label>
                  </div>
                ))}

                <div className="form-check paintJobRadio">
                  <label className="form-check-label" htmlFor="paintingOther">
                    <div className="form-check-labelContent">
                      <span>{t("jobPosting.other")}</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("jobPosting.noOfRooms")}
                      />
                    </div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="AditionalVendors"
                      id="paintingOther"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t("jobPosting.whenDoYouNeed")}
            </label>
            <div className="paintingBoxRadioButtons">
              {[
                { labelId: "asap", title: t("jobPosting.asap") },
                { labelId: "thisWeek", title: t("jobPosting.thisWeek") },
                { labelId: "nextWeek", title: t("jobPosting.nextWeek") },
                { labelId: "flexible", title: t("jobPosting.flexible") },
              ].map((item, index) => (
                <div className="form-check paintJobRadio" key={index}>
                  <label className="form-check-label" htmlFor={item.labelId}>
                    <span>{item.title}</span>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="timing"
                      id={item.labelId}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t("jobPosting.budgetRange")}
            </label>
            <div className="paintingBoxRadioButtons">
              {[
                { labelId: "budget1", title: t("jobPosting.budget1") },
                { labelId: "budget2", title: t("jobPosting.budget2") },
                { labelId: "budget3", title: t("jobPosting.budget3") },
                { labelId: "budget4", title: t("jobPosting.budget4") },
              ].map((item, index) => (
                <div className="form-check paintJobRadio" key={index}>
                  <label className="form-check-label" htmlFor={item.labelId}>
                    <span>{item.title}</span>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="budget"
                      id={item.labelId}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div> */}

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t("jobPosting.additionalDetails")}
            </label>
            <textarea
              className="form-control"
              rows="4"
              placeholder={t("jobPosting.describeYourProject")}
            />
          </div>

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t("jobPosting.uploadImages")}
            </label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
            />
            <small className="form-text text-muted">
              {t("jobPosting.uploadHelpText")}
            </small>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={nextStep}
              disabled={!selectedSubcategory || loadingQuestions}
            >
              {t("buttons.next")}
            </button>
          </div>
        </JobPostingSec>
      )}

      {step === 2 && (
        <JobPostingSec
          secTitle={`Book a Professional ${matched.name} Service`}
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
              onClick={prevStep}
            >
              {t("buttons.back")}
            </button>
            <button className="btn btn-primary px-4 py-2" onClick={nextStep}>
              {t("buttons.next")}
            </button>
          </div>
        </JobPostingSec>
      )}

      {step === 3 && (
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
      )}

      {step === 4 && (
        <JobPostingSec
          secTitle={t("booking.reviewConfirmBooking")}
          secDescription={t("booking.reviewBookingSubtext")}
          rightImg={bathroomfittingbanner3}
        >
          <div className="review-section">
            <h5 className="mb-3">{t("jobPosting.jobDetails")}</h5>

            <div className="review-item mb-3">
              <strong>{t("booking.serviceType")}:</strong>{" "}
              <span>{matched.name} Service</span>
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

            {selectedSubcategory && (
              <div className="review-item mb-3">
                <strong>{t("jobPosting.subcategory")}:</strong>{" "}
                <span>{selectedSubcategory}</span>
              </div>
            )}

            {questions.length > 0 && (
              <div className="review-questions mt-3">
                <h6>{t("jobPosting.answers")}</h6>
                {questions.map((question, index) => (
                  <div className="review-item" key={index}>
                    <strong>{question}:</strong>
                    <p>
                      {questionAnswers[index] || t("jobPosting.notAnswered")}
                    </p>
                  </div>
                ))}
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
      )}

      {/* Login Modal */}
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Login Required"
      >
        <div className="text-center py-3">
          <p className="mb-4">You need to be logged in to post a job.</p>
          <div className="d-flex flex-column gap-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setShowModal(false);
                navigate('/login', { state: { from: window.location.pathname } });
              }}
            >
              Login
            </button>
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => {
                setShowModal(false);
                navigate('/register', { state: { from: window.location.pathname } });
              }}
            >
              Create Account
            </button>
            <button
              className="btn btn-secondary w-100"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    </DefaultLayout2>
  );
};

export default PostaJob;
