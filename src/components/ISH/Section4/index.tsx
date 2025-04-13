import landing from "../../../../data/data";
import {
  AddCircleOutlineOutlined,
  ArrowForwardIosTwoTone,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Media, Product } from "@/payload-types";

async function getPopularProducts(): Promise<Product[]> {
  const payload = await getPayload({ config: configPromise });
  const popularProducts = await payload.find({
    collection: "products",
    where: {
      // Your filtering criteria
      _status: { equals: "published" },
    },
    limit: 8,
  });

  // console.log(popularProducts);

  return popularProducts.docs || null;
}

const Section4 = async () => {
  const products = await getPopularProducts();

  return (
    <div className="py-10 px-3 font-oxygen">
      <div className="flex justify-between md:px-10">
        <div className=" md:w-3/5 xl:w-2/5">
          <h1 className="text-trueGray text-4xl font-bold max-md:w-4/6">
            {landing.sec4.title}
          </h1>
          <p className=" text-trueGraysub mt-5">{landing.sec4.sub}</p>
        </div>
        <div className=" md:my-auto max-md:absolute max-md:right-2 max-md:mt-3">
          <Link
            href="/search"
            className=" px-4 py-3 bg-customBlue rounded-3xl text-grayfortext font-exo font-semibold"
          >
            View All <ArrowForwardIosTwoTone fontSize="small" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:gap-3 max-xl:gap-20 xl:grid-cols-4  py-20 ">
        {products.map((prd: Product) => {
          const img = prd.gallery as Media[];
          const imageSrc = img[0]?.url || "/media/image-hero1-1.webp";
          return (
            <Link
              href={`/products/${prd.slug}`}
              className=" mx-auto hover:scale-110"
              key={prd.id}
            >
              <div className="flex flex-col mx-auto mb-5">
                <div className="relative w-[155px] h-[155px] sm:w-[270px] sm:h-[260px] mb-3">
                  <Image
                    className="rounded-xl"
                    src={imageSrc}
                    alt={prd.title}
                    fill
                  />
                </div>
                <div>
                  <h1 className=" text-center sm:text-[22px]  text-grayforbottomtext">
                    {prd.title}
                  </h1>
                  <div className=" flex justify-between px-1"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Section4;
