module.exports = (sequelize, DataTypes) => {
  const Scholarship = sequelize.define('Scholarship', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2)
    },
    field_of_study: {
      type: DataTypes.STRING(100)
    },
    eligibility_criteria: {
      type: DataTypes.TEXT
    }
  });

  Scholarship.associate = (models) => {
    Scholarship.hasMany(models.Application, {
      foreignKey: 'scholarship_id',
      as: 'applications'
    });
  };

  return Scholarship;
};