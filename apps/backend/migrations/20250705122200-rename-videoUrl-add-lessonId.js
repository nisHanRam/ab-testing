"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await Promise.all([
      queryInterface.renameColumn("Videos", "videoUrl", "url"),

      queryInterface.addColumn("Videos", "lessonId", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.renameColumn("Videos", "url", "videoUrl"),
      queryInterface.removeColumn("Videos", "lessonId"),
    ]);
  },
};
