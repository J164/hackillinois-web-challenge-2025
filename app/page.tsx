import { Rye } from "next/font/google";
import Schedule from "./components/schedule";
import Wheel from "./components/wheel";

const rye = Rye({
  subsets: ['latin'],
  weight: "400"
});

export default function Home() {
  return (
    <main className={`flex flex-col items-center justify-center p-0 ${rye.className}`}>
      <Wheel />
      <div className="mt-[25%]">
        <Schedule />
      </div>
    </main>
  );
}
