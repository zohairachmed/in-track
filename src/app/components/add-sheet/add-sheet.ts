export interface dataStuct {
    Id:string;
    SheetName:string;
    Date:Date;
    Notes:string;
    Ongoing:boolean;
    Handsondata:any[];
    
    }

  export interface HandsondataInt {
    
      Inventory:number;
      Title:string;
      AmazonListingPrice:number;
      SupplierName:string;
      SupplierPrice:number;
      AmazonFee:number;
      Taxes:number;
      ShippingFee:number;    
      Profit:number;
      ProfitMargin:number;     
      AmazonUrl:string;
      SupplierUrl:string;
      
    
    }