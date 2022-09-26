import Id from "../../../@shared/domain/value-object/id.value-object";

export default class AddProductInputDto {
    id?: string;
    name: string;
    description:  string;
    purchasePrice: number;
    stock: number;
}

export interface AddProductOutputDto {
    id: Id;
    name: string;
    description:  string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}