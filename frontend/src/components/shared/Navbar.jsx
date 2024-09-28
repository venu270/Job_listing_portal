import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { useState } from "react";
import joblogo from "/logo.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-4 md:mx-16 max-w-7xl h-16">
        <Link to="/">
          <div className="flex items-center">
            <img src={joblogo} alt="Logo" className="h-8 mr-4 rounded-lg" />
            <h1 className="text-2xl font-bold">
              Job<span className="text-green-600">lia</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-12">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            {menuOpen && (
              <ul className="absolute right-4 top-16 bg-white shadow-lg rounded-md py-2 w-48">
                {user && user.role === "recruiter" ? (
                  <>
                    <li className="hover:bg-gray-100 p-2">
                      <Link to="/admin/companies">Companies</Link>
                    </li>
                    <li className="hover:bg-gray-100 p-2">
                      <Link to="/admin/jobs">Jobs</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="hover:bg-gray-100 p-2">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="hover:bg-gray-100 p-2">
                      <Link to="/jobs">Jobs</Link>
                    </li>
                    <li className="hover:bg-gray-100 p-2">
                      <Link to="/browse">Browse</Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          <ul className="hidden md:flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-green-600">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-green-600">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-green-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-green-600">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-green-600">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-black to-slate-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                    />
                  ) : (
                    <AvatarFallback>
                      <User2 />
                    </AvatarFallback>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gradient-to-b from-slate-300/5 via-slate-300/5 to-slate-500/15">
                <div className="flex gap-2">
                  <Avatar className="cursor-pointer">
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                      />
                    ) : (
                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center cursor-pointer">
                    <LogOut className="outline-none" />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
