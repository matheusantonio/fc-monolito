import Id from "../value-object/id.value-object";

export default class BaseEntity {
    private _id: Id;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id? : Id, createdAt? : Date, updatedAt? : Date) {
        this._id = id || new Id();
        this._createdAt = createdAt || new Date();
        this._updatedAt = updatedAt || new Date();
    }

    public get id(): Id {
        return this._id;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }
    public set createdAd(value: Date) {
        this._createdAt = value;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
    public set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}