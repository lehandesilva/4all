import { fetchReviews } from "@/app/server/queries";
import { FaUser } from "react-icons/fa";
import ReviewCourse from "./review-course";

export default async function Reviews({ courseId }: { courseId: string }) {
  const reviews = await fetchReviews(courseId);
  return (
    <div className="bg-p-1 p-6 pt-16">
      <h3 className="text-s-4 text-xl border-t-2 pt-4">Reviews</h3>
      <div className="ml-8">
        <ReviewCourse courseId={courseId} />
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className="flex my-5 items-center">
              <FaUser className="text-s-3 text-2xl outline outline-1 rounded-full outline-s-3 outline-offset-4" />
              <div className="ml-6">
                <div className="flex pt-3 pb-1">
                  <p className="text-s-3 mr-10">{review.user_name}</p>
                  <p className="text-gray-500">
                    {review.timestamp?.toLocaleDateString()}
                  </p>
                </div>
                <p className="text-s-3">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex my-5 items-center">
            <p className="text-gray-400">No Reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
