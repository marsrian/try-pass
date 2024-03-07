"use client";
import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 10000,
          style: {},
        }}
      />
    </>
  );
};

export default ToasterContext;
