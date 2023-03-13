
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

export interface PostAttributes {
    id: number;
    userId: number;
    title: string;
    describtion: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PostInfo extends Optional<PostAttributes, "id"> { }


export class Post extends Model<PostAttributes, PostInfo> implements PostAttributes {
    public id!: number;
    public userId!: number;
    public title!: string;
    public describtion!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    describtion: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
})