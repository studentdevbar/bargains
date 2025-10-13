type AuthDataType = {  
    id: number;
    email: string;
    name: string;
    verified: boolean;
}


export interface CouponType {
    id: number;
    title: string;
    is_exclusive: boolean;
    expires_at: string | null; // ISO datetime string or null
    favorites: number;
    shares_count: number;
    active: boolean;
    photo_cover: string | null;
    type: 'code' | 'link' | 'drop';
    featured: boolean;
    created_at: string; 
    vendor: string;
    drop_at: string | null;
    redeemed_at?: string;
    favourited?: boolean;
  }

// Params for GET /api/coupons
export interface CouponsQueryParams {
    page?: number;
    vendor_id?: number;
    category_id?: number;
    tag_ids?: string | number[]; // CSV string ("1,2,3") or array of ids
    tags?: string | number[]; // alias for tag_ids
    search?: string;
    per_page?: number; // default 15
    [key: string]: string | number | (string | number)[] | undefined;
}