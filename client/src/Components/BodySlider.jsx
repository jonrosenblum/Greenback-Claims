
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import erc from '../../public/erc.png';
export default function BodySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {/* First Slide */}

      <div className="bg-gray-900 text-md h-fit">
        <div className="relative py-20 sm:py-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center h-[350px] sm:h-[600px]" style={{
          backgroundImage:
            'url("https://www.ncmic.com/webres/Image/0581-NCMIC-Website-Graphics_Finance_Credit-Card-Processing_Hero_1500x580.jpg")',
        }}>
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="max-w-xl relative z-10">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">Did You Own A Business Between 2004 and 2019?</h1>
            <p className="text-md md:text-lg mb-8 max-w-sm font-medium text-white">You could be eligible to reclaim funds as part of a $5.5 billion dollar settlement.</p>
            <a href="#about" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-2xl px-6 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Claim</a>
          </div>
        </div>

      </div>

      {/* Second Slide */}
      <div className="bg-gray-900 text-md h-fit">
        <div className="relative py-20 sm:py-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center h-[350px] sm:h-[600px]" style={{
          backgroundImage:
            `url(${erc})`,
        }}>
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="max-w-xl relative z-10">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white"><s>What is the Employee Retention Tax Credit?</s></h1>
            <p className="text-md md:text-lg mb-8 max-w-sm font-medium text-white"><s>Your business could qualify for up to $26,000 per employee.</s></p>
            <a className="text-white font-medium rounded-lg text-sm md:text-2xl px-6 py-4 text-center">Claim Period Ended</a>
          </div>
        </div>
      </div>
    </Slider>
  );
}