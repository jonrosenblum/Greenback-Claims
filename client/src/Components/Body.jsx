import BodySlider from "./BodySlider";
import ClaimForm from "./ClaimForm";
import SendEmail from "./SendEmail"; // Corrected import name
import FAQ from "./FAQ";
import { FaArrowRightLong } from "react-icons/fa6";
import useStore from '../zustand/store';
import FAQ1 from "./FAQ1";
import { useState } from "react";

export default function Body() {
    const { visa, setVisaTrue, setVisaFalse } = useStore(); // Removed unused toggleVisa
    const [emailSent, setEmailSent] = useState('');

    return (
        <div>
            <BodySlider />

            {/* visa */}
            {visa && (
                <section id="about" className="bg-white dark:bg-gray-900 text-white">
                    {/* <div className="bg-bgg p-[35px]">
                        <div className="b bg-slate-950 grid grid-cols-1 sm:grid-cols-2 text-[1.3rem] border border-gray-400 p-2">
                            <button className={`p-2 font-bold ${visa ? 'bg-gray-200 text-black rounded-tr-2xl rounded-tl-2xl' : ''}`} onClick={setVisaTrue}>Visa & Mastercard Anti-Trust Lawsuit</button>
                            <button className={`p-2 font-bold ${!visa ? 'bg-gray-200 text-black' : 'border-b rounded-tr-2xl rounded-tl-2xl hover:bg-gray-200/10'}`} onClick={setVisaFalse}>Employee Retention Credit (ERC)</button>
                        </div>
                    </div> */}
                    <section id="about" className="bg-bgg dark:bg-bgg text-white">
                        <div className="block lg:flex bg-bgg w-full m-auto">
                            <div className="lg:w-1/2 p-2 text-white flex items-center">
                                <div className="p-8 flex flex-col">
                                    <h2 className="text-[29px] text-white font-bold mb-6">If your business accepted Visa or Mastercard for payments at any point between 2004 and 2019, it&apos;s possible that you were charged excessive fees for credit card transactions.</h2>
                                    <p className="mb-6 text-base">MasterCard and Visa faced legal action for excessively charging fees on credit card transactions during that period. A $5.5 billion settlement has been established, permitting eligible businesses to seek restitution for these fees. Our law firm specializes in class action cases and is dedicated to ensuring that your company receives its rightful compensation. </p>
                                    <p className="mb-6 text-base">We handle the process for you: verifying eligibility, submitting claims accurately and punctually, and securing your payment directly upon approval. No fees are charged unless we successfully recover your funds. To begin, simply fill out the form, and we&apos;ll take care of the rest. Register today to potentially receive your reimbursement. For inquiries, contact us at claims@greenbackclaims.com.</p>
                                    <p className="mb-6 text-base">NOTE: If your claim is accepted, the anticipated payout timeframe should be in 2024.  </p>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-white">Submit claim today:</h3>
                                        <FaArrowRightLong className="text-4xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 md:p-5 mt-5 p-2">
                                <div id="form" className="p-3 border-2 border-white-500">
                                    {emailSent == 'claimForm' ? <div className="bg-green-300/30 p-6 mx-auto rounded">
                                        <h2 className="text-xl font-semibold mb-4 text-green-500">Thank you for your submission!
                                        </h2>
                                        <p className="mb-4 text-justify">
                                            You must receive a confirming email from Greenback Claims stating your retainer has been accepted along with the file number assigned. If you do not receive an email within 24 hours the documents were not received or accepted.
                                        </p>
                                        <p>Please email <a href="mailto:claims@greenbackclaims.com" className="text-blue-500 hover:underline cursor-pointer">claims@greenbackclaims.com</a> with any questions.</p>
                                        <div className={`flex justify-end w-full mt-8`}>
                                            <button className=' bottom-0 right-0 bg-blue-500 p-2 hover:bg-blue-500/70 rounded-md' onClick={() => setEmailSent('')}>Reset Form</button>
                                        </div>
                                    </div> : <ClaimForm onEmailSent={() => setEmailSent('claimForm')} />}
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )}

            {/* ERC */}
            {!visa && (
                <section id="about" className="bg-white dark:bg-gray-900 text-white">
                    <div className="bg-bgg p-[35px]">
                    <div className="b bg-slate-950 grid grid-cols-1 sm:grid-cols-2 text-[1.3rem] border border-gray-400 p-2">
                            <button className={`p-2 font-bold ${visa ? 'bg-gray-200 text-black ' : 'border-b rounded-tr-2xl rounded-tl-2xl hover:bg-gray-200/10'}`} onClick={setVisaTrue}>Visa & Mastercard Anti-Trust Lawsuit</button>
                            <button className={`p-2 font-bold ${!visa ? 'bg-gray-200 text-black rounded-tr-2xl rounded-tl-2xl' : ''}`} onClick={setVisaFalse}>Employee Retention Credit (ERC)</button>
                        </div>
                    </div>
                    <section id="about" className="bg-bgg dark:bg-bgg text-white">
                        <div className="block lg:flex bg-bgg">
                            <div className="lg:w-1/2 p-2 text-white flex items-center">
                                <div className="p-8 flex flex-col">
                                    <h2 className="text-[29px] font-bold mb-6">The Employee Retention Credit or ERC is a generous stimulus program designed to bolster businesses that were able to retain their employees during the Covid-19 Pandemic by giving them a refundable tax credit check.</h2>
                                    <p className="mb-6 text-base">From 2020 through most of 2021, eligible employers could claim up to $26,000 per employee through a COVID-related credit. Qualification depends on factors like revenue drops or government-issued operational pauses. This lifeline aids businesses of all sizes and industries during economic disruptions, helping them sustain their workforce and operations in challenging times.</p>
                                    <p className="mb-6 text-base">Greenback Claims partners with legal experts to simplify ERC claims for qualifying businesses. We streamline the process for reimbursement of up to $26,000 per employee by managing intricate claim details without upfront costs. Contact us at claims@greenbackclaims.com for ERC claim support, ensuring your business receives the compensation it deserves by navigating ERC complexities.</p>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold">Send us an email today:</h3>
                                        <FaArrowRightLong className="text-4xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 md:p-5 mt-5 p-2">
                                <div id="form" className="p-3 border-2 border-white-500">
                                    {emailSent == 'contactForm' ? <div className="bg-green-300/30 p-6 mx-auto rounded">
                                        <h2 className="text-xl font-semibold mb-4 text-green-500">Thank you for your submission!
                                        </h2>
                                        <p className="mb-4 text-justify">
                                        Thank you for your submission. Our legal teams will be in contact within 24-48 hours. 
                                        </p>
                                        <p>Please contact us at <a href="mailto:claims@greenbackclaims.com" className="text-blue-500 hover:underline cursor-pointer">claims@greenbackclaims.com</a> for further information.</p>
                                        <div className={`flex justify-end w-full mt-8`}>
                                            <button className=' bottom-0 right-0 bg-blue-500 p-2 hover:bg-blue-500/70 rounded-md' onClick={() => setEmailSent('')}>Reset Form</button>
                                        </div>
                                    </div> : <SendEmail onEmailSent={() => setEmailSent('contactForm')} />}
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )}

            {/* FAQ */}
            {visa && (
                <section id="faq">
                    <FAQ />
                </section>
            )}

            {!visa && (
                <section id="faq">
                    <FAQ1 />
                </section>
            )}
        </div>
    );
}
