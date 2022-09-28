import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address(
    "Invoice street",
    "Invoice number",
    "Invoice complement",
    "Invoice city",
    "Invoice state",
    "Invoice zipcode"
)

const items = [
    new Product({
        id: new Id("P1"),
        name: "Product 1",
        price: 10,
    })
]

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "Invoice document",
    address: address,
    items: items,
    createdAt: new Date(),
    updatedAt: new Date(),
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(invoice),
        save: jest.fn(),
    }
};

describe("Find invoice usecase tests", () => {

    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        }
        
        var result = await usecase.execute(input);

        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.total).toBe(invoice.total);
        expect(result.createdAt).toBe(invoice.createdAt);
    });

});