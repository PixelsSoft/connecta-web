import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';
import { useTranslation } from 'react-i18next';
import { useProfessionalProfile } from '../../../hooks/useProfessionalProfile';

const ContactInformation = () => {
  const { t } = useTranslation('common');
  const { saveProfile, resolveLocation, loadProfile, loadCategories } = useProfessionalProfile();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    uidNumber: '',
    address: '',
    serviceArea: '',
    skillIds: [],
    searchRadiusKm: 50,
    latitude: null,
    longitude: null,
    verificationStatus: 'pending',
  });

  useEffect(() => {
    const init = async () => {
      try {
        const [cats, profile] = await Promise.all([loadCategories(), loadProfile()]);
        setCategories(cats || []);
        if (profile) {
          setFormData({
            name: profile.name || '',
            phone: profile.phone || '',
            companyName: profile.company_name || '',
            uidNumber: profile.uid_number || '',
            address: profile.address || '',
            serviceArea: profile.address || '',
            skillIds: (profile.skill_category_ids || []).map(String),
            searchRadiusKm: profile.search_radius_km || 50,
            latitude: profile.latitude ?? null,
            longitude: profile.longitude ?? null,
            verificationStatus: profile.verification_status || 'pending',
          });
        }
      } catch {
        toast.error('Failed to load profile');
      }
    };
    init();
  }, [loadCategories, loadProfile]);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (id) => {
    setFormData((prev) => {
      const has = prev.skillIds.includes(id);
      return {
        ...prev,
        skillIds: has ? prev.skillIds.filter((s) => s !== id) : [...prev.skillIds, id],
      };
    });
  };

  const handleUseGps = async () => {
    setLocationLoading(true);
    try {
      const pos = await resolveLocation({ useGps: true });
      setFormData((prev) => ({
        ...prev,
        latitude: pos.latitude,
        longitude: pos.longitude,
      }));
      toast.success(t('marketplace.locationSaved'));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleGeocode = async () => {
    setLocationLoading(true);
    try {
      const pos = await resolveLocation({ address: formData.serviceArea });
      setFormData((prev) => ({
        ...prev,
        latitude: pos.latitude,
        longitude: pos.longitude,
        serviceArea: pos.display_name || prev.serviceArea,
      }));
      toast.success(t('marketplace.locationSaved'));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.skillIds.length === 0) {
      toast.error(t('marketplace.selectAtLeastOneSkill'));
      return;
    }

    setSaving(true);
    try {
      let { latitude, longitude } = formData;
      if (latitude == null && formData.serviceArea?.trim()) {
        const pos = await resolveLocation({ address: formData.serviceArea });
        latitude = pos.latitude;
        longitude = pos.longitude;
      }

      await saveProfile({
        name: formData.name,
        phone: formData.phone,
        company_name: formData.companyName || undefined,
        uid_number: formData.uidNumber || undefined,
        address: formData.serviceArea || formData.address,
        skill_category_ids: formData.skillIds.map((id) => parseInt(id, 10)),
        search_radius_km: formData.searchRadiusKm,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
      });
      toast.success(t('marketplace.profileUpdated'));
      const refreshed = await loadProfile();
      if (refreshed?.verification_status) {
        setFormData((prev) => ({ ...prev, verificationStatus: refreshed.verification_status }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <RecruiterAccountSettingLayout>
      <div>
        <div className='sec-head mb-4'>
          <h2>{t('profile.myProfile')}</h2>
          <p className='mt-2'>{t('profile.profileSubtext')}</p>
        </div>

        {formData.verificationStatus === 'pending' && (
          <div className='alert alert-warning mb-4'>
            <strong>{t('marketplace.verificationPendingTitle')}</strong>
            <p className='mb-0 small mt-1'>{t('marketplace.verificationPendingText')}</p>
          </div>
        )}
        {formData.verificationStatus === 'rejected' && (
          <div className='alert alert-danger mb-4'>
            <strong>{t('marketplace.verificationRejectedTitle')}</strong>
            <p className='mb-0 small mt-1'>{t('marketplace.verificationRejectedText')}</p>
          </div>
        )}
        {formData.verificationStatus === 'approved' && (
          <div className='alert alert-success mb-4 py-2'>
            {t('marketplace.verificationApproved')}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='name' className='form-label'>
                  {t('forms.fullName')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChanges}
                  required
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='companyName' className='form-label'>
                  {t('setupProfile.companyOrBusinessName')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='companyName'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='uidNumber' className='form-label'>
                  {t('setupProfile.uidMwstNumber')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='uidNumber'
                  name='uidNumber'
                  value={formData.uidNumber}
                  onChange={handleChanges}
                  placeholder={t('setupProfile.typeNumberHere')}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='phone' className='form-label'>
                  {t('forms.phone')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-md-12 mb-4'>
              <label className='form-label'>{t('setupProfile.whatSkillsDoYouHave')}</label>
              <div className='d-flex flex-wrap gap-2'>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type='button'
                    className={`btn btn-sm ${
                      formData.skillIds.includes(String(cat.id)) ? 'btn-dark' : 'btn-outline-dark'
                    }`}
                    onClick={() => toggleSkill(String(cat.id))}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className='col-lg-8 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='serviceArea' className='form-label'>
                  {t('profile.serviceArea')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='serviceArea'
                  name='serviceArea'
                  value={formData.serviceArea}
                  onChange={handleChanges}
                  placeholder={t('setupProfile.searchLocation')}
                />
                <div className='d-flex flex-wrap gap-2 mt-2'>
                  <button
                    type='button'
                    className='btn btn-sm btn-dark'
                    onClick={handleGeocode}
                    disabled={locationLoading}
                  >
                    {t('marketplace.findAddress')}
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-dark'
                    onClick={handleUseGps}
                    disabled={locationLoading}
                  >
                    {t('marketplace.useMyLocation')}
                  </button>
                </div>
                {formData.latitude != null && (
                  <small className='text-success d-block mt-2'>
                    {t('marketplace.locationSaved')} ({formData.latitude.toFixed(4)},{' '}
                    {formData.longitude.toFixed(4)})
                  </small>
                )}
              </div>
            </div>

            <div className='col-lg-4 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='searchRadiusKm' className='form-label'>
                  {t('marketplace.travelRadiusKm')}
                </label>
                <input
                  type='range'
                  className='form-range'
                  id='searchRadiusKm'
                  name='searchRadiusKm'
                  min='10'
                  max='100'
                  step='5'
                  value={formData.searchRadiusKm}
                  onChange={handleChanges}
                />
                <p className='mb-0 small'>
                  {formData.searchRadiusKm} {t('setupProfile.km')}
                </p>
              </div>
            </div>

            <div className='col-md-12'>
              <button type='submit' className='customBtn btn-bgRed' disabled={saving}>
                {saving ? t('marketplace.saving') : t('buttons.update')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </RecruiterAccountSettingLayout>
  );
};

export default ContactInformation;
