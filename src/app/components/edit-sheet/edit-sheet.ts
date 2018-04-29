export interface dataStuct {
 sheetId:string;
    sheetName: string;
    sheetDate: Date;
      sheetNotes: string;
      active: boolean;
      updated:Date,
      updatedBy:string;
      created:Date;
      createdBy:string;
  data: any[];

}

export interface HandsondataInt {
  rowId: number;
  Inventory: number;
  Title: string;
  AmazonListingPrice: number;
  SupplierName: string;
  SupplierPrice: number;
  AmazonFee: number;
  Taxes: number;
  ShippingFee: number;
  Profit: number;
  ProfitMargin: number;
  AmazonUrl: string;
  SupplierUrl: string;


}