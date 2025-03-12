import React from "react";
import Image from "next/image";
function Footer() {
  return (
    <div className="p-[40px] bg-[#4338CA]  text-white">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div>
            {" "}
            <Image
              src="/Logo-white.png"
              width={110}
              height={50}
              alt="Movie Logo"
            />
          </div>
          <p className="font-light">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col font-light gap-2">
            <h1>Contact Information</h1>
            <div className="flex flex-col">
              <div className="flex gap-4 items-center">
                <div>
                  {" "}
                  <Image
                    src="/email.png"
                    width={20}
                    height={50}
                    alt="Movie Logo"
                  />
                </div>
                <div className="flex flex-col">
                  <h1>Email:</h1>
                  <p>support@movieZ.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  {" "}
                  <Image
                    src="/phone.png"
                    width={20}
                    height={50}
                    alt="Movie Logo"
                  />
                </div>
                <div className="flex flex-col">
                  <h1>Phone:</h1>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[6px]">
            <h1>Follow us</h1>
            <h1>Facebook</h1>
            <h1>Instagram </h1>
            <h1>Twitter</h1>
            <h1>Youtube</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
