"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoutConfirmDialog } from "@components/LogoutConfirmDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GenderSelectModal from "@components/GenderSelectModal";

const Dashboard = () => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  console.log("showGenderModal: ", showGenderModal);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (!user.gender) {
      setShowGenderModal(true);
    }
  }, []);

  const handleGenderConfirm = async (gender: "male" | "female") => {
    console.log("Selected gender:", gender);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const response = await fetch(
        `http://localhost:8080/api/users/${user.id}/gender`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gender }),
        }
      );
      const result = await response.json();
console.log(result)
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("Login successful.");
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {}

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...user, gender }));
    setShowGenderModal(false);
  };

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
      {showGenderModal && <GenderSelectModal onConfirm={handleGenderConfirm} />}
    </div>
  );
};

export default Dashboard;
