import React, { useState } from "react";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const SignUP = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("user"); // 'user' or 'professional'
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Replace with actual API call
    // For now, simulate signup
    const mockToken = "mock_token_" + Date.now();
    const mockUser = {
      email: email,
      name: fullName || email.split("@")[0],
      fullName: fullName,
    };

    login(mockToken, mockUser, userRole);

    // Navigate based on role
    if (userRole === "professional") {
      navigate("/recruiter/posted-jobs");
    } else {
      navigate("/user/saved-leads");
    }
  };

  return (
    <DefaultLayout2>
      <section className="auth-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="auth-content">
                <h2>{t("buttons.Title_SignUp")}</h2>
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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="inputGroup">
                      <label className="form-label">I am a:</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="userRole"
                            id="roleUser"
                            value="user"
                            checked={userRole === "user"}
                            onChange={(e) => setUserRole(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="roleUser"
                          >
                            User (Book Services)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="userRole"
                            id="roleProfessional"
                            value="professional"
                            checked={userRole === "professional"}
                            onChange={(e) => setUserRole(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="roleProfessional"
                          >
                            Professional (Offer Services)
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="customBtn btn-bgRed w-100">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default SignUP;
