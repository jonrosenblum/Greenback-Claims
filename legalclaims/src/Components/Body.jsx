import ClaimForm from "./ClaimForm";
import FAQ from "./FAQ";
import { FaArrowRightLong } from "react-icons/fa6";


export default function Body() {
    return(
        <div>
            <section id="home">
                Home
            </section>
            <section id="about">
            <div className="bg-gray-900 text-md">
                <div className="py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url("https://www.ncmic.com/webres/Image/0581-NCMIC-Website-Graphics_Finance_Credit-Card-Processing_Hero_1500x580.jpg")' }}>
                    <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">Did You Own A Business Between 2004 and 2019?</h1>
                    <p className="text-lg md:text-xl mb-8">You May Be Entitled to Money Back From A $5.5 Billon Dollar Settlement. </p>
                    <a href="#form" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit Claim Now
                    </a>
                    </div>
                </div>
            </div>
            </section>
            <section id="form" className="bg-white dark:bg-gray-900 text-white">
                <div className="flex">
                <div className="w-1/2 p-4">
                    <div className="p-16 flex flex-col">
                        <h2 className="text-3xl font-bold mb-6">If you owned a business at any time between 2004 and 2019, and you took Visa or Mastercard as payment, you may have been overcharged fees on credit card transactions.</h2>
                        <p className="mb-6 text-sm">MasterCard and Visa were both sued for overcharging credit card transaction fees during that time. A $5.5 billion class action settlement was reached that now allows qualifying businesses to submit claims to recover a portion of those fees. Our law firms are experienced in class action law and are here to ensure your company gets paid what is due. If qualified, we’ll ensure your claim is submitted correctly and on time. If we don’t get your money back, you will not owe us anything. </p>
                        <p className="mb-6 text-sm">Signing up is easy. Simply complete the form and we&apos;ll handle everything for you. We will check to see if you&apos;re qualified and submit your claim. If accepted, you will receive your payment directly. Sign up today. If you have any questions please email ostrow@kolawyers.com. NOTE: If your claim is accepted, the anticipated payout timeframe should be in 2024.</p>
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">Submit claim today:</h3>
                            <FaArrowRightLong className="text-8xl"/>  
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-4">
                    <div className="p-16">
                        <ClaimForm/>
                    </div>
                </div>
                </div>
            </section>
            <section id="faq">
                <FAQ/>
            </section>
        </div>
    );
}