"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Trash, Upload, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { lessonType } from "@/lib/constants";

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  variant: "male" | "female";
}

const LessonClient = ({ lesson }: { lesson: lessonType }) => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [open, setOpen] = useState(false); // for dialog

  // form state
  const [videoForm, setVideoForm] = useState<Omit<Video, "id">>({
    url: "",
    thumbnail: "",
    title: "",
    variant: "male",
  });

  const handleAddVideo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/videos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...videoForm, lessonId: lesson.id }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    setVideos((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        ...videoForm,
      },
    ]);

    setVideoForm({
      url: "",
      thumbnail: "",
      title: "",
      variant: "male",
    });
    setOpen(false);
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  const handlePlayVideo = (videoId: string) => {
    console.log("Play video:", videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/lessons")}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Lessons
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {lesson?.title || "Lesson Not Found"}
          </h1>
          <p className="text-gray-600">
            {lesson?.course} - Week {lesson?.week}
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upload Videos
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Click below to enter video details manually
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="btn-teal cursor-pointer">
                  Upload Videos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Enter Video Details</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="url">Video URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com/video.mp4"
                      value={videoForm.url}
                      onChange={(e) =>
                        setVideoForm((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      placeholder="https://example.com/thumbnail.jpg"
                      value={videoForm.thumbnail}
                      onChange={(e) =>
                        setVideoForm((prev) => ({
                          ...prev,
                          thumbnail: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="title">Video Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter title"
                      value={videoForm.title}
                      onChange={(e) =>
                        setVideoForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Variant</Label>
                    <RadioGroup
                      value={videoForm.variant}
                      onValueChange={(val: "male" | "female") =>
                        setVideoForm((prev) => ({ ...prev, variant: val }))
                      }
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="r1" />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddVideo}>Save Video</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Videos List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Uploaded Videos ({videos.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {videos.map((video) => (
              <div
                key={video.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Play size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-500">
                      Variant: {video.variant}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayVideo(video.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Play size={16} className="text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteVideo(video.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash size={16} className="text-gray-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonClient;
