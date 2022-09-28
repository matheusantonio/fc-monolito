import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import ProductModel from "../repository/product.model";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("Invoice repository tests", () => {
    let sequelize: Sequelize;

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

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

        await facade.save(input);
        
        const invoice = await InvoiceModel.findOne({where: {id: "1"}, include: [ProductModel]})

        expect(invoice.id).toEqual(input.id);
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.street).toBe(input.street);
        expect(invoice.number).toBe(input.number);
        expect(invoice.complement).toBe(input.complement);
        expect(invoice.city).toBe(input.city);
        expect(invoice.state).toBe(input.state);
        expect(invoice.zipCode).toBe(input.zipCode);
        expect(invoice.products[0].id).toBe(input.items[0].id);
        expect(invoice.products[0].name).toBe(input.items[0].name);
        expect(invoice.products[0].price).toBe(input.items[0].price);
        expect(invoice.createdAt).toEqual(input.createdAt);
        expect(invoice.updatedAt).toEqual(input.updatedAt);
    });

    it("should find invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const product = {
            id: "P1",
            name: "Product 1",
            price: 10,
        }

        const invoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Invoice document",
            street: "Street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            products: [ product ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            include: [{model: ProductModel}],
        });

        const input = {
            id: "1"
        }

        const result = await facade.find(input);

        expect(invoice.id).toEqual(result.id);
        expect(invoice.name).toBe(result.name);
        expect(invoice.document).toBe(result.document);
        expect(invoice.street).toBe(result.address.street);
        expect(invoice.number).toBe(result.address.number);
        expect(invoice.complement).toBe(result.address.complement);
        expect(invoice.city).toBe(result.address.city);
        expect(invoice.state).toBe(result.address.state);
        expect(invoice.zipCode).toBe(result.address.zipCode);
        expect(invoice.products[0].id).toBe(result.items[0].id);
        expect(invoice.products[0].name).toBe(result.items[0].name);
        expect(invoice.products[0].price).toBe(result.items[0].price);
        expect(invoice.createdAt).toEqual(result.createdAt);
    });

})