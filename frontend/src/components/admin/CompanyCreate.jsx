import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios"
import { COMPANY_API_END_POINT } from "../utils/constant"
import { useState } from "react"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "../redux/companySlice"

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true,
            });
            if(res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="my-6 sm:my-10">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">Your Company Name</h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">What would you like to name your company? You can change this later.</p>
          </div>
          
          <Label className="block mb-2">Company Name</Label>
          <Input
            type="text"
            className="my-2 w-full"
            placeholder="JobHunt, Microsoft, etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row items-center gap-2 my-6 sm:my-10">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate('/admin/companies')}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-black to-slate-300 mt-2 sm:mt-0"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
}

export default CompanyCreate;
