import { Link } from 'react-router-dom'
import welcome from './../../../../assets/images/Welcome.svg'
import useAuthStore from '../../../zustand/authStore';

function Home() {
  const { user } = useAuthStore();

  return (
     <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap mt-6 my-2 mb-6 -mx-3">
          <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                  <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                    <div className="flex flex-col h-full">
                      <p className="pt-2 mb-1 font-semibold">Have a safe landing:)</p>
                      <h5 className="font-bold">Hi {user.username}! Welcome to Dashboard</h5>
                      <p className="mb-12">This dashboard is specially design for the managing the referrals users. Share your referral link to anyone.</p>
                      <Link className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500" to="/dashboard/profile">
                        Share Referral Link
                        <i className="fa fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                    <div className="h-full bg-gradient-to-tl from-primary to-secondary rounded-xl">
                      {/* <img src="../assets/img/shapes/waves-white.svg" className="absolute top-0 hidden w-1/2 h-full lg:block" alt="waves" /> */}
                      <div className="relative flex items-center justify-center h-full">
                        <img className="relative z-20 w-52" src={welcome} alt="rocket" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">{"Total User Forms via your Referral"}</p>
                      <h5 className="mb-0 font-bold">
                        68
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

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">{"Total User via your Referral"}</p>
                      <h5 className="mb-0 font-bold">
                        10
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-primary to-secondary">
                      <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl  bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3 items-center mb-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                      <p className="mb-0 font-sans font-semibold leading-normal text-md">{"Latest Referral User Forms"}</p>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <Link to="/dashboard/referrals" className="flex px-1 h-12 gap-2 text-center justify-center rounded-lg bg-gradient-to-tl from-primary items-center to-secondary">
                      <i className="ni leading-none ni-world text-lg relative  text-white"></i><p className='text-white'>View All</p>
                    </Link>
                  </div>
                  
                </div>
                <div className="flex-auto px-0 pb-2 pt-0">
              <div className="overflow-x-auto p-0">
                <table className="mb-0 w-full items-center border-gray-200 align-top text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="border-b-solid tracking-none whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 text-left align-middle text-sm font-bold uppercase text-tsecondary opacity-70 shadow-none">
                        User Name
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
                     
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <div className="flex px-4 py-1">
                          <p className="mb-0 text-sm font-semibold leading-tight">
                            Naeem
                          </p>
                        </div>
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
                     
                    </tr><tr>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <div className="flex px-4 py-1">
                          <p className="mb-0 text-sm font-semibold leading-tight">
                            Naeem
                          </p>
                        </div>
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
                     
                    </tr><tr>
                      <td className="whitespace-nowrap border-b bg-transparent p-2 align-middle shadow-transparent">
                        <div className="flex px-4 py-1">
                          <p className="mb-0 text-sm font-semibold leading-tight">
                            Naeem
                          </p>
                        </div>
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
                     
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>


      </div>

  )
}

export default Home