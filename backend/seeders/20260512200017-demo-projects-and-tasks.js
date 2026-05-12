'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('gopass2026', 10);
    
    // Check if admin user already exists
    const users = await queryInterface.sequelize.query(
      `SELECT id from "Users" WHERE username = 'admin';`
    );

    if (users[0].length === 0) {
      await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }

    // Check if projects already exist
    const projectsCheck = await queryInterface.sequelize.query(
      `SELECT id from "Projects" LIMIT 1;`
    );

    if (projectsCheck[0].length === 0) {
      await queryInterface.bulkInsert('Projects', [{
        name: 'Website Redesign',
        description: 'Overhaul the corporate website with a modern look and improved user experience.',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Mobile App Development',
        description: 'Develop a cross-platform mobile application for iOS and Android.',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'API Gateway Refactor',
        description: 'Refactor the existing API gateway for better performance and scalability.',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'User Authentication System',
        description: 'Implement a robust user authentication system with JWT.',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      const projects = await queryInterface.sequelize.query(
        `SELECT id from "Projects";`
      );

      const projectRows = projects[0];

      if (projectRows.length >= 4) { // Ensure we have enough projects for tasks
        await queryInterface.bulkInsert('Tasks', [{
          title: 'Design Mockups for Homepage',
          description: 'Create initial design mockups for the homepage and key landing pages.',
          status: 'DONE',
          priority: 'HIGH',
          projectId: projectRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Develop Landing Page Components',
          description: 'Implement reusable React components for the landing page.',
          status: 'IN_PROGRESS',
          priority: 'MEDIUM',
          projectId: projectRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Setup Backend API',
          description: 'Initialize Node.js project with Express and Sequelize.',
          status: 'DONE',
          priority: 'HIGH',
          projectId: projectRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Implement User Authentication JWT',
          description: 'Integrate JSON Web Token for secure user authentication.',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          projectId: projectRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Define API Gateway Endpoints',
          description: 'Document and define all necessary API gateway endpoints.',
          status: 'TODO',
          priority: 'HIGH',
          projectId: projectRows[2].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Implement Rate Limiting',
          description: 'Add rate limiting to protect the API gateway from abuse.',
          status: 'TODO',
          priority: 'MEDIUM',
          projectId: projectRows[2].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Design Authentication Flow',
          description: 'Map out the user journey for login, registration, and password reset.',
          status: 'DONE',
          priority: 'HIGH',
          projectId: projectRows[3].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Implement OAuth 2.0 Integration',
          description: 'Integrate OAuth 2.0 for third-party authentication.',
          status: 'TODO',
          priority: 'HIGH',
          projectId: projectRows[3].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
