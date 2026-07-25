"use client";

import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";

// ZULA community page. Intentionally blank for now.
export default function CommunityPage() {
  return (
    <section className="h-full flex flex-col gap-10 bg-[#0d0012] text-white">
      {/* content coming next */}
      <div className="flex flex-col gap-1 items-center justify-center w-full rounded-b-2xl  p-3">
        <img src="/zula.png" className="w-20" alt="" />
        <h1 className="display-md text-center">
          Join our Community as you wait <br /> for your order
        </h1>
      </div>
      <div className="p-5 flex flex-col gap-5">
        {/* our socials  buttons*/}
        <Highlighter
          color="#d274f7"
          className="display-md text-xl"
          action="underline"
        >
          Leave a review and share your experience
        </Highlighter>
        <div className="flex flex-col gap-5">
          {/* card no 1  snap for yellow*/}
          <Link
            className=" flex justify-between w-full rounded-md bg-white
      text-black  p-3"
            href={"/"}
          >
            <img src="/snapchat.png" alt="" />
            <div className=" justify-end flex flex-col items-end">
              <h1 className="display-md text-xl">Join our SnapChat</h1>
              <p className="text-sm">Start a streak with our community</p>
            </div>
          </Link>
          {/* card no 2  insta for yellow*/}
          <Link
            href={"/"}
            className=" flex justify-between w-full rounded-md bg-white
      text-black  p-3"
          >
            <img src="/insta.png" alt="" />
            <div className=" justify-end flex flex-col items-end">
              <h1 className="display-md text-xl">Join our Instagram</h1>
              <p className="text-sm">The Zula Verse awaits you</p>
            </div>
          </Link>
        </div>

        {/* community photos
        <div className="flex items-center justify-center">
          <p className="display-md under tracking-wide">Community gallery</p>
        </div> */}
      </div>
    </section>
  );
}
