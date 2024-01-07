import { data } from 'autoprefixer'
import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import Moment from 'react-moment'
import { truncate } from '../store'

const CampaignDoners = ({ donors }) => {
  return (
    <div className="flex flex-col justify-center items-start md:w-2/3 px-6 mx-auto">
        <div className="max-h-[calc(100vh_-_25rem)] overflow-y-auto
        shadow-md rounded-md w-full mb-10">
            <table className="min-w-full">
                <thead className="border-b">
                    <tr>
                        <th scope="col" 
                        className="text-sm font-medium
                        px-6 py-4 text-left">Donor</th>
                        <th scope="col" 
                        className="text-sm font-medium
                        px-6 py-4 text-left">Donation</th>
                        <th scope="col" 
                        className="text-sm font-medium
                        px-6 py-4 text-left">Refunded</th>
                        <th scope="col" 
                        className="text-sm font-medium
                        px-6 py-4 text-left">Time</th>
                    </tr>
                </thead>
                <tbody>
                   {donors.map((donor, i) => (
                     <Donor key={i} donor={donor} />
                   ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}


const Donor = ({ donor }) => (
    <tr  className="border-b border-gray-200">
        <td className=" text-sm font-light
        px-6 py-4 whitespace-nowrap">
            <div className='flex justify-start items-center space-x-2'>
            <Identicon className="h-10 w-10 object-contain rounded-full shadow-md" 
            string={donor.owner}
            size={25}/>
            <span>{truncate(donor?.owner, 4,4,11)}</span>
            </div>
        </td>
        <td className=" text-sm font-light
        px-6 py-4 whitespace-nowrap">
            <small className='flex justify-start items-center'>
                <FaEthereum />
                <span className='text-gray-700 font-medium'>{donor.contribution} ETH</span>
            </small>
        </td>
        <td className=" text-sm font-light
        px-6 py-4 whitespace-nowrap">
            {donor.refunded? 'Yes' : 'No'}
        </td>
        <td className=" text-sm font-light
        px-6 py-4 whitespace-nowrap">
            <Moment fromNow>{donor.timestamp}</Moment>
        </td> 
    </tr>
)



export default CampaignDoners