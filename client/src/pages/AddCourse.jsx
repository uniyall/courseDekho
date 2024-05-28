import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarSimple from "../components/NavbarSimple";
import { useAuth } from "../hooks/useAuth";

function AddCourse() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const {
    user: { token },
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(`${import.meta.env.VITE_BE_API}/admin/course`, {
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink: url,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    if (res.status == 200) {
      console.log("done");
      navigate("/courses");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <NavbarSimple />
      <div className="h-lvh flex justify-center mt-10">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add Course
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                placeholder="My Course Title"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Price
              </Typography>
              <Input
                type="number"
                size="lg"
                placeholder="499"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Course Thumbnail Link
              </Typography>
              <Input
                type="url"
                size="lg"
                placeholder="http://google.com/cat.png"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Course Description
              </Typography>
              <textarea
                rows="4"
                cols="50"
                className="border border-blue-gray-200 focus:border-gray-900 rounded-md p-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Add Course to DB
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddCourse;
