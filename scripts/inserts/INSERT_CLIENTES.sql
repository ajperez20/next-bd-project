-- ==============================================
-- Inserción de datos: Cliente Natural
-- ==============================================
INSERT INTO CLIENTE_NATURAL (ctn_direccion, ctn_url_pagina, ctn_dni, ctn_nombre, ctn_apellido, fk_lug_id)
VALUES ('Calle Almagro 123', 'www.pedrogarcia.com', 'V111122223', 'Pedro', 'García', 10),
       ('Calle Castilla 456', 'www.anatorres.com', 'V222233334', 'Ana', 'Torres', 5),
       ('Calle Cervantes 789', 'www.martinlopez.com', 'V333344445', 'Martín', 'López', 3),
       ('Calle Granada 101', 'www.lauraruiz.com', 'V444455556', 'Laura', 'Ruiz', 4),
       ('Calle Sevilla 202', 'www.miguelsanchez.com', 'V555566667', 'Miguel', 'Sánchez', 5);

-- ==============================================
-- Inserción de datos: Cliente Jurídico
-- ==============================================
INSERT INTO CLIENTE_JURIDICO (cjd_direccion, cjd_url_pagina, cjd_rif, cjd_nombre, cjd_descripcion, fk_lug_id)
VALUES ('Av. Principal 123', 'www.aerolineascaracas.com', 'J123456789', 'Aerolíneas Caracas C.A.', 'Aerolíneas de Caracas', 10),
       ('Av. Bolívar 456', 'www.aerolineasapure.com', 'J876543210', 'Aerolíneas Apure C.A.', 'Aerolíneas de Apure', 3);

-- ==============================================
-- Inserción de datos: Cliente Teléfono
-- ==============================================
INSERT INTO TELEFONO (tel_codigo_area, tel_numero, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('+58', '4121112233', NULL, NULL, NULL, 1), -- Pedro García
       ('+58', '4142223344', NULL, NULL, NULL, 2), -- Ana Torres
       ('+58', '4163334455', NULL, NULL, NULL, 3), -- Martín López
       ('+58', '4244445566', NULL, NULL, NULL, 4), -- Laura Ruiz
       ('+58', '4265556677', NULL, NULL, NULL, 5), -- Miguel Sánchez
       ('+58', '4123456789', NULL, NULL, 1, NULL), -- Aerolíneas Caracas C.A.
       ('+58', '4145678901', NULL, NULL, 2, NULL); -- Aerolíneas Apure C.A.

-- ==============================================
-- Inserción de datos: Cliente Correo Electrónico
-- ==============================================
INSERT INTO CORREO_ELECTRONICO (cor_dir_correo, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('pedro.garcia@example.com', NULL, NULL, NULL, 1),      -- Pedro García
       ('ana.torres@example.com', NULL, NULL, NULL, 2),        -- Ana Torres
       ('martin.lopez@example.com', NULL, NULL, NULL, 3),      -- Martín López
       ('laura.ruiz@example.com', NULL, NULL, NULL, 4),        -- Laura Ruiz
       ('miguel.sanchez@example.com', NULL, NULL, NULL, 5),    -- Miguel Sánchez
       ('contact@aerolineascaracas.com', NULL, NULL, 1, NULL), -- Aerolíneas Caracas C.A.
       ('info@aerolineasapure.com', NULL, NULL, 2, NULL);      -- Aerolíneas Apure C.A.

-- ==============================================
-- Inserción de datos: Cliente Red Social
-- ==============================================
INSERT INTO RED_SOCIAL (res_usuario, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('pedro_garcia', NULL, NULL, NULL, 1),       -- Pedro
       ('ana_torres', NULL, NULL, NULL, 2),         -- Ana
       ('martin_lopez', NULL, NULL, NULL, 3),       -- Martín
       ('laura_ruiz', NULL, NULL, NULL, 4),         -- Laura
       ('miguel_sanchez', NULL, NULL, NULL, 5),     -- Miguel
       ('aerolineas_caracas', NULL, NULL, 1, NULL), -- Aerolíneas Caracas C.A.
       ('aerolineas_apure', NULL, NULL, 2, NULL); -- Aerolíneas Apure C.A.