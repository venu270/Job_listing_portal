import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany} = useSelector(store=>store.company);
  
  const [loading , setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if(input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null, // Reset file field to null
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <form onSubmit={submitHandler} className="rounded-lg p-5 bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15">
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <Button className="w-full flex items-center justify-center bg-gradient-to-r from-black to-slate-300" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-black to-slate-300"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
