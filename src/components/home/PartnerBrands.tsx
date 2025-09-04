import Image from "next/image";

type Brand = {
  id: string;
  name: string;
  logoSrc: string;
};

type PartnerBrandsProps = {
  title?: string;
  brands?: Brand[];
};

const defaultBrands: Brand[] = [
    { id: "Brandmanny", name: "Brandmanny", logoSrc: "/images/brandmanny.png" },
    { id: "ticki-global", name: "Ticki Global", logoSrc: "/images/ticki_logo.png" },
    { id: "sealed", name: "Sealed Empire", logoSrc: "/images/sealed-empire.png" },
];

export default function PartnerBrands({
  title = "Partner Brands",
  brands = defaultBrands,
}: PartnerBrandsProps) {
  return (
    <section className="w-full bg-white md:py-0 !pb-16 py-16 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center">

        <div className="w-2/3 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 items-center justify-center">
          {brands.map((b) => (
            <div key={b.id} className="flex h-28 md:h-32 items-center justify-center bg-white px-4 py-6 ">
              <Image
                src={b.logoSrc}
                alt={b.name}
                width={220}
                height={80}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-90 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


