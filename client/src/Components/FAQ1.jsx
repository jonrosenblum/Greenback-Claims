import { useState } from 'react';

export default function FAQ1() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Do I have to repay the ERC Credit?',
      answer: "No. This is not a loan. It's a refundable tax credit. When we file your ERC claim we request a refund check for you.",
    },
    {
      question: 'How much do you charge?',
      answer: 'Our service charge is based on a percentage of the credit recovered. We calculate and provide our fee with our free analysis. Just like a good CPA, using the right team for this process pays for itself.',
    },
    {
      question: 'Can I get ERC Funds if I already took the PPP?',
      answer: "Yes. The Taxpayer Certainty and Disaster Tax Relief Act of 2020, enacted December 27, 2020, modified the ERC credit rules. One of the modifications included allowing a company to have a PPP loan and still take advantage of the ERC credit. However, you can't use the same dollar for dollar funds. We take this into account when processing your ERC credit.",
    },
    {
      question: 'Will the ERC funds run out?',
      answer: "This is not a lending program - tax refunds are issued by the US Treasury. Therefore, all eligible employers will receive the funds.",
    },
    {
      question: 'How long does it take to get my ERC Credit?',
      answer: 'This is how the process works: you send us the required documents and we process an analysis at no charge. The process from start to finish usually happens in 2-3 weeks. If you wish to move forward, you sign your amended return and we file your claim. Once filed, refunds are released based on IRS backlog. Currently, the IRS has stipulated a 6-9 month turnaround on the ERC refunds.',
    },
    {
      question: 'Is the ERC Credit taxable?',
      answer: "The ERC credit is not considered income for federal income tax purposes, but you must reduce any deductible wage expenses by the amount of the credit. Please provide the credit information to your CPA for tax purposes.",
    },
    {
      question: "Can I be eligible for the ERC if I'm self employed?",
      answer: 'No, if you are majority owner (over 50%) of your company then your wages are not eligible.',
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