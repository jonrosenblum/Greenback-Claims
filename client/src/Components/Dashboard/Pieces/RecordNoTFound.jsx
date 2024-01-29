import PropTypes from 'prop-types'
import NotFound from './../../../../assets/images/notFound.svg'

function RecordNoTFound({message}) {
  return (
    <div className="flex flex-col py-10 gap-2 justify-center items-center">
    <div className="py-5 text-center">
        <img src={NotFound} alt='notFound' className='w-full h-full'/>
        </div>
        <div className="pb-6 text-center text-tsecondary font-medium">
            {message}
        </div>
    </div>
  )
}

RecordNoTFound.propTypes = {
    message: PropTypes.string.isRequired
}

export default RecordNoTFound
