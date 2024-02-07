CREATE TABLE IF NOT EXISTS users_roles(
    role__id VARCHAR(5) PRIMARY KEY,
    rolename VARCHAR(100)

);

-- INSERIMENTO RECORD DEFAULT

INSERT  INTO users_roles (role__id, rolename)
SELECT  'ADMIN', 'Admin'
WHERE   NOT EXISTS
        (   SELECT  1
            FROM    users_roles
            WHERE   role__id = 'ADMIN'
            AND     rolename = 'Admin'
        );

INSERT  INTO users_roles (role__id, rolename)
SELECT  'GUEST', 'Guest'
WHERE   NOT EXISTS
        (   SELECT  1
            FROM    users_roles
            WHERE   role__id = 'GUEST'
            AND     rolename = 'Guest'
        );


-- FINE INSERIMENTO RECORD DEFAULT PER I RUOLI

CREATE TABLE IF NOT EXISTS users(
    user__id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100),
    user_pwd VARCHAR(1000),
    userrole VARCHAR(5) NOT NULL DEFAULT 'GUEST',
    FOREIGN KEY (userrole) REFERENCES users_roles(role__id)
);