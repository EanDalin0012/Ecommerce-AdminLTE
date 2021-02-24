import { commonModel } from './common';
export class ProductDetail extends commonModel {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    resourceImgId: string;
    description: string;
    webShow?: boolean;
    mobileShow?: boolean;
    productDetailId?: string;

}
