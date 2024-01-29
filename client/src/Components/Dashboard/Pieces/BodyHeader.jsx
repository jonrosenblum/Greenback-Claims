import PropTypes from 'prop-types';

function BodyHeader({title,description,children}) {
  return (
    <div className="ease-soft-in-out relative h-full max-h-screen  mt-6  transition-all duration-200">
     
     <div className="w-full  ">
       <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
         <div className="flex flex-wrap justify-between items-center -mx-3">
           <div className="flex  max-w-full items-center px-3 my-auto">
             <div className="h-full">
               <h5 className="font-medium text-xl">{title}</h5>
               <p className="mb-0 font-semibold leading-normal text-sm">{description}</p>
             </div>
           </div>
           {/* <div className=" flex max-w-full px-3 items-center justify-end mt-4 sm:my-auto">
                         <ng-content select="[actionButton]"></ng-content>
             </div> */}
           </div>
         </div>
       </div>
     <div className="w-full p-6 mx-auto">
     {children}
     </div>
   </div>
  )
}

BodyHeader.propTypes = {
    title:PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node
  };
export default BodyHeader