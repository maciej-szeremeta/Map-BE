export interface SimpleAdEntity{
   id: string;
   lat: number;
   lon: number;
}

// Pełne dane z zapytania get
export interface AdEntity extends SimpleAdEntity{
   name: string;
   description: string;
   price: number;
   url: string;
}