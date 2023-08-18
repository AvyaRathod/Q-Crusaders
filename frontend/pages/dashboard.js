import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [formData, setFormData] = useState({ feedback: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { feedback: formData.feedback, userName: "d" };
    fetch("http://localhost:5000/feedback", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  console.log(user);
  if (loading) return <h1>Loading</h1>;
  if (!user) route.push("/auth/login");
  if (user)
    return (
      <div className="flex flex-col justify-center align-center text-center py-10  h-[50vh] my-6">
        <form
          action="http://localhost:5000/feedback"
          method="post"
          className="flex flex-col align-center justify-center"
        >
          <label htmlFor="feedback" className=" m-auto text-left w-[50%] mb-3">
            Feedback:
          </label>
          <textarea
            type="text"
            id="feedback"
            name="feedback"
            required
            className="text-black p-4 w-auto mx-auto w-[50vw] h-[30vh] rounded-[21px]"
          />
          <input
            type="submit"
            value="Submit"
            className=" cursor-pointer mt-4 py-2 px-4 text-lg bg-blue-500 text-white rounded-lg font-medium  w-auto mx-auto"
          />
        </form>
      </div>
    );
}
