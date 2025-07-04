"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useState } from "react";
import { LogoutConfirmDialog } from "@components/LogoutConfirmDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Dashboard = () => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const confirmLogout = () => {
    localStorage.clear();
    router.push("/auth");
    toast.success("Logged out successfully");
    setShowConfirmDialog(!showConfirmDialog);
  };

  const cancelLogout = () => {
    setShowConfirmDialog(!showConfirmDialog);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center justify-center gap-8">
      <Button
        className="self-end"
        onClick={() => setShowConfirmDialog(!showConfirmDialog)}
      >
        Logout
      </Button>
      <Card className="max-w-4xl mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Featured Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 rounded-lg">
            <video
              controls
              className="w-full h-full object-cover"
              poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </CardContent>
      </Card>
      <LogoutConfirmDialog
        open={showConfirmDialog}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default Dashboard;
