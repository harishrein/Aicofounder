import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/database';
import { User } from './User';

interface LeadAttributes {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  company?: string;
  phone?: string;
  industry?: string;
  status: string;
  source?: string;
  priority_score: number;
  estimated_value?: number;
  budget?: number;
  authority_level?: string;
  need_description?: string;
  timeline?: string;
  last_contact_date?: Date;
  next_action_date?: Date;
  assigned_agent?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

interface LeadCreationAttributes extends Optional<LeadAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: string;
  public user_id!: string;
  public name!: string;
  public email?: string;
  public company?: string;
  public phone?: string;
  public industry?: string;
  public status!: string;
  public source?: string;
  public priority_score!: number;
  public estimated_value?: number;
  public budget?: number;
  public authority_level?: string;
  public need_description?: string;
  public timeline?: string;
  public last_contact_date?: Date;
  public next_action_date?: Date;
  public assigned_agent?: string;
  public notes?: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Associations
  public user?: User;
}

Lead.init({
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
    type: DataTypes.ENUM('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'closed_won', 'closed_lost'),
    defaultValue: 'new',
  },
  source: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  priority_score: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 10,
    },
  },
  estimated_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  authority_level: {
    type: DataTypes.ENUM('decision_maker', 'influencer', 'user', 'unknown'),
    allowNull: true,
  },
  need_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timeline: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_contact_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  next_action_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  assigned_agent: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  modelName: 'Lead',
  tableName: 'leads',
  underscored: true,
});

// Define association
Lead.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Lead, { foreignKey: 'user_id', as: 'leads' });

export { Lead, LeadAttributes, LeadCreationAttributes };