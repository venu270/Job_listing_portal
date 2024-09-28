import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTabel = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div >
      <Table className="bg-slate-200">
        <TableCaption className='my-3'>A List of Applied Jobs</TableCaption>
        <TableHeader >
          <TableRow >
            <TableHead className='font-bold'>Date</TableHead>
            <TableHead className='font-bold'>Job Role</TableHead>
            <TableHead className='font-bold'>Company</TableHead>
            <TableHead className="text-right font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-slate-100' >
          {allAppliedJobs.length <= 0 ? (
            <span className="my-3">You haven&apos;t applied any job yet.</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${appliedJob?.status === "rejected" ?  'bg-red-400' : appliedJob?.status === "pending" ? 'bg-yellow-400' : 'bg-green-400'} px-2 ` }>{appliedJob?.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTabel;
