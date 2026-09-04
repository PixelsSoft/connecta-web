import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import { useTranslation } from "react-i18next";
import { fetchCategoriesWithSubcategories } from "../../store/slices/categorySlice";
import ServiceSearch from "../../components/ServiceSearch/ServiceSearch";
import { getCategoryIcon, getPopularServiceQueries, resolveUiLanguage } from "../../utils/categoryIcons";
import jobPostingBannerImg from "../../assets/images/jobPosting-banner-img.png";
import { Link } from "react-router-dom";
import "../../components/ServiceSearch/ServiceSearch.css";

const FindProfessional = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("common");
  const { categoriesWithSubcategories, loading } = useSelector((state) => state.category);
  const [showBrowse, setShowBrowse] = useState(false);

  useEffect(() => {
    if (categoriesWithSubcategories.length === 0) {
      dispatch(fetchCategoriesWithSubcategories());
    }
  }, [dispatch, categoriesWithSubcategories.length]);

  const categoryData = categoriesWithSubcategories.map((category) => ({
    icon: getCategoryIcon(category.name),
    name: category.name,
    value: category.slug,
    id: category.id,
  }));

  return (
    <DefaultLayout2>
      <section className="jobPostingSec job-posting-hero">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-7">
              <div className="jobPosting__content">
                <div className="sec-head">
                  <h1>{t("jobPosting.searchFirstTitle")}</h1>
                  <p>{t("jobPosting.searchFirstSubtitle")}</p>
                </div>

                <ServiceSearch
                  placeholder={t("jobPosting.searchPlaceholder")}
                  popularQueries={getPopularServiceQueries(resolveUiLanguage(i18n.language))}
                  autoFocus
                />

                <div className="job-posting-hero__steps">
                  <div className="job-posting-hero__step">
                    <span>1</span>
                    <p>{t("jobPosting.stepDescribe")}</p>
                  </div>
                  <div className="job-posting-hero__step">
                    <span>2</span>
                    <p>{t("jobPosting.stepMatch")}</p>
                  </div>
                  <div className="job-posting-hero__step">
                    <span>3</span>
                    <p>{t("jobPosting.stepQuestions")}</p>
                  </div>
                  <div className="job-posting-hero__step">
                    <span>4</span>
                    <p>{t("jobPosting.stepSubmit")}</p>
                  </div>
                </div>

                <div className="browse-categories-toggle">
                  <button type="button" onClick={() => setShowBrowse((v) => !v)}>
                    {showBrowse
                      ? t("jobPosting.hideCategories")
                      : t("jobPosting.browseAllCategories")}
                  </button>
                </div>

                {showBrowse && (
                  <div className="mostRecentCategories mt-4">
                    <h4>{t("jobPosting.browseByCategory")}</h4>
                    {loading ? (
                      <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mostRecentCategories_boxes">
                        {categoryData.map((item) => (
                          <Link
                            to={`/post-a-job/${item.value}`}
                            className="mostRecentCategories_box"
                            key={item.id}
                          >
                            <div className="mostRecentCategories_boxe-icon">
                              <img src={item.icon} alt={item.name} />
                            </div>
                            <p>{item.name}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="jobPosting__banner-img">
                  <img src={jobPostingBannerImg} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default FindProfessional;
