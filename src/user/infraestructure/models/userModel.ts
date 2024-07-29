import { Model, DataType, Table, Column, HasMany } from 'sequelize-typescript';
import DataModel from '../../../sensor/infraestructure/models/dataModel';  // Asegúrate de ajustar la ruta según tu estructura de proyecto

@Table({
    tableName: 'users',
    timestamps: true 
})
class UserModel extends Model {

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public name!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public last_name!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public email!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public password!: string;

    @HasMany(() => DataModel)
    public data!: DataModel[];
}

export default UserModel;
