import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/database';
import { User } from './User';

interface ClientAttributes {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  company?: string;
  phone?: string;
  industry?: string;
  status: string;
  contract_value?: number;
  billing_cycle?: string;
  start_date?: Date;
  payment_terms: number;
  health_score: number;
  notes?: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id!: string;
  public user_id!: string;
  public name!: string;
  public email?: string;
  public company?: string;
  public phone?: string;
  public industry?: string;
  public status!: string;
  public contract_value?: number;
  public billing_cycle?: string;
  public start_date?: Date;
  public payment_terms!: number;
  public health_score!: number;
  public notes?: string;
  public tags!: string[];
  public created_at!: Date;
  public updated_at!: Date;

  // Associations
  public user?: User;
}

Client.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'prospective', 'churned'),
    defaultValue: 'active',
  },
  contract_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  billing_cycle: {
    type: DataTypes.ENUM('monthly', 'quarterly', 'annually', 'one_time'),
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  payment_terms: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
  },
  health_score: {
    type: DataTypes.INTEGER,
    defaultValue: 50,
    validate: {
      min: 0,
      max: 100,
    },
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Client',
  tableName: 'clients',
  underscored: true,
});

// Define association
Client.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Client, { foreignKey: 'user_id', as: 'clients' });

export { Client, ClientAttributes, ClientCreationAttributes };