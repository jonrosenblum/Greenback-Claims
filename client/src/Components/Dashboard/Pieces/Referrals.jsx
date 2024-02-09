import { useEffect, useState } from "react";
import Card from "../../Card";
import BodyHeader from "./BodyHeader";
import RecordNoTFound from "./RecordNoTFound";
import useAuthStore from "../../../zustand/authStore";
import { getFormSubmissions } from "../../../Utils/ApiUtils";

function Referrals() {
  const { user } = useAuthStore();
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    fetchFormSubmissions(user.referral_id)
  }, [user.referral_id]);

  const fetchFormSubmissions=async (referralID)=>{
    try {
      const response = await fetch(getFormSubmissions + referralID, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }    
      });
  
      if (!response.ok) {
        throw new Error();
      }
  
      const data = await response.json();
      console.log(data.matchingSubmissions);
      setFormDataList(data.matchingSubmissions)
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <>
      <BodyHeader
        title="Referrals"
        description="If your referral link has been used, form submissions will appear here."
      >
        <Card>
          {formDataList.length == 0 && (
            <RecordNoTFound message="No records found." />
          )}
          {formDataList.length > 0 && (
            <div className="flex-auto px-0 pb-2 pt-0">
              <div className="overflow-x-auto p-0">
                <table className="mb-0 w-full items-center border-gray-200 align-top text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Name
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-center align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Business
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-center align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Phone
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-center align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {formDataList && formDataList.map((element, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <div className="flex px-4 py-1">
                          <p className="mb-0 text-sm font-semibold leading-tight">
                            {element.submission_name}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 text-center align-middle shadow-transparent">
                        <span className="text-sm font-semibold leading-tight">
                          {element.submission_business}
                        </span>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 text-center align-middle shadow-transparent">
                        <span className="text-sm font-semibold leading-tight">
                        {element.submission_phone}
                        </span>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 text-center align-middle shadow-transparent">
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
        </Card>
      </BodyHeader>
    </>
  );
}

export default Referrals;
