import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { Lock } from "lucide-react";
import { useState } from "react";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  // Fetch course detail when modal opens
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(course._id, {
    skip: !open, // Don't fetch unless modal is open
  });

  const handleViewDetail = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <div className="relative group">
        {/* View Course Detail button only for non-logged-in users */}
        {!isLoggedIn && (
          <button
            onClick={handleViewDetail}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white text-sm px-4 py-1 rounded shadow-md"
          >
            View Course Detail
          </button>
        )}

        {/* Card wrapped in link for logged-in users */}
        <Link to={`/course-detail/${course._id}`}>
          <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="relative">
              <img
                src={course.courseThumbnail}
                alt="course"
                className="w-full h-36 object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="px-5 py-4 space-y-3">
              <h1 className="hover:underline font-bold text-lg truncate">
                {course.courseTitle}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="font-medium text-sm">{course.creator?.name}</h1>
                </div>
                <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                  {course.courseLevel}
                </Badge>
              </div>
              <div className="text-lg font-bold">
                <span>₹{course.coursePrice}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Modal for course details */}
      <Dialog open={open} onOpenChange={setOpen}>


        <DialogContent className="max-w-3xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          {isLoading ? (
            <p className="text-center text-lg font-medium text-gray-500 dark:text-gray-400 animate-pulse">
              Loading...
            </p>
          ) : (
            <>
              <DialogHeader className="border-b border-gray-200 dark:border-gray-700 mb-5 pb-3">
                <DialogTitle className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100">
                  {data?.course?.courseTitle}
                </DialogTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
                  {data?.course?.subTitle}
                </p>
              </DialogHeader>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
                {/* Enrolled count */}
                <p className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-semibold gap-2">
                  <FaUsers className="text-indigo-500" />
                  Students enrolled: <span className="ml-1">{data?.course?.enrolledStudents?.length || 0}</span>
                </p>

                {/* Description */}
                <section>
                  <h2 className="flex items-center gap-2 font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-2">
                    <FaClipboardList />
                    Description
                  </h2>
                  <p
                    className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{
                      __html: data?.course?.description || "No description",
                    }}
                  />
                </section>

                {/* Lectures */}
                <section>
                  <h2 className="flex items-center gap-2 font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-3">
                    <Lock size={18} className="text-indigo-500" />
                    Lectures
                  </h2>
                  <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 dark:scrollbar-thumb-indigo-600 dark:scrollbar-track-indigo-900">
                    {data?.course?.lectures?.map((lec, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded px-2 py-1 transition"
                      >
                        <Lock size={16} className="text-indigo-400" />
                        <span>{lec.lectureTitle}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Cancel button */}
              <div className="text-right pt-5">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 font-semibold rounded px-5 py-2 text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </DialogContent>


      </Dialog>
    </>
  );
};

export default Course;
