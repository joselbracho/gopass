const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { validateProject } = require('../validators/project.validator');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', authMiddleware, validateProject, projectController.createProject);
router.put('/:id', authMiddleware, validateProject, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
