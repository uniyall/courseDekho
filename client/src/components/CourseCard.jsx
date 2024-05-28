import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CourseCard({
  index,
  course,
  userType,
  purchasedCoursesList,
  purchased,
  handleBuy,
}) {
  return (
    <Card className="w-72 m-10" key={index}>
      <CardHeader shadow={false} floated={false} className="h-72">
        <img
          src={course.imageLink}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {course.title}
          </Typography>
          <Typography color="blue-gray" className="text-sm font-medium">
            ₹{course.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {course.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {userType == "user" ? (
          <Button
            disabled={purchasedCoursesList.includes(course._id) ? true : false}
            color="blue"
            ripple={false}
            fullWidth={true}
            className={`bg-blue-500 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 ${
              purchasedCoursesList.includes(course._id)
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={handleBuy}
          >
            {purchasedCoursesList.includes(course._id)
              ? "Already purchased"
              : "Buy"}
          </Button>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
