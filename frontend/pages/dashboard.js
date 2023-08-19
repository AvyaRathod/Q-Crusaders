import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  // const [formData, setFormData] = useState({ feedback: "", id: "" });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = { feedback: formData.feedback, id: "abc" };
  //   fetch("http://localhost:5000/feedback", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       // Handle data
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  console.log(user);
  if (loading) return <h1>Loading</h1>;
  if (!user) route.push("/auth/login");
  if (user)
    return (
      <div className="flex flex-col justify-center align-center text-center py-10  h-auto  my-6 glass w-[50%] mx-auto">
        <form
          action="http://localhost:5000/feedback"
          method="post"
          className="flex flex-col align-center justify-center"
        >
          <label
            htmlFor="id"
            className="m-auto text-left w-[50%] mb-3 text-xl mt-5"
          >
            Email:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            required
            className="w-[50%] mx-auto p-4 text-black rounded-[8px]"
          />
          <label
            htmlFor="feedback"
            className=" m-auto text-left w-[50%] mt-6 text-xl"
          >
            Feedback:
          </label>
          <textarea
            type="text"
            id="feedback"
            name="feedback"
            required
            className="text-black p-4 mt-3 w-[50%] mx-auto  h-[30vh] rounded-[8px]"
          />

          <input
            type="submit"
            value="Submit"
            className=" cursor-pointer mt-4 p-4 px-14 text-lg bg-black text-white rounded-lg font-medium  w-auto mx-auto"
          />
        </form>
      </div>
    );
}
