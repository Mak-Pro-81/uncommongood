interface IPayloadData {
  style: string;
  currency: string;
  maximumFractionDigits?: number;
}

export const currencyFormatter = (
  value: number,
  locale?: string,
  payload?: IPayloadData
) => new Intl.NumberFormat(locale, payload).format(value);
