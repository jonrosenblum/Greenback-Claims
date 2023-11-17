import ClaimForm from "./ClaimForm";
import FAQ from "./FAQ";
import { FaArrowRightLong } from "react-icons/fa6";


export default function Body() {
    return(
        <div>
            <section id="home">
            <div className="bg-gray-900 text-md">
                <div className="py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url("https://www.ncmic.com/webres/Image/0581-NCMIC-Website-Graphics_Finance_Credit-Card-Processing_Hero_1500x580.jpg")' }}>
                    <div className="max-w-xl">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Did You Own A Business Between 2004 and 2019?</h1>
                    <p className="text-md md:text-lg mb-8 max-w-sm font-medium">You Could be Eligible to Reclaim Funds as Part of a $5.5 Billion Dollar Settlement. </p>
                    <a href="#form" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit Claim Now
                    </a>
                    </div>
                </div>
            </div>
            </section>
            <section id="about" className="bg-white dark:bg-gray-900 text-white">
                <div className="flex">
                <div className="w-1/2 p-4">
                    <div className="p-16 flex flex-col">
                        <h2 className="text-3xl font-bold mb-6">If your business accepted Visa or Mastercard for payments at any point between 2004 and 2019, it&apos;s possible that you were charged excessive fees for credit card transactions.</h2>
                        <p className="mb-6 text-sm">MasterCard and Visa faced legal action for excessively charging fees on credit card transactions during that period. A $5.5 billion settlement has been established, permitting eligible businesses to seek restitution for these fees. Our law firm specializes in class action cases and is dedicated to ensuring that your company receives its rightful compensation. </p>
                        <p className="mb-6 text-sm">We handle the process for you: verifying eligibility, submitting claims accurately and punctually, and securing your payment directly upon approval. No fees are charged unless we successfully recover your funds. To begin, simply fill out the form, and we&apos;ll take care of the rest. Register today to potentially receive your reimbursement. For inquiries, contact us at claims@greenbackclaims.com.</p>
                        <p className="mb-6 text-sm">NOTE: If your claim is accepted, the anticipated payout timeframe should be in 2024.  </p>
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">Submit claim today:</h3>
                            <FaArrowRightLong className="text-8xl"/>  
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-10">
                    <div id="form" className="p-6 border border-2 border-white-500">
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