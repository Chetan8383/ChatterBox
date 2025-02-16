import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatInterface from "../components/ChatInterface";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="min-h-screen bg-base-300">
      <div className="flex items-center justify-center pt-20 md:pb-10 md:px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[cal(100vh- 8ren)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatInterface />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
