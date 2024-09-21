"use client";
import { fetcher } from "@/utility/fetcher";

import toast from "react-hot-toast";
import useSWR from "swr";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_URL}/api/category`,
    fetcher
  );

  // text editor placeholder
  const placeholder = "Enter some text";
  const editor = useRef(null);
  const [content, setContent] = useState("");

  console.log(content);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  const [photoUrl, setPhotoUrl] = useState("");

  const addCategoryHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const category = form.category.value;
    const title = form.title.value;
    const metaTitle = form.metaTitle.value;
    const details = content; // Using the content from the Jodit editor
    const photo = form.photo.files[0];

    if (!photo) {
      toast.error("Please select a photo");
      return;
    }

    // Upload Image to ImageBB
    const formData = new FormData();
    formData.append("image", photo);

    try {
      const imageUploadResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=fd31eb1b7eccf01a95d0b1949fe0e46a",
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await imageUploadResponse.json();

      if (!imageData || !imageData.data || !imageData.data.display_url) {
        throw new Error("Failed to upload image");
      }

      setPhotoUrl(imageData.data.display_url);

      // Prepare data to be submitted to the API
      const value = {
        category,
        title,
        metaTitle,
        details,
        photo: imageData.data.display_url,
      };

      // Submit the form data to your API
      const response = await fetch(`${process.env.BASE_URL}/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const result = await response.json();

      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        setContent(""); // Clear editor content
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Error adding category or uploading image");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-full shrink-0">
        <h1 className="text-2xl">Add Post</h1>
        <form onSubmit={addCategoryHandler} className="card-body">
          {/* category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option disabled selected>
                Select Category
              </option>
              {data?.data?.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          {/* title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          {/* metaTitle */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Meta Title</span>
            </label>
            <input
              type="text"
              name="metaTitle"
              placeholder="Meta Title"
              className="input input-bordered"
              required
            />
          </div>
          {/* details (JoditEditor) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)} // Update content onBlur
            />
          </div>
          {/* photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              name="photo"
              className="file-input w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
