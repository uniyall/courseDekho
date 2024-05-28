import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Entry() {
  const [isSignin, setSignin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const { login, user } = useAuth();
  if (user) {
    return <Navigate to="/courses" />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSignin) {
      // sign in logic
      const res = await fetch(
        `${import.meta.env.VITE_BE_API}/${userType}/signin`,
        {
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      if (res.status == 200) {
        const json = await res.json();
        await login({
          username,
          userType,
          token: json.token,
        });
      } else if (res.status == 401) {
        alert("Wrong username/password!");
      } else {
        alert("Something went wrong, pls try again!");
      }
    }

    if (!isSignin) {
      // sign up logic
      const res = await fetch(
        `${import.meta.env.VITE_BE_API}/${userType}/signup`,
        {
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      if (res.status == 200) {
        const res1 = await fetch(
          `${import.meta.env.VITE_BE_API}/${userType}/signin`,
          {
            body: JSON.stringify({
              username: username,
              password: password,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        if (res1.status == 200) {
          const json = await res1.json();
          await login({
            username,
            userType,
            token: json.token,
          });
        } else {
          alert("Something went wrong!");
        }
      } else if (res.status == 401) {
        alert("Account already exists");
      } else {
        alert("Something went wrong, pls try again!");
      }
    }
  };

  return (
    <>
      <div className="h-lvh flex flex-col justify-center items-center">
        <Typography variant="h1" className="mr-4 cursor-pointer py-1.5 my-10 text-3xl sm:text-5xl">
          CourseDekho 👁️
        </Typography>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            {isSignin ? "Sign In" : "Sign Up"}
          </Typography>
          <form
            className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleLogin}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="pro22un"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex gap-10">
                <Radio
                  name="type"
                  label="User"
                  value="user"
                  checked={userType === "user"}
                  onChange={(e) => {
                    setUserType(e.target.value);
                  }}
                />
                <Radio
                  name="type"
                  label="Admin"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={(e) => {
                    setUserType(e.target.value);
                  }}
                />
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              {isSignin ? "Sign In" : "Sign Up"}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              {isSignin
                ? `Don't have an account? `
                : "Already Have an account? "}
              <a
                onClick={() => {
                  setSignin(!isSignin);
                }}
                className="font-medium text-gray-900 hover:cursor-pointer"
              >
                {isSignin ? "Sign Up" : "Sign In"}
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Entry;
