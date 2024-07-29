import { Sequelize } from 'sequelize-typescript';

import UserModel from '../user/infraestructure/models/userModel';
import DataModel from '../sensor/infraestructure/models/dataModel';


export const sequelize = new Sequelize({
    dialect: 'postgres',
    port : 5432,
    host: 'arisel-mds-db.cdnrje7snfud.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    username: 'postgres',
    password: 'yeremi224',
    models: [UserModel, DataModel],
});

export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);  // Cierra la aplicación si hay un error de conexión
    }
}