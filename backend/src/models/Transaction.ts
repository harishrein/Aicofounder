import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/database';
import { User } from './User';
import { Client } from './Client';

interface TransactionAttributes {
  id: string;
  user_id: string;
  client_id?: string;
  amount: number;
  type: string;
  category?: string;
  status: string;
  date: Date;
  description?: string;
  reference_number?: string;
  payment_method?: string;
  processor_id?: string;
  processor_type?: string;
  recurring: boolean;
  recurring_interval?: string;
  tax_amount?: number;
  tags: string[];
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: string;
  public user_id!: string;
  public client_id?: string;
  public amount!: number;
  public type!: string;
  public category?: string;
  public status!: string;
  public date!: Date;
  public description?: string;
  public reference_number?: string;
  public payment_method?: string;
  public processor_id?: string;
  public processor_type?: string;
  public recurring!: boolean;
  public recurring_interval?: string;
  public tax_amount?: number;
  public tags!: string[];
  public metadata!: Record<string, any>;
  public created_at!: Date;
  public updated_at!: Date;

  // Associations
  public user?: User;
  public client?: Client;
}

Transaction.init({
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
  client_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'clients',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  type: {
    type: DataTypes.ENUM('invoice_sent', 'payment_received', 'expense', 'refund', 'adjustment', 'revenue', 'cost'),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'cancelled'),
    defaultValue: 'pending',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reference_number: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  payment_method: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  processor_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  processor_type: {
    type: DataTypes.ENUM('stripe', 'paypal', 'bank_transfer', 'cash', 'check'),
    allowNull: true,
  },
  recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  recurring_interval: {
    type: DataTypes.ENUM('weekly', 'monthly', 'quarterly', 'annually'),
    allowNull: true,
  },
  tax_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
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
  modelName: 'Transaction',
  tableName: 'transactions',
  underscored: true,
});

// Define associations
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Client.hasMany(Transaction, { foreignKey: 'client_id', as: 'transactions' });

export { Transaction, TransactionAttributes, TransactionCreationAttributes };