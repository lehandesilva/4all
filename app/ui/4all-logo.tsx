import Image from "next/image";
import svgLogo from "@/public/red.png";

export default function FourallLogo() {
  return (
    <div>
      <Image src={svgLogo} width={100} alt="4all Logo" />
    </div>
  );
}
