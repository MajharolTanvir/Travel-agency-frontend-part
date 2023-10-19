import {
  useDeleteFeedbackMutation,
  useGetAllFeedbackQuery,
} from "@/redux/api/FeedbackApi";
import { Divider } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { IFeedback } from "@/types";

const ViewFeedback = () => {
  const { data: feedback } = useGetAllFeedbackQuery({});
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const feedbacks = feedback?.feedback;

  const handleDeleteFeedback = (id: string) => {
    deleteFeedback(id);
  };

  return (
    <div>
      {feedback && (
        <div className="p-10 text-black backdrop-blur-3xl rounded-2xl w-[300px] md:w-[400px] lg:w-[600px] shadow-md">
          <div className="text-xl md:text-2xl font-medium gap-3 w-full flex justify-center my-2">
            <h1>Feedback</h1>
          </div>

          <Divider className="my-4" />

          <div className="text-lg md:text-xl">
            {feedbacks?.map((feeds: IFeedback) => (
              <div key={feeds?.id}>
                <div className="grid grid-cols-4 justify-between items-center">
                  <div className="col-span-3">
                    <span className="font-bold my-1">{feeds?.subject}</span>
                    <p>{feeds?.description}</p>
                  </div>
                  <div className="text-end flex flex-col items-end gap-2">
                    <Link href={`/user/feedback/${feeds?.id}`}>
                      <EditIcon className="cursor-pointer" />
                    </Link>
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => handleDeleteFeedback(feeds?.id as string)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;
