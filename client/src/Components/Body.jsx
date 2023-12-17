import BodySlider from "./BodySlider";
import ClaimForm from "./ClaimForm";
import ClaimForm1 from "./ClaimForm"; // Corrected import name
import FAQ from "./FAQ";
import { FaArrowRightLong } from "react-icons/fa6";
import useStore from '../zustand/store';
import FAQ1 from "./FAQ1";

export default function Body() {
    const { visa, setVisaTrue, setVisaFalse } = useStore(); // Removed unused toggleVisa

    return (
        <div>
            <BodySlider />

            {/* visa */}
            {visa && (
                <section id="about" className="bg-white dark:bg-gray-900 text-white">
                    <div className="bg-bgg p-[35px]">
                        <div className="b bg-bgg grid grid-cols-2 text-[1.3rem] border border-gray-400">
                            <button className={`p-2 font-bold ${visa ? 'bg-gray-200 text-black' : ''}`} onClick={setVisaTrue}>Visa & Mastercard Anti-Trust Lawsuit</button>
                            <button className={`p-2 font-bold ${!visa ? 'bg-gray-200 text-black' : ''}`} onClick={setVisaFalse}>Employee Retention Credit (ERC)</button>
                        </div>
                    </div>
                    <section id="about" className="bg-bgg dark:bg-bgg text-white">
                        <div className="block lg:flex bg-bgg w-full m-auto">
                            <div className="lg:w-1/2 p-2 text-white flex items-center">
                                <div className="p-8 flex flex-col">
                                    <h2 className="text-[29px] font-bold mb-6">If your business accepted Visa or Mastercard for payments at any point between 2004 and 2019, it&apos;s possible that you were charged excessive fees for credit card transactions.</h2>
                                    <p className="mb-6 text-base">MasterCard and Visa faced legal action for excessively charging fees on credit card transactions during that period. A $5.5 billion settlement has been established, permitting eligible businesses to seek restitution for these fees. Our law firm specializes in class action cases and is dedicated to ensuring that your company receives its rightful compensation. </p>
                                    <p className="mb-6 text-base">We handle the process for you: verifying eligibility, submitting claims accurately and punctually, and securing your payment directly upon approval. No fees are charged unless we successfully recover your funds. To begin, simply fill out the form, and we&apos;ll take care of the rest. Register today to potentially receive your reimbursement. For inquiries, contact us at claims@greenbackclaims.com.</p>
                                    <p className="mb-6 text-base">NOTE: If your claim is accepted, the anticipated payout timeframe should be in 2024.  </p>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold">Submit claim today:</h3>
                                        <FaArrowRightLong className="text-4xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 md:p-5 mt-5 p-2">
                                <div id="form" className="p-3 border-2 border-white-500">
                                    <ClaimForm />
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
                        <div className="b bg-bgg grid grid-cols-2 text-[1.3rem] border border-gray-400">
                            <button className={`p-2 font-bold ${visa ? 'bg-gray-200 text-black' : ''}`} onClick={setVisaTrue}>Visa & Mastercard Anti-Trust Lawsuit</button>
                            <button className={`p-2 font-bold ${!visa ? 'bg-gray-200 text-black' : ''}`} onClick={setVisaFalse}>Employee Retention Credit (ERC)</button>
                        </div>
                    </div>
                    <section id="about" className="bg-bgg dark:bg-bgg text-white">
                        <div className="block lg:flex bg-bgg">
                            <div className="lg:w-1/2 p-2 text-white flex items-center">
                                <div className="p-8 flex flex-col">
                                <h2 className="text-[29px] font-bold mb-6">The Employee Retention Credit or ERC is a generous stimulus program designed to bolster businesses that were able to retain their employees during the Covid-19 Pandemic by giving them a refundable tax credit check.</h2>
                                    <p className="mb-6 text-base">This credit, spanning 2020 and the initial three quarters of 2021, allows eligible employers to claim up to $26,000 per employee. Qualification hinges on various factors, including experiencing significant declines in gross receipts or facing government-issued operational suspensions due to COVID-19. Eligible entities range from small businesses to larger corporations, encompassing a spectrum of industries. This credit presents a lifeline for those navigating economic disruptions, empowering businesses to sustain their workforce and operations, thereby fostering resilience during unprecedented times.</p>
                                    <p className="mb-6 text-base">Greenback Claims collaborates with legal experts to facilitate ERC claims for eligible businesses. Qualification for the ERC revolves around meeting specific criteria tied to revenue declines or operational restrictions due to COVID-19. Our partnership streamlines the process, ensuring accurate and timely submission of claims on behalf of businesses seeking reimbursement of up to $26,000 per employee. Our dedication lies in managing the intricate aspects of the claim process, offering guidance and expertise while eliminating upfront costs. For inquiries or assistance with your ERC claim, reach out to claims@greenbackclaims.com. We’re committed to securing the compensation your business deserves, navigating the complexities of the ERC to maximize your reimbursement.</p>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold">Submit claim today:</h3>
                                        <FaArrowRightLong className="text-4xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 md:p-5 mt-5 p-2">
                                <div id="form" className="p-3 border-2 border-white-500">
                                    <ClaimForm1 /> {/* Changed to ClaimForm1 */}
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
