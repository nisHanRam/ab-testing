"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoutConfirmDialog } from "@components/LogoutConfirmDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GenderSelectModal from "@components/GenderSelectModal";
import { fetchAndActivate, getValue, remoteConfig } from "@/lib/firebaseClient";
import amplitude from "@/lib/amplitudeClient";

const Dashboard = () => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const lessonId = 1;

  const fetchVideoUrl = async (gender: "male" | "female" | null) => {
    if (!gender) {
      setShowGenderModal(true);
      return;
    }

    try {
      await fetchAndActivate(remoteConfig);
      const key = `${gender}_video_url_${lessonId}`;
      const valueStr = getValue(remoteConfig, key).asString();
      const config = JSON.parse(valueStr);
      setVideoUrl(config.videoUrl);
      setVideoThumbnail(config.videoThumbnail);
    } catch (err) {
      console.error("Failed to load video config", err);
    }
  };

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    console.log(user);
    amplitude.track("dashboard_loaded", {
      gender: user?.gender || "unknown",
    });

    fetchVideoUrl(user?.gender || null);
  }, [lessonId]);

  const handleGenderConfirm = async (gender: "male" | "female") => {
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

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("Gender updated successfully.");
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      fetchVideoUrl(result.user.gender);
    } catch (error) {
      console.log(error);
    }

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
            {videoUrl && videoThumbnail && (
              <video
                controls
                className="w-full h-full object-cover"
                poster={videoThumbnail}
                onPlay={() => {
                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                  amplitude.track("video_started", {
                    lessonId,
                    gender: user.gender,
                    videoUrl,
                    videoVariant: user.gender,
                  });
                }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
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
