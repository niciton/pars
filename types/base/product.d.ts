type TProduct = {
  "goods": {
    "goodsId": string,
    "title": string,
    "titleImage": string,
    "attributes": [
      {
        "title": string,
        "slug": string,
        "value": string,
        "group": {
          "title": string,
          "slug": string,
        },
        "isWebShort": boolean,
        "isWebListing": boolean,
        "sequence": number,
        "featureDescription": string
      },
      {
        "title": string,
        "slug": string,
        "value": string,
        "group": {
          "title": string,
          "slug": string
        },
        "isWebShort": boolean,
        "isWebListing": boolean,
        "sequence": number,
        "featureDescription": string
      },
      {
        "title": string,
        "slug": string,
        "value": string,
        "group": {
          "title": string,
          "slug": string
        },
        "isWebShort": boolean,
        "isWebListing": boolean,
        "sequence": number,
        "featureDescription": string,
      }
    ],
    "webUrl": string,
    "slug": string,
    "boxes": [
      {
        "box": string,
        "packagingUnit": string,
        "width": number,
        "height": number,
        "length": number,
        "weightUnit": string,
        "weight": number
      }
    ],
    "categoryId": string,
    "brand": "Palit",
    "contentFlags": [],
    "contentFlagsStr": [
      "nonfood"
    ],
    "stocks": number,
    "photosCount": number,
    "offersCount": number,
    "logisticTags": string[],
    "images": string[],
    "documents": [],
    "description": string,
    "videos": [],
    "mainCollectionId": string,
    "package": {
      "packageType": string,
      "minQuantity": string,
      "weightUnit": string
    }
  },
  "price": number,
  "priceFrom": number,
  "priceTo": number,
  "bonusPercent": number,
  "bonusAmount": number,
  "rating": number,
  "reviewCount": number,
  "offerCount": number,
  "finalPrice": number,
  "favoriteOffer": {
    "price": number,
    "bpgType": string,
    "merchant": {
      "id": string,
      "name": string,
      "url": string,
      "design": {
        "logoUrl": string
      },
      "merchantLogoUrl": string,
      "merchantUrl": string
    },
    "offerId": string,
    "isFavorite": boolean,
    "lastPrice": number,
    "finalPrice": number,
    "creditPaymentAmount": number,
    "installmentPaymentAmount": number,
    "bnplPaymentParams": any,
    "installmentPaymentParams": any,
    "bonusInfoGroups": [],
    "oldPrice": number,
    "oldPriceChangePercentage": number,
    "comboId": string,
    "locationId": string,
    "isBpgByMerchant": boolean,
    "hasBpg": boolean,
    "bpgDiscount": number,
    "showMerchant": boolean,
    "spasiboIsAvailable": boolean,
    "delivery": {
      "courier": {
        "code": string,
        "date": string,
        "amount": number,
        "isDefault": boolean,
        "maxDeliveryDays": any,
        "appliedPromotionTags": [],
        "isDbm": boolean,
        "deliveryPriceType": string,
        "displayName": string,
        "displayDeliveryDate": string,
        "deliveryOptions": [],
        "price": number,
        "minDeliveryDate": string
      }
    },
    "deliveryPossibilities": [
      {
        "code": "COURIER",
        "date": string,
        "amount": number,
        "isDefault": boolean,
        "maxDeliveryDays": any,
        "appliedPromotionTags": [],
        "isDbm": boolean,
        "deliveryPriceType": string,
        "displayName": string,
        "displayDeliveryDate": string,
        "deliveryOptions": []
      }
    ],
    "badges": [],
    "salesBlockInfo": any,
    "dueDate": string,
    "dueDateText": string,
    "pricesPerMeasurement": [],
    "availablePaymentMethod": {
      "paymentType": string,
      "analyticsPaymentType": string,
    },
    "availableQuantity": number,
    "crossedPriceChangePercentage": number,
    "warehouseId": string,
    "merchantSummaryRating": number
  },
  "relatedItems": [],
  "productSelectors": [],
  "extraOptions": [],
  "deliveryPossibilities": [
    {
      "code": string,
      "date": string,
      "amount": number,
      "isDefault": boolean,
      "maxDeliveryDays": any,
      "appliedPromotionTags": [],
      "isDbm": boolean,
      "deliveryPriceType": string,
      "displayName": string,
      "displayDeliveryDate": string,
      "deliveryOptions": []
    }
  ],
  "discounts": [],
  "contentFlagsStr": string[],
  "contentFlags": [],
  "badges": [],
  "crossedPrice": number,
  "crossedPricePeriod": string,
  "lastPrice": number,
  "isAvailable": boolean,
  "crossedPriceChangePercentage": number,
  "collections": string[],
  "hasOtherOffers": boolean,
  "comboId": string
}

export {
  TProduct,
}

const product: TProduct = {
  "goods": {
    "goodsId": "600012755497_82379",
    "title": "Видеокарта Palit NVIDIA GeForce RTX 4060 DUAL OC (NE64060T19P1-1070D)",
    "titleImage": "https://main-cdn.sbermegamarket.ru/mid9/hlr-system/325/707/268/711/124/0/600012755497b0.jpeg",
    "attributes": [
      {
        "title": "Объем видеопамяти, ГБ",
        "slug": "",
        "value": "8",
        "group": {
          "title": "Основные характеристики",
          "slug": ""
        },
        "isWebShort": true,
        "isWebListing": true,
        "sequence": 40,
        "featureDescription": ""
      },
      {
        "title": "Базовая частота, МГц",
        "slug": "",
        "value": "2670",
        "group": {
          "title": "Основные характеристики",
          "slug": ""
        },
        "isWebShort": true,
        "isWebListing": true,
        "sequence": 50,
        "featureDescription": ""
      },
      {
        "title": "Рекомендуемая мощность блока питания, Вт",
        "slug": "",
        "value": "650",
        "group": {
          "title": "Основные характеристики",
          "slug": ""
        },
        "isWebShort": true,
        "isWebListing": true,
        "sequence": 120,
        "featureDescription": "Видеокарта рассчитана на установку в компьютер,  выходная мощность блока питания которого не должна быть ниже указанной величины (определяется производителем)."
      }
    ],
    "webUrl": "https://megamarket.ru/catalog/details/videokarta-palit-nvidia-ne64060t19p1-1070d-600012755497/",
    "slug": "videokarta-palit-nvidia-ne64060t19p1-1070d-600012755497_82379",
    "boxes": [
      {
        "box": "1",
        "packagingUnit": "см",
        "width": 18.5,
        "height": 8,
        "length": 36.5,
        "weightUnit": "кг",
        "weight": 1.1
      }
    ],
    "categoryId": "10611",
    "brand": "Palit",
    "contentFlags": [],
    "contentFlagsStr": [
      "nonfood"
    ],
    "stocks": 1,
    "photosCount": 1,
    "offersCount": 1,
    "logisticTags": [
      "ANYPVZ",
      "ANYPVZ20",
      "DSM",
      "FF",
      "MGT",
      "MGT20",
      "PSM10",
      "REGFULL30",
      "SAMOKAT",
      "SBLM135",
      "SBLM150",
      "SBLM30",
      "SBLM60",
      "SBLMMGT_13X",
      "SBLMMGT_AVIA"
    ],
    "images": [
      "https://main-cdn.sbermegamarket.ru/mid9/hlr-system/325/707/268/711/124/0/600012755497b0.jpeg"
    ],
    "documents": [],
    "description": "<p><strong><u>Видеокарта Palit PA-RTX4060 DUAL OC 8GB</u></strong></p><ul><li><p>Назначение:игровая</p></li><li><p>Технология «0 децибел»<br>Ядра для трассировки лучей 3rd Generation<br>Тензорные ядра 4th Generation<br>Архитектура NVIDIA Ada Lovelace<br>DLSS 3<br>NVIDIA Reflex<br>NVIDIA Broadcast<br>Resizable BAR<br>Трассировка лучей в реальном времени<br>NVIDIA Highlights<br>NVIDIA Multi-Projection<br>NVIDIA Ansel<br>NVIDIA FreeStyle<br>NVIDIA Vulkan RT API<br>NVIDIA G-SYNC<br>NVIDIA Omniverse<br>NVIDIA GPU Boost<br>NVIDIA ShadowPlay<br>NVIDIA (NVENC) 1x 8th Generation<br>Декодер NVIDIA (NVDEC) 5th Generation<br>Кодирование AV1<br>Декодирование AV1<br>CUDA-возможности 8.9<br>Поддержка VR</p></li></ul>",
    "videos": [],
    "mainCollectionId": "12101",
    "package": {
      "packageType": "PIECE_TYPE",
      "minQuantity": "0",
      "weightUnit": "UNKNOWN_WEIGHT_UNIT"
    }
  },
  "price": 40965,
  "priceFrom": 40965,
  "priceTo": 0,
  "bonusPercent": 0,
  "bonusAmount": 0,
  "rating": 5,
  "reviewCount": 254,
  "offerCount": 1,
  "finalPrice": 40965,
  "favoriteOffer": {
    "price": 40965,
    "bpgType": "UNKNOWN_BPG_TYPE",
    "merchant": {
      "id": "82379",
      "name": "PleerRu",
      "url": "",
      "design": {
        "logoUrl": ""
      },
      "merchantLogoUrl": "https://min-lb-vip.goods.ru/mms/img/1695106217726-665e8d27-2079-41ef-84ee-21337b913cdd",
      "merchantUrl": "/shop/pleerru-82379/"
    },
    "offerId": "0",
    "isFavorite": true,
    "lastPrice": 40965,
    "finalPrice": 40965,
    "creditPaymentAmount": 0,
    "installmentPaymentAmount": 0,
    "bnplPaymentParams": null,
    "installmentPaymentParams": null,
    "bonusInfoGroups": [],
    "oldPrice": 0,
    "oldPriceChangePercentage": 0,
    "comboId": "600012755497_82379//",
    "locationId": "",
    "isBpgByMerchant": false,
    "hasBpg": false,
    "bpgDiscount": 0,
    "showMerchant": false,
    "spasiboIsAvailable": false,
    "delivery": {
      "courier": {
        "code": "COURIER",
        "date": "",
        "amount": 1,
        "isDefault": false,
        "maxDeliveryDays": null,
        "appliedPromotionTags": [],
        "isDbm": true,
        "deliveryPriceType": "UNKNOWN_DELIVERY_PRICE_DISPLAY_TYPE",
        "displayName": "Доставит продавец\nот 2 дней",
        "displayDeliveryDate": "",
        "deliveryOptions": [],
        "price": 1,
        "minDeliveryDate": ""
      }
    },
    "deliveryPossibilities": [
      {
        "code": "COURIER",
        "date": "",
        "amount": 1,
        "isDefault": false,
        "maxDeliveryDays": null,
        "appliedPromotionTags": [],
        "isDbm": true,
        "deliveryPriceType": "UNKNOWN_DELIVERY_PRICE_DISPLAY_TYPE",
        "displayName": "Доставит продавец\nот 2 дней",
        "displayDeliveryDate": "",
        "deliveryOptions": []
      }
    ],
    "badges": [],
    "salesBlockInfo": null,
    "dueDate": "DEFAULT_DELIVERY_OFFER_DUE_DATE",
    "dueDateText": "",
    "pricesPerMeasurement": [],
    "availablePaymentMethod": {
      "paymentType": "",
      "analyticsPaymentType": "no_payment_available"
    },
    "availableQuantity": 0,
    "crossedPriceChangePercentage": -6,
    "warehouseId": "",
    "merchantSummaryRating": 0
  },
  "relatedItems": [],
  "productSelectors": [],
  "extraOptions": [],
  "deliveryPossibilities": [
    {
      "code": "COURIER",
      "date": "",
      "amount": 1,
      "isDefault": false,
      "maxDeliveryDays": null,
      "appliedPromotionTags": [],
      "isDbm": true,
      "deliveryPriceType": "UNKNOWN_DELIVERY_PRICE_DISPLAY_TYPE",
      "displayName": "Доставит продавец\nот 2 дней",
      "displayDeliveryDate": "",
      "deliveryOptions": []
    }
  ],
  "discounts": [],
  "contentFlagsStr": [
    "nonfood"
  ],
  "contentFlags": [],
  "badges": [],
  "crossedPrice": 43770,
  "crossedPricePeriod": "01.01 - 07.01",
  "lastPrice": 40965,
  "isAvailable": true,
  "crossedPriceChangePercentage": -6,
  "collections": [
    "2400",
    "2401",
    "2676",
    "1060213",
    "1060218",
    "1060219",
    "12011",
    "12012",
    "12101",
    "12782",
    "14692",
    "7599934",
    "7806135",
    "7928698",
    "7928717",
    "7928758",
    "7966267",
    "7966636",
    "7968361",
    "7968379",
    "7968393",
    "7969264",
    "7969295",
    "7969395",
    "7969464",
    "7969816",
    "7970103",
    "7970185",
    "7970396",
    "7970398",
    "7970400",
    "7971356",
    "7971374",
    "7971387",
    "21165",
    "104744",
    "128919",
    "490938",
    "3480382",
    "4018149",
    "4328345",
    "4336417",
    "4339323",
    "4339372",
    "4342331",
    "4342381",
    "4347791",
    "4403446",
    "4427359",
    "4586838",
    "4586849",
    "4770908",
    "5232145",
    "5363386",
    "5391419",
    "5443410",
    "5465287",
    "5652318",
    "5868378",
    "5878904",
    "6075633",
    "6085400",
    "7286197",
    "7286218",
    "7670980",
    "7691695",
    "7691853",
    "7691876",
    "7694677",
    "7707288",
    "7718832",
    "7722312",
    "7722321",
    "7722498",
    "7750362",
    "7808883",
    "7838741",
    "7852876",
    "7852877",
    "7852878",
    "7852881",
    "7852882",
    "7852883",
    "7852884",
    "7853228",
    "7875630",
    "7882416",
    "7882627",
    "7882795",
    "7882799",
    "7883202",
    "7883503",
    "7895764",
    "7899907",
    "7899911",
    "7913250",
    "7913252",
    "7913253",
    "7969954",
    "7971155",
    "7971163",
    "7971164",
    "7971170",
    "7971837",
    "7971909"
  ],
  "hasOtherOffers": false,
  "comboId": "600012755497_82379/82379/"
};