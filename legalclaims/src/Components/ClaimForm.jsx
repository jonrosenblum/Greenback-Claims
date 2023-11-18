import { useState } from 'react';

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

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderFormPage = (page) => {
    switch (page) {
      case 1:
        return (
          <div className='relative'>
            <div className="text-sm m-2 p-4">
                <h1>Please answer the following questions to help us determine if you are eligible to make a claim for compensation:</h1>
                
            </div>
            <hr className="border-t border-gray-300 mt-5" />

            <div className='flex justify-between items-start m-2'>
                <div>
                    <p className='max-w-xs m-2'>Did you have a business at any time between January 1, 2004 - January 25, 2019 that accepted Visa or Mastercard?</p>
                    <input
                    className='m-2'
                    type="radio"
                    name="businessAcceptance"
                    value="Yes"
                    required
                    />
                    Yes
                    <input 
                    className='m-2'
                    type="radio"
                    name="businessAcceptance"
                    value="No"
                    required
                    />
                    No
                </div>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>What is / was the legal name of the business?</p>
                    <input
                    placeholder='Enter name'
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    type='text'
                    required
                    />
                </div>
            </div>

            <div className='flex justify-between m-2'>
                <div className='flex flex-col mt-5'>
                    <p className='m-2 w-45'>Select your company type:</p>
                    <select className='m-2 p-2 border border-2 border-blue-500 rounded-md'>
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
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>What is / was your relationship with the business? (Title)</p>
                    <select className='m-2 p-2 border border-2 border-blue-500 rounded-md'>
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
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>Business Tax Identification Number (EIN) for incorporated businesses or Social Security Number (SSN) for Sole Proprietorships - MUST BE 9 DIGITS</p>
                    <input
                    required
                    placeholder='EIN or SSN'
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    type='text'/>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <p className='m-2 w-56'>Estimated annual credit card sales</p>
                        <input
                        className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                        placeholder='$'
                        required
                        type='text'/>
                    </div>
                    <div className=''>
                        <p className='m-2 w-56'>Is / was  your business subject to a franchise agreement?*</p>
                        <input
                        type='radio'
                        name='franchiseagreement'
                        required
                        className='m-2'
                        />
                        Yes
                        <input
                        type='radio'
                        name='franchiseagreement'
                        required
                        className='m-2'
                        />
                        No
                    </div>
                </div>
            </div>
            <button className='absolute bottom-0 right-0 bg-blue-500 p-2 rounded-md' onClick={nextPage}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="text-sm m-2 p-4">
                <h1 className='text-2xl'>Client Information</h1>
            </div>
            <hr className="border-t border-gray-300" />
            <div className='flex justify-between items-start mt-5'>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>First Name</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='First'
                    type='text'
                    required
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>Last Name</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='Last'
                    type='text'
                    required
                    />
                </div>
            </div>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>Email Address</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='Email'
                    type='email'
                    required
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>Phone Number</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='Phone'
                    type='tel'
                    required
                    />
                </div>
            </div>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>Address Line 1</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='Address'
                    type='text'
                    required
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>City</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='City'
                    type='text'
                    required
                    />
                </div>
            </div>
            <div className='flex justify-between items-start mb-5'>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>State</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='State'
                    type='text'
                    required
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='m-2 w-56'>Zipcode</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    placeholder='Zipcode'
                    type='text'
                    required
                    />
                </div>
            </div>
            <div className='flex justify-between'>
              <button className='bg-blue-500 p-2 rounded-md' onClick={prevPage}>Previous</button>
              <button className='bg-blue-500 p-2 rounded-md' onClick={nextPage}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="text-sm m-2 p-4">
              <h1 className='text-2xl text-center'>Please sign the contract below</h1>
            </div>
            <hr className="border-t border-gray-300" />
            <div className='mt-5 mb-5'>
              Form will go here
            </div>
            <div className='flex justify-between'>
              <button className='bg-blue-500 rounded-md p-2' onClick={prevPage}>Previous</button>
              <button className='bg-blue-500 rounded-md p-2' onClick={nextPage}>Next</button>
            </div>
          </div>
        );
        case 4:
        return (
          <div>
            <div className="text-sm m-2 p-4">
              <h1 className='text-2xl text-center'>Please sign the contract below</h1>
            </div>
            <hr className="border-t border-gray-300" />
            <div className='mt-5 mb-5'>
              Form will go here
            </div>
            <div className='flex justify-between'>
              <button className='bg-blue-500 rounded-md p-2' onClick={prevPage}>Previous</button>
              <button className='bg-blue-500 rounded-md p-2' onClick={submitForm}>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  

  const submitForm = () => {
    // Handle form submission
  };

  return (
    <div className="bg-white text-black">
      <div className="p-10">
       
        <div className='text-sm mt-4'>
          {renderFormPage(currentPage)}
        </div>
      </div>
    </div>
  );
}