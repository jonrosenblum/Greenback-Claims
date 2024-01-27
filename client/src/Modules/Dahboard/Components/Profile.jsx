
function Profile() {
  return (
    <div className="ease-soft-in-out relative h-full max-h-screen  transition-all duration-200">
  
    <div className="w-full px-6 mx-auto">
      <div className="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl">
        <span
          className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-secondary/70 to-primary/70 opacity-60">
        </span>
      </div>
      <div
        className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div
              className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center overflow-hidden rounded-full text-white transition-all duration-200">
              <img src='https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png'
                alt="profile_image" className="w-full shadow-soft-sm rounded-xl" style={{height: 'inherit'}} />
            </div>
          </div>
          <div className="flex w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="font-medium text-xl">Naeem Akram</h5>
              <p className="mb-0 font-semibold leading-normal text-sm">naeem@yopmail.com
              </p>              
            </div>
          </div>
          <div className="w-auto max-w-full px-3 justify-end mx-auto mt-4 sm:my-auto sm:mr-0 md:flex-none">
            <div className="relative ">
              <div className="sm:block">
                <nav className="flex flex-wrap md:justify-end space-x-4 justify-start" aria-label="Tabs">
                 
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full p-6 mx-auto">
      {/* <router-outlet></router-outlet> */}
  </div>
  </div>
  )
}

export default Profile