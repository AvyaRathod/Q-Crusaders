import React from "react";
import { useRouter } from "next/router";

export default function thankyou() {
  return (
    <div className="flex flex-col justify-center align-center text-center py-10  h-[50vh] my-6">
      <div className="md:text-4xl w-[40%] mx-auto md:leading-10 font-serif">
        Thank you for taking out your valuable time and sharing your experience
        with us :&#x29; !{" "}
      </div>
      <div className="text-xl mt-[200px] font-serif">
        Hope to hear from you again soon!
      </div>
    </div>
  );
}
