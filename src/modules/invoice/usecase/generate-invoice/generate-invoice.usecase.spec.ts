import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        save: jest.fn(),
    }
};

describe("Generate invoice usecase tests", () => {

    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
            id: "1",
            name: "Invoice 1",
            document: "Invoice document",
            street: "Invoice street",
            number: "Invoice number",
            complement: "Invoice complement",
            city: "Invoice city",
            state: "Invoice state",
            zipCode: "Invoice zipcode",
            items: [
                {
                    id: "P1",
                    name: "Product 1",
                    price: 10,
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        var result = await usecase.execute(input);

        expect(repository.save).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.city).toBe(input.city);
        expect(result.complement).toBe(input.complement);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.total).toBe(10);
    });

});