import { Check, MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";

const shortListingStatus = [
  { icon: <Check className="size-4" />, label: "Accepted" },
  { icon: <X className="size-4" />, label: "Rejected" },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 text-sm md:text-md">Full Name</TableHead>
            <TableHead className="px-2 text-sm md:text-md">Email</TableHead>
            <TableHead className="px-2 text-sm md:text-md">Contact</TableHead>
            <TableHead className="px-2 text-sm md:text-md">Resume</TableHead>
            <TableHead className="px-2 text-sm md:text-md">Date</TableHead>
            <TableHead className="px-2 text-right text-sm md:text-md">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg p-5 bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15">
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="px-2 text-sm md:text-md">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="px-2 text-sm md:text-md">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="px-2 text-sm md:text-md">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="px-2 text-sm md:text-md">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 cursor-pointer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="px-2 text-sm md:text-md">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right px-2">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-slate-300 rounded-lg">
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status.label, item?._id)}
                          className="flex items-center my-1"
                        >
                          <span className="pr-2 cursor-pointer">
                            {status.icon}
                          </span>
                          <span className="cursor-pointer">
                            {status.label}
                          </span>
                        </div>
                      ))}
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

export default ApplicantsTable;
