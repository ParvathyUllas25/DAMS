const request = require('supertest');
const app = require('../server');
const sequelize = require("../database");
const User = require("../models/user");
const Event = require("../models/event");

describe("Test Admin Dashboard", async () => {
    // Set the db object to a variable which can be accessed throughout the whole test file
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.sync({ force: true })
        await sequelize.drop({ force: true })
        await sequelize.close()
    })

    const user = 'admin'+Date.now()+'admin-test';

    const adminUser=new User({
        fullName: user,
        email: `${user}@admin.com`,
        password: '123456',
        role: 'admin',
        zipcode: 'zipcode'
    });

    it("Accessing Admin Dashboard", async () => {
        
        await adminUser.save().catch((err)=> {
            console.log("Error: ", err);
        });
        
        const admin = {
            email: `${user}@admin.com`,
            password: '123456',
        };
        
        let jwtToken = '';

        await request(app)
        .post("/api/v1/login")
        .send(admin)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Welcome Back!');
            jwtToken = response.body.token;
        });

        await request(app)
        .get("/api/v1/admin")
        .set({'x-auth-token': jwtToken})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Welcome to Admin Page!');
        });
        
    });

    it("Creating Event", async () => {
        
        await adminUser.save().catch((err)=> {
            console.log("Error: ", err);
        });
        
        const admin = {
            email: `${user}@admin.com`,
            password: '123456',
        };
        
        let jwtToken = '';

        await request(app)
        .post("/api/v1/login")
        .send(admin)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Welcome Back!');
            jwtToken = response.body.token;
        });

        const event = {
            event_name:'Katrina',
            disaster_type: 'Hurricane',
            severity: 'extreme',
            location: 'Louisiana',
            event_date: '2006-05-01',
            zipcode: '70601',
            items: ''
        };

        await request(app)
        .post("/api/v1/create_event")
        .set({'x-auth-token': jwtToken})
        .send(event)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event Created!');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event deleted successfully');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event doesnot exist');
        });
        
    });

    it("Edit Event", async () => {
        
        await adminUser.save().catch((err)=> {
            console.log("Error: ", err);
        });
        
        const admin = {
            email: `${user}@admin.com`,
            password: '123456',
        };
        
        let jwtToken = '';

        await request(app)
        .post("/api/v1/login")
        .send(admin)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Welcome Back!');
            jwtToken = response.body.token;
        });

        const event = {
            event_name:'Katrina',
            disaster_type: 'Hurricane',
            severity: 'extreme',
            location: 'Louisiana',
            event_date: '2006-05-01',
            zipcode: '70601',
            items: ''
        };

        await request(app)
        .post("/api/v1/create_event")
        .set({'x-auth-token': jwtToken})
        .send(event)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event Created!');
        });

        const upd_event = {
            event_name:'Katrina',
            disaster_type: 'Hurricane',
            severity: 'extreme',
            location: 'Louisiana',
            event_date: '2006-05-01',
            zipcode: '70601',
            items: 'Blankets:20'
        };

        await request(app)
        .post("/api/v1/edit_event")
        .set({'x-auth-token': jwtToken})
        .send(upd_event)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event Expired Successfully!');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event deleted successfully');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event doesnot exist');
        });
        
    });

    it("Expire Event", async () => {
        
        await adminUser.save().catch((err)=> {
            console.log("Error: ", err);
        });
        
        const admin = {
            email: `${user}@admin.com`,
            password: '123456',
        };
        
        let jwtToken = '';

        await request(app)
        .post("/api/v1/login")
        .send(admin)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Welcome Back!');
            jwtToken = response.body.token;
        });

        const event = {
            event_name:'Katrina',
            disaster_type: 'Hurricane',
            severity: 'extreme',
            location: 'Louisiana',
            event_date: '2006-05-01',
            zipcode: '70601',
            items: ''
        };

        await request(app)
        .post("/api/v1/create_event")
        .set({'x-auth-token': jwtToken})
        .send(event)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event Created!');
        });

        await request(app)
        .post("/api/v1/expire_event")
        .set({'x-auth-token': jwtToken})
        .send({event_name:'Katrina'})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event Expired Successfully!');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event deleted successfully');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event doesnot exist');
        });
        
    });

    it("Get Event", async () => {
        
        await adminUser.save().catch((err)=> {
            console.log("Error: ", err);
        });
        
        const admin = {
            email: `${user}@admin.com`,
            password: '123456',
        };
        
        let jwtToken = '';

        await request(app)
        .post("/api/v1/login")
        .send(admin)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Welcome Back!');
            jwtToken = response.body.token;
        });

        const event = {
            event_name:'Katrina',
            disaster_type: 'Hurricane',
            severity: 'extreme',
            location: 'Louisiana',
            event_date: '2006-05-01',
            zipcode: '70601',
            items: ''
        };

        await request(app)
        .post("/api/v1/create_event")
        .set({'x-auth-token': jwtToken})
        .send(event)
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event Created!');
        });

        await request(app)
        .get("/api/v1/get_event")
        .set({'x-auth-token': jwtToken})
        .send({event_name:'Katrina'})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event deleted successfully');
        });

        await request(app)
        .get("/api/v1/get_event")
        .set({'x-auth-token': jwtToken})
        .send({event_name:'Random'})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event doesnot exist');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event deleted successfully');
        });

        await request(app)
        .post("/api/v1/delete_event")
        .set({'x-auth-token': jwtToken})
        .send({'event_name': event['event_name']})
        .then(async (response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Event doesnot exist');
        });
        
    });

    // After all tersts have finished, close the DB connection
    afterAll(async () => {
        await sequelize.close()
    })
});