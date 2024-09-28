import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "./redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const {user} = useSelector(store=>store.auth);
    const {singleJob} = useSelector(store=>store.job);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const dispatch = useDispatch();
    
    const applyJobHandler = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
        console.log(res.data);
        if (res.data.success) {
          setIsApplied(true);  //update the local state
          const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]};
          dispatch(setSingleJob(updateSingleJob));  //helps to get reltime update
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    useEffect(() => {
      const fetchSingleJob = async () => {
          try {
              const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
              if (res.data.success) {
                  dispatch(setSingleJob(res.data.job));
                  setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id));  //ensure state sync with the fetched data
              }
          } catch (error) {
              console.log(error);
          }
      }
      fetchSingleJob();
 
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-28 my-10 p-5 rounded-lg bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-green-600 font-bold border border-slate-500" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-black font-bold border border-slate-500" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-yellow-400 font-bold border border-slate-500" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-slate-600 cursor-not-allowed "
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-400 font-bold py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-semibold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} years
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
