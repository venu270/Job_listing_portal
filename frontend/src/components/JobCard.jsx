/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ( {job} ) => {
  const navigate = useNavigate();
  // const jobId = 'hgdyfgreiufhe';

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(timeDifference/ (1000*24*60*60));
  }
  return (
    <div className="bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15 p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-medium text-sm sm:text-lg">{job?.company?.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-base sm:text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-green-600 font-bold border border-slate-500" variant="ghost">
          {job?.position} position
        </Badge>
        <Badge className="text-black font-bold border border-slate-500" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-yellow-400 font-bold border border-slate-500" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="bg-gray-100 hover:bg-gray-200"
        >
          Details
        </Button>
        <Button
          variant="secondary"
          className="bg-gradient-to-r from-black to-slate-300 text-white"
        >
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
