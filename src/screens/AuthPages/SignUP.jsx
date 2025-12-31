import React, { useState } from "react";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const SignUP = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const [accountType, setAccountType] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/set-up-profile");
  };

  return (
    <DefaultLayout2>
      <section className="auth-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="auth-content">
                <h2>{t("buttons.Title_SignUp")}</h2>
                <p className="auth-subtext">{t("buttons.signUpSubtext")}</p>

                <Tabs
                  activeKey={accountType}
                  onSelect={(k) => setAccountType(k)}
                  className="mb-4 auth-tabs"
                  defaultActiveKey="customer"
                >
                  <Tab eventKey="customer" title={t("buttons.customerAccount")}>
                    <form onSubmit={handleSubmit}>
                      <div className="auth-contentForm">
                        <div className="inputGroup">
                          <label htmlFor="fullName" className="form-label">
                            {t("forms.fullName")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            placeholder="Jon Doe"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label htmlFor="userEmail" className="form-label">
                            {t("forms.email")}
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="userEmail"
                            placeholder="jon.doe@mail.com"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label htmlFor="userPassword" className="form-label">
                            {t("forms.password")}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="userPassword"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label
                            htmlFor="userPasswordConfirm"
                            className="form-label"
                          >
                            {t("forms.confirmPassword")}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="userPasswordConfirm"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label htmlFor="phoneNumber" className="form-label">
                            {t("forms.phoneNumber")}{" "}
                            <span className="text-muted">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="+1234567890"
                          />
                        </div>

                        <button
                          type="submit"
                          className="customBtn btn-bgRed w-100"
                        >
                          {t("buttons.signUp")}
                        </button>

                        <p className="auth-agreement-text text-center mt-3">
                          {t("buttons.signUpAgreement")}
                        </p>

                        <div className="mt-4">
                          <Link
                            to={"/login"}
                            className="customBtn btn-bgGreen w-100 text-center d-block"
                          >
                            {t("buttons.alreadyHaveAccount")}
                          </Link>
                        </div>
                      </div>
                    </form>
                  </Tab>
                  <Tab
                    eventKey="professional"
                    title={t("buttons.professionalAccount")}
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="auth-contentForm">
                        <div className="inputGroup">
                          <label htmlFor="fullNamePro" className="form-label">
                            {t("forms.fullName")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullNamePro"
                            placeholder="Jon Doe"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label htmlFor="userEmailPro" className="form-label">
                            {t("forms.email")}
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="userEmailPro"
                            placeholder="jon.doe@mail.com"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label
                            htmlFor="userPasswordPro"
                            className="form-label"
                          >
                            {t("forms.password")}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="userPasswordPro"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label
                            htmlFor="userPasswordConfirmPro"
                            className="form-label"
                          >
                            {t("forms.confirmPassword")}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="userPasswordConfirmPro"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div className="inputGroup">
                          <label
                            htmlFor="phoneNumberPro"
                            className="form-label"
                          >
                            {t("forms.phoneNumber")}{" "}
                            <span className="text-muted">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumberPro"
                            placeholder="+1234567890"
                          />
                        </div>

                        <button
                          type="submit"
                          className="customBtn btn-bgRed w-100"
                        >
                          {t("buttons.signUp")}
                        </button>

                        <p className="auth-agreement-text text-center mt-3">
                          {t("buttons.signUpAgreement")}
                        </p>

                        <div className="mt-4">
                          <Link
                            to={"/login"}
                            className="customBtn btn-bgGreen w-100 text-center d-block"
                          >
                            {t("buttons.alreadyHaveAccount")}
                          </Link>
                        </div>
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default SignUP;
