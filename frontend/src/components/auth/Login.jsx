import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  
  document.title = 'Joblia | Login'

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="md:w-1/2 bg-black p-6 md:p-12 flex items-center justify-center rounded-l-lg">
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-green-500 text-right leading-tight md:leading-normal">
              Welcome to Your Career Hub.
            </h1>
            <p className="text-white text-base md:text-xl text-right mt-5">
              Whether you're hiring or looking for your next job, you've come to the right place.
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15 p-4">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white border border-gray-200 rounded-md p-6 md:p-8"
          >
            <h1 className="font-bold text-xl md:text-2xl text-center mb-6">Login</h1>

            <div className="mb-4">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Type your email"
                className="mt-1"
              />
            </div>

            <div className="mb-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Type your password"
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between mb-5">
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-gradient-to-r from-black to-slate-300"
              >
                Login
              </Button>
            )}

            <span className="text-sm font-semibold">
              Don't have an account?{" "}
              <Link className="text-blue-600" to="/signup">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
