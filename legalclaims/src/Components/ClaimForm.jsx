import { useState } from 'react';

export default function ClaimForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Total number of form pages

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
          <div>
            <div className='m-2'>
                <p className='m-2'>Did you have a business at any time between January 1, 2004 - January 25, 2019 that accepted Visa or Mastercard?</p>
                <input
                className='m-2'
                type="radio"
                value="Yes"
                />
                Yes
                <input 
                className='m-2'
                type="radio"
                value="No"
                />
                No
            </div>
            <div className='m-2 flex justify-between mb-4'>
                <div>
                    <p className='m-2'>What is your first name?</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    type='text'
                    />
                </div>
                <div>
                    <p className='m-2'>Select your company type:</p>
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
            </div>
            <div className='m-2 flex justify-between'>
                <div>
                    <p className='m-2'>What is your relationship with the business? (Title)</p>
                    <select
                   className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    >
                        <option value=''>Please Select</option>
                        <option value=''>Director</option>
                        <option value='owner'>Officer</option>
                        <option value='employee'>Owner</option>
                        <option value='other'>Shareholder</option>
                        <option value='other'>Manager</option>
                    </select>
                </div>
                <div className='w-1/2'>
                    <p className='m-2'>Business Tax Identification Number (EIN) for incorporated businesses or Social Security Number (SSN) for Sole Proprietorships - MUST BE 9 DIGITS</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    type='text'/>
                </div>
            </div>
            <div className='m-2 flex justify-between'>
                <div>
                    <p className='m-2'>Was/is your business subject to a franchise agreement?*</p>
                    <input
                    type='radio'
                    className='m-2 p-2'
                    />
                    Yes
                    <input
                    type='radio'
                    className='m-2 p-2'
                    />
                    No
    
                </div>
                <div className='w-1/2'>
                    <p className='m-2'>Estimated annual credit card sales</p>
                    <input
                    className='m-2 p-2 border border-2 border-blue-500 rounded-md'
                    type='text'/>
                </div>
            </div>
            
            <button onClick={nextPage}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            {/* Page 2 content */}
            <h1>Page 2</h1>
            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            {/* Page 3 content */}
            <h1>Page 3</h1>
            <button onClick={prevPage}>Previous</button>
            <button onClick={submitForm}>Submit</button>
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
      <div className="p-4">
        <div className="text-sm">
          <h1>Please answer the following questions to help us determine if you are eligible to make a claim for compensation:</h1>
        </div>
        <div>
          {/* Render current form page */}
          {renderFormPage(currentPage)}
        </div>
      </div>
    </div>
  );
}