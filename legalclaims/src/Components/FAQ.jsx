import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is this lawsuit about?',
      answer: 'Answer to question 1...',
    },
    {
      question: 'Do all businesses qualify for the settlement?',
      answer: 'No, not all business will qualify. Our lawyers will work with the settlement administrator to see if your business qualifies.',
    },
    {
      question: 'What is an interchange fee?',
      answer: 'When a cardholder makes a purchase with a credit or debit card, there is an interchange fee attributable to those transactions, which is usually around 1% to 2% of the purchase price. Interchange fees typically account for the greatest part of the fees paid by merchants for accepting Visa and Mastercard cards. Visa and Mastercard set interchange fee rates for different kinds of transactions and publish them on their websites, usually twice a year.',
    },
    {
      question: 'How much money will I get?',
      answer: 'The amount paid from the settlement fund will be based on your actual or estimated interchange fees attributable to Visa and Mastercard card transactions (between you and your customers) from January 1, 2004, through January 25, 2019. The amount of money each Authorized Claimant will receive from the settlement fund depends on the money available to pay all claims, the total dollar value of all valid claims filed, the cost of class administration and notice, applicable taxes on the settlement fund and any other related tax expenses, attorneys’ fees and expenses, and money awards to the Rule 23(b)(3) Class Plaintiffs for their representation of merchants in MDL 1720, which culminated in the Class Settlement Agreement, all as approved by the Court.',
    },
    {
      question: 'When will the claim forms be available?',
      answer: 'Claim forms are not yet available. They should be available on or after December 1, 2023. Our lawyers are getting a head start and collecting claim information now and will be submitting shortly on your behalf.',
    },
    {
      question: 'What if I no longer have my business?',
      answer: 'Your business does not have to be active now for you to qualify. The business just had to be in existence any time between from January 1, 2004, through January 25, 2019, and accepted Visa and Mastercard. Don’t worry if you closed your business or if it was dissolved by your respective state’s division of corporations. Once you hire our law firm, we will work with the settlement administrator to confirm whether your business qualified.',
    },
    {
        question: "How will I know if I don't qualify",
        answer: 'Our lawyers will will work with the settlement administrator to determine whether you qualify. If you do not qualify, our team will let you know.',
    },
    {
      question: "Do I have to pay the lawyers anything if I don't qualify?",
      answer: 'No. You, only pay us a fee if we can recover something for your business. If we get your business money back, our lawyers are paid 40% out of the money paid back.',
    },
    {
      question: 'Do I have to hire an attorney to help me?',
      answer: 'Although your business does not have to hire a lawyer in connection with this settlement, it makes sense for you to hire our experienced lawyers to make sure you get all the money you are entitled to under this settlement. Our legal team has handled class actions for well over a decade and have gotten our clients over $1 billion dollars from settlements. This settlement requires the submission of a timely and valid claim, and not all businesses will qualify for a payment. We will work closely with the claims administrator to get your business paid properly if you are qualified. Historically, nearly 95% of all those entitled to benefits in class action settlements never receive those benefits. Why is that? It’s because class members are not aware of the settlement, they do not know how to complete the required claim forms, they fail to complete the necessary documents, they fail to submit the claim forms on time, or they do not provide the necessary information when follow-up information has been requested by the settlement administrators. Our team will make sure your claim is properly and timely submitted and that there are no hiccups. We will also make sure you get the amount you are entitled to receive. If the amounts don’t match up, our lawyers will dispute the amount if we believe it is incorrect.',
    },
    {
      question: 'By signing the retainer, what are the main items I am authorizing counsel to do for me? ',
      answer: 'The Settlement Administrator and Class Counsel are available at no cost to your business to assist during the claims-filing period. Notwithstanding, by retaining our legal team, you are giving our attorneys complete authority to communicate with the Settlement Administrator on you and your business’ behalf and to make any and all decisions related to your business’ status as a class member and in connection with your business’ claim. Our attorneys shall serve as the sole representative for you and your business in connection with the settlement and in dealing with the Settlement Administrator for the entirety of the claim process, to receive from the Settlement Administrator your business’ claim form, to prepare, complete, and submit the claim to the Settlement Administrator; to communicate as necessary with the Settlement Administrator or Class Counsel about your business or its claim and the claim process, to respond to any follow-up requests from the Settlement Administrator for additional information or documentation necessary to prove a valid claim, and to ensure you and your business is properly and timely paid.',
    },
    {
      question: 'Where can I find additional information about the settlement?',
      answer: 'For more information about the Settlement, here is a link to the Payment Card Interchange Fee Settlement:https://www.paymentcardsettlement.com/en',
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className='p-16'>
      <h1 className='text-center text-4xl font-bold m-2 mb-5'>Frequently Asked Questions</h1>
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