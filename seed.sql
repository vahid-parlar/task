SET IDENTITY_INSERT ProjectRoles ON
INSERT INTO ProjectRoles (Id,Title)
	VALUES (1,N'manager'),
		   (2,N'member');
SET IDENTITY_INSERT ProjectRoles OFF

SET IDENTITY_INSERT RolePermissions ON
INSERT INTO RolePermissions (Id,Action,ProjectRoleId)
	VALUES (1,N'AddMemmberShip',1);
SET IDENTITY_INSERT RolePermissions OFF

