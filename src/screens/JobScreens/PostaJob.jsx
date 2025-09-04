import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import JobPostingSec from "../../components/JobPostingSec";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('common');

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    navigate("/recruiter/posted-jobs");
  };

  useEffect(() => {
  setTimeout(() => {
    setShowModal(true);
  }, 2000);
  }, [])
  

  // Replace the icon imports/variables with your actual icon references.
  const categoryData = [
    {
      name: "Design and Planning",
      value: "Design-And-Planning",
      subcategories: [
        "Architect",
        "Structural Designer / Bouwkundige",
        "Land Surveyor",
        "Permit Consultant",
        "Energy Advisor",
        "Interior Designer",
        "3D Renderings & Visualizations",
      ],
    },
    {
      name: "Garden & Outdoor",
      value: "Garden-And-Outdoor",
      subcategories: [
        "Gardener",
        "Landscaper",
        "Lawn Mowing",
        "Tree Cutting & Pruning",
        "Swimming Pool Construction",
        "Jacuzzi / Hot Tub Installation",
      ],
    },
    {
      name: "Project Management",
      value: "Project-Management",
      subcategories: [
        "General Contractor",
        "Project Manager",
        "Construction Inspector",
      ],
    },
    {
      name: "Outdoor & Landscaping",
      value: "Outdoor-And-Landscaping",
      subcategories: [
        "Paver / Stoneworker",
        "Landscape Designer",
        "Fence & Gate Builder",
        "Garden Architect",
        "Paving & Stonework",
        "Deck / Terrace Construction",
      ],
    },
    {
      name: "Media & Creative",
      value: "Media-And-Creative",
      subcategories: [
        "Drone Services",
        "Real Estate Photography",
        "Video Production",
        "3D Scanning / Lidar",
        "Company Videos / Animations",
        "Graphic Design for Signs / Vehicles",
      ],
    },
    {
      name: "Rental & Equipment",
      value: "Rental-And-Equipment",
      subcategories: [
        "Scaffold Rental",
        "Construction Tool Rental",
        "Container (Waste) Rental",
        "Mobile Toilet Rental",
        "Mini Excavator with Operator",
        "Lift/Hoist Services",
        "Generator Rental",
      ],
    },
    {
      name: "Business & Facility Services",
      value: "Business-And-Facility-Services",
      subcategories: [
        "Office Renovation",
        "Office IT Setup & Cabling",
        "Facility Management",
        "Coffee Machine Maintenance",
        "Industrial Cleaning",
        "Archive Digitization",
      ],
    },
    {
      name: "Home & Comfort",
      value: "Home-And-Comfort",
      subcategories: [
        "Smart Home Installation",
        "Home Theater Setup",
        "WiFi & Network Setup",
        "Curtain / Blind Installation",
        "TV Wall Mounting",
        "Babyproofing Services",
        "Indoor Air Quality Check",
        "Furniture Restoration / Repair",
      ],
    },
    {
      name: "Maintenance & Repairing",
      value: "Maintenance-And-Repairing",
      subcategories: [
        "Handyman",
        "Appliance Repair",
        "Furniture Assembly",
        "Locksmith",
        "Window & Door Installation",
        "Roller Shutter Repair",
        "Chimney Sweep",
        "Heating System Maintenance",
        "Light Fixture / Switch Installation",
        "Curtain Rail / Blind Mounting",
        "Silicone Sealing / Kit Replacement",
        "Painter / Decorator",
        "Plasterer / Drywall Finisher",
        "Tile Setter / Floor Layer",
      ],
    },
    {
      name: "Technical & Construction",
      value: "Technical-And-Construction",
      subcategories: [
        "Electrician",
        "Plumber",
        "Carpenter",
        "Mason / Bricklayer",
        "Painter & Decorator",
        "Steel Fixer",
        "Roofer",
        "HVAC Technician",
        "Floor Installation & Tiling",
        "Drywall Installer (Plastering)",
        "Insulation Specialist",
        "Solar Panel Installer",
        "Scaffolder",
        "Site Supervisor",
        "General Laborer",
        "Kitchen Installation",
        "Security System Installation",
        "Bathroom Installation / Renovation",
        "Toilet Renovation",
        "Staircase Builder / Renovation",
        "Concrete / Foundation Work",
        "Gutter Installer / Repair",
        "Soundproofing Specialist",
        "Groundworker",
        "Foundation Specialist / Concrete Worker",
        "Bricklayer / Masonry Contractor",
        "Rough Construction Carpenter",
        "Staircase Builder",
        "Glazier / Window Installer",
      ],
    },
    {
      name: "Administrative & Permits",
      value: "Administrative-And-Permits",
      subcategories: [
        "Building Permit Assistance",
        "Insurance Claim Support",
        "On-site Project Management",
        "Safety Checks & Reports",
      ],
    },
    {
      name: "Digital & Tech",
      value: "Digital-And-Tech",
      subcategories: [
        "Website for Contractors",
        "Accounting Software Setup",
        "Online Planning Tools",
        "Customer Portal Development",
        "SEO & Google Business Optimization",
      ],
    },
    {
      name: "Cleaning Services",
      value: "Cleaning-Services",
      subcategories: [
        "General Cleaning",
        "Deep Cleaning",
        "Office Cleaning",
        "Window Cleaning",
        "Post-Construction Cleaning",
        "Carpet & Upholstery Cleaning",
        "Gutter Cleaning",
        "Graffiti Removal",
        "End-of-Rental Cleaning",
        "Facade Cleaning",
      ],
    },
    {
      name: "Interior & Finishing",
      value: "Interior-And-Finishing",
      subcategories: [
        "Kitchen Builder",
        "Cabinetmaker / Furniture Maker",
        "Interior Decorator",
        "Lighting Installer",
      ],
    },
    {
      name: "Transport & Moving",
      value: "Transport-And-Moving",
      subcategories: [
        "Moving Services",
        "Packing & Unpacking",
        "Furniture Transport",
        "Junk Removal",
        "Van with Driver",
        "Small Delivery Tasks",
        "Piano Transport",
      ],
    },
    {
      name: "Technical & Installation",
      value: "Technical-And-Installation",
      subcategories: ["Solar Panel Specialist", "Security System Installer"],
    },
  ];
  const matched = categoryData.find((c) => c.value === category);

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
              defaultValue=""
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

            <div className="paintingJobContent-btns mt-3">
              <button onClick={nextStep} className="customBtn btn-bgRed">
                {t('buttons.next')}
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 2 && (
        <JobPostingSec
          secTitle={`${t('jobPosting.postJob')} ${matched.name} job`}
          secDescription={t('jobPosting.getResponses')}
          rightImg={paintingbannerimg}
        >
          <div className="paintingJobContent">
            <div className="input-group">
              <label className="form-label fw-600">
                {t('jobPosting.whatTypeOfPainting')}
              </label>
              <div className="paintingBoxRadioList">
                {[
                  {
                    labelId: "for1Room",
                    title: t('jobPosting.inHouseDecoration'),
                    description: t('jobPosting.inHouseDecorationDesc'),
                  },
                  {
                    labelId: "for2Room",
                    title: t('jobPosting.wallpaperWork'),
                    description: t('jobPosting.wallpaperWorkDesc'),
                  },
                  {
                    labelId: "for3Room",
                    title: t('jobPosting.touching'),
                    description: t('jobPosting.touchingDesc'),
                  },
                  {
                    labelId: "for4Room",
                    title: t('jobPosting.tiling'),
                    description: t('jobPosting.tilingDesc'),
                  },
                ].map((item, index) => (
                  <div className="form-check paintRadioListItem" key={index}>
                    <label className="form-check-label" htmlFor={item.labelId}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="AditionalVendors"
                        id={item.labelId}
                      />
                      <div className="form-check-labelListContent">
                        <span className="darkGrayColor">{item.title}</span>
                        <span className="grayColor50">{item.description}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="paintingJobContent-btns mt-3">
              <button onClick={prevStep} className="customBtn btn-blackBorder">
                {t('buttons.back')}
              </button>
              <button onClick={nextStep} className="customBtn btn-bgRed">
                {t('buttons.next')}
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 3 && (
        <JobPostingSec
          secTitle={`${t('jobPosting.postJob')} ${matched.name} job`}
          secDescription={t('jobPosting.enterDescription')}
          rightImg={paintingbannerimg}
        >
          <div className="bathroomFittinJob">
            <div className="input-group mb-4">
              <label htmlFor="userName" className="form-label fw-600">
                {t('forms.description')}
              </label>
              <textarea
                className="form-control"
                placeholder={t('jobPosting.addDescription')}
                rows={3}
                style={{ resize: "none" }}
              ></textarea>
            </div>

            <div className="input-group">
              <label htmlFor="userName" className="form-label fw-600 mb-0">
                {t('forms.uploadImages')}
              </label>
              <div className="form-text mt-0 mb-2">
                {t('jobPosting.youCanUpload')}
              </div>
              <input type="file" className="form-control" id="userName" />
            </div>

            <div className="paintingJobContent-btns mt-5">
              <button onClick={prevStep} className="customBtn btn-blackBorder">
                {t('buttons.back')}
              </button>
              <button onClick={nextStep} className="customBtn btn-bgRed">
                {t('buttons.next')}
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 4 && (
        <JobPostingSec
          secTitle={`${t('jobPosting.postJob')} ${matched.name} job`}
          secDescription={t('jobPosting.enterContactInfo')}
          rightImg={jobPostingbannerimg}
        >
          <div className="bathroomFittinJob">
            <div className="input-group mb-4">
              <label htmlFor="userEmail" className="form-label fw-600">
                {t('forms.email')}
              </label>
              <input
                type="email"
                className="form-control"
                id="userEmail"
                placeholder="info@modernize.com"
              />
            </div>

            <div className="input-group">
              <label htmlFor="userPhone" className="form-label fw-600 mb-0">
                {t('forms.phone')}
              </label>
              <input
                type="text"
                className="form-control"
                id="userPhone"
                placeholder="+91 12345 65478"
              />
            </div>

            <div className="paintingJobContent-btns mt-5">
              <button onClick={prevStep} className="customBtn btn-blackBorder">
                {t('buttons.back')}
              </button>
              <button onClick={nextStep} className="customBtn btn-bgRed">
                {t('buttons.next')}
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 5 && (
        <JobPostingSec
          secTitle={`${t('jobPosting.postJob')} ${matched.name} job`}
          secDescription={t('jobPosting.verifyEmailPhone')}
          rightImg={bathroomfittingbanner3}
        >
          <div className="bathroomFittinJob">
            <div className="input-group mb-4">
              <label htmlFor="userOTP" className="form-label fw-600">
                {t('forms.otpCode')}
              </label>
              <input
                type="text"
                className="form-control"
                id="userOTP"
                placeholder="******"
              />
              <p className="darkGrayColor mb-0 mt-2">
                {t('jobPosting.codeWillBeResent')}{" "}
                <span style={{ color: "#056517" }}>00:59</span>
              </p>
            </div>

            <div className="paintingJobContent-btns mt-5">
              <button onClick={prevStep} className="customBtn btn-blackBorder">
                {t('buttons.back')}
              </button>
              <button className="customBtn btn-bgRed" onClick={handleSubmit}>
                {t('buttons.next')}
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}
      <CustomModal show={showModal} handleClose={() => setShowModal(false)}>
        <div className="p-3">
          <div className="sec-head text-center my-5">
            <h2>{t('jobPosting.followUpQuestion')}</h2>
          </div>

          <p className="fw-400 text-dark mt-3">
            {t('jobPosting.doYouHaveProduct')}
          </p>
          <div className="paintingBoxRadioList">
            {[
              {
                labelId: "yes",
                title: t('jobPosting.alreadyHaveIt'),
              },
              {
                labelId: "no",
                title: t('jobPosting.pleaseSupplyInstall'),
              },
            ].map((item, index) => (
              <div className="form-check " key={index}>
                <label className="form-check-label" htmlFor={item.labelId}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="AditionalVendors"
                    id={item.labelId}
                  />
                  <div className="form-check-labelListContent">
                    <span className="darkGrayColor">{item.title}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <Row className="d-flex justify-content-center mt-5">
            <Col lg={6} className="d-flex justify-content-center">
              <button
                onClick={() => setShowModal(false)}
                className="customBtn btn-blackBorder w-75"
              >
                {t('buttons.cancel')}
              </button>
            </Col>
            <Col lg={6} className="d-flex justify-content-center">
              <button
                onClick={() => setShowModal(false)}
                className="customBtn btn-bgRed w-75"
              >
                {t('buttons.submit')}
              </button>
            </Col>
          </Row>
        </div>
      </CustomModal>
    </DefaultLayout2>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  label: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    cursor: "pointer",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
    lineHeight: 1.3,
    position: "relative",
    padding: "6px 0",
  },
  radio: {
    marginTop: 4,
    flexShrink: 0,
    width: 16,
    height: 16,
    cursor: "pointer",
  },
  text: {
    display: "block",
    color: "#222",
  },
};

export default PostaJob;
