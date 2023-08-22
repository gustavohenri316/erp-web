import PermissionGate from "../../../../components/PermissionGate";
import { formatDate } from "../../../../utils/FormatDateAndString";
import { FeedbacksModalDelete } from "../feedbacks-modal-delete";
import { Star } from "phosphor-react";

export function FeedbacksUsersView({
  Token,
  data,
  deleteFeedback,
  loading,
}: IFeedbacksUsersView) {
  return (
    <div>
      <div className="overflow-auto mt-4">
        {data?.feedbacks.map((item: IFeedback) => {
          const firstLetter = item.name.charAt(0).toUpperCase();
          const starRating = Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={10}
              weight={index < item.assessment ? "fill" : "regular"}
              className="text-yellow-400"
            />
          ));

          if (item.feedbackMessage.trim() !== "") {
            return (
              <div key={item._id} className="bg-white rounded-md mt-2 p-2 ">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-xl">
                    {firstLetter}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-1">
                        {starRating}
                      </div>
                    </div>
                    <span className="text-sm">{item.email}</span>
                  </div>

                  <div className="flex-1 border-l pl-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.feedbackMessage }}
                    />
                  </div>

                  <div>
                    <span className="text-sm">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  {Token && (
                    <div className="pr-4">
                      <PermissionGate permission="9TLTS6BVTFVWCLX9CPYJKXAZ9HDUXA">
                        <FeedbacksModalDelete
                          handleDelete={() =>
                            deleteFeedback(item._id as string)
                          }
                          name={item.name}
                          loading={loading}
                        />
                      </PermissionGate>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
