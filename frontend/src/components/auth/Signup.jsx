import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {

  document.title = 'Joblia | Signup'

  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
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
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Side */}
        <div className="lg:w-1/2 w-full bg-black p-6 rounded-l-lg ">
          <h1 className="text-4xl md:text-6xl font-black text-green-500 text-center lg:text-right pt-10 lg:pt-40">
            Welcome to Your Career Hub.
          </h1>
          <p className="text-white text-lg lg:text-xl text-center lg:text-right mt-5 lg:mt-10">
            Whether you're hiring or looking for your next job, you've come to the right place.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15 p-6">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md border border-gray-200 bg-white rounded-md p-4 lg:my-10"
          >
            <h1 className="font-bold text-center text-2xl mb-5">Signup</h1>
            <div className="my-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Type your name"
              />
            </div>
            <div className="my-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Type your email"
              />
            </div>
            <div className="my-2">
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Type your phone number"
              />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Type your password"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <RadioGroup className="flex flex-col lg:flex-row items-center justify-between gap-4 my-5 w-full">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label>Student</Label>
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
                  <Label>Recruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2 lg:pl-4 w-full lg:w-auto">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-gradient-to-r from-black to-slate-300"
              >
                Signup
              </Button>
            )}

            <span className="text-sm font-semibold">
              Already have an account?{" "}
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
