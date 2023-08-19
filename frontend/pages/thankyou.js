import React from "react";
import { useRouter } from "next/router";

export default function thankyou() {
  return (
    <div className="flex flex-col justify-center align-center text-center py-10  h-[50vh] mt-[150px]">
      <div className="my-auto text-4xl ">THANK YOU</div>
      <div className="md:text-2xl w-[40%] mx-auto md:leading-10 font-serif my-auto">
        For taking out your valuable time and sharing your experience with us
        :&#x29; ! Hope to hear again from you!
      </div>
    </div>
  );
}
