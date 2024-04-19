import Image from "next/image";

export default function FourallLogo() {
  const siteImg =
    "https://4all-image-storage.s3.eu-west-2.amazonaws.com/4allSiteLogo.png";

  return (
    <div>
      <Image src={siteImg} width={100} height={60} alt="4all Logo" />
    </div>
  );
}
