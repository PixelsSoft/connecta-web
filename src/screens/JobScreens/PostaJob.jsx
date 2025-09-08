import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import JobPostingSec from "../../components/JobPostingSec";
import { useTranslation } from "react-i18next";
import { categoriesData, getSubcategories, getQuestions } from "../../data/categoriesData";

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
  const [choice, setChoice] = React.useState("have");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState({});
  const { t } = useTranslation('common');

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    navigate("/recruiter/posted-jobs");
  };

  // Get category data dynamically
  const categoryData = Object.values(categoriesData).map(cat => ({
    name: cat.name,
    value: cat.name.replace(/\s+/g, '-'),
    subcategories: Object.values(cat.subcategories).map(sub => sub.name)
  }));

  // Find matched category
  const matched = categoryData.find((c) => c.value === category);

  // Handle subcategory selection
  const handleSubcategoryChange = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    const categoryName = matched?.name;
    if (categoryName) {
      const subcategoryQuestions = getQuestions(categoryName, subcategoryName);
      setQuestions(subcategoryQuestions);
      setQuestionAnswers({});
    }
  };

  // Handle question answer change
  const handleQuestionAnswer = (questionIndex, answer) => {
    setQuestionAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  if (!matched) {
    return <div>Unknown category: {category}</div>;
  }

  return (
    <DefaultLayout2>
      {step === 1 && (
        <JobPostingSec
          secTitle={`${t('jobPosting.postJob')} ${matched.name} job`}
          secDescription={t('jobPosting.getResponses')}
          rightImg={paintingbannerimg}
        >
          <div className="inputGroup">
            <label htmlFor="selectCategory" className="form-label">
              {t('jobPosting.whatWouldYouLikeDone')}
            </label>
            <select
              id="selectCategory"
              className="form-select form-control"
              aria-label="Select job category"
              value={selectedSubcategory}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
            >
              <option value={""} disabled>
                {t('jobPosting.selectCategory')} {matched.name}
              </option>
              {matched.subcategories.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Questions Section - Only show if subcategory is selected */}
          {selectedSubcategory && questions.length > 0 && (
            <div className="dynamic-questions mt-4">
              <h5 className="mb-3">{t('jobPosting.additionalQuestions')}</h5>
              {questions.map((question, index) => (
                <div className="inputGroup mb-3" key={index}>
                  <label className="form-label fw-600">
                    {question}
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder={t('jobPosting.pleaseDescribe')}
                    value={questionAnswers[index] || ''}
                    onChange={(e) => handleQuestionAnswer(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="paintingJobContent mt-3">
            <div className="input-group">
              <label className="form-label fw-600">
                {t('jobPosting.howManyRooms')}
              </label>
              <div className="paintingBoxRadioButtons">
                {[
                  { labelId: "for1Room", title: t('jobPosting.oneRoom'), icon: RoomIcon1 },
                  { labelId: "for2Room", title: t('jobPosting.twoRoom'), icon: RoomIcon2 },
                  { labelId: "for3Room", title: t('jobPosting.threeRoom'), icon: RoomIcon3 },
                  { labelId: "for4Room", title: t('jobPosting.fourRoom'), icon: RoomIcon4 },
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
                      <span>{t('jobPosting.other')}</span>
                      <input
                        type="text"
                        className="forn-control"
                        placeholder={t('jobPosting.noOfRooms')}
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
              {t('jobPosting.whenDoYouNeed')}
            </label>
            <div className="paintingBoxRadioButtons">
              {[
                { labelId: "asap", title: t('jobPosting.asap') },
                { labelId: "thisWeek", title: t('jobPosting.thisWeek') },
                { labelId: "nextWeek", title: t('jobPosting.nextWeek') },
                { labelId: "flexible", title: t('jobPosting.flexible') },
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
              {t('jobPosting.budgetRange')}
            </label>
            <div className="paintingBoxRadioButtons">
              {[
                { labelId: "budget1", title: t('jobPosting.budget1') },
                { labelId: "budget2", title: t('jobPosting.budget2') },
                { labelId: "budget3", title: t('jobPosting.budget3') },
                { labelId: "budget4", title: t('jobPosting.budget4') },
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
          </div>

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t('jobPosting.additionalDetails')}
            </label>
            <textarea
              className="form-control"
              rows="4"
              placeholder={t('jobPosting.describeYourProject')}
            />
          </div>

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t('jobPosting.uploadImages')}
            </label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
            />
            <small className="form-text text-muted">
              {t('jobPosting.uploadHelpText')}
            </small>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={nextStep}
            >
              {t('buttons.next')}
            </button>
          </div>
        </JobPostingSec>
      )}

      {step === 2 && (
        <JobPostingSec
          secTitle={t('jobPosting.contactDetails')}
          secDescription={t('jobPosting.contactDescription')}
          rightImg={jobPostingbannerimg}
        >
          <Row>
            <Col md={6}>
              <div className="inputGroup">
                <label className="form-label fw-600">
                  {t('forms.fullName')}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('forms.fullName')}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="inputGroup">
                <label className="form-label fw-600">
                  {t('forms.email')}
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder={t('forms.email')}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <div className="inputGroup">
                <label className="form-label fw-600">
                  {t('forms.phone')}
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder={t('forms.phone')}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="inputGroup">
                <label className="form-label fw-600">
                  {t('jobPosting.preferredContact')}
                </label>
                <select className="form-control">
                  <option>{t('jobPosting.phone')}</option>
                  <option>{t('jobPosting.email')}</option>
                  <option>{t('jobPosting.both')}</option>
                </select>
              </div>
            </Col>
          </Row>

          <div className="inputGroup mt-3">
            <label className="form-label fw-600">
              {t('jobPosting.address')}
            </label>
            <textarea
              className="form-control"
              rows="3"
              placeholder={t('jobPosting.enterAddress')}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-primary px-4 py-2"
              onClick={prevStep}
            >
              {t('buttons.back')}
            </button>
            <button
              className="btn btn-primary px-4 py-2"
              onClick={nextStep}
            >
              {t('buttons.next')}
            </button>
          </div>
        </JobPostingSec>
      )}

      {step === 3 && (
        <JobPostingSec
          secTitle={t('jobPosting.reviewAndSubmit')}
          secDescription={t('jobPosting.reviewDescription')}
          rightImg={bathroomfittingbanner3}
        >
          <div className="review-section">
            <h5 className="mb-3">{t('jobPosting.jobDetails')}</h5>
            <div className="review-item">
              <strong>{t('jobPosting.category')}:</strong> {matched.name}
            </div>
            {selectedSubcategory && (
              <div className="review-item">
                <strong>{t('jobPosting.subcategory')}:</strong> {selectedSubcategory}
              </div>
            )}
            
            {questions.length > 0 && (
              <div className="review-questions mt-3">
                <h6>{t('jobPosting.answers')}</h6>
                {questions.map((question, index) => (
                  <div className="review-item" key={index}>
                    <strong>{question}:</strong>
                    <p>{questionAnswers[index] || t('jobPosting.notAnswered')}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-primary px-4 py-2"
                onClick={prevStep}
              >
                {t('buttons.back')}
              </button>
              <button
                className="btn btn-success px-4 py-2"
                onClick={handleSubmit}
              >
                {t('buttons.submit')}
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {/* Modal only shows when showModal is true - removed auto-opening */}
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={t('jobPosting.verificationRequired')}
        body={
          <div>
            <p>{t('jobPosting.verificationText')}</p>
            <div className="inputGroup mt-3">
              <label className="form-label fw-600">
                {t('forms.otpCode')}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t('forms.otpCode')}
              />
            </div>
            <p className="text-muted small mt-2">
              {t('jobPosting.otpHelpText')}
            </p>
          </div>
        }
        footer={
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowModal(false)}
            >
              {t('buttons.cancel')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              {t('buttons.verify')}
            </button>
          </div>
        }
      />
    </DefaultLayout2>
  );
};

export default PostaJob;