"use client";
import Loader from "@/components/share/loader/Loader";
import { fetcher } from "@/utility/fetcher";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_URL}/api/category`,
    fetcher
  );

  // delete
  const deleteCategory = async (categoryId) => {
    const yes = window.confirm("Are you sure you Delete it?");
    if (!yes) return;
    fetch(`${process.env.BASE_URL}/api/category?id=${categoryId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "success") {
          mutate();
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">Categories</h1>
        <Link className="btn btn-primary" href={"/dashboard/category/add"}>
          Add
        </Link>
      </div>

      <div className="overflow-x-auto mt-3">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th></th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((category, i) => (
              <tr key={category?._id} className=" ">
                <th>{i + 1}</th>
                <td>{category?.name}</td>
                <td className="flex gap-2">
                  <Link
                    className=""
                    href={`/dashboard/category/${category?._id}`}
                  >
                    <button className="btn btn-success btn-sm">Edit</button>
                  </Link>

                  <button
                    onClick={() => deleteCategory(category?._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
