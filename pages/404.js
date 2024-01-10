import Image from "next/image";
import React, { useState } from "react";

export default function custom404(){

    const [loaded , setLoaded] = useState(0)
    return (
      <>
        <div className="error_not_found_parent">
          <div className="content">
            <Image
              className={loaded == 0 ? "image" : "image img_loaded"}
              src={"/images/404.svg"}
              width={600}
              height={600}
              priority={true}
              loading={"eager"}
              onLoad={() => setLoaded(1)}
            />
            <div className="message">صفحه مورد نظر پیدا نشد.</div>
          </div>
        </div>
      </>
    );
}