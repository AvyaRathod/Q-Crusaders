import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function adminportal() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((response) => response.json())
      .then((data) => {
        setDataList(data.doc);
        console.log(data);
      });
  }, []);
  return (
    <>
      <div className="text-white text-4xl text-center mt-12 mb-5 font-bold">
        Admin Portal
      </div>
      <div className="grid grid-cols-2 ">
        {dataList.map((item) => (
          <div
            key={item.id}
            className="bg-white text-black w-[40vw] h-[45vh] overflow-y-auto mx-auto my-4 p-4 rounded-[8px]"
          >
            <div className="text-lg font-bold ">{item.id}</div>
            <br />
            <div>
              <strong>Emotion(NLP) </strong>: {item.emotion}
            </div>
            <div>
              <strong>Emotion(History)</strong> : {item.History}
            </div>
            <div>
              <strong>Summary :</strong>
              {item.summary}
            </div>
            <br />
            <div>
              <strong>Solution</strong> :<br /> {item.companyImps}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default adminportal;
