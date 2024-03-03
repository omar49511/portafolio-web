import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="w-[88vw] max-w-[1392px] p-0 mx-auto my-52">
      <div className=" w-full max-w-[940px] mx-auto my-0">
        <span className="w-64 h-64 bg-black">
          <Image
            className="w-[16rem] h-[16rem] mx-auto filter brightness-200 invert grayscale"
            width={200}
            height={200}
            priority={true}
            src="https://www.notion.so/cdn-cgi/image/format=auto,width=384,quality=100/front-static/pages/404/404-illo.png"
            alt=""
          />
        </span>
        <h1 className="font-sans font-extrabold text-6xl text-center">
          Lo sentimos, no se encontró esa página.
        </h1>
        <div className="flex justify-center mt-10">
          <Link className="bg-white rounded-md text-black px-4 py-2" href="/">
            Go back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
