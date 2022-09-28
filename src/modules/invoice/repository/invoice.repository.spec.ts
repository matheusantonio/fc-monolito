import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import Product from "../domain/entity/product.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "./product.model";

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

    it("should find an invoice", async () => {
        
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

        const repository = new InvoiceRepository();
        const result = await repository.find(invoice.id);

        expect(result.id.id).toEqual(invoice.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.street);
        expect(result.address.number).toBe(invoice.number);
        expect(result.address.complement).toBe(invoice.complement);
        expect(result.address.city).toBe(invoice.city);
        expect(result.address.state).toBe(invoice.state);
        expect(result.address.zipCode).toBe(invoice.zipCode);
        expect(result.items[0].id.id).toBe(invoice.products[0].id);
        expect(result.items[0].name).toBe(invoice.products[0].name);
        expect(result.items[0].price).toBe(invoice.products[0].price);
        expect(result.createdAt).toEqual(invoice.createdAt);
        expect(result.updatedAt).toEqual(invoice.updatedAt);
    });

    it("should create an invoice", async () => {
        const product = new Product({
            id: new Id("P1"),
            name: "Product 1",
            price: 10,
        });

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Invoice document",
            address: new Address(
                "Street",
                "number",
                "complement",
                "city",
                "state",
                "zipCode",
            ),
            items: [ product ],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repository = new InvoiceRepository();
        await repository.save(invoice);

        const createdInvoice = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
            include: [{ model: ProductModel}]
        });

        expect(invoice.id.id).toEqual(createdInvoice.id);
        expect(invoice.name).toBe(createdInvoice.name);
        expect(invoice.document).toBe(createdInvoice.document);
        expect(invoice.address.street).toBe(createdInvoice.street);
        expect(invoice.address.number).toBe(createdInvoice.number);
        expect(invoice.address.complement).toBe(createdInvoice.complement);
        expect(invoice.address.city).toBe(createdInvoice.city);
        expect(invoice.address.state).toBe(createdInvoice.state);
        expect(invoice.address.zipCode).toBe(createdInvoice.zipCode);
        expect(invoice.items[0].id.id).toBe(createdInvoice.products[0].id);
        expect(invoice.items[0].name).toBe(createdInvoice.products[0].name);
        expect(invoice.items[0].price).toBe(createdInvoice.products[0].price);
        expect(invoice.createdAt).toEqual(createdInvoice.createdAt);
        expect(invoice.updatedAt).toEqual(createdInvoice.updatedAt);
    });
})