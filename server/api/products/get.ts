import { defineEventHandler } from 'h3';
import * as path from 'node:path'
import * as fs from 'node:fs'
import type { TProduct } from '~/types/base/product';
import type { TRequestProductGet } from '~/types/api/product';

export default defineEventHandler(async (event): Promise<TProduct[] | { error: string }> => {
  if (event.method !== "POST") return { error: "not POST request" }

  const requestBody: TRequestProductGet['body'] = (await readBody(event));
  // const requestBody: TRequestProductGet['body'] = { getAct: "all" }

  const filePath = path.join(process.cwd(), 'public', './data/products.json');
  const productsJson: TProduct[] = Object.freeze(JSON.parse(fs.readFileSync(filePath, 'utf-8')));

  let productIds: { [k: string]: TProduct } = {};

  for (const product of productsJson) {
    let productId = requestBody.getAct === "all" ? product.goods.webUrl : product.favoriteOffer.merchant.id;

    if (requestBody.getAct === "analog" && product.goods.webUrl !== requestBody.url) continue;

    if (productIds[productId]) {
      const { finalPrice, bonusAmount } = productIds[product.goods.webUrl];

      const oldPrice = finalPrice - bonusAmount;
      const newPrice = product.finalPrice - product.bonusAmount;

      if (oldPrice > newPrice) productIds[product.goods.webUrl] = product;
    } else {
      productIds[productId] = product;
    }
  }

  return (Object.values(productIds));
})