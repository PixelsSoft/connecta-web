import Header from '../Header';
import HomeFooter from '../HomeFooter';

const DefaultLayout = (props) => {
  return (
    <>
      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <Header />
        <div className='flex-grow-1'>{props.children}</div>
        <HomeFooter />
      </div>
    </>
  );
};

export default DefaultLayout;
