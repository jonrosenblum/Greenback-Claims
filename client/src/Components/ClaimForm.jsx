import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import jsPDF from 'jspdf';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';


export default function ClaimForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Total number of form pages

  const [formData, setFormData] = useState({
    businessAcceptance: '',
    businessName: '',
    companyType: '',
    title: '',
    ein: '',
    annualSales: '',
    franchiseAgreement: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // const [sign, setSign] = useState()
  const [url, setUrl] = useState()
  const [loading, setLoading] = useState(false)
  const signatureRef = useRef()

  const clearSign = () => {
    // console.log(sign.getTrimmedCanvas().toDataURL('image/png'));
    signatureRef.current.clear()
    setUrl('')
  }

  const saveSign = () => {
    setUrl(signatureRef.current.getTrimmedCanvas().toDataURL('image/png'))
  }




  const pdfContent = () => {
    return (
      <>
        <div className='p-0 w-full text-[10px]' id='pdf_to_be'>
          <div className='flex justify-between'>
            <img src="/public/pdf1.png" className='w-[150px] object-contain' alt="" />
            <img src="/public/pdf2.png" className='w-[110px] object-contain' alt="" />
          </div>
          <div className='mt-5'>
            <p><span className='font-semibold'>Name</span> : {formData.firstName} {formData.lastName}</p>
            <p><span className='font-semibold'>Email</span> : {formData.email}</p>
            <p><span className='font-semibold'>EIN</span> : {formData.ein}</p>
          </div>
          <div className='mt-5'>
            Re:	In re Payment Card Interchange Fee and Merchant Discount Antitrust Litigation, MDL 1720
          </div>
          <div className='mt-3'>
            <p className=''>Dear {formData.firstName},</p>
            <p className='indent-14 mt-3'>
              This Retainer Agreement will memorialize the retention of Criden & Love, P.A.
              and Stabile Law Firm, LLC (the “Firms”) to represent :______________________________
              (“Client”) in connection with any claim Client may have as a member of the Rule 23(b)(3)
              Settlement Class pursuant to any settlement or court award in the above-referenced action,
              which is currently pending in the United States District Court for the Eastern District
              of New York.
            </p>
            <p className='indent-14 mt-3'>
              Client represents that it has received Notice of this settlement or that Client
              is a member of the Rule 23(b)(3) Settlement Class consisting of: All persons, businesses,
              and other entities that have accepted any Visa-Branded Cards and/or Mastercard-Branded Cards
              in the United States at any time from January 1, 2004 to January 25, 2019.
            </p>
            <p className='indent-14 mt-3'>
              Client further represents that it is not a “Dismissed Plaintiff,” a merchant that previously
              settled and dismissed their own lawsuit, as listed on Appendix B to the Class Settlement
              Agreement, which is available <a href="https://www.paymentcardsettlement.com/Content/Documents/New%20Docs/Dkt%20No.%207257-2_Settlement%20Agreement.pdf" target='_blank' rel="noreferrer" className='text-blue-500 underline'>here</a>.
              Client consents to the verification of its claim by the Firms. In the event that Client
              does not have a claim, the retention of the Firms is null and void. Client agrees to
              keep the terms of this engagement confidential.________________________________________
            </p>
            <p className='mt-3 font-bold text-center underline'>Scope of Retention</p>
            <p className='indent-14 mt-1 mb-32'>
              The Firms expect to render the following services for the Client: (1) conferences with
              Client and other relevant representatives designated; (2) preparation and submission
              of all claim forms and any documentation required to substantiate Client’s claim; and
              (3) communicating, as necessary, with the Claims Administrator as to Client’s claim
              and any calculation of Client’s claim. Client agrees to promptly provide the Firms with
              all documentation needed to substantiate Client’s claim pursuant to the court-approved
              claim form. The Firms will <span className='font-bold underline italic'>not</span> provide any legal advice and/or opinions
            </p>
            <p className='indent-14 mt-3'>
              The Firms shall consult with and obtain Client’s approval regarding any major decisions
              arising in connection with the above-referenced work or with respect to any of the services
              rendered by the Firms pursuant to this Agreement.
            </p>
            <p className='mt-3 font-bold text-center underline'>Fees for Services Rendered</p>
            <p className='indent-14 mt-1'>
              In consideration of the services rendered, and to be rendered, pursuant to this Agreement,
              Client has agreed to pay as fees to the Firms twenty-five percent (25%) of any recovery
              Client obtains from the Settlement Fund. All reasonable costs and out-of-pocket expenses
              necessary to prepare and submit Client’s claim, and to provide other services to be rendered
              pursuant to this Agreement as outlined above, will be advanced by the Firms, 100% of
              which will be reimbursed to the Firms solely out of any recovery after application of
              the twenty-five percent contingency fee. The Firms’ engagement will conclude when the
              Claims Administrator makes payment. The Firms assume no responsibility for any associated
              allocation, distribution, tax or any post-payment issue(s).
            </p>
            <p className='mt-3 font-bold text-center underline'>Dispute Resolution</p>
            <p className='indent-14 mt-1'>
              Although we do not expect any disputes to arise between the Client and the Firms,
              if a dispute does in fact arise, all parties agree that the exclusive venue for
              any action arising under or in any way related to this Agreement shall be Miami-Dade County,
              Florida.  The parties expressly waive any objection or defense that such venue is an
              inconvenient or otherwise improper forum for any dispute arising under or in any way related
              to this Agreement.  The parties also waive any and all objections to personal jurisdiction
              as they may relate to the enforcement of the terms of this Agreement in Miami-Dade County,
              Florida.
            </p>
            <p className='mt-3 font-bold text-center underline'>Law Governing this Agreement</p>
            <p className='indent-14 mt-1'>
              This Agreement shall be interpreted and enforced pursuant to the laws of the State of Florida,
              both substantive and procedural, regardless of choice of law principles.
            </p>
            <p className='mt-3 font-bold text-center underline'>Entire Understanding Between Parties</p>
            <p className='indent-14 mt-1  mb-32'>
              This Agreement represents the entire Agreement between the parties with respect to the
              engagement of the Firm for the Client in this matter.  The parties acknowledge that they
              have not relied upon any representations made by another party or other person as an inducement
              to enter into this Agreement.  Client acknowledges that the Firms have made no guarantee as
              to the outcome of this matter or the amount recoverable in connection with Client’s claim.
              Further, the parties acknowledge that no representations have been made, other than those
              expressly set forth in this Agreement.  No amendment, waiver or modification of any other
              terms and conditions set forth in this Agreement shall be effective unless in writing,
              signed by both parties.
            </p>
            <p className='indent-14 mt-3'>
              If this Agreement accurately reflects the terms of our representation of Client in this matter,
              please sign and date in the space provided below and e-mail an executed copy of the Agreement
              to the Firms.  This Agreement may be signed in one or more counterparts, all of which shall
              be deemed original.
            </p>
            <p className='indent-14 mt-3'>
              We look forward to working with you in this matter and thank you again for your confidence
              and trust
            </p>
          </div>
          <div className='flex justify-end mt-10'>
            <div className='font-semibold'>
              <p>Very truly yours,</p>
              <div className='mt-5'>
                <p>Michael E. Criden, Esq.</p>
                <p>CRIDEN & LOVE, P.A.</p>
              </div>
              <div className='mt-5'>
                <p>Steve Stabile, Esq.</p>
                <p>STABILE LAW FIRM, LLC</p>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-end'>
            <div className='flex items-end gap-5'>
              <p className='font-bold'>By: </p>
              <div className=''>
                <img src={url} alt="" className='w-[100px] object-contain' />
              </div>
            </div>
            <div className='flex gap-5 font-bold'>
              <p>Date:</p>
              <p className='underline'>{getCurrentDate()}</p>
            </div>
          </div>
        </div>
      </>
    )
  }


  const convertToPdf = () => {
    setLoading(true)
    // pdfContent()
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [500, 700]
    });

    var pdfjs = document.querySelector('#pdf_to_be');
    console.log(pdfjs);
    let pdfjs2 = pdfjs.cloneNode(true)

    var myDiv = document.createElement("div");
    myDiv.style.width = "500px";
    myDiv.style.padding = "40px"
    myDiv.appendChild(pdfjs2)
    // Convert HTML to PDF in JavaScript
    doc.html(myDiv, {
      callback: function (doc) {
        // doc.save("output.pdf");
        let url = doc.output('blob')
        // console.log(url);

        const formDataToSend = new FormData();
        formDataToSend.append('pdf', url);
        formDataToSend.append('formData', JSON.stringify(formData));

        fetch('http://localhost:3000/send-email', {
          method: 'POST',
          body: formDataToSend,
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle response
            console.log(data);
            toast.success(data.message, {
              position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
              style: {
                backgroundColor: '#d9d9d9',
                padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                fontSize: '14px',
                fontWeight: 'bold'
              },
            });
          })
          .catch((error) => {
            // Handle error
            // console.error('Error:', error);
            toast.error(error.message, {
              position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",
              style: {
                backgroundColor: '#d9d9d9',
                padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                fontSize: '14px',
                fontWeight: 'bold'
              },
            });
          })
          .finally(() => {
            setLoading(false)
          })


        // var link = document.createElement("a");
        // link.href = url;
        // link.download = "sample.pdf";
        // document.body.appendChild(link)
        // link.click();
        // console.log(link);
      },
      x: 10,
      y: 10
    });

  };



  const nextPage = () => {
    if (currentPage === 3 && !url) {
      toast.error("Signature is required", {
        position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
        style: {
          backgroundColor: '#d9d9d9',
          padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
          fontSize: '14px',
          fontWeight: 'bold'
        },
      });
      return
    }
    if (currentPage < totalPages) {
      setCurrentPage(currentPage => currentPage + 1);
    }
    // console.log(formData)
  };


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  function getCurrentDate() {
    var currentDate = new Date();

    // Extract year, month, and day components
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    var day = currentDate.getDate().toString().padStart(2, '0');

    // Format the date as MM/DD/YYYY
    var formattedDate = month + '/' + day + '/' + year;

    return formattedDate;
  }







  const renderFormPage = (page) => {
    // switch (page) {
    //   case 1:
    //     return (
    //       <div className='relative'>
    //         <div className="text-sm m-2 p-4">
    //           <h1>Please answer the following questions to help us determine if you are eligible to make a claim for compensation:</h1>

    //         </div>
    //         <hr className="border-t border-gray-300 mt-5" />

    //         <div className='flex justify-between items-start m-2'>
    //           <div className='w-45%'>
    //             <p className='max-w-xs m-2'>Did you have a business at any time between January 1, 2004 - January 25, 2019 that accepted Visa or Mastercard?</p>
    //             <input
    //               className='m-2'
    //               type="radio"
    //               name="businessAcceptance"
    //               value="Yes"
    //               onChange={handleInputChange}
    //               required
    //             />
    //             Yes
    //             <input
    //               className='m-2'
    //               type="radio"
    //               name="businessAcceptance"
    //               value="No"
    //               onChange={handleInputChange}
    //               required
    //             />
    //             No
    //           </div>

    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>What is / was the legal name of the business?</p>
    //             <input
    //               className='m-2 p-2  border-2 border-blue-500 rounded-md'
    //               placeholder='Enter name'
    //               type='text'
    //               name='businessName'
    //               onChange={handleInputChange}
    //               required
    //               value={formData.businessName}
    //             />
    //           </div>
    //         </div>

    //         <div className='flex justify-between m-2'>
    //           <div className='flex flex-col mt-5 w-[45%]'>
    //             <p className='m-2'>Select your company type:</p>
    //             <select
    //               className='m-2 p-2  border-2 border-blue-500 rounded-md'
    //               name='companyType'
    //               onChange={handleInputChange}
    //               required
    //               value={formData.companyType}
    //             >
    //               <option value=''>Please Select</option>
    //               <option value='inc'>Incorporated (Inc.)</option>
    //               <option value='co'>Company (Co.)</option>
    //               <option value='llc'>Limited Liability Company (LLC)</option>
    //               <option value='pa'>Professional Association (P.A.)</option>
    //               <option value='pc'>Professional Corporation (P.C.)</option>
    //               <option value='ltd'>Limited Company (Ltd.)</option>
    //               <option value='sole'>Sole Proprietorship</option>
    //             </select>
    //           </div>

    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2  '>What is / was your relationship with the business? (Title)</p>
    //             <select
    //               className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //               name='title'
    //               onChange={handleInputChange}
    //               value={formData.title}
    //               required>
    //               <option value=''>Please Select</option>
    //               <option value='director'>Director</option>
    //               <option value='owner'>Officer</option>
    //               <option value='employee'>Owner</option>
    //               <option value='other'>Shareholder</option>
    //               <option value='other'>Manager</option>
    //             </select>
    //           </div>
    //         </div>



    //         <div className='flex justify-between items-start m-2'>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>Business Tax Identification Number (EIN) for incorporated businesses or Social Security Number (SSN) for Sole Proprietorships - MUST BE 9 DIGITS</p>
    //             <input
    //               required
    //               name='ein'
    //               onChange={handleInputChange}
    //               value={formData.ein}
    //               placeholder='EIN or SSN'
    //               className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //               type='text' />
    //           </div>

    //           <div className='flex flex-col gap-4 w-[45%]'>
    //             <div className='flex flex-col'>
    //               <p className='m-2 '>Estimated annual credit card sales</p>
    //               <input
    //                 className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //                 placeholder='$'
    //                 required
    //                 type='text'
    //                 name='annualSales'
    //                 value={formData.annualSales}
    //                 onChange={handleInputChange}
    //               />
    //             </div>

    //             <div>
    //               <p className='m-2  '>Is / was  your business subject to a franchise agreement?*</p>
    //               <input
    //                 type='radio'
    //                 name='franchiseAgreement'
    //                 onChange={handleInputChange}
    //                 required
    //                 className='m-2'
    //               />
    //               Yes
    //               <input
    //                 type='radio'
    //                 name='franchiseAgreement'
    //                 onChange={handleInputChange}
    //                 required
    //                 className='m-2'
    //               />
    //               No
    //             </div>
    //           </div>
    //         </div>
    //         <button className='absolute bottom-0 right-0 bg-blue-500 p-2 rounded-md' onClick={nextPage}>Next</button>
    //       </div>
    //     );


    //   case 2:
    //     return (
    //       <div className='pl-3 pr-3 pb-3'>
    //         <div className="text-sm m-2 p-4">
    //           <h1 className='text-2xl'>Business Information</h1>
    //         </div>

    //         <hr className="border-t border-gray-300" />

    //         <div className='flex justify-between items-start mt-5'>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>First name</p>
    //             <input
    //               name='firstName'
    //               className='m-2 p-2  border-2 border-blue-500 rounded-md'
    //               placeholder='First'
    //               type='text'
    //               value={formData.firstName}
    //               onChange={handleInputChange}
    //               required
    //             />
    //           </div>

    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2 '>Last name</p>
    //             <input
    //               name='lastName'
    //               className='m-2 p-2  border-2 border-blue-500 rounded-md'
    //               placeholder='Last'
    //               onChange={handleInputChange}
    //               type='text'
    //               value={formData.lastName}
    //               required
    //             />
    //           </div>
    //         </div>

    //         <div className='flex justify-between items-start'>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>Email</p>
    //             <input
    //               name='email'
    //               onChange={handleInputChange}
    //               className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //               placeholder='Email'
    //               type='email'
    //               value={formData.email}
    //               required
    //             />
    //           </div>

    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>Phone</p>
    //             <input
    //               name='phone'
    //               onChange={handleInputChange}
    //               className='m-2 p-2  border-2 border-blue-500 rounded-md'
    //               placeholder='Phone'
    //               type='tel'
    //               value={formData.phone}
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div className='flex justify-between items-start'>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>Address Line 1</p>
    //             <input
    //               name='address'
    //               onChange={handleInputChange}
    //               className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //               placeholder='Address'
    //               type='text'
    //               value={formData.address}
    //               required
    //             />
    //           </div>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>City</p>
    //             <input
    //               name='city'
    //               onChange={handleInputChange}
    //               className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //               placeholder='City'
    //               type='text'
    //               value={formData.city}
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div className='flex justify-between items-start mb-5'>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>State</p>
    //             <input
    //               name='state'
    //               onChange={handleInputChange}
    //               className='m-2 p-2 border-2 border-blue-500 rounded-md'
    //               placeholder='State'
    //               type='text'
    //               value={formData.state}
    //               required
    //             />
    //           </div>
    //           <div className='flex flex-col w-[45%]'>
    //             <p className='m-2'>Zipcode</p>
    //             <input
    //               name='zipcode'
    //               onChange={handleInputChange}
    //               className='m-2 p-2  border-2 border-blue-500 rounded-md'
    //               placeholder='Zipcode'
    //               type='text'
    //               value={formData.zipcode}
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div className='flex justify-between'>
    //           <button className='bg-blue-500 p-2 rounded-md' onClick={prevPage}>Previous</button>
    //           <button className='bg-blue-500 p-2 rounded-md' onClick={nextPage}>Next</button>
    //         </div>
    //       </div>
    //     );
    //   case 3:
    //     return (
    //       <div className={``}>
    //         <div className="text-sm m-2 p-4">
    //           <h1 className='text-2xl text-center'>Please sign the contract below</h1>
    //         </div>
    //         <hr className="border-t border-gray-300" />
    //         <div className='mt-5 mb-5'>
    //           <>
    //             <div className='flex justify-between'>
    //               <img src="/public/pdf1.png" className='w-[170px] object-contain' alt="" />
    //               <img src="/public/pdf2.png" className='w-[130px] object-contain' alt="" />
    //             </div>
    //             <div className='mt-5'>
    //               <p><span className='font-semibold'>Name</span> : {formData.firstName}</p>
    //               <p><span className='font-semibold'>Email</span> : {formData.email}</p>
    //               <p><span className='font-semibold'>EIN</span> : {formData.ein}</p>
    //             </div>
    //             <div className='mt-5'>
    //               Re:	In re Payment Card Interchange Fee and Merchant Discount Antitrust Litigation, MDL 1720
    //             </div>
    //             <div className='mt-3'>
    //               <p className=''>Dear, {formData.firstName},</p>
    //               <p className='indent-14 mt-3'>
    //                 This Retainer Agreement will memorialize the retention of Criden & Love, P.A.
    //                 and Stabile Law Firm, LLC (the “Firms”) to represent :______________________________
    //                 (“Client”) in connection with any claim Client may have as a member of the Rule 23(b)(3)
    //                 Settlement Class pursuant to any settlement or court award in the above-referenced action,
    //                 which is currently pending in the United States District Court for the Eastern District
    //                 of New York.
    //               </p>
    //               <p className='indent-14 mt-3'>
    //                 Client represents that it has received Notice of this settlement or that Client
    //                 is a member of the Rule 23(b)(3) Settlement Class consisting of: All persons, businesses,
    //                 and other entities that have accepted any Visa-Branded Cards and/or Mastercard-Branded Cards
    //                 in the United States at any time from January 1, 2004 to January 25, 2019.
    //               </p>
    //               <p className='indent-14 mt-3'>
    //                 Client further represents that it is not a “Dismissed Plaintiff,” a merchant that previously
    //                 settled and dismissed their own lawsuit, as listed on Appendix B to the Class Settlement
    //                 Agreement, which is available <a href="https://www.paymentcardsettlement.com/Content/Documents/New%20Docs/Dkt%20No.%207257-2_Settlement%20Agreement.pdf" target='_blank' rel="noreferrer" className='text-blue-500 underline'>here</a>.
    //                 Client consents to the verification of its claim by the Firms. In the event that Client
    //                 does not have a claim, the retention of the Firms is null and void. Client agrees to
    //                 keep the terms of this engagement confidential.________________________________________
    //               </p>
    //               <p className='mt-3 font-bold text-center underline'>Scope of Retention</p>
    //               <p className='indent-14 mt-1'>
    //                 The Firms expect to render the following services for the Client: (1) conferences with
    //                 Client and other relevant representatives designated; (2) preparation and submission
    //                 of all claim forms and any documentation required to substantiate Client’s claim; and
    //                 (3) communicating, as necessary, with the Claims Administrator as to Client’s claim
    //                 and any calculation of Client’s claim. Client agrees to promptly provide the Firms with
    //                 all documentation needed to substantiate Client’s claim pursuant to the court-approved
    //                 claim form. The Firms will <span className='font-bold underline italic'>not</span> provide any legal advice and/or opinions
    //               </p>
    //               <p className='indent-14 mt-3'>
    //                 The Firms shall consult with and obtain Client’s approval regarding any major decisions
    //                 arising in connection with the above-referenced work or with respect to any of the services
    //                 rendered by the Firms pursuant to this Agreement.
    //               </p>
    //               <p className='mt-3 font-bold text-center underline'>Fees for Services Rendered</p>
    //               <p className='indent-14 mt-1'>
    //                 In consideration of the services rendered, and to be rendered, pursuant to this Agreement,
    //                 Client has agreed to pay as fees to the Firms twenty-five percent (25%) of any recovery
    //                 Client obtains from the Settlement Fund. All reasonable costs and out-of-pocket expenses
    //                 necessary to prepare and submit Client’s claim, and to provide other services to be rendered
    //                 pursuant to this Agreement as outlined above, will be advanced by the Firms, 100% of
    //                 which will be reimbursed to the Firms solely out of any recovery after application of
    //                 the twenty-five percent contingency fee. The Firms’ engagement will conclude when the
    //                 Claims Administrator makes payment. The Firms assume no responsibility for any associated
    //                 allocation, distribution, tax or any post-payment issue(s).
    //               </p>
    //               <p className='mt-3 font-bold text-center underline'>Dispute Resolution</p>
    //               <p className='indent-14 mt-1'>
    //                 Although we do not expect any disputes to arise between the Client and the Firms,
    //                 if a dispute does in fact arise, all parties agree that the exclusive venue for
    //                 any action arising under or in any way related to this Agreement shall be Miami-Dade County,
    //                 Florida.  The parties expressly waive any objection or defense that such venue is an
    //                 inconvenient or otherwise improper forum for any dispute arising under or in any way related
    //                 to this Agreement.  The parties also waive any and all objections to personal jurisdiction
    //                 as they may relate to the enforcement of the terms of this Agreement in Miami-Dade County,
    //                 Florida.
    //               </p>
    //               <p className='mt-3 font-bold text-center underline'>Law Governing this Agreement</p>
    //               <p className='indent-14 mt-1'>
    //                 This Agreement shall be interpreted and enforced pursuant to the laws of the State of Florida,
    //                 both substantive and procedural, regardless of choice of law principles.
    //               </p>
    //               <p className='mt-3 font-bold text-center underline'>Entire Understanding Between Parties</p>
    //               <p className='indent-14 mt-1'>
    //                 This Agreement represents the entire Agreement between the parties with respect to the
    //                 engagement of the Firm for the Client in this matter.  The parties acknowledge that they
    //                 have not relied upon any representations made by another party or other person as an inducement
    //                 to enter into this Agreement.  Client acknowledges that the Firms have made no guarantee as
    //                 to the outcome of this matter or the amount recoverable in connection with Client’s claim.
    //                 Further, the parties acknowledge that no representations have been made, other than those
    //                 expressly set forth in this Agreement.  No amendment, waiver or modification of any other
    //                 terms and conditions set forth in this Agreement shall be effective unless in writing,
    //                 signed by both parties.
    //               </p>
    //               <p className='indent-14 mt-3'>
    //                 If this Agreement accurately reflects the terms of our representation of Client in this matter,
    //                 please sign and date in the space provided below and e-mail an executed copy of the Agreement
    //                 to the Firms.  This Agreement may be signed in one or more counterparts, all of which shall
    //                 be deemed original.
    //               </p>
    //               <p className='indent-14 mt-3'>
    //                 We look forward to working with you in this matter and thank you again for your confidence
    //                 and trust
    //               </p>
    //             </div>
    //             <div className='flex justify-end mt-10'>
    //               <div className='font-semibold'>
    //                 <p>Very truly yours,</p>
    //                 <div className='mt-5'>
    //                   <p>Michael E. Criden, Esq.</p>
    //                   <p>CRIDEN & LOVE, P.A.</p>
    //                 </div>
    //                 <div className='mt-5'>
    //                   <p>Steve Stabile, Esq.</p>
    //                   <p>STABILE LAW FIRM, LLC</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </>
    //           <div className='flex justify-between items-end'>
    //             <div className='flex items-end gap-5'>
    //               <p className='font-bold'>By: </p>
    //               <div className='flex flex-col items-start'>
    //                 <p>please save the sign before moving forward</p>
    //                 <div className='border border-zinc-400 mt-2 box-border'>
    //                   <SignatureCanvas penColor='black'

    //                     canvasProps={{ width: 200, height: 130, className: '', }}
    //                     ref={signatureRef}
    //                   />
    //                 </div>
    //                 <div className='mt-2 flex gap-3'>
    //                   <button onClick={clearSign} className='bg-gray-200 font-semibold rounded-md px-3'>clear</button>
    //                   <button onClick={saveSign} className='bg-gray-200 font-semibold rounded-md px-3'>save</button>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className='flex gap-5 font-bold'>
    //               <p>Date:</p>
    //               <p className='underline'>{getCurrentDate()}</p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className='flex justify-between'>
    //           <button className='bg-blue-500 rounded-md p-2' onClick={prevPage}>Previous</button>
    //           <button className='bg-blue-500 rounded-md p-2' onClick={nextPage}>Next</button>
    //         </div>
    //       </div>
    //     );
    //   case 4:
    //     return (
    //       <div>
    //         <div className="text-sm m-2 p-4">
    //           <h1 className='text-2xl text-center'>Your signed contract below</h1>
    //         </div>
    //         <hr className="border-t border-gray-300" />
    //         <div className='mt-5 mb-5'>
    //           {pdfContent()}
    //         </div>
    //         <div className='flex justify-between'>
    //           <button className='bg-blue-500 rounded-md p-2' onClick={prevPage}>Previous</button>
    //           <button className='bg-blue-500 rounded-md p-2' disabled={loading} onClick={submitForm}>{loading ? <Loader height={'h-4'} width={'w-4'} /> : 'Submit'}</button>
    //         </div>
    //       </div>
    //     );
    //   default:
    //     return null;
    // }
    return (
      <>
        <div className={`relative ${page !== 1 && 'hidden'}`}>
          <div className="text-sm m-2 p-4">
            <h1>Please answer the following questions to help us determine if you are eligible to make a claim for compensation:</h1>

          </div>
          <hr className="border-t border-gray-300 mt-5" />

          <div className='flex justify-between items-start m-2'>
            <div className='w-45%'>
              <p className='max-w-xs m-2'>Did you have a business at any time between January 1, 2004 - January 25, 2019 that accepted Visa or Mastercard?</p>
              <input
                className='m-2'
                type="radio"
                name="businessAcceptance"
                value="Yes"
                onChange={handleInputChange}
                required
              />
              Yes
              <input
                className='m-2'
                type="radio"
                name="businessAcceptance"
                value="No"
                onChange={handleInputChange}
                required
              />
              No
            </div>

            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>What is / was the legal name of the business?</p>
              <input
                className='m-2 p-2  border-2 border-blue-500 rounded-md'
                placeholder='Enter name'
                type='text'
                name='businessName'
                onChange={handleInputChange}
                required
                value={formData.businessName}
              />
            </div>
          </div>

          <div className='flex justify-between m-2'>
            <div className='flex flex-col mt-5 w-[45%]'>
              <p className='m-2'>Select your company type:</p>
              <select
                className='m-2 p-2  border-2 border-blue-500 rounded-md'
                name='companyType'
                onChange={handleInputChange}
                required
                value={formData.companyType}
              >
                <option value=''>Please Select</option>
                <option value='inc'>Incorporated (Inc.)</option>
                <option value='co'>Company (Co.)</option>
                <option value='llc'>Limited Liability Company (LLC)</option>
                <option value='pa'>Professional Association (P.A.)</option>
                <option value='pc'>Professional Corporation (P.C.)</option>
                <option value='ltd'>Limited Company (Ltd.)</option>
                <option value='sole'>Sole Proprietorship</option>
              </select>
            </div>

            <div className='flex flex-col w-[45%]'>
              <p className='m-2  '>What is / was your relationship with the business? (Title)</p>
              <select
                className='m-2 p-2 border-2 border-blue-500 rounded-md'
                name='title'
                onChange={handleInputChange}
                value={formData.title}
                required>
                <option value=''>Please Select</option>
                <option value='director'>Director</option>
                <option value='owner'>Officer</option>
                <option value='employee'>Owner</option>
                <option value='other'>Shareholder</option>
                <option value='other'>Manager</option>
              </select>
            </div>
          </div>



          <div className='flex justify-between items-start m-2'>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>Business Tax Identification Number (EIN) for incorporated businesses or Social Security Number (SSN) for Sole Proprietorships - MUST BE 9 DIGITS</p>
              <input
                required
                name='ein'
                onChange={handleInputChange}
                value={formData.ein}
                placeholder='EIN or SSN'
                className='m-2 p-2 border-2 border-blue-500 rounded-md'
                type='text' />
            </div>

            <div className='flex flex-col gap-4 w-[45%]'>
              <div className='flex flex-col'>
                <p className='m-2 '>Estimated annual credit card sales</p>
                <input
                  className='m-2 p-2 border-2 border-blue-500 rounded-md'
                  placeholder='$'
                  required
                  type='text'
                  name='annualSales'
                  value={formData.annualSales}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <p className='m-2  '>Is / was  your business subject to a franchise agreement?*</p>
                <input
                  type='radio'
                  name='franchiseAgreement'
                  onChange={handleInputChange}
                  required
                  className='m-2'
                />
                Yes
                <input
                  type='radio'
                  name='franchiseAgreement'
                  onChange={handleInputChange}
                  required
                  className='m-2'
                />
                No
              </div>
            </div>
          </div>
          <button className='absolute bottom-0 right-0 bg-blue-500 p-2 rounded-md' onClick={nextPage}>Next</button>
        </div>



        <div className={`pl-3 pr-3 pb-3 ${page !== 2 && 'hidden'}`}>
          <div className="text-sm m-2 p-4">
            <h1 className='text-2xl'>Business Information</h1>
          </div>

          <hr className="border-t border-gray-300" />

          <div className='flex justify-between items-start mt-5'>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>First name</p>
              <input
                name='firstName'
                className='m-2 p-2  border-2 border-blue-500 rounded-md'
                placeholder='First'
                type='text'
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='flex flex-col w-[45%]'>
              <p className='m-2 '>Last name</p>
              <input
                name='lastName'
                className='m-2 p-2  border-2 border-blue-500 rounded-md'
                placeholder='Last'
                onChange={handleInputChange}
                type='text'
                value={formData.lastName}
                required
              />
            </div>
          </div>

          <div className='flex justify-between items-start'>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>Email</p>
              <input
                name='email'
                onChange={handleInputChange}
                className='m-2 p-2 border-2 border-blue-500 rounded-md'
                placeholder='Email'
                type='email'
                value={formData.email}
                required
              />
            </div>

            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>Phone</p>
              <input
                name='phone'
                onChange={handleInputChange}
                className='m-2 p-2  border-2 border-blue-500 rounded-md'
                placeholder='Phone'
                type='tel'
                value={formData.phone}
                required
              />
            </div>
          </div>
          <div className='flex justify-between items-start'>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>Address Line 1</p>
              <input
                name='address'
                onChange={handleInputChange}
                className='m-2 p-2 border-2 border-blue-500 rounded-md'
                placeholder='Address'
                type='text'
                value={formData.address}
                required
              />
            </div>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>City</p>
              <input
                name='city'
                onChange={handleInputChange}
                className='m-2 p-2 border-2 border-blue-500 rounded-md'
                placeholder='City'
                type='text'
                value={formData.city}
                required
              />
            </div>
          </div>
          <div className='flex justify-between items-start mb-5'>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>State</p>
              <input
                name='state'
                onChange={handleInputChange}
                className='m-2 p-2 border-2 border-blue-500 rounded-md'
                placeholder='State'
                type='text'
                value={formData.state}
                required
              />
            </div>
            <div className='flex flex-col w-[45%]'>
              <p className='m-2'>Zipcode</p>
              <input
                name='zipcode'
                onChange={handleInputChange}
                className='m-2 p-2  border-2 border-blue-500 rounded-md'
                placeholder='Zipcode'
                type='text'
                value={formData.zipcode}
                required
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <button className='bg-blue-500 p-2 rounded-md' onClick={prevPage}>Previous</button>
            <button className='bg-blue-500 p-2 rounded-md' onClick={nextPage}>Next</button>
          </div>
        </div>


        <div className={`${page !== 3 && 'hidden'}`}>
          <div className="text-sm m-2 p-4">
            <h1 className='text-2xl text-center'>Please sign the contract below</h1>
          </div>
          <hr className="border-t border-gray-300" />
          <div className='mt-5 mb-5'>
            <>
              <div className='flex justify-between'>
                <img src="/public/pdf1.png" className='w-[130px] md:w-[170px] object-contain' alt="" />
                <img src="/public/pdf2.png" className='w-[110px] md:w-[130px] object-contain' alt="" />
              </div>
              <div className='mt-5'>
                <p><span className='font-semibold'>Name</span> : {formData.firstName} {formData.lastName}</p>
                <p><span className='font-semibold'>Email</span> : {formData.email}</p>
                <p><span className='font-semibold'>EIN</span> : {formData.ein}</p>
              </div>
              <div className='mt-5'>
                Re:	In re Payment Card Interchange Fee and Merchant Discount Antitrust Litigation, MDL 1720
              </div>
              <div className='mt-3'>
                <p className=''>Dear, {formData.firstName},</p>
                <p className='indent-14 mt-3'>
                  This Retainer Agreement will memorialize the retention of Criden & Love, P.A.
                  and Stabile Law Firm, LLC (the “Firms”) to represent :______________________________
                  (“Client”) in connection with any claim Client may have as a member of the Rule 23(b)(3)
                  Settlement Class pursuant to any settlement or court award in the above-referenced action,
                  which is currently pending in the United States District Court for the Eastern District
                  of New York.
                </p>
                <p className='indent-14 mt-3'>
                  Client represents that it has received Notice of this settlement or that Client
                  is a member of the Rule 23(b)(3) Settlement Class consisting of: All persons, businesses,
                  and other entities that have accepted any Visa-Branded Cards and/or Mastercard-Branded Cards
                  in the United States at any time from January 1, 2004 to January 25, 2019.
                </p>
                <p className='indent-14 mt-3'>
                  Client further represents that it is not a “Dismissed Plaintiff,” a merchant that previously
                  settled and dismissed their own lawsuit, as listed on Appendix B to the Class Settlement
                  Agreement, which is available <a href="https://www.paymentcardsettlement.com/Content/Documents/New%20Docs/Dkt%20No.%207257-2_Settlement%20Agreement.pdf" target='_blank' rel="noreferrer" className='text-blue-500 underline'>here</a>.
                  Client consents to the verification of its claim by the Firms. In the event that Client
                  does not have a claim, the retention of the Firms is null and void. Client agrees to
                  keep the terms of this engagement confidential.________________________________________
                </p>
                <p className='mt-3 font-bold text-center underline'>Scope of Retention</p>
                <p className='indent-14 mt-1'>
                  The Firms expect to render the following services for the Client: (1) conferences with
                  Client and other relevant representatives designated; (2) preparation and submission
                  of all claim forms and any documentation required to substantiate Client’s claim; and
                  (3) communicating, as necessary, with the Claims Administrator as to Client’s claim
                  and any calculation of Client’s claim. Client agrees to promptly provide the Firms with
                  all documentation needed to substantiate Client’s claim pursuant to the court-approved
                  claim form. The Firms will <span className='font-bold underline italic'>not</span> provide any legal advice and/or opinions
                </p>
                <p className='indent-14 mt-3'>
                  The Firms shall consult with and obtain Client’s approval regarding any major decisions
                  arising in connection with the above-referenced work or with respect to any of the services
                  rendered by the Firms pursuant to this Agreement.
                </p>
                <p className='mt-3 font-bold text-center underline'>Fees for Services Rendered</p>
                <p className='indent-14 mt-1'>
                  In consideration of the services rendered, and to be rendered, pursuant to this Agreement,
                  Client has agreed to pay as fees to the Firms twenty-five percent (25%) of any recovery
                  Client obtains from the Settlement Fund. All reasonable costs and out-of-pocket expenses
                  necessary to prepare and submit Client’s claim, and to provide other services to be rendered
                  pursuant to this Agreement as outlined above, will be advanced by the Firms, 100% of
                  which will be reimbursed to the Firms solely out of any recovery after application of
                  the twenty-five percent contingency fee. The Firms’ engagement will conclude when the
                  Claims Administrator makes payment. The Firms assume no responsibility for any associated
                  allocation, distribution, tax or any post-payment issue(s).
                </p>
                <p className='mt-3 font-bold text-center underline'>Dispute Resolution</p>
                <p className='indent-14 mt-1'>
                  Although we do not expect any disputes to arise between the Client and the Firms,
                  if a dispute does in fact arise, all parties agree that the exclusive venue for
                  any action arising under or in any way related to this Agreement shall be Miami-Dade County,
                  Florida.  The parties expressly waive any objection or defense that such venue is an
                  inconvenient or otherwise improper forum for any dispute arising under or in any way related
                  to this Agreement.  The parties also waive any and all objections to personal jurisdiction
                  as they may relate to the enforcement of the terms of this Agreement in Miami-Dade County,
                  Florida.
                </p>
                <p className='mt-3 font-bold text-center underline'>Law Governing this Agreement</p>
                <p className='indent-14 mt-1'>
                  This Agreement shall be interpreted and enforced pursuant to the laws of the State of Florida,
                  both substantive and procedural, regardless of choice of law principles.
                </p>
                <p className='mt-3 font-bold text-center underline'>Entire Understanding Between Parties</p>
                <p className='indent-14 mt-1'>
                  This Agreement represents the entire Agreement between the parties with respect to the
                  engagement of the Firm for the Client in this matter.  The parties acknowledge that they
                  have not relied upon any representations made by another party or other person as an inducement
                  to enter into this Agreement.  Client acknowledges that the Firms have made no guarantee as
                  to the outcome of this matter or the amount recoverable in connection with Client’s claim.
                  Further, the parties acknowledge that no representations have been made, other than those
                  expressly set forth in this Agreement.  No amendment, waiver or modification of any other
                  terms and conditions set forth in this Agreement shall be effective unless in writing,
                  signed by both parties.
                </p>
                <p className='indent-14 mt-3'>
                  If this Agreement accurately reflects the terms of our representation of Client in this matter,
                  please sign and date in the space provided below and e-mail an executed copy of the Agreement
                  to the Firms.  This Agreement may be signed in one or more counterparts, all of which shall
                  be deemed original.
                </p>
                <p className='indent-14 mt-3'>
                  We look forward to working with you in this matter and thank you again for your confidence
                  and trust
                </p>
              </div>
              <div className='flex justify-end mt-10'>
                <div className='font-semibold'>
                  <p>Very truly yours,</p>
                  <div className='mt-5'>
                    <p>Michael E. Criden, Esq.</p>
                    <p>CRIDEN & LOVE, P.A.</p>
                  </div>
                  <div className='mt-5'>
                    <p>Steve Stabile, Esq.</p>
                    <p>STABILE LAW FIRM, LLC</p>
                  </div>
                </div>
              </div>
            </>
            <div className='block [@media(min-width:500px)]:flex justify-between items-end mt-10'>
              <div className='block [@media(min-width:500px)]:flex items-end gap-5'>
                <p className='font-bold'>By: </p>
                <div className='flex flex-col items-start'>
                  <p>please save the sign before moving forward</p>
                  <div className='border border-zinc-400 mt-2 box-border'>
                    <SignatureCanvas penColor='black'

                      canvasProps={{ width: 250, height: 130, className: 'signature' }}
                      ref={signatureRef}
                    />
                  </div>
                  <div className='mt-2 flex gap-3'>
                    <button onClick={clearSign} className='bg-gray-200 font-semibold rounded-md px-3'>clear</button>
                    <button onClick={saveSign} className='bg-gray-200 font-semibold rounded-md px-3'>save</button>
                  </div>
                </div>
              </div>
              <div className='flex gap-5 font-bold mt-10 [@media(min-width:500px)]:mt-0'>
                <p>Date:</p>
                <p className='underline'>{getCurrentDate()}</p>
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <button className='bg-blue-500 rounded-md p-2' onClick={prevPage}>Previous</button>
            <button className='bg-blue-500 rounded-md p-2' onClick={nextPage}>Next</button>
          </div>
        </div>


        <div className={`${page !== 4 && 'hidden'}`}>
          <div className="text-sm m-2 p-4">
            <h1 className='text-2xl text-center'>Your signed contract below</h1>
          </div>
          <hr className="border-t border-gray-300" />
          <div className='mt-5 mb-5'>
            {pdfContent()}
          </div>
          <div className='flex justify-between'>
            <button className='bg-blue-500 rounded-md p-2' onClick={prevPage}>Previous</button>
            <button className='bg-blue-500 rounded-md p-2' disabled={loading} onClick={submitForm}>{loading ? <Loader height={'h-4'} width={'w-4'} /> : 'Submit'}</button>
          </div>
        </div>
      </>
    )
  };



  const submitForm = () => {
    convertToPdf()
    // fetch('http://localhost:3000/send-email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle response
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className="bg-white text-black pl-3 pr-3 pb-3 h-[70vh] overflow-y-auto">
      <Toaster />
      <div className="p-0 xl:p-10">
        <div className='text-sm mt-4'>
          {renderFormPage(currentPage)}
        </div>
      </div>
    </div>
  );
}