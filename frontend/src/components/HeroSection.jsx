import { Search } from "lucide-react"
import { Button } from "./ui/button"
import Jobbg from '/jobbg.png';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "./redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div
      className="border border-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.1), rgba(0,0,0,.2)), url(${Jobbg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "70vh"
      }}
    >
      <div className="flex flex-col my-10 gap-5 pl-2 md:pl-4 lg:pl-10 xl:pl-20">
        <span className="px-4 py-2 text-lg rounded-full bg-slate-100 border border-slate-200 w-fit font-semibold">
          No 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold py-2 md:text-4xl lg:text-5xl xl:text-6xl">
          Search, Apply & <br />
          Get Your <span className="text-green-600">Dream Jobs</span>
        </h1>
        <p className="text-lg md:text-base lg:text-lg">
          Looking for jobs? Browse our latest job openings to view & apply to the best jobs today!
        </p>
        <div className="flex w-[40%]  shadow-lg bg-white pl-3 rounded-full items-center gap-4 mx-auto">
            <input
            type="text"
            placeholder="find your dream jobs"
            className="outline-none placeholder-slate-400 bg-white border-none w-full" 
            onChange={(e) => setQuery(e.target.value)}
            
            />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-green-600 hover:bg-green-600">
                <Search className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
