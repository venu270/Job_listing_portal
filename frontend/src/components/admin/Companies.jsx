import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../redux/companySlice";

const Companies = () => {

  document.title = 'Joblia | Admin'

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 my-10">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full sm:w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-black to-slate-300"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
