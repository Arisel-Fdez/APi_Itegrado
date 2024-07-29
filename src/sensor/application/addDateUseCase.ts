import { Data } from "../domain/data";
import { DataRepository } from "../domain/dataRepository";

export class AddDateUseCase {
    constructor(readonly dataRepository: DataRepository) {}
    async run(userId: number, RitCardiaco: string, Spo: string, Object: string, Pulso: number): Promise<Data | null> {
        try {
            const createdDates = await this.dataRepository.addDate(userId, RitCardiaco, Spo, Object, Pulso);
            return createdDates;
        } catch (error) {
            console.error("Error in addDateUseCase:", error);
            return null;
        }
    }
}