
import Slider from 'react-slick';
import useStore from '../zustand/store';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import erc from '../../public/erc.png';
export default function BodySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const { setVisaTrue, setVisaFalse,  } = useStore();

  return (
    <Slider {...settings}>
      {/* First Slide */}
      <div className="bg-gray-900 text-md h-fit">
        <div
          className="py-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center h-[600px]"
          style={{
            backgroundImage:
              'url("https://www.ncmic.com/webres/Image/0581-NCMIC-Website-Graphics_Finance_Credit-Card-Processing_Hero_1500x580.jpg")',
          }}
        >
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Did You Own A Business Between 2004 and 2019?
            </h1>
            <p className="text-md md:text-lg mb-8 max-w-sm font-medium">
              You Could be Eligible to Reclaim Funds as Part of a $5.5 Billion Dollar Settlement.{' '}
            </p>
            <a
              onClick={setVisaTrue}
              href="#about"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-2xl px-6 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit Claim
            </a>
          </div>
        </div>
      </div>

      {/* Second Slide */}
      <div className="bg-gray-900 text-md h-fit">
        <div
          className="py-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center h-[600px]"
          style={{
            backgroundImage: `url(${erc})`,
          }}
        >
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              What Is The Employee Retention Tax Credit?
            </h1>
            <p className="text-md md:text-lg mb-8 max-w-sm font-medium">
              Your Business Could Qualify for up to $26,000 Per Employee.{' '}
            </p>
            <a
              onClick={setVisaFalse}
              href="#about"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-2xl px-6 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </Slider>
  );
}