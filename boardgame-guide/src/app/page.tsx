import React from "react";
import {redirect} from "next/navigation";

export default function Home() {
  redirect("/game/splendor/1")
  return <></>;
}
