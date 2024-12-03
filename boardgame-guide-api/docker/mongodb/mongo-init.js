print('######################        Start       #######################');




rs.initiate()

db = db.getSiblingDB('brettspiel');
db.createUser({
	user: "test",
	pwd: "test",
	roles: [{role: "readWrite", db: "brettspiel"}]}
);
db.createCollection('user');




print('######################        END         ######################');
