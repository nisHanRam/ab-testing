import { lessons } from "@/lib/constants";
import LessonClient from "@components/lessons/LessonClient";

export default function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lesson = lessons.find((l) => l.id === params.lessonId);

  if (!lesson) {
    return <div className="p-6 text-red-600">Lesson not found.</div>;
  }

  return <LessonClient lesson={lesson} />;
}
