-- ==============================================
-- Inserción de datos: Privilegio
-- ==============================================
INSERT INTO PRIVILEGIO (pri_accion)
VALUES ('CREATE'),
       ('DELETE'),
       ('UPDATE'),
       ('READ');

-- ==============================================
-- Inserción de datos: Rol
-- ==============================================
INSERT INTO ROL (rol_nombre, rol_descripcion)
VALUES ('EMPLEADO', 'Rol de empleado'),
       ('CLIENTE', 'Rol de cliente'),
       ('PROVEEDOR', 'Rol de proveedor'),
       ('ADMINISTRADOR', 'Rol de administrador');

-- ==============================================
-- Inserción de datos: Privilegio Rol
-- ==============================================
INSERT INTO PRIVILEGIO_ROL (fk_rol_id, fk_pri_id)
VALUES (1, 1), -- EMPLEADO - CREATE
       (1, 3), -- EMPLEADO - UPDATE
       (1, 4), -- EMPLEADO - READ
       (2, 4), -- CLIENTE - READ
       (3, 4), -- PROVEEDOR - READ
       (4, 1), -- ADMINISTRADOR - CREATE
       (4, 2), -- ADMINISTRADOR - DELETE
       (4, 3), -- ADMINISTRADOR - UPDATE
       (4, 4); -- ADMINISTRADOR - READ

-- ==============================================
-- Inserción de datos: Usuarios Empleados
-- ==============================================
INSERT INTO USUARIO (usu_nombre_usuario, usu_contrasena, usu_email, fk_rol_id, fk_per_id, fk_cjd_id, fk_ctn_id, fk_com_id)
VALUES 
('jperez', 'password123', 'jperez@ucabair.com', 4, 1, NULL, NULL, NULL),  -- Administrador
('mgomez', 'password123', 'mgomez@ucabair.com', 1, 2, NULL, NULL, NULL),  -- Empleado
('pmartinez', 'password123', 'pmartinez@ucabair.com', 1, 3, NULL, NULL, NULL),  -- Empleado
('lfernandez', 'password123', 'lfernandez@ucabair.com', 1, 4, NULL, NULL, NULL),  -- Empleado
('crodriguez', 'password123', 'crodriguez@ucabair.com', 1, 5, NULL, NULL, NULL),  -- Empleado
('amorales', 'password123', 'amorales@ucabair.com', 1, 6, NULL, NULL, NULL),  -- Empleado
('jhernandez', 'password123', 'jhernandez@ucabair.com', 1, 7, NULL, NULL, NULL),  -- Empleado
('mlopez', 'password123', 'mlopez@ucabair.com', 1, 8, NULL, NULL, NULL),  -- Empleado
('lgarcia', 'password123', 'lgarcia@ucabair.com', 1, 9, NULL, NULL, NULL),  -- Empleado
('svega', 'password123', 'svega@ucabair.com', 1, 10, NULL, NULL, NULL),  -- Empleado
('dramos', 'password123', 'dramos@ucabair.com', 1, 11, NULL, NULL, NULL),  -- Empleado
('ltorres', 'password123', 'ltorres@ucabair.com', 1, 12, NULL, NULL, NULL),  -- Empleado
('aruiz', 'password123', 'aruiz@ucabair.com', 1, 13, NULL, NULL, NULL),  -- Empleado
('cdiaz', 'password123', 'cdiaz@ucabair.com', 1, 14, NULL, NULL, NULL),  -- Empleado
('mmejia', 'password123', 'mmejia@ucabair.com', 1, 15, NULL, NULL, NULL),  -- Empleado
('gortiz', 'password123', 'gortiz@ucabair.com', 1, 16, NULL, NULL, NULL),  -- Empleado
('rnavarro', 'password123', 'rnavarro@ucabair.com', 1, 17, NULL, NULL, NULL),  -- Empleado
('spineda', 'password123', 'spineda@ucabair.com', 1, 18, NULL, NULL, NULL),  -- Empleado
('fserrano', 'password123', 'fserrano@ucabair.com', 1, 19, NULL, NULL, NULL),  -- Empleado
('dcastillo', 'password123', 'dcastillo@ucabair.com', 1, 20, NULL, NULL, NULL),  -- Empleado
('jsuarez', 'password123', 'jsuarez@ucabair.com', 1, 21, NULL, NULL, NULL),  -- Empleado
('eespinosa', 'password123', 'eespinosa@ucabair.com', 1, 22, NULL, NULL, NULL),  -- Empleado
('ccorrea', 'password123', 'ccorrea@ucabair.com', 1, 23, NULL, NULL, NULL),  -- Empleado
('eguzman', 'password123', 'eguzman@ucabair.com', 1, 24, NULL, NULL, NULL),  -- Empleado
('vsantana', 'password123', 'vsantana@ucabair.com', 1, 25, NULL, NULL, NULL),  -- Empleado
('oalvarez', 'password123', 'oalvarez@ucabair.com', 1, 26, NULL, NULL, NULL),  -- Empleado
('gmontoya', 'password123', 'gmontoya@ucabair.com', 1, 27, NULL, NULL, NULL),  -- Empleado
('vpalacios', 'password123', 'vpalacios@ucabair.com', 1, 28, NULL, NULL, NULL),  -- Empleado
('sblanco', 'password123', 'sblanco@ucabair.com', 1, 29, NULL, NULL, NULL),  -- Empleado
('abermudez', 'password123', 'abermudez@ucabair.com', 1, 30, NULL, NULL, NULL),  -- Empleado
('ecabrera', 'password123', 'ecabrera@ucabair.com', 1, 31, NULL, NULL, NULL),  -- Empleado
('mzambrano', 'password123', 'mzambrano@ucabair.com', 1, 32, NULL, NULL, NULL),  -- Empleado
('fjimenez', 'password123', 'fjimenez@ucabair.com', 1, 33, NULL, NULL, NULL),  -- Empleado
('pacosta', 'password123', 'pacosta@ucabair.com', 1, 34, NULL, NULL, NULL),  -- Empleado
('hmendoza', 'password123', 'hmendoza@ucabair.com', 1, 35, NULL, NULL, NULL),  -- Empleado
('cpena', 'password123', 'cpena@ucabair.com', 1, 36, NULL, NULL, NULL),  -- Empleado
('eibarra', 'password123', 'eibarra@ucabair.com', 1, 37, NULL, NULL, NULL),  -- Empleado
('larce', 'password123', 'larce@ucabair.com', 1, 38, NULL, NULL, NULL),  -- Empleado
('tbarrera', 'password123', 'tbarrera@ucabair.com', 1, 39, NULL, NULL, NULL),  -- Empleado
('tperez', 'password123', 'tperez@ucabair.com', 1, 40, NULL, NULL, NULL);  -- Empleado

-- ===================================================
-- Inserción de datos: Usuarios Cliente Naturales
-- ===================================================
INSERT INTO USUARIO (usu_nombre_usuario, usu_contrasena, usu_email, fk_rol_id, fk_ctn_id, fk_per_id, fk_cjd_id, fk_com_id)
VALUES 
('juanperez', 'password123', 'juanperez@ucabair.com', 2, 1, NULL, NULL, NULL),  -- Cliente Natural
('mariagomez', 'password123', 'mariagomez@ucabair.com', 2, 2, NULL, NULL, NULL),  -- Cliente Natural
('luisrodriguez', 'password123', 'luisrodriguez@ucabair.com', 2, 3, NULL, NULL, NULL),  -- Cliente Natural
('anamartinez', 'password123', 'anamartinez@ucabair.com', 2, 4, NULL, NULL, NULL),  -- Cliente Natural
('pedrolopez', 'password123', 'pedrolopez@ucabair.com', 2, 5, NULL, NULL, NULL),  -- Cliente Natural
('sofiahernandez', 'password123', 'sofiahernandez@ucabair.com', 2, 6, NULL, NULL, NULL),  -- Cliente Natural
('carlosgonzalez', 'password123', 'carlosgonzalez@ucabair.com', 2, 7, NULL, NULL, NULL),  -- Cliente Natural
('luisadiaz', 'password123', 'luisadiaz@ucabair.com', 2, 8, NULL, NULL, NULL),  -- Cliente Natural
('miguelramirez', 'password123', 'miguelramirez@ucabair.com', 2, 9, NULL, NULL, NULL),  -- Cliente Natural
('isabeltorres', 'password123', 'isabeltorres@ucabair.com', 2, 10, NULL, NULL, NULL);  -- Cliente Natural


-- ===================================================
-- Inserción de datos: Usuarios Cliente Jurídicos
-- ===================================================
INSERT INTO USUARIO (usu_nombre_usuario, usu_contrasena, usu_email, fk_rol_id, fk_cjd_id, fk_per_id, fk_ctn_id, fk_com_id)
VALUES 
('ultrafly', 'password123', 'ultrafly@ucabair.com', 2, 1, NULL, NULL, NULL),  -- Cliente Jurídico
('horizonair', 'password123', 'horizonair@ucabair.com', 2, 2, NULL, NULL, NULL),  -- Cliente Jurídico
('starwings', 'password123', 'starwings@ucabair.com', 2, 3, NULL, NULL, NULL),  -- Cliente Jurídico
('aeroconnect', 'password123', 'aeroconnect@ucabair.com', 2, 4, NULL, NULL, NULL),  -- Cliente Jurídico
('airplanet', 'password123', 'airplanet@ucabair.com', 2, 5, NULL, NULL, NULL),  -- Cliente Jurídico
('skylimit', 'password123', 'skylimit@ucabair.com', 2, 6, NULL, NULL, NULL),  -- Cliente Jurídico
('aerodream', 'password123', 'aerodream@ucabair.com', 2, 7, NULL, NULL, NULL),  -- Cliente Jurídico
('spaceconnect', 'password123', 'spaceconnect@ucabair.com', 2, 8, NULL, NULL, NULL),  -- Cliente Jurídico
('volareair', 'password123', 'volareair@ucabair.com', 2, 9, NULL, NULL, NULL),  -- Cliente Jurídico
('surairlines', 'password123', 'surairlines@ucabair.com', 2, 10, NULL, NULL, NULL);  -- Cliente Jurídico

-- ===================================================
-- Inserción de datos: Usuarios Proveedores
-- ===================================================
INSERT INTO USUARIO (usu_nombre_usuario, usu_contrasena, usu_email, fk_rol_id, fk_com_id, fk_per_id, fk_ctn_id, fk_cjd_id)
VALUES 
('metalesgalacticos', 'password123', 'metalesgalacticos@ucabair.com', 3, 1, NULL, NULL, NULL),  -- Proveedor
('aceroplus', 'password123', 'aceroplus@ucabair.com', 3, 2, NULL, NULL, NULL),  -- Proveedor
('titaniofusion', 'password123', 'titaniofusion@ucabair.com', 3, 3, NULL, NULL, NULL),  -- Proveedor
('aleacioneselite', 'password123', 'aleacioneselite@ucabair.com', 3, 4, NULL, NULL, NULL),  -- Proveedor
('kevlarforce', 'password123', 'kevlarforce@ucabair.com', 3, 5, NULL, NULL, NULL),  -- Proveedor
('compositesxtremo', 'password123', 'compositesxtremo@ucabair.com', 3, 6, NULL, NULL, NULL),  -- Proveedor
('alumatrix', 'password123', 'alumatrix@ucabair.com', 3, 7, NULL, NULL, NULL),  -- Proveedor
('fusionaluminio', 'password123', 'fusionaluminio@ucabair.com', 3, 8, NULL, NULL, NULL),  -- Proveedor
('acerostop', 'password123', 'acerostop@ucabair.com', 3, 9, NULL, NULL, NULL),  -- Proveedor
('superaceros', 'password123', 'superaceros@ucabair.com', 3, 10, NULL, NULL, NULL);  -- Proveedor
