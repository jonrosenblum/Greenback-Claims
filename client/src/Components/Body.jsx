import BodySlider from "./BodySlider";
import ClaimForm from "./ClaimForm";
import FAQ from "./FAQ";
import { FaArrowRightLong } from "react-icons/fa6";


export default function Body() {
    return(
        <div>
            <BodySlider/>
            <section id="about" className="bg-white dark:bg-gray-900 text-white">
                <div className="block lg:flex bg-bgg">
                <div className="lg:w-1/2 p-2 text-white flex ">
                    <div className="p-8 flex flex-col">
                        <h2 className="text-xl font-bold mb-6">If your business accepted Visa or Mastercard for payments at any point between 2004 and 2019, it&apos;s possible that you were charged excessive fees for credit card transactions.</h2>
                        <p className="mb-6 text-sm">MasterCard and Visa faced legal action for excessively charging fees on credit card transactions during that period. A $5.5 billion settlement has been established, permitting eligible businesses to seek restitution for these fees. Our law firm specializes in class action cases and is dedicated to ensuring that your company receives its rightful compensation. </p>
                        <p className="mb-6 text-sm">We handle the process for you: verifying eligibility, submitting claims accurately and punctually, and securing your payment directly upon approval. No fees are charged unless we successfully recover your funds. To begin, simply fill out the form, and we&apos;ll take care of the rest. Register today to potentially receive your reimbursement. For inquiries, contact us at claims@greenbackclaims.com.</p>
                        <p className="mb-6 text-sm">NOTE: If your claim is accepted, the anticipated payout timeframe should be in 2024.  </p>
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">Submit claim today:</h3>
                            <FaArrowRightLong className="text-4xl"/>  
                        </div>
                    </div>
                </div>
                <div className="w-[100%] lg:w-[50%] md:p-5 mt-5 p-2">
                    <div id="form" className="p-3 border-2 border-white-500 ">
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