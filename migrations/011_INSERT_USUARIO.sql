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
-- Inserción de datos: Usuario
-- ==============================================
INSERT INTO USUARIO (usu_nombre_usuario, usu_contrasena, usu_email, fk_rol_id, fk_per_id, fk_cjd_id, fk_ctn_id, fk_com_id)
VALUES
    ('jperez', 'password123', 'jperez@ucabair.com', 1, 1, NULL, NULL, NULL),          -- Juan
    ('mgarcia', 'password123', 'mgarcia@ucabair.com', 1, 2, NULL, NULL, NULL),       -- María
    ('clopez', 'password123', 'clopez@ucabair.com', 1, 3, NULL, NULL, NULL),        -- Carlos
    ('erodriguez', 'password123', 'erodriguez@ucabair.com', 4, 4, NULL, NULL, NULL), -- Elena
    ('jmartinez', 'password123', 'jmartinez@ucabair.com', 1, 5, NULL, NULL, NULL),    -- José
    ('pgarcia', 'password123', 'pgarcia@ucabair.com', 2, NULL, NULL, 1, NULL),       -- Pedro
    ('atorres', 'password123', 'atorres@ucabair.com', 2, NULL, NULL, 2, NULL),         -- Ana
    ('mlopez', 'password123', 'mlopez@ucabair.com', 2, NULL, NULL, 3, NULL),        -- Martín
    ('lruiz', 'password123', 'lruiz@ucabair.com', 2, NULL, NULL, 4, NULL),           -- Laura
    ('msanchez', 'password123', 'msanchez@ucabair.com', 2, NULL, NULL, 5, NULL),    -- Miguel
    ('acaracas', 'password123', 'acaracas@ucabair.com', 2, NULL, 1, NULL, NULL), -- Aerolíneas Caracas C.A.
    ('aapure', 'password123', 'aapure@ucabair.com', 2, NULL, 2, NULL, NULL), -- Aerolíneas Apure C.A.
    ('pamazonas', 'password123', 'pamazonas@ucabair.com', 3, NULL, NULL, NULL, 1), -- Proveedor Amazonas
    ('panzoategui', 'password123', 'panzoategui@ucabair.com', 3, NULL, NULL, NULL, 2), -- Proveedor Anzoátegui
    ('pbolivar', 'password123', 'pbolivar@ucabair.com', 3, NULL, NULL, NULL, 3), -- Proveedor Bolívar
    ('pcapital', 'password123', 'pcapital@ucabair.com', 3, NULL, NULL, NULL, 4), -- Proveedor Distrito Capital
    ('pzulia', 'password123', 'pzulia@ucabair.com', 3, NULL, NULL, NULL, 5); -- Proveedor Zulia