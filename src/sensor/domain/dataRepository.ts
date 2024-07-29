import { Data } from "./data";

export interface DataRepository {
    addDate(userId: number, RitCardiaco: string, Spo: string, Object: string, Pulso: number ): Promise<Data | null>;
}