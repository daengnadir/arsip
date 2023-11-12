'use strict';
const bcrypt = require("bcrypt")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Users", [
      {
        userName: "Pengguna 1",
        password: bcrypt.hashSync("PPG123", 10),
        email: "user1@gmail.com",
        image:"https://ik.imagekit.io/wx1jhmfkq/1_K66ESN2Z8.png?updatedAt=1699756799404",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
