import { useState } from "react";
import Card from "../../../Components/Card";
import BodyHeader from "./BodyHeader";
import RecordNoTFound from "./RecordNoTFound";

function Referrals() {
  const [users,] = useState([]);
  return (
    <>
      <BodyHeader
        title="Referral Users"
        description="List of users which submit the form by using your referral link"
      >
        <Card>
          {users.length == 0 && (
            <RecordNoTFound message="Record Not found. No one submit form through you referral link" />
          )}
          {users.length > 0 && (
            <div className="flex-auto px-0 pb-2 pt-0">
              <div className="overflow-x-auto p-0">
                <table className="mb-0 w-full items-center border-gray-200 align-top text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        User Name
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 pl-2 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        User Email
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-center align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Business Name
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-center align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Phone
                      </th>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-center align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        Address
                      </th>
                      <th className="tracking-none whitespace-nowrap border-b border-solid border-gray-200 bg-transparent px-6 py-3 align-middle font-semibold capitalize text-tsecondary opacity-70 shadow-none">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <div className="flex px-4 py-1">
                          <p className="mb-0 text-sm font-semibold leading-tight">
                            Naeem
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <p className="mb-0 text-sm font-semibold leading-tight">
                          naeem@yopmail.com
                        </p>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 text-center align-middle shadow-transparent">
                        <span className="text-sm font-semibold leading-tight">
                          3bytelabs
                        </span>
                      </td>

                      <td className="whitespace-nowrap border-b bg-transparent p-2 text-center align-middle shadow-transparent">
                        <span className="text-sm font-semibold leading-tight">
                          +123456789
                        </span>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 text-center align-middle shadow-transparent">
                        <span className="text-sm font-semibold leading-tight">
                          123 Main Street, USA 12345
                        </span>
                      </td>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <a
                          href="javascript:;"
                          className="hover:scale-102 flex items-center gap-1 font-semibold leading-tight text-link hover:text-secondary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="18"
                            fill="currentColor"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                          </svg>
                          View Detail
                        </a>
                      </td>
                    </tr>
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
