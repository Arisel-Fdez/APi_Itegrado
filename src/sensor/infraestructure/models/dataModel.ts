import { Model, DataType, Table, Column, ForeignKey } from 'sequelize-typescript';
import UserModel from '../../../user/infraestructure/models/userModel';  // Asegúrate de ajustar la ruta según tu estructura de proyecto

@Table({
    tableName: 'data',
    timestamps: true
})
class DataModel extends Model {
    
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public userId!: number;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public RitCardiaco!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public Spo!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public Object!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public Pulso!: number;
}

export default DataModel;
