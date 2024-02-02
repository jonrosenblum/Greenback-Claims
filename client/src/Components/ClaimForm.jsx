import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import jsPDF from 'jspdf';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { saveFormData, updateReferralFrequency } from '../Utils/ApiUtils';

const email_api_test = import.meta.env.VITE_APP_API+'send-email'
console.log({email_api_test})

ClaimForm.propTypes = {
  onEmailSent: PropTypes.func.isRequired,
};

export default function ClaimForm({ onEmailSent }) {
  const [referralID, setReferralID] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the 'ref' parameter
    const refParam = urlParams.get('ref');
    console.log(refParam);
    // if(refParam){
    //   updateReferralFrequencyFunction(refParam)
    // }
    setReferralID(refParam);
  }, []);
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
    referralDetails: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const [errors, setErrors] = useState({
    // Initialize errors state with keys matching your form fields
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

  const validateFirstFormStep = () => {
    // Validation logic goes here
    let formIsValid = true;
    const newErrors = { ...errors };

    // Example validation for 'businessName'
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business Name is required';
      formIsValid = false;
    } else {
      newErrors.businessName = '';
    }

    if (!formData.businessAcceptance.trim()) {
      newErrors.businessAcceptance = 'Business Acceptance is required';
      formIsValid = false;
    } else {
      newErrors.businessAcceptance = '';
    }

    if (!formData.companyType.trim()) {
      newErrors.companyType = 'Company Type is required';
      formIsValid = false;
    } else {
      newErrors.companyType = '';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      formIsValid = false;
    } else {
      newErrors.title = '';
    }

    if (!formData.ein.trim()) {
      newErrors.ein = 'EIN is required';
      formIsValid = false;
    } else if (!/^\d{2}-\d{7}$|^\d{3}-\d{2}-\d{4}$/.test(formData.ein.trim())) {
      newErrors.ein = 'EIN or SSN must be a valid number with format XX-XXXXXXX or XXX-XX-XXXX';
      formIsValid = false;
    } else {
      newErrors.ein = ''; // Clear the error if the input is valid
    }

    if (!formData.annualSales.trim()) {
      newErrors.annualSales = 'Annual Sales is required';
      formIsValid = false;
    } else if (!/^[,\d]+$/.test(formData.annualSales.trim())) {
      newErrors.annualSales = 'Annual Sales must be a valid number';
      formIsValid = false;
    } else {
      newErrors.annualSales = '';
    }


    if (!formData.franchiseAgreement.trim()) {
      newErrors.franchiseAgreement = 'Franchise Agreement is required';
      formIsValid = false;
    } else {
      newErrors.franchiseAgreement = '';
    }

    // Add more validation for other fields...

    setErrors(newErrors);
    return formIsValid;
  };

  const validateSecondFormStep = () => {
    // Validation logic goes here
    let formIsValid = true;
    const newErrors = { ...errors };

    // Example validation for 'businessName'
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      formIsValid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      formIsValid = false;
    } else {
      newErrors.lastName = '';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email.trim())
    ) {
      newErrors.email = 'Enter a valid email address';
      formIsValid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      formIsValid = false;
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone must be a valid number';
      formIsValid = false;
    } else if (formData.phone.trim().length !== 10) {
      newErrors.phone = 'Phone must have exactly 10 digits';
      formIsValid = false;
    } else {
      newErrors.phone = '';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      formIsValid = false;
    } else {
      newErrors.address = '';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      formIsValid = false;
    }  else {
      newErrors.city = '';
    }


    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      formIsValid = false;
    } else {
      newErrors.state = '';
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = 'Zip Code is required';
      formIsValid = false;
    } else {
      newErrors.zipcode = '';
    }

    setErrors(newErrors);
    return formIsValid;
  };


  const updateReferralFrequencyFunction= async (referralID)=>{
    const responseData = await fetch(updateReferralFrequency+referralID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!responseData.ok) {
      throw new Error();
    }
    console.log(await responseData.json())

  }
  
  // Handle input change
  const handleSalesInputChange = (e) => {
    const { name, value } = e.target;

    // Format currency and update form data
    const formattedValue = formatCurrency(value);
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Format as currency using regex
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
  };

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
        <div className='p-0 w-full text-[10px] text-justify' id='pdf_to_be'>
          <div className='flex justify-between'>
            <img src="/public/pdf1.png" className='w-[130px] object-contain' alt="" />
            <img src="/public/pdf2.png" className='w-[90px] object-contain' alt="" />
          </div>
          <div className='text-center'>Date: {new Date().toLocaleDateString()}</div>
          <div className='mt-1'>
          <p><span className='font-semibold italic capitalize'>Via Email</span> :  {formData.email}</p>
            <p><span className='font-semibold'>Name</span> : {formData.firstName} {formData.lastName}</p>
            <p className=''><span className='font-semibold '>Address</span> : {formData.address}, {formData.city}, {formData.state} {formData.zipcode}</p>
          </div>
          <div className='mt-2 ml-[40px]'>
          <span className='font-semibold'>Re:</span>	In re Payment Card Interchange Fee and Merchant Discount Antitrust Litigation, MDL 1720
          </div>
          <div className='mt-1'>
            <p className=''>Dear <span className='underline'>{formData.firstName}</span>,</p>
            <p className='indent-14 mt-1'>
              This Retainer Agreement will memorialize the retention of Criden & Love, P.A.
              and Stabile Law Firm, LLC (the “Firms”) to represent: <span className='underline'>{formData.businessName}</span> (“Client”) 
              in connection with any claim Client may have as a member of the Rule 23(b)(3)
              Settlement Class pursuant to any settlement or court award in the above-referenced action,
              which is currently pending in the United States District Court for the Eastern District
              of New York.<sup>[1]</sup>
            </p>
            <p className='indent-14 mt-1'>
              Client represents that it has received Notice of this settlement or that Client
              is a member of the Rule 23(b)(3) Settlement Class consisting of: All persons, businesses,
              and other entities that have accepted any Visa-Branded Cards and/or Mastercard-Branded Cards
              in the United States at any time from January 1, 2004 to January 25, 2019.
            </p>
            <p className='indent-14 mt-1'>
              Client further represents that it is not a “Dismissed Plaintiff,” a merchant that previously
              settled and dismissed their own lawsuit, as listed on Appendix B to the Class Settlement
              Agreement, which is available <a href="https://www.paymentcardsettlement.com/Content/Documents/New%20Docs/Dkt%20No.%207257-2_Settlement%20Agreement.pdf" target='_blank' rel="noreferrer" className='text-blue-500 underline'>here</a>.
              Client consents to the verification of its claim by the Firms. In the event that Client
              does not have a claim, the retention of the Firms is null and void. Client agrees to
              keep the terms of this engagement confidential.
            </p>
            <p className='mt-1 font-bold text-center underline'>Scope of Retention</p>
            <p className='indent-14 mt-1 mb-2'>
              The Firms expect to render the following services for the Client: (1) conferences with
              Client and other relevant representatives designated; (2) preparation and submission
              of all claim forms and any documentation required to substantiate Client’s claim; and
              (3) communicating, as necessary, with the Claims Administrator as to Client’s claim
              and any calculation of Client’s claim. Client agrees to promptly provide the Firms with
              all documentation needed to substantiate Client’s claim pursuant to the court-approved
              claim form. The Firms will <span className='font-bold underline italic'>not</span> provide any legal advice and/or opinions.
            </p>
            <div>

            <hr className='w-32 mt-8'/>
            <p className='text-[8px] px-2'>
              <sup>[1] It is not necessary for class members to sign up for a third-party service to participate in any monetary relief, as no-cost assistance is available from the Class Administrator and Class Counsel during the claims-filing period. For more information, visit <a href="https://www.paymentcardsettlement.com/en" target='_blank' rel="noreferrer" className='text-blue-500 underline'>Payment Card Settlement | Official Court-Authorized Website - Home.</a>.</sup>
            </p>
            </div>
            <br></br>
            <p className='indent-14 mt-12'>
              The Firms shall consult with and obtain Client’s approval regarding any major decisions
              arising in connection with the above-referenced work or with respect to any of the services
              rendered by the Firms pursuant to this Agreement.
            </p>
            <p className='mt-3 font-bold text-center underline'>Fees for Services Rendered</p>
            <p className='indent-14 mt-1'>
              In consideration of the services rendered, and to be rendered, pursuant to this Agreement,
              Client has agreed to pay as fees to the Firms thirty percent (30%) of any recovery
              Client obtains from the Settlement Fund. All reasonable costs and out-of-pocket expenses
              necessary to prepare and submit Client’s claim, and to provide other services to be rendered
              pursuant to this Agreement as outlined above, will be advanced by the Firms, 100% of
              which will be reimbursed to the Firms solely out of any recovery after application of
              the thirty-three percent contingency fee. The Firms’ engagement will conclude when the
              Claims Administrator makes payment. The Firms assume no responsibility for any associated
              allocation, distribution, tax or any post-payment issue(s).
            </p>
            <p className='mt-3 font-bold text-center underline'>Dispute Resolution</p>
            <p className='indent-14 mt-1'>
              Although we do not expect any disputes to arise between the Client and the Firms,
              if a dispute does in fact arise, all parties agree that the exclusive venue for
              any action arising under or in any way related to this Agreement shall be Miami-Dade County,
              Florida. The parties expressly waive any objection or defense that such venue is an
              inconvenient or otherwise improper forum for any dispute arising under or in any way related
              to this Agreement. The parties also waive any and all objections to personal jurisdiction
              as they may relate to the enforcement of the terms of this Agreement in Miami-Dade County,
              Florida.
            </p>
            <p className='mt-3 font-bold text-center underline'>Law Governing this Agreement</p>
            <p className='indent-14 mt-1'>
              This Agreement shall be interpreted and enforced pursuant to the laws of the State of Florida,
              both substantive and procedural, regardless of choice of law principles.
            </p>
            <p className='mt-3 font-bold text-center underline'>Entire Understanding Between Parties</p>
            <p className='indent-14 mt-1  mb-4'>
              This Agreement represents the entire Agreement between the parties with respect to the
              engagement of the Firm for the Client in this matter. The parties acknowledge that they
              have not relied upon any representations made by another party or other person as an inducement
              to enter into this Agreement. Client acknowledges that the Firms have made no guarantee as
              to the outcome of this matter or the amount recoverable in connection with Client’s claim.
              Further, the parties acknowledge that no representations have been made, other than those
              expressly set forth in this Agreement.No amendment, waiver or modification of any other
              terms and conditions set forth in this Agreement shall be effective unless in writing,
              signed by both parties.
            </p>
            <br></br>
            <p className='indent-14 mt-20'>
              If this Agreement accurately reflects the terms of our representation of Client in this matter,
              please sign and date in the space provided below and e-mail an executed copy of the Agreement
              to the Firms. This Agreement may be signed in one or more counterparts, all of which shall
              be deemed original.
            </p>
            <p className='indent-14 mt-2'>
              We look forward to working with you in this matter and thank you again for your confidence
              and trust.
            </p>
          </div>
          <div className='flex justify-end mt-4'>
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
            <div className='flex flex-col'>
              <div><p  className='mb-3 font-bold text-center underline'>AGREED AND ACCEPTED:</p></div>
            <div className='flex items-end gap-5'>
              <p className='font-bold'>By: </p>
              <div className=''>
                <img src={url} alt="" className='w-[100px] object-contain' />
              </div>
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
        let url = doc.output('blob')
        if(referralID){
          formData.referralDetails = referralID
        }
        const formDataToSend = new FormData();
        formDataToSend.append('pdf', url);
        formDataToSend.append('formData', JSON.stringify(formData));

        const email_api = import.meta.env.VITE_APP_API+'send-email'
        console.log({email_api})
        fetch(email_api, {
        // fetch('https://api.greenbackclaims.com/send-email', {
        // fetch('http://localhost:3000/send-email', {
          method: 'POST',
          body: formDataToSend,
        })
          .then((response) => response.json())
          .then(async (data) => {
            // Handle response
            if(data.status == 200){
              if(referralID){
                  const response = await fetch(saveFormData, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName:formData.firstName, lastName:formData.lastName, businessName:formData.businessName, phone:formData.phone, address:formData.address+' '+formData.city+', '+ formData.state+', '+formData.zipcode, referralID }),
                  });
            
                  if (!response.ok) {
                    throw new Error();
                  }
                  const data = await response.json();
                  console.log(data)
              }
              toast.success(data.message, {
                position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
                style: {
                  backgroundColor: '#d9d9d9',
                  padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                  fontSize: '14px',
                  fontWeight: 'bold'
                },
              });
              onEmailSent();
            } 
            if (data.status == 500){
              toast.error(data.message, {
                position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
                style: {
                  backgroundColor: '#d9d9d9',
                  padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                  fontSize: '14px',
                  fontWeight: 'bold'
                },
              });
            }

          })
          .catch((error) => {
            // Handle error
            toast.error(error.message, {
              position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
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
      },
      x: 10,
      y: 10
    });

  };

  const nextPage = () => {
    if (currentPage === 1 && !validateFirstFormStep()) return
    if(currentPage ===2  && !validateSecondFormStep()) return
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
    return (
      <>
        <div className={`relative ${page !== 1 && 'hidden'}`}>
          <div className="text-sm font-medium">
            <h1>Please answer the following questions to help us determine if you are eligible to make a claim for compensation:</h1>

          </div>
          <hr className="border-t border-gray-300 mt-5" />
         
          <div className="flex md:flex-row py-4 flex-col gap-6 mt-6">
                      <div className="w-full sm:w-1/2">
              <p className='max-w-full sm:max-w-xs ml-2'>Did you have a business at any time between January 1, 2004 - January 25, 2019 that accepted Visa or Mastercard?</p>
              <p className='text-red-500 text-xs  ml-2'>{errors.businessAcceptance}</p>
                      
                      </div>
                      <div className="w-full sm:w-1/2 flex flex-row sm:flex-col sm:gap-1 gap-3">
                        <div className="flex gap-1 items-center">
                      <input onClick={()=>errors.businessAcceptance = ''}
                        className='mt-1 w-6 h-6'
                        type="radio"
                        name="businessAcceptance"
                        value="Yes"
                        onChange={handleInputChange}
                        required
                      />
                      <span className='text-xl'>Yes</span>
                      </div>
                      <div className="flex gap-1 items-center">
                      <input onClick={()=>errors.businessAcceptance = ''}
                        className='mt-1 w-6 h-6'
                        type="radio"
                        name="businessAcceptance"
                        value="No"
                        onChange={handleInputChange}
                        required
                      />
                      <span className='text-xl'>No</span>
                      </div>
                      </div>
                    </div>

          <div className='flex flex-col sm:flex-row justify-between items-start mt-2'>
          
            <div className='flex flex-col w-full sm:w-1/2 '>
              <p className='mx-2 my-1'>What is / was the legal name of the business?</p>
              <input
                className='mx-2 p-2  border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500'
                placeholder='Enter business name'
                type='text'
                name='businessName'
                onInput={()=>errors.businessName = ''}
                onChange={handleInputChange}
                required
                value={formData.businessName}
              />
              <p className='text-red-500 text-xs  ml-2'>{errors.businessName}</p>
            </div>
            <div className='flex flex-col w-full sm:w-1/2'>
            <p className='m-1'>What is / was your relationship with the business? (Title)</p>
              <select
                className='mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500'
                name='title'
                onInput={()=>errors.title = ''}
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
              <p className='text-red-500 text-xs  ml-2'>{errors.title}</p>
            </div>

          </div>

          <div className='flex flex-col sm:flex-row justify-between m-1'>
            <div className='flex flex-col mt-2 w-full sm:w-1/2'>
              <p className='m-1'>Select your company type:</p>
              <select
                className='mx-2 p-2  border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500'
                name='companyType'
                onInput={()=>errors.companyType = ''}
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
              <p className='text-red-500 text-xs  ml-2'>{errors.companyType}</p>
            </div>

            <div className='flex flex-col relative mt-2 w-full sm:w-1/2 m-1'>
                <p className='m-1'>Estimated annual credit card sales</p>
                <input
                  className='mx-2 p-2 pl-4 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500 '
                  placeholder=''
                  required
                  type='text'
                  name='annualSales'
                  onInput={()=>errors.annualSales = ''}
                  value={formData.annualSales}
                  onChange={handleSalesInputChange}
                  />
                <p className='absolute top-[40px] left-4 font-medium'>$</p>
                  <p className='text-red-500 text-xs  ml-2'>{errors.annualSales}</p>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-start m-1'>
            <div className='flex flex-col gap-4 w-full sm:w-1/2'>
              <div>
                <p className='m-2'>Is / was  your business subject to a franchise agreement?*</p>
                <p className='text-red-500 text-xs  ml-2'>{errors.franchiseAgreement}</p>
                <div className='flex flex-row sm:flex-col sm:gap-1 gap-3 mb-4 sm:mb-0'>                  
                <div className={`flex gap-1 mt-0 ${errors.franchiseAgreement?'sm:mt-[10px]':'sm:mt-[25px]'} items-center`}>
                <input
                  type='radio'
                  name='franchiseAgreement'
                  onClick={()=>errors.franchiseAgreement = ''}
                  onChange={handleInputChange}
                  value='Yes'
                  required
                  className='m-1 w-6 h-6'
                />
                <span className='text-xl'>Yes</span>
                </div>
                <div className="flex gap-1 items-center">
                <input
                  type='radio'
                  name='franchiseAgreement'
                  onClick={()=>errors.franchiseAgreement = ''}
                  onChange={handleInputChange}                  
                  required
                  value='No'
                  className='m-1 w-6 h-6'
                />
                <span className='text-xl'>No</span>
                </div>
                </div>

              </div>
            </div>
            <div className='flex flex-col w-full sm:w-1/2'>
              <p className='m-2'>Business Tax Identification Number (EIN) for incorporated businesses or Social Security Number (SSN) for Sole Proprietorships - MUST BE 9 DIGITS</p>
              <input
                required
                name='ein'
                onInput={()=>errors.ein = ''}
                onChange={handleInputChange}
                value={formData.ein}
                placeholder='EIN or SSN'
                className='mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500'
                type='text' />
                <p className='text-red-500 text-xs  ml-2'>{errors.ein}</p>
            </div>
          </div>
        </div>
        <div className={`flex justify-center w-full mt-14 ${page !== 1 && 'hidden'}`}>
            <button className='bottom-0 w-full right-0 bg-green-500 p-2 rounded-md font-medium text-white' onClick={nextPage}>Next</button>
          </div>

        <div className={`pl-3 pr-3 pb-3 ${page !== 2 && 'hidden'}`}>
      <div className="text-sm ">
        <h1 className="text-xl">Business Information</h1>
      </div>

      <hr className="border-t border-gray-300 mb-6 sm:mb-10" />

      <div className="flex flex-col md:flex-row justify-between items-start mt-3">
        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2">First name</p>
          <input
            name="firstName"
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="John"
            type="text"
            value={formData.firstName}
            onInput={()=> errors.firstName = ''}
            onChange={handleInputChange}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.firstName}</p>
        </div>

        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2 ">Last name</p>
          <input
            name="lastName"
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="Smith"
            onInput={()=> errors.lastName = ''}
            onChange={handleInputChange}
            type="text"
            value={formData.lastName}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.lastName}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start  mt-2">
        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2">Email</p>
          <input
            name="email"
            onChange={handleInputChange}
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="johnsmith@gmail.com"
            type="email"
            onInput={()=> errors.email = ''}
            value={formData.email}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.email}</p>
        </div>

        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2">Phone</p>
          <input
            name="phone"
            onChange={handleInputChange}
            onInput={()=> errors.phone = ''}

            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="212-456-7890"
            type="tel"
            value={formData.phone}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.phone}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mt-2">
        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2">Address Line 1</p>
          <input
            name="address"
            onChange={handleInputChange}
            onInput={()=> errors.address = ''}
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="32, My Street, Kingston, New York 12401"
            type="text"
            value={formData.address}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.address}</p>
        </div>
        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2">City</p>
          <input
            name="city"
            onInput={()=> errors.city = ''}
            onChange={handleInputChange}
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="Kingston"
            type="text"
            value={formData.city}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.city}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start  mt-2">
        <div className="flex flex-col w-full md:w-3/5">
          <p className="m-2">State</p>
          <input
            name="state"
            onInput={()=> errors.state = ''}
            onChange={handleInputChange}
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="New York"
            type="text"
            value={formData.state}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.state}</p>
        </div>
        <div className="flex flex-col w-full md:w-3/5 ">
          <p className="m-2">Zipcode</p>
          <input
            name="zipcode"
            onInput={()=> errors.zipcode = ''}
            onChange={handleInputChange}
            className="mx-2 p-2 border-2 border-gray-400/80 rounded-md outline-none focus-visible:border-blue-500"
            placeholder="12401"
            type="text"
            value={formData.zipcode}
            required
          />
          <p className='text-red-500 text-xs  ml-2'>{errors.zipcode}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-10 sm:mt-20">
        <button className="bg-blue-500 w-full sm:w-1/2 p-2 rounded-md text-white font-medium" onClick={prevPage}>
          Previous
        </button>
        <button className="bg-green-500 w-full sm:w-1/2 p-2 rounded-md text-white font-medium" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>


        <div className={`${page !== 3 && 'hidden'} text-justify`}>
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
          <div className='text-center'>Date: {new Date().toLocaleDateString()}</div>
          <div className='mt-1'>
          <p><span className='font-semibold italic capitalize'>Via Email</span> :  {formData.email}</p>
            <p><span className='font-semibold'>Name</span> : {formData.firstName} {formData.lastName}</p>
            <p className=''><span className='font-semibold '>Address</span> : {formData.address}, {formData.city}, {formData.state} {formData.zipcode}</p>
          </div>
          <div className='mt-2 ml-[40px]'>
          <span className='font-semibold'>Re:</span>	In re Payment Card Interchange Fee and Merchant Discount Antitrust Litigation, MDL 1720
          </div>
              <div className='mt-3'>
                <p className=''>Dear {formData.firstName},</p>
                <p className='indent-14 mt-3'>
                  This Retainer Agreement will memorialize the retention of Criden & Love, P.A.
                  and Stabile Law Firm, LLC (the “Firms”) to represent : <span className='underline'>{formData.businessName}</span>  (“Client”) in connection with any claim Client may have as a member of the Rule 23(b)(3)
                  Settlement Class pursuant to any settlement or court award in the above-referenced action,
                  which is currently pending in the United States District Court for the Eastern District
                  of New York.<sup>[1]</sup>
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
                  keep the terms of this engagement confidential.
                </p>
                <p className='mt-3 font-bold text-center underline'>Scope of Retention</p>
                <p className='indent-14 mt-1'>
                  The Firms expect to render the following services for the Client: (1) conferences with
                  Client and other relevant representatives designated; (2) preparation and submission
                  of all claim forms and any documentation required to substantiate Client’s claim; and
                  (3) communicating, as necessary, with the Claims Administrator as to Client’s claim
                  and any calculation of Client’s claim. Client agrees to promptly provide the Firms with
                  all documentation needed to substantiate Client’s claim pursuant to the court-approved
                  claim form. The Firms will <span className='font-bold underline italic'>not</span> provide any legal advice and/or opinions.
                </p>
                <div>
                <hr className='w-32 mt-4'/>
            <p className='text-xs px-2 mt-2'>
              <sup>[1] It is not necessary for class members to sign up for a third-party service to participate in any monetary relief, as no-cost assistance is available from the Class Administrator and Class Counsel during the claims-filing period. For more information, visit <a href="https://www.paymentcardsettlement.com/en" target='_blank' rel="noreferrer" className='text-blue-500 underline'>Payment Card Settlement | Official Court-Authorized Website - Home.</a>.</sup>
            </p>
                </div>
                <p className='indent-14 mt-3'>
                  The Firms shall consult with and obtain Client’s approval regarding any major decisions
                  arising in connection with the above-referenced work or with respect to any of the services
                  rendered by the Firms pursuant to this Agreement.
                </p>
                <p className='mt-3 font-bold text-center underline'>Fees for Services Rendered</p>
                <p className='indent-14 mt-1'>
                  In consideration of the services rendered, and to be rendered, pursuant to this Agreement,
                  Client has agreed to pay as fees to the Firms thirty percent (30%) of any recovery
                  Client obtains from the Settlement Fund. All reasonable costs and out-of-pocket expenses
                  necessary to prepare and submit Client’s claim, and to provide other services to be rendered
                  pursuant to this Agreement as outlined above, will be advanced by the Firms, 100% of
                  which will be reimbursed to the Firms solely out of any recovery after application of
                  the thirty-three percent contingency fee. The Firms’ engagement will conclude when the
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
                  engagement of the Firm for the Client in this matter. The parties acknowledge that they
                  have not relied upon any representations made by another party or other person as an inducement
                  to enter into this Agreement. Client acknowledges that the Firms have made no guarantee as
                  to the outcome of this matter or the amount recoverable in connection with Client’s claim.
                  Further, the parties acknowledge that no representations have been made, other than those
                  expressly set forth in this Agreement. No amendment, waiver or modification of any other
                  terms and conditions set forth in this Agreement shall be effective unless in writing,
                  signed by both parties.
                </p>
                <p className='indent-14 mt-3'>
                  If this Agreement accurately reflects the terms of our representation of Client in this matter,
                  please sign and date in the space provided below and e-mail an executed copy of the Agreement
                  to the Firms. This Agreement may be signed in one or more counterparts, all of which shall
                  be deemed original.
                </p>
                <p className='indent-14 mt-3'>
                  We look forward to working with you in this matter and thank you again for your confidence
                  and trust.
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
                  {url?<p className='text-green-700 font-medium'>PDF saved, Please proceed to next.</p>:<p>Please save the PDF before moving forward</p>}
                  <div className='border border-zinc-400 mt-2 box-border'>
                    <SignatureCanvas penColor='black'

                      canvasProps={{ width: 250, height: 130, className: 'signature' }}
                      ref={signatureRef}
                    />
                  </div>
                  <div className='mt-2 flex gap-3'>
                    <button onClick={clearSign} className='bg-gray-200 font-semibold rounded-md px-3'>clear</button>
                    {!url && <button onClick={saveSign} className='bg-gray-200 font-semibold rounded-md px-3'>save</button>}
                  </div>
                </div>
              </div>
              <div className='flex gap-5 font-bold mt-10 [@media(min-width:500px)]:mt-0'>
                <p>Date:</p>
                <p className='underline'>{getCurrentDate()}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-10 sm:mt-20">
        <button className="bg-blue-500 w-full sm:w-1/2 p-2 rounded-md text-white font-medium" onClick={prevPage}>
          Previous
        </button>
        <button className="bg-green-500 w-full sm:w-1/2 p-2 rounded-md text-white font-medium" onClick={nextPage}>
          Next
        </button>
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
          <div className="flex flex-col sm:flex-row gap-2 mt-10 sm:mt-20">
        <button className="bg-blue-500 w-full sm:w-1/2 p-2 rounded-md text-white font-medium" onClick={prevPage}>
          Previous
        </button>
        <button className="bg-green-500 w-full sm:w-1/2 p-2 rounded-md text-white font-medium" disabled={loading} onClick={submitForm}>
        {loading ? <Loader height={'h-4'} width={'w-4'} /> : 'Submit'}
        </button>
      </div>
         
        </div>
      </>
    )
  };



  const submitForm = () => {
    convertToPdf()
  };

  return (
    <div className="bg-white text-black pl-3 pr-3 pb-3 h-[700px] overflow-y-auto">
      <Toaster />
      <div className="p-0 xl:p-10">
        <div className='text-sm mt-4'>
          {renderFormPage(currentPage)}
        </div>
      </div>
    </div>
  );
}