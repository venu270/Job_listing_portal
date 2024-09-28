/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const LatestJobCards = ( {job} ) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15  p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
      <h1 className="font-medium text-lg">{job?.company?.name}</h1>
      <p className="text-base text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-medium text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
    <div className="flex items-center gap-2 mt-4">
        <Badge className="text-green-600 font-bold border border-slate-500" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-black font-bold border border-slate-500" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-yellow-400 font-bold border border-slate-500" variant="ghost">{job?.salary} LPA</Badge>
    </div>
    </div>
  )
}

export default LatestJobCards;
