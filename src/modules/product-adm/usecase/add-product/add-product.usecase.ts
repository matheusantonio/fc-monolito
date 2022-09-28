import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import AddProductInputDto, { AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute (input: AddProductInputDto) : Promise<AddProductOutputDto> {

        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        }

        const product = new Product(props);
        this._productRepository.add(product);

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            purchasePrice: product.purchasePrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }
    }
}