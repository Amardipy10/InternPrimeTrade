import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Task from './models/Task.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create demo users
    const users = await User.create([
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123456',
        bio: 'This is a demo account for testing purposes.'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123456',
        bio: 'Admin account with sample tasks.'
      }
    ]);

    console.log('Created demo users');

    // Create sample tasks for demo user
    const demoTasks = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive README and API documentation',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        user: users[0]._id
      },
      {
        title: 'Review pull requests',
        description: 'Review and merge pending PRs from team members',
        status: 'pending',
        priority: 'medium',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        user: users[0]._id
      },
      {
        title: 'Setup CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment',
        status: 'pending',
        priority: 'high',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        user: users[0]._id
      },
      {
        title: 'Fix login bug',
        description: 'Investigate and fix the reported login issue on mobile',
        status: 'completed',
        priority: 'high',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        user: users[0]._id
      },
      {
        title: 'Update dependencies',
        description: 'Update all npm packages to their latest versions',
        status: 'pending',
        priority: 'low',
        user: users[0]._id
      }
    ];

    await Task.create(demoTasks);
    console.log('Created sample tasks');

    console.log('\n=== Seed completed successfully! ===');
    console.log('\nDemo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: demo123456');
    console.log('\nEmail: admin@example.com');
    console.log('Password: admin123456');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
