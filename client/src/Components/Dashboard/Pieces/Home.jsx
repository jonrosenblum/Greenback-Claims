import { Link } from "react-router-dom";
import welcome from "./../../../../assets/images/Welcome.svg";
import useAuthStore from "../../../zustand/authStore";
import { getAllAdminFormSubmissions, getFormSubmissions, getUserAPI, updateAdminFormSubmission } from "../../../Utils/ApiUtils";
import { useEffect, useState } from "react";
import RecordNoTFound from "./RecordNoTFound";
import PopupModal from "../../PopupModal";

function Home() {
  const { user } = useAuthStore();
  const [formDetailPopUp, setFormDetailPopUp] = useState();
  const [notesFormView, setNotesFormView] = useState(false);
  const [notes, setNotes] = useState();
  
  const [formDataList, setFormDataList] = useState([]);
  const [userObj, setUserObj] = useState([]);

  useEffect(() => {
    fetchFormSubmissions(user.referral_id);
    fetchUserDetail(user.userId)
  }, [user.referral_id,user.userId]);

  const fetchFormSubmissions = async (referralID) => {
    try {
      const response = await fetch(user.role ==='user'?getFormSubmissions + referralID:getAllAdminFormSubmissions, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setFormDataList(user.role ==='user'?data.matchingSubmissions:data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetail = async (userId) => {
    try {
      const userResponse = await fetch(getUserAPI + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await userResponse.json();
      setUserObj(user.user)
    } catch (error) {
      console.log(error);
    }
  };

  const updateFromDetail = async () =>{
    formDetailPopUp.notes = notes
    try {
      const response = await fetch(updateAdminFormSubmission, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:formDetailPopUp.id, notes})
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);
      setNotesFormView(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex flex-wrap mt-6 my-2 mb-6 -mx-3">
        <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                  <div className="flex flex-col h-full">
                    <p className="pt-2 mb-1 font-semibold">
                      Start earning money now :)
                    </p>
                    <h5 className="font-bold">
                      Hi {user.username}! Welcome to your Referral Dashboard
                    </h5>
                    <p className="mb-12">
                      This dashboard is specially designed for managing your
                      referrals to claims. Share your referral link with anyone to start earning money.
                    </p>
                    {user.role == 'user' &&<Link
                      className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500"
                      to="/dashboard/profile"
                    >
                      Share Referral Link
                      <i className="fa fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                    </Link>}
                  </div>
                </div>
                <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none lg:block hidden">
                  <div className="h-full bg-gradient-to-tl from-primary to-secondary rounded-xl">
                    <div className="relative flex items-center justify-center h-full">
                      <img
                        className="relative z-20 w-52"
                        src={welcome}
                        alt="rocket"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     { user.role == 'user' ? <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3 mb-6  sm:flex-none xl:mb-0 xl:w-1/2">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-row -mx-3">
                <div className="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                      {"Form Submissions"}
                    </p>
                    <h5 className="mb-0 font-bold">
                      {userObj.form_submissions ?? 0}
                    </h5>
                  </div>
                </div>
                <div className="px-3 text-right basis-1/3">
                  <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-primary to-secondary">
                    <i className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full px-3 mb-6 md:w-1/2 sm:flex-none xl:mb-0">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl  bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-row -mx-3 items-center mb-3">
                <div className="flex-none w-2/3 max-w-full px-3">
                  <p className="mb-0 font-sans font-semibold leading-normal text-md">
                    {"Latest Referrals"}
                  </p>
                </div>
                <div className="px-3 text-right basis-1/3">
                  <Link
                    to="/dashboard/referrals"
                    className="flex px-1 h-10 gap-2 text-center justify-center rounded-lg bg-gradient-to-tl from-primary items-center to-secondary"
                  >
                    <p className="text-white text-xs md:text-[16px]">View All</p>
                  </Link>
                </div>
              </div>
              {formDataList.length == 0 && (
                <RecordNoTFound message="Record Not found. No one submit form through you referral link" />
              )}
              {formDataList.length > 0 && (
                <div className="flex-auto px-0 pb-2 pt-0">
                  <div className="overflow-x-auto p-0  no-scrollbar">
                    <table className="mb-0 w-full items-center border-gray-200 align-top text-slate-500">
                      <thead className="align-bottom">
                        <tr>
                          <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent pl-4 py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                            Name
                          </th>

                          <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent  py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                            Business Name
                          </th>
                          <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent  py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                            Phone
                          </th>
                          <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent  py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formDataList &&
                          formDataList.map((element, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap border-b bg-transparent px-3 align-middle shadow-transparent">
                                <div className="flex px-4 py-1">
                                  <p className="mb-0 text-sm font-semibold leading-tight">
                                    {element.submission_name}
                                  </p>
                                </div>
                              </td>
                              <td className="whitespace-nowrap border-b bg-transparent px-3 align-middle shadow-transparent">
                                <span className="text-sm font-semibold leading-tight">
                                  {element.submission_business}
                                </span>
                              </td>
                              <td className="whitespace-nowrap border-b bg-transparent px-3 align-middle shadow-transparent">
                                <span className="text-sm font-semibold leading-tight">
                                  {element.submission_phone}
                                </span>
                              </td>
                              <td className="whitespace-nowrap border-b bg-transparent px-3 align-middle shadow-transparent">
                                <span className="text-sm font-semibold leading-tight">
                                  {element.submission_address}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>:
      <>
      {formDetailPopUp && <PopupModal width="lg:w-[50%] md:w-[80%] w-full border"  onClose={()=>setFormDetailPopUp(null)} >
      <div className="flex flex-col justify-center mb-16 w-full">
			<div className="w-full flex flex-col gap-6 space-y-2 p-4 sm:px-10">
        <div>
      <h3 className="font-black text-gray-800 md:text-xl text-sm">{formDetailPopUp.contact_name}</h3>
				<div className="flex flex-col gap-3 lg:flex-row lg:justify-between item-center">
					<p className="text-gray-500 font-medium"> <span className="font-semibold text-gray-800">Business: &nbsp;</span> {formDetailPopUp.business_name}</p>
						<p className="text-gray-500 font-medium text-sm ml-1">
            <span className="font-semibold text-gray-800">EIN: &nbsp;</span> {formDetailPopUp.business_ein}
						</p>
					
				</div>
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between item-center">
            <p className="text-gray-500 font-medium text-sm ml-1">
            <span className="font-semibold text-gray-800">Address: &nbsp;</span>  {formDetailPopUp.contact_address}
						</p>
           {formDetailPopUp.referral && <p className="text-gray-500 font-medium text-sm ml-1">
            <span className="font-semibold text-gray-800">Referral: &nbsp;</span>  {formDetailPopUp.referral}
						</p>}
					
				</div>

        </div>
         {notesFormView ?<textarea onChange={(event)=>setNotes(event.target.value)} name="notes" id="notes" placeholder="Add notes" cols="10" rows="5" className="md:text-lg p-3 text-gray-500 text-base border">
         {formDetailPopUp.notes}
        </textarea>:
        <>
				{formDetailPopUp.notes && <p className="md:text-lg text-gray-500 text-base mt-3">{formDetailPopUp.notes}</p>}
				{!formDetailPopUp.notes &&<p className="md:text-[18px] text-gray-300 text-sm mt-3">{'No notes added yet'}</p>}
        </>
         }
				
				
        <div className="mt-10">
       <button onClick={()=>{notesFormView?updateFromDetail():setNotesFormView(true)}} className="bg-secondary hover:bg-secondary/80 text-white p-2 rounded-md" >
         {!notesFormView?(!formDetailPopUp.notes? 'Add Notes':'Update Notes'):'Save Notes'}
       </button>
        </div>
			</div>
		</div>

        </PopupModal>}
       <div className="w-full max-w-full mb-6  sm:flex-none xl:mb-0">
       <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl  bg-clip-border">
         <div className="flex-auto p-4">
           <div className="flex flex-row -mx-3 items-center mb-3">
             <div className="flex-none w-2/3 max-w-full px-3">
               <p className="mb-0 font-sans font-bold leading-normal text-md text-black">
                 {"All form submission list"}
               </p>
             </div>
            
           </div>
           {formDataList.length == 0 && (
             <RecordNoTFound message="Record Not found. No one submit form through you referral link" />
           )}
           {formDataList.length > 0 && (
             <div className="flex-auto px-0 pb-2 pt-0">
               <div className="overflow-x-auto p-0  no-scrollbar">
                 <table className="mb-0 w-full items-center border-gray-200 align-top text-slate-500">
                   <thead className="align-bottom">
                     <tr>
                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent pl-4 py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                         Name
                       </th>

                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                         Business Name
                       </th>
                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                         Business EIN
                       </th>
                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                         Phone
                       </th>
                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                         Address
                       </th>
                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                         Referral ID
                       </th>
                       <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Action
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     {formDataList &&
                       formDataList.map((element, index) => (
                         <tr key={index}>
                           <td className="whitespace-nowrap border-b bg-transparent py-3 align-middle shadow-transparent">
                             <div className="flex px-4 py-1">
                               <p className="mb-0 text-sm font-semibold leading-tight">
                                 {element.contact_name}
                               </p>
                             </div>
                           </td>
                           <td className="whitespace-nowrap border-b bg-transparent py-3 align-middle shadow-transparent">
                             <span className="text-sm font-semibold leading-tight">
                               {element.business_name}
                             </span>
                           </td>
                           <td className="whitespace-nowrap border-b bg-transparent py-3 align-middle shadow-transparent">
                             <span className="text-sm font-semibold leading-tight">
                               {element.business_ein}
                             </span>
                           </td>
                           <td className="whitespace-nowrap border-b bg-transparent py-3 align-middle shadow-transparent">
                             <span className="text-sm font-semibold leading-tight">
                               {element.contact_phone_number}
                             </span>
                           </td>
                           <td className="whitespace-nowrap border-b bg-transparent py-3 align-middle shadow-transparent">
                             <span className="text-sm font-semibold leading-tight">
                               {element.contact_address}
                             </span>
                           </td>
                           <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                             <span className="text-sm font-semibold leading-tight">
                               {element.referral}
                             </span>
                           </td>
                           <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                             <span className="text-sm font-semibold leading-tight">
                               <i onClick={()=>setFormDetailPopUp(element)} className="fa fa-eye text-[20px] cursor-pointer hover:scale-[1.2] hover:text-black" aria-hidden="true"></i>
                             </span>
                           </td>

                         </tr>
                       ))}
                   </tbody>
                 </table>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
      </>
      }

      
    </div>
  );
}

export default Home;
