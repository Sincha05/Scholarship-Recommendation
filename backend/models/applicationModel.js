module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scholarship_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'scholarship_id']
      }
    ]
  });

  Application.associate = (models) => {
    Application.belongsTo(models.Scholarship, {
      foreignKey: 'scholarship_id',
      as: 'scholarship'
    });
  };

  return Application;
};