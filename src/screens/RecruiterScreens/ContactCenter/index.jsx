import { LuPhone } from 'react-icons/lu';
import COLXXL10 from '../../../components/COLXXL10';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import { FaRegEnvelope } from 'react-icons/fa6';

const ContactCenter = () => {
  return (
    <RecruiterLayout>
      <section className='contact__center-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <COLXXL10>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='sec-head'>
                    <h2>Contact Center</h2>
                  </div>
                </div>

                <div className='col-lg-4  mb-3'>
                  <div className='contact__center-box'>
                    <div className='contact__center-box-header'>
                      <div className='contact__center-box-header-icon'>
                        <LuPhone />
                      </div>
                      <h4>Call</h4>
                    </div>
                    <div className='contact__center-box-content'>
                      <h5>
                        <a href='tel:+44 225 25148'>+44 225 25148</a>
                      </h5>
                      <p>you can call us 24/7 for instant assistant</p>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4  mb-3'>
                  <div className='contact__center-box'>
                    <div className='contact__center-box-header'>
                      <div className='contact__center-box-header-icon'>
                        <FaRegEnvelope />
                      </div>
                      <h4>Email Sales</h4>
                    </div>
                    <div className='contact__center-box-content'>
                      <h5>
                        <a href='mailto:Sales@connectedforlife.com'>
                          Sales@connectedforlife.com
                        </a>
                      </h5>
                      <p>
                        any query about admin and platform you can email us 24/7
                      </p>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4  mb-3'>
                  <div className='contact__center-box'>
                    <div className='contact__center-box-header'>
                      <div className='contact__center-box-header-icon'>
                        <FaRegEnvelope />
                      </div>
                      <h4>Email Admin</h4>
                    </div>
                    <div className='contact__center-box-content'>
                      <h5>
                        <a href='mailto:Admin@connectedforlife.com'>
                          Admin@connectedforlife.com
                        </a>
                      </h5>
                      <p>
                        any query about admin and platform you can email us 24/7
                      </p>
                    </div>
                  </div>
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
