import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-accent-content ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
            {selectedUser.profilepic ? (
                <img
                  src={selectedUser.profilepic}
                  alt={selectedUser.fullname}
                  className="size-10 object-cover rounded-full"
                />
              ) : (
                <div className="size-10 flex items-center justify-center bg-gray-500 text-white font-medium rounded-full">
                  {selectedUser.fullname.includes(" ")
                    ? selectedUser.fullname
                        .split(" ")
                        .map((name) => name.charAt(0))
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : selectedUser.fullname.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
