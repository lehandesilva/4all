import Image from "next/image";
import Link from "next/link";

export default function FourallLogo() {
  const siteImg =
    "https://4all-image-storage.s3.eu-west-2.amazonaws.com/4allSiteLogo.png";

  return (
    <div>
      <Link href="/">
        <Image src={siteImg} width={150} height={150} alt="4all Logo" />
      </Link>
    </div>
  );
}
