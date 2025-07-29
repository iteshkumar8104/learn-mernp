const mongoose = require('mongoose');
const Page = require('./models/Page');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edulearn';

const samplePages = [
  {
    title: 'Introduction to Mathematics',
    content: 'Mathematics is the study of numbers, shapes, and patterns. It is essential for science, engineering, and everyday life.',
    media: [
      {
        type: 'image',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mathematics-symbols.svg/1200px-Mathematics-symbols.svg.png',
        description: 'Mathematical symbols'
      }
    ],
    role: 'teacher'
  },
  {
    title: 'Basics of Physics',
    content: 'Physics is the natural science that studies matter, its motion and behavior through space and time.',
    media: [
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/2F6b6v6v6v6', 
        description: 'Physics basics video'
      }
    ],
    role: 'teacher'
  },
  {
    title: 'History of Education',
    content: 'Education has evolved over centuries from informal teaching to formal schooling systems worldwide.',
    media: [
      {
        type: 'image',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Old_school_building.jpg/1200px-Old_school_building.jpg',
        description: 'Historical school building'
      }
    ],
    role: 'teacher'
  }
];

async function seedPages() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding pages.');

    // Find an admin user to assign as createdBy
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      throw new Error('No admin user found. Please create an admin user first.');
    }

    // Set createdBy to admin user's ObjectId
    samplePages.forEach(page => {
      page.createdBy = adminUser._id;
    });

    await Page.deleteMany({});
    console.log('Cleared existing pages.');

    await Page.insertMany(samplePages);
    console.log('Sample pages inserted.');

    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error seeding pages:', error);
    mongoose.disconnect();
  }
}

seedPages();
