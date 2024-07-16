import { Rye } from "next/font/google";
import Schedule from "./components/schedule";

const rye = Rye({
  subsets: ['latin'],
  weight: "400"
});

export default function Home() {
  return (
    <main className={`flex flex-col items-center justify-center p-24 ${rye.className}`}>
      <Schedule />
    </main>
  );
}
