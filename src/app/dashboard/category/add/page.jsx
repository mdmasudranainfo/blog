"use client";

import toast from "react-hot-toast";

const page = () => {
  const addCategoryHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const values = {
      name,
    };
    //write post method
    fetch(`${process.env.BASE_URL}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Category added successfully");
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
  return (
    <div>
      <div className="card bg-base-100 w-full  shrink-0 ">
        <h1 className="text-2xl">Add Category</h1>
        <form onSubmit={addCategoryHandler} className="card-body">
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
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
    </div>
  );
};

export default page;
