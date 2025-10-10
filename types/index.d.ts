type AuthDataType = {  
    id: number;
    email: string;
    name: string;
    verified: boolean;
}

export type CouponType = 'code' | 'link';

export interface Coupon {
    id: number;
    title: string;
    is_exclusive: boolean;
    expires_at: string | null; // ISO datetime string or null
    uses: number;
    shares_count: number;
    active: boolean;
    photo_cover: string | null;
    type: CouponType;
    featured: boolean;
    created_at: string; // ISO datetime string
    vendor: string;
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