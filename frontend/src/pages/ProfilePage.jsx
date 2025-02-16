import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, uploadProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async (params) => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await uploadProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="h-full pt-15">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-accent-content/15 border border-accent rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              {authUser?.fullname?.split(" ")[0].toUpperCase()}
            </h1>
            <p className="mt-2">You profile information</p>
          </div>
          {/* avatar upload section*/}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {authUser.profilepic ? (
                <img
                  src={authUser.profilepic}
                  alt={authUser.fullname}
                  className="size-30 object-cover rounded-full"
                />
              ) : (
                <div className="size-30 text-5xl flex items-center justify-center bg-gray-500 text-white font-medium rounded-full">
                  {authUser.fullname.includes(" ")
                    ? authUser.fullname
                        .split(" ")
                        .map((name) => name.charAt(0))
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : authUser.fullname.charAt(0).toUpperCase()}
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-accent hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex ite  ms-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-accent-content">
                {authUser?.fullname}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-accent-content">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
