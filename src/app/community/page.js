"use client";

import { useRouter } from "next/navigation";
import { Highlighter } from "@/components/ui/highlighter";
import { useFlow } from "../providers/FlowProvider";
import { Button } from "../components/ui/button";
import { Copy } from "lucide-react";

const SNAPCHAT_URL = "https://www.snapchat.com/add/eatatzula";
const INSTAGRAM_URL =
  "https://www.instagram.com/zulaa.ke?igsh=Nmk0MDhvb2t6c2l0";

export default function CommunityPage() {
  const router = useRouter();
  const { reset } = useFlow();

  const orderAgain = () => {
    reset();
    router.push("/full-menu");
  };

  // helper to copy text
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Copied: ${text}`); // swap with toast if you prefer
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section
      className="h-full flex flex-col gap-10 zula-scroll bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/zulapurple.png')" }}
    >
      <div className="flex flex-col gap-1 items-center justify-center w-full rounded-b-2xl p-3">
        <img src="/zula.png" className="w-20" alt="" />
        <h1 className="display-md text-center">
          Join our Community as you wait <br /> for your order
        </h1>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Socials */}
        <Highlighter
          color="#d274f7"
          className="display-md text-xl"
          action="underline"
        >
          Leave a review and share your experience
        </Highlighter>

        <div className="flex flex-col gap-5">
          <a
            href={SNAPCHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between w-full rounded-md bg-white text-black p-3"
          >
            <img src="/snapchat.png" alt="" />
            <div className="justify-end flex flex-col items-end">
              <h1 className="display-md text-xl">Join our SnapChat</h1>
              <p className="text-sm">Start a streak with our community</p>
            </div>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between w-full rounded-md bg-white text-black p-3"
          >
            <img src="/insta.png" alt="" />
            <div className="justify-end flex flex-col items-end">
              <h1 className="display-md text-xl">Join our Instagram</h1>
              <p className="text-sm">The Zula Verse awaits you</p>
            </div>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/order")}
            className={"w-full display-lg text-lg h-10 tracking-wider"}
          >
            Re check Your Order
          </Button>
          <Button
            onClick={orderAgain}
            className={
              "w-full bg-purple-700 display-lg text-lg h-10 tracking-wider"
            }
          >
            Order Again
          </Button>

          <h1 className="display-md mt-3">Payment details</h1>
          <div>
            <div className="bg-white p-5 rounded-2xl">
              <p className="display-md">Paybill {"GAB COLLECT"}</p>
              <p className="flex items-center justify-between">
                Business Number{" "}
                <span className="flex gap-2">
                  630640{" "}
                  <Copy
                    className="w-4 cursor-pointer"
                    onClick={() => copyToClipboard("630640")}
                  />
                </span>
              </p>
              <p className="flex items-center justify-between">
                Account Number{" "}
                <span className="flex gap-2">
                  112300{" "}
                  <Copy
                    className="w-4 cursor-pointer"
                    onClick={() => copyToClipboard("112300")}
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
