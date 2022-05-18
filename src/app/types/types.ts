export interface Currency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
  buyAndSale?: string;
}

export interface RatesToPublish {
  USD?: Currency;
  EUR?: Currency;
}

export interface SelectedCurrency {
  id: string;
  currency: string;
}

export interface DefaultSelectValues {
  GIVE: SelectedCurrency;
  GET: SelectedCurrency;
}
