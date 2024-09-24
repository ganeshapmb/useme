// types/filters.ts
export interface Filters {
    categories?: string[];
    brand?: string[];
    gender?: string;
    discount?: number;
    size?: string[];
    color?: string[];
    price?: [number, number]; // Price range slider as a tuple [min, max]
    page?: number;
    pageSize?: number;
  }
  