import Link from "next/link";
import React from "react";

const Navbar = () => {
  const days = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
  ];
  return (
    <>
      {days.map((day) => (
        <Link
          key={day}
          href={"/days/" + day}
          style={{ marginRight: "3px", marginLeft: "3px" }}
        >
          Day {day}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
