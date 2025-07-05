export const lessons = [
  {
    id: "1",
    title: "Allah is Merciful and Kind",
    course: "Level 1",
    week: 1,
    lessonOrder: 1,
    students: 4471,
    attendees: 547,
    status: "Active",
  },
  {
    id: "2",
    title: "A Message for Everyone",
    course: "Level 1",
    week: 1,
    lessonOrder: 2,
    students: 4471,
    attendees: 346,
    status: "Active",
  },
  {
    id: "3",
    title: "Being Muslim",
    course: "Level 1",
    week: 2,
    lessonOrder: 1,
    students: 4471,
    attendees: 106,
    status: "Active",
  },
  {
    id: "4",
    title: "Islam has Five Pillars",
    course: "Level 1",
    week: 2,
    lessonOrder: 2,
    students: 4471,
    attendees: 89,
    status: "Active",
  },
  {
    id: "5",
    title: "Allah is One",
    course: "Level 1",
    week: 3,
    lessonOrder: 1,
    students: 4471,
    attendees: 33,
    status: "Active",
  },
  {
    id: "6",
    title: "Our Five Daily Prayers",
    course: "Level 1",
    week: 3,
    lessonOrder: 2,
    students: 4471,
    attendees: 23,
    status: "Active",
  },
];

export interface lessonType {
  id: string;
  title: string;
  course: string;
  week: number;
  lessonOrder: number;
  students: number;
  attendees: number;
  status: string;
}
