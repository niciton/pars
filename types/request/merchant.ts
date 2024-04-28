export type TMerchant = {
  merchant: {
    id: string,
    name: string,
    minDeliveryDate: string,
    partnerId: string,
    legalInfo: {
      name: string,
      address: string,
      orgn: string,
      inn: string,
      form: string,
      phone: string,
      email: string
    },
    design: {
      logoUrl: string,
      mapLogoUrl: string
    },
    slug: string,
    url: string,
    siteUrl: string,
    confirmationTimeLimit: string,
    fullName: string,
    categories: []
  },
  summaryRating: number,
  idealOrderRate: number,
  feedbackRate: number,
  dateActivation: string
}
