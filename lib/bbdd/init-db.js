'use strict';

require('dotenv').config();

const {mongoose, connectMongoose, User} = require('../../models');

main().catch(err => console.error(err));

async function main() {

    await initUsers();
    mongoose.connection.close();
}

async function initUsers() {
    const { deletedCount } = await User.deleteMany();
    console.log(`${deletedCount} user${deletedCount>1 ? 's': ''} deleted`);
    const result = await User.insertMany(
        {
            email:'admin@example.com',
            password: '4321'
        }
    );
    console.log(`${result.length} user${result.length>1 ? 's': ''} inserted`);
}