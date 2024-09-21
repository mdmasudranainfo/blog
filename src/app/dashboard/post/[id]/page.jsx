"use client";

import Loader from "@/components/share/loader/Loader";
import { fetcher } from "@/utility/fetcher";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = ({ params }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_URL}/api/post/${params?.id}`,
    fetcher
  );

  const {
    data: Categories,
    error: cError,
    isLoading: cLoading,
    mutate: cMute,
  } = useSWR(`${process.env.BASE_URL}/api/category`, fetcher);

  //   update
  const UpdatePostHandler = (e) => {
    e.preventDefault();

    const form = e.target;
    const category = form.category.value;
    const title = form.title.value;
    const metaTitle = form.metaTitle.value;
    const details = form.details.value;
    const photo = form.photo.files[0];

    // upload Image in Image BB
    if (photo) {
      const formData = new FormData();
      formData.append("image", photo);
      const url =
        "https://api.imgbb.com/1/upload?key=fd31eb1b7eccf01a95d0b1949fe0e46a";
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data?.data);
          setPhotoUrl(data?.data?.display_url);
          return;
        })
        .catch((err) => {
          toast.error("Image Upload Problem");
          return;
        });
    }

    const value = {
      category,
      title,
      metaTitle,
      details,
      photo: photoUrl ? photoUrl : data?.data?.photo,
    };

    //write post method
    fetch(`${process.env.BASE_URL}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data?.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("Error adding category");
      });
  };
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="card bg-base-100 w-full  shrink-0 ">
        <h1 className="text-2xl">Edit Post</h1>
        <form onSubmit={UpdatePostHandler} className="card-body">
          {/* category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <select
              name="category"
              id=""
              className="select select-bordered w-full "
              required
            >
              <option disabled selected>
                Select Category
              </option>

              {Categories?.data?.map((category) => (
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
              defaultValue={data?.data?.title}
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
              defaultValue={data?.data?.metaTitle}
              required
            />
          </div>
          {/* details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <input
              type="text"
              name="details"
              placeholder="Details"
              className="input input-bordered"
              defaultValue={data?.data?.details}
              required
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
              placeholder="photo"
              className="file-input w-full"
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
