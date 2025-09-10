
import { createClient, MicroCMSQueries, MicroCMSListResponse } from "microcms-js-sdk";
import { Products } from "./microcmsType";

const apiKey = process.env.MICROCMS_API_KEY || "";
const serviceDomain = process.env.MICROCMS_SERVICE_ID || "";

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});

//大カテゴリーごとに取得（skincare,face,eye,rip,brushごとの一覧)
export const getList = async(endpoint: string, queries?: MicroCMSQueries): Promise<MicroCMSListResponse<Products>> => {
  const listData = await client.getList<Products>({
    endpoint,
    queries,
  });
  return listData;
};

//一つ一つ商品を取得(詳細)
export const getDetail = async(endpoint: string, contentId: string, queries?: MicroCMSQueries): Promise<Products> => {
  const detailData = await client.getListDetail<Products>({
    endpoint,
    contentId,
    queries,
  });
  return detailData;
};

if(!process.env.MICROCMS_WEBHOOK_SECRETKEY) {
  throw new Error("MICROCMS_WEBHOOK_SECRETKEY is required");
}

export const microcmsWebhookSecretkey = process.env.MICROCMS_WEBHOOK_SECRETKEY