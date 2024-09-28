import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import ProfileLogo from "/profile.jpg";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTabel from "./AppliedJobTabel";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["HTML", "CSS", "Javascript", "ReactJS"];

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div
        className="bg-gradient-to-b from-slate-300/5 via-slate-400/5 to-slate-500/15  max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8"
        alt="profile"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              {user?.profile?.profilePhoto ? (
                <AvatarImage src={user?.profile?.profilePhoto} />
              ) : (
                <AvatarImage src={ProfileLogo} />
              )}
            </Avatar>
            <div>
              <h1 className="font-medium text-2xl">{user?.fullname}</h1>
              <p className="text-sm pl-1">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen className="size-4" />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="  gap-2">
          <h1 className="font-semibold text-lg">Skills</h1>
          <div className="flex items-center my-2 gap-1">
            {user?.profile?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg  my-5">Applied Jobs</h1>
        {/* Applied Job Tabel */}
        <AppliedJobTabel />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
