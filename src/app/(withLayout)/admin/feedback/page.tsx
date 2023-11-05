'use client'

import { useGetAllFeedbackQuery } from "@/redux/api/FeedbackApi";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Spinner from "@/components/UI/Spinner";

const Feedback = () => {
  const { data, isLoading } = useGetAllFeedbackQuery({});

  if (isLoading) {
    return <Spinner />;
  }

  const feedbacks = data?.feedback;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-5 items-center">
      {feedbacks!.map((feeds: any) => (
        <Card key={feeds?.id} sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {feeds?.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feeds?.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feedback;
