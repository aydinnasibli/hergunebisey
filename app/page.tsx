import Image from "next/image";
import styles from "./page.module.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"], // Ensure Latin characters are loaded
  variable: "--font-poppins", // Set a CSS variable
});

export default function Home() {
  return (
    <div><h1>Bücürotti</h1></div>

  );
}
