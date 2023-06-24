db.createUser({
  user: 'admin',
  password: 'test',
  roles: [
    {
      role: 'readWrite',
      db: 'admin',
    },
  ],
});
