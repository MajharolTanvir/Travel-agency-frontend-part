import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { Avatar, Button, InputLabel, Typography } from "@mui/material";

const ImageUpload = ({ imageUrl, setImageUrl }: any) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || !files[0]) return;

    const file = files[0];

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("You can only upload JPG/PNG files!");
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Image must be smaller than 2MB!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "74c8424adb20f9d1cb8d5b37f691776a",
          },
        }
      );

      if (response.data.status === 200) {
        const imageURL = response.data.data.url;
        setLoading(false);
        setImageUrl(imageURL);
      } else {
        console.error("Image upload failed:", response.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload-input"
        type="file"
        onChange={handleFileChange}
      />

      <div className="flex justify-center items-center h-full gap-5">
        <div>
          <Avatar alt="Image" src={imageUrl} sx={{ width: 80, height: 80 }} />
              </div>
              
        <div>
          <label htmlFor="image-upload-input">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={loading ? <CloudUploadIcon /> : null}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </label>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
