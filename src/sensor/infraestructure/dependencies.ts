import { PgsqlDateRepository } from "./pgsqlDateRepository";
import { AddDateUseCase } from "../application/addDateUseCase";
import { AddDateController } from "./controller/addDateController";


export const pgsqlDateRepository = new PgsqlDateRepository();

export const addDateUseCase = new AddDateUseCase(pgsqlDateRepository);
export const addDateController = new AddDateController(addDateUseCase);

