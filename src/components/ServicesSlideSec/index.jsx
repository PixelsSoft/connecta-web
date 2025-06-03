// ServicesSwiper.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const services = [
  "IT Support",
  "Handyman",
  "Cleaning Services",
  "Electricians",
  "General Repairs",
  "Pest Control",
  "Plumbing",
];

const ServicesSlideSec = () => {
  return (
    <div className='service-banner-wrapper'>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={false}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
            // spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            // spaceBetween: 30,
          },
          768: {
            slidesPerView: 4,
            // spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            // spaceBetween: 50,
          },
          1280: {
            slidesPerView: 6,
            // spaceBetween: 60,
          },
        }}
      >
        {services.map((service, i) => (
          <SwiperSlide className='service-slide' key={i}>
            <div className='services__slide-div'>
              <span>{service}</span>
              <span className='dot'>✦</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServicesSlideSec;
