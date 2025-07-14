import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const [localProgress, setLocalProgress] = useState([]);

  // Initialize currentLecture and localProgress from API data
  useEffect(() => {
    if (data?.data) {
      if (!currentLecture) {
        setCurrentLecture(data.data.courseDetails.lectures[0]);
      }
    }
  }, [data, currentLecture]);

  // Update localProgress only when backend data.progress changes
  useEffect(() => {
    if (data?.data?.progress) {
      setLocalProgress(data.data.progress);
    }
  }, [data?.data?.progress]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails } = data.data;
  const { courseTitle } = courseDetails;

  const selectedLecture = currentLecture;

  // Check if current lecture is completed using localProgress state
  const isCurrentLectureCompleted = localProgress.some(
    (prog) => prog.lectureId === selectedLecture?._id && prog.viewed
  );

  // Toggle completion status of current lecture with backend update and optimistic local update
  const toggleLectureCompletion = async () => {
    try {
      await updateLectureProgress({
        courseId,
        lectureId: selectedLecture._id,
        markComplete: !isCurrentLectureCompleted,
      }).unwrap();

      // Optimistically update localProgress immediately
      if (isCurrentLectureCompleted) {
        // Remove completion for current lecture
        setLocalProgress((prev) =>
          prev.filter((prog) => prog.lectureId !== selectedLecture._id)
        );
      } else {
        // Add completion for current lecture
        setLocalProgress((prev) => [
          ...prev,
          { lectureId: selectedLecture._id, viewed: true },
        ]);
      }

      toast.success(
        isCurrentLectureCompleted
          ? "Lecture marked as incomplete"
          : "Lecture marked as completed"
      );

      // Refetch data from backend for sync
      refetch();
    } catch (err) {
      toast.error("Failed to update lecture progress");
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-[75vh]">
      {/* Course title and mark complete button */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={toggleLectureCompletion}
          style={{
            backgroundColor: isCurrentLectureCompleted ? "transparent" : "#3869EB",
            color: isCurrentLectureCompleted ? "#3869EB" : "white",
            border: isCurrentLectureCompleted ? "1px solid #3869EB" : "none",
          }}
        >
          {isCurrentLectureCompleted ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Mark as incomplete</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() => {
                  if (!isCurrentLectureCompleted) {
                    toggleLectureCompletion();
                  }
                }}
              />
            ) : (
              <p className="text-red-500">No video available for this lecture.</p>
            )}
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${courseDetails.lectures.findIndex((lec) => lec._id === selectedLecture?._id) + 1
                } : ${selectedLecture?.lectureTitle || "Untitled"}`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto max-h-[70vh]">
            {courseDetails?.lectures.map((lecture) => {
              const lectureCompleted = localProgress.some(
                (prog) => prog.lectureId === lecture._id && prog.viewed
              );
              return (
                <Card
                  key={lecture._id}
                  className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === selectedLecture?._id
                      ? "bg-gray-200 dark:bg-gray-800"
                      : ""
                    }`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {lectureCompleted ? (
                        <CheckCircle2 size={24} className="text-green-500 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-medium">{lecture.lectureTitle}</CardTitle>
                      </div>
                    </div>
                    {lectureCompleted && (
                      <Badge variant={"outline"} className="bg-green-200 text-green-600">
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
