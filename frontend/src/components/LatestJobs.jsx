import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 my-10 md:my-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        <span className="text-green-600">Latest & Top</span> Job Openings
      </h1>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
        {allJobs.length <= 0 ? (
          <span className="text-lg font-semibold">No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
