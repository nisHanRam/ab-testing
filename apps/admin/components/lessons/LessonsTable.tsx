"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, FileUp, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { lessons } from "@/lib/constants";

interface Lesson {
  id: number;
  lesson: string;
  course: string;
  week: number;
  lessonOrder: number;
  students: number;
  attendees: number;
  status: "Active" | "Inactive";
}

const LessonsTable = () => {
  const router = useRouter();
  const [courseFilter, setCourseFilter] = useState("All");
  const [entriesCount, setEntriesCount] = useState("10");
  const [weekFilter, setWeekFilter] = useState("All");

  const handleAddNew = () => {
    console.log("Add new lesson clicked");
  };

  const handleExportCSV = () => {
    console.log("Export CSV clicked");
  };

  const handleEdit = (id: number) => {
    router.push(`/lessons/${id}`);
    console.log("Edit lesson:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete lesson:", id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lessons</h1>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3">
            <Button
              onClick={handleAddNew}
              className="btn-teal flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              Add New
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <FileUp size={18} />
              Export As CSV
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Course</span>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Level 1">Level 1</SelectItem>
                  <SelectItem value="Level 2">Level 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Show Entries
              </span>
              <Select value={entriesCount} onValueChange={setEntriesCount}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Filter By Week
              </span>
              <Select value={weekFilter} onValueChange={setWeekFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="1">Week 1</SelectItem>
                  <SelectItem value="2">Week 2</SelectItem>
                  <SelectItem value="3">Week 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Lesson
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Course
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Week
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Lesson Order
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Students
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Attendees
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">
                      {lesson.title}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{lesson.course}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{lesson.week}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{lesson.lessonOrder}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      {lesson.students.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      {lesson.attendees.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium status-active">
                      {lesson.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(lesson.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lesson.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash size={16} className="text-gray-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LessonsTable;
