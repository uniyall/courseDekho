import NavbarSimple from "../components/NavbarSimple";
import CourseCard from "../components/CourseCard";
import { Switch } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function Courses() {
  const [onlyPurchased, setOnlyPurchased] = useState(false);
  const [courses, setCourses] = useState([]);
  const [purchasedCoursesList, setPurchasedCoursesList] = useState([]);
  const [alias, setAlias] = useState(purchasedCoursesList);

  const {
    user: { userType, token },
  } = useAuth();

  useEffect(() => {
    const fn = async () => {
      const allCourses = await fetch(
        `${import.meta.env.VITE_BE_API}/${userType}/course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json1 = await allCourses.json();
      setCourses(json1.courses);
      if (userType === "user") {
        const purchasedCourses = await fetch(
          `${import.meta.env.VITE_BE_API}/user/purchasedCourses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json2 = await purchasedCourses.json();
        const onlyIds = json2.courses.map((ele) => ele._id);
        setPurchasedCoursesList(onlyIds);
      }
    };
    fn();
  }, [alias]);

  return (
    <>
      <NavbarSimple />
      {userType === "user" ? (
        <div className="flex sm:justify-end justify-center sm:mx-[190px] mt-10">
          <Switch
            checked={onlyPurchased}
            onChange={() => {
              if (!onlyPurchased) {
                const temp = courses.filter((ele) => {
                  if (purchasedCoursesList.includes(ele._id)) return true;
                  return false;
                });
                setCourses(temp);
              } else {
                setAlias(purchasedCoursesList);
              }
              setOnlyPurchased(!onlyPurchased);
            }}
            label="Purchased"
          />
        </div>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            userType={userType}
            purchasedCoursesList={purchasedCoursesList}
            handleBuy={async () => {
              await fetch(
                `${import.meta.env.VITE_BE_API}/user/course/${course._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  method: "POST",
                }
              );
              const temp = purchasedCoursesList;
              console.log(temp);
              temp.push(course._id);
              console.log(temp);
              setAlias(temp);
            }}
            purchased={onlyPurchased}
          />
        ))}
      </div>
    </>
  );
}

export default Courses;
