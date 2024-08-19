import { Request } from "express";

type FilterProps = {
  category?: string;
  platforms?: { $in: string[] };
  price?: { $lt: number } | { $gt: number };
};

export default async function filterSearch(req: Request) {
  const { category, platforms, price } = req.query;
  const filter: FilterProps = {};
  const platformsString = platforms as string;
  const priceNumber = parseInt(price as string);

  const platformArr = platformsString?.split(",");

  if (category) filter.category = category as string;
  if (platformArr) filter.platforms = { $in: platformArr };
  if (priceNumber) {
    if (priceNumber === 40 || priceNumber === 80 || priceNumber === 120) {
      filter.price = { $lt: priceNumber };
    } else {
      filter.price = { $gt: priceNumber };
    }
  }

  return filter;
}
