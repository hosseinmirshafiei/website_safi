import UrlBase from "@/http/UrlHttp";

export default function Logo({settings}){


    return (
      <div className="logo_parent">
        {settings && (
          <div className="logo">
            <img src="/images/logo.png"/>
          </div>
        )}
      </div>
    );
}