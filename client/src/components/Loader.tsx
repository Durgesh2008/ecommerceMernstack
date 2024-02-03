
import loader from '../Images/loading-gif.gif'
const Loader = () => {
  return (
    <>
    <div className='flex items-center justify-center absolute top-[30%] left-[40%] '>
  <img src={loader} alt="Loading..." />
    </div>
    </>
  )
}

export default Loader