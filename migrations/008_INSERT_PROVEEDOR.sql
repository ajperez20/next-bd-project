-- ==============================================
-- Inserción de datos: Materia Prima
-- ==============================================
INSERT INTO MATERIA_PRIMA (rpm_nombre, rpm_descripcion)
VALUES ('Acero A36', 'Aleación de acero común para estructuras.'),
       ('Aluminio 7075', 'Aleación ligera, alta resistencia.'),
       ('Fibra de Carbono', 'Material ultraligero, muy resistente.'),
       ('Titanio Grado 5', 'Excelente resistencia y ligereza.'),
       ('Compuesto Kevlar', 'Material sintético muy resistente al impacto.');

-- ==============================================
-- Inserción de datos: Proveedor MP Stock
-- ==============================================
INSERT INTO PROVEEDOR_MP_STOCK (mtp_unidad_medida, mtp_cantida_disponible, fk_rpm_id)
VALUES ('Kg', 10000, 1), -- Acero A36
       ('Kg', 8000, 2),  -- Aluminio 7075
       ('Kg', 5000, 3),  -- Fibra de Carbono
       ('Kg', 7000, 4),  -- Titanio Grado 5
       ('Kg', 6000, 5);  -- Compuesto Kevlar

-- ==============================================
-- Inserción de datos: Proveedor
-- ==============================================
INSERT INTO PROVEEDOR (com_nombre, com_direccion, com_url_pagina, fk_mtp_id, fk_lug_id)
VALUES ('Proveedor Amazonas', 'Av. Orinoco 123', 'www.proveedoramazonas.com', 1, 1),
       ('Proveedor Anzoátegui', 'Calle Lechería 456', 'www.proveedoranzoategui.com', 2, 2),
       ('Proveedor Bolívar', 'Av. Paseo Caroní', 'www.proveedorbolivar.com', 3, 6),
       ('Proveedor Distrito Capital', 'Av. Universidad 101', 'www.proveedordcapital.com', 4, 10),
       ('Proveedor Zulia', 'Av. Bella Vista 202', 'www.proveedorzulia.com', 5, 24);

-- ==============================================
-- Inserción de datos: Redes Sociales de Proveedor
-- ==============================================
INSERT INTO RED_SOCIAL (res_usuario, fk_com_id)
VALUES ('proveedor_amazonas', 1),
       ('proveedor_anzoategui', 2),
       ('proveedor_bolivar', 3),
       ('proveedor_dcapital', 4),
       ('proveedor_zulia', 5);

-- ==============================================
-- Inserción de datos: Teléfonos de Proveedor
-- ==============================================
INSERT INTO TELEFONO (tel_codigo_area, tel_numero, fk_com_id)
VALUES ('+58', '2125551234', 1), -- Proveedor Amazonas
       ('+58', '2815555678', 2), -- Proveedor Anzoátegui
       ('+58', '2865559876', 3), -- Proveedor Bolívar
       ('+58', '2125554321', 4), -- Proveedor Distrito Capital
       ('+58', '2615558765', 5);
-- Proveedor Zulia

-- ==============================================
-- Inserción de datos: Correos Electrónicos de Proveedor
-- ==============================================
INSERT INTO CORREO_ELECTRONICO (cor_dir_correo, fk_com_id)
VALUES ('contacto@proveedoramazonas.com', 1),
       ('contacto@proveedoranzoategui.com', 2),
       ('contacto@proveedorbolivar.com', 3),
       ('contacto@proveedordcapital.com', 4),
       ('contacto@proveedorzulia.com', 5);