"use client";
import Loader from "@/components/share/loader/Loader";
import { fetcher } from "@/utility/fetcher";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = ({ params }) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_URL}/api/category/${params?.id}`,
    fetcher
  );

  const UpdateCategoryHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const values = {
      name,
    };
    //write post method
    fetch(`${process.env.BASE_URL}/api/category/${params?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data?.message);
          // clear form
          e.target.reset();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("Error adding category");
        console.error("Error:", error);
      });
  };

  if (isLoading) return <Loader />;
  return (
    <div className="card bg-base-100 w-full  shrink-0 ">
      <h1 className="text-2xl">Edit Category</h1>
      <form onSubmit={UpdateCategoryHandler} className="card-body">
        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            defaultValue={data?.data?.name}
            placeholder="Name"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
