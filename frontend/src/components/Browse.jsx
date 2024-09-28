import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import Navbar from "./shared/Navbar"
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect } from "react";
import { setSearchedQuery } from "./redux/jobSlice";

// const randomJobs = [1, 2, 3];

const Browse = () => {

  document.title = 'Joblia | Browse'

  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  })
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 my-10">
        <h1 className="font-bold text-lg my-5">Search Results ({allJobs.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {allJobs.map((job) => {
            return <JobCard key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse;
