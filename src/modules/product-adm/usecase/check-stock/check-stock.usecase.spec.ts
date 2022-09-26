import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product",
    description: "ProductDescription",
    purchasePrice: 10,
    stock: 10,
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("Checkstock usecase unit test", () => {

    it("should get stock of a product", async () => {
        const productRepository = MockRepository();
        const checkStockUsecase = new CheckStockUseCase(productRepository);
        const input = {
            productId: "1",
        }

        const result = await checkStockUsecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBe("1")
        expect(result.stock).toBe(10);
    })
})