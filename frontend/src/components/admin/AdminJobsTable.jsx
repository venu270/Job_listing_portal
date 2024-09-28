
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
  const [filterJobs, setFilterJobs] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText])

  return (
    <div className="overflow-x-auto ">
      <Table className="min-w-full bg-slate-200 ">
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Company</TableHead>
            <TableHead className="whitespace-nowrap">Role</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg p-5 bg-slate-100">
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="">
              <TableCell className="whitespace-nowrap ">
                {job?.company?.name}
              </TableCell>
              <TableCell className="whitespace-nowrap ">{job?.title}</TableCell>
              <TableCell className="whitespace-nowrap ">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap ">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 rounded-lg bg-slate-300">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center py-2 px-3 gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <hr className="border border-slate-400" />
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center py-2 px-3 w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="size-5" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
