import { MicroCMSImage, MicroCMSContentId, MicroCMSDate, } from "microcms-js-sdk";

export type Category = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Products = {
  name: string;
  thumbnail: MicroCMSImage;
  images?: MicroCMSImage[];
  description?: string;
  richDescription?: string;
  price: number;
  release?: string;
  color?: string
  bigCategory: Category;
  smallCategory?: Category;
  promotionalText?: string
} & MicroCMSContentId &
  MicroCMSDate;

