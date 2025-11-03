CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(255),
    phone VARCHAR(50),
    industry VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new',
    source VARCHAR(100),
    priority_score INTEGER DEFAULT 5,
    estimated_value DECIMAL(10,2),
    budget DECIMAL(10,2),
    authority_level VARCHAR(50),
    need_description TEXT,
    timeline VARCHAR(100),
    last_contact_date DATE,
    next_action_date DATE,
    assigned_agent VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_priority_score ON leads(priority_score DESC);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();