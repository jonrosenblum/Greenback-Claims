import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the nature of this lawsuit?',
      answer: 'This lawsuit primarily revolves around the interchange fees associated with merchants accepting Visa or Mastercard credit or debit cards between January 1, 2004, and January 25, 2019, as well as the rules imposed by Visa and Mastercard on these merchants.',
    },
    {
      question: 'Could you explain what an interchange fee is?',
      answer: 'An interchange fee is the charge associated with transactions made by a cardholder using a credit or debit card, typically ranging from around 1% to 2% of the purchase amount. These fees constitute a significant portion of what merchants pay for accepting Visa and Mastercard cards. Visa and Mastercard establish interchange fee rates for various transaction types, often updating and publishing them on their websites approximately twice a year.',
    },
    {
      question: 'Are all businesses eligible for the settlement?',
      answer: 'Not every business will qualify. Our legal team will collaborate with the settlement administrator to determine if your business meets the criteria.',
    },
    {
      question: 'What amount of money can I expect to receive?',
      answer: "The payout from the settlement fund will be determined by your documented or estimated interchange fees related to Visa and Mastercard card transactions (between you and your customers) spanning from January 1, 2004, to January 25, 2019. The specific sum each Authorized Claimant will receive is contingent upon several factors, including the total funds available for all claims, the aggregate value of valid claims submitted, expenses for class administration and notifications, taxes applicable to the settlement fund and associated tax-related costs, legal fees and expenses, and compensations to the Rule 23(b)(3) Class Plaintiffs for their advocacy on behalf of merchants in MDL 1720, culminating in the Class Settlement Agreement—all subject to the Court's approval.",
    },
    {
      question: 'At what time will the claim forms be accessible?',
      answer: 'The claim forms are not currently accessible. They are anticipated to be available on or after December 1, 2023. Our legal team is proactively gathering claim information now and will soon submit it on your behalf.',
    },
    {
      question: 'What if my business is no longer operational?',
      answer: "Your current business status doesn't affect your eligibility. Your business simply needed to have been active at any point between January 1, 2004, and January 25, 2019, and have accepted Visa and Mastercard. If your business has closed or was dissolved by your state's division of corporations, there's no need to worry. Upon engaging our law firm, we'll collaborate with the settlement administrator to ascertain your business's eligibility.",
    },
    {
      question: "Will I owe any fees to the lawyers if I'm ineligible?",
      answer: 'No, you only incur fees if we successfully recover funds for your business. In the event that we secure a monetary return for your business, our lawyers receive 30% of the recovered amount.',
    },
    {
      question: 'Is it necessary to hire an attorney for assistance?',
      answer: "While hiring a lawyer isn't mandatory for your business concerning this settlement, engaging our experienced legal team ensures that you receive the full entitlements under this settlement. With over 30 years of experience, our firm is familiar with properly filing these claims and getting our clients compensated. Successful participation in this settlement necessitates the timely and accurate submission of a valid claim, and not all businesses will qualify for payment. We'll collaborate closely with the claims administrator to ensure your business receives its due if deemed eligible. Historically, nearly 95% of entitled beneficiaries in class action settlements miss out on their benefits due to various reasons—lack of awareness about the settlement, difficulties in completing required claim forms, failure to submit necessary documents promptly, or inadequate information provision during follow-ups by settlement administrators. Our team ensures the proper and timely submission of your claim without complications. Additionally, we'll ensure you receive the correct entitled amount. If discrepancies arise, our lawyers will dispute any incorrect amounts on your behalf.",
    },
    {
      question: 'What actions am I authorizing counsel to undertake by signing the retainer?',
      answer: "By retaining our legal team, you grant our attorneys full authority to represent and act on behalf of you and your business throughout the claims-filing period. This authorization includes communicating with the Settlement Administrator, making decisions concerning your business's status as a class member, and managing your business's claim. Our attorneys will exclusively represent you and your business in all matters concerning the settlement, including receiving and handling your business's claim form, preparing, completing, and submitting the claim to the Settlement Administrator, communicating as necessary with the Settlement Administrator or Class Counsel regarding your business and its claim, responding to any requests for additional information or documentation from the Settlement Administrator to validate the claim, and ensuring that you and your business receive the appropriate and timely payment.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div id='fqs' className='pt-10 md:p-10  lg;p-32 lg:w-[60%] md:w-[75%]  w-[90%] m-auto'>
      <h1 className='text-center text-2xl font-bold mb-5'>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="border border-gray-300 rounded p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <svg
              className={`w-6 h-6 transform ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L9 14.586V4a1 1 0 0 1 1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {activeIndex === index && (
            <div className="mt-2 text-gray-600">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}