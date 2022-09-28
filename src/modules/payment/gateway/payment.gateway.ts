import Transaction from "../domain/transaction.entity";

export default interface PaymentGateway {
    save(input: Transaction) : Promise<Transaction>
}