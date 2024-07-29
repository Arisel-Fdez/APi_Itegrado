import { Data } from "../domain/data";
import { DataRepository } from "../domain/dataRepository";
import DateModel from "./models/dataModel";

export class PgsqlDateRepository implements DataRepository {


     async addDate(userId: number, RitCardiaco: string, Spo: string, Object: string, Pulso: number): Promise<Data | null> {
        try{
            const createDates = await DateModel.create({userId, RitCardiaco, Spo, Object, Pulso});
            return new Data(createDates.id, createDates.userId, createDates.RitCardiaco, createDates.Spo, createDates.Object, createDates.Pulso);
        } catch(error){
            console.error("Errro en PgsqlDates", error);
            return null;
        }
    }


    
}
