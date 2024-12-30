-- ==============================================
-- Inserción de datos: Cargos
-- ==============================================
INSERT INTO CARGO (car_nombre, car_descripcion)
VALUES ('Ingeniero Aeronáutico', 'Diseño y mejoras estructurales de aeronaves'),
       ('Técnico de Motores', 'Mantenimiento y reparación de motores'),
       ('Inspector de Calidad', 'Verifica y certifica la calidad de piezas y procesos'),
       ('Supervisor de Ensamble', 'Coordina y supervisa el ensamblaje en planta'),
       ('Analista de Logística', 'Gestiona el flujo de materiales y piezas');

-- ==============================================
-- Inserción de datos: Empleados
-- ==============================================
INSERT INTO EMPLEADO (per_dni, per_nombre, per_apellido, per_direccion, per_experiencia, per_profesion, fk_lug_id)
VALUES (12345678, 'Juan', 'Pérez', 'Av. Principal, Maracay', 5, 'Ingeniero', 1),
       (87654321, 'María', 'García', 'Calle Bolívar, La Guaira', 10, 'Técnico Superior', 2),
       (45671238, 'Carlos', 'López', 'Zona Industrial, Valencia', 3, 'Inspector', 3),
       (10293847, 'Elena', 'Rodríguez', 'Urb. Centro, Maracay', 8, 'Supervisor', 1),
       (11223344, 'José', 'Martínez', 'Av. Principal, Colón (Zulia)', 12, 'Ingeniero', 4);

-- ==============================================
-- Inserción de datos: Empleado Cargo
-- ==============================================
INSERT INTO EMPLEADO_CARGO (emc_id, emc_fecha_inicio, emc_fecha_fin, fk_car_id, fk_per_id)
VALUES (1, '2020-01-10', NULL, 1, 1),         -- Juan (per_id=1) + Ingeniero Aeronáutico (car_id=1)
       (2, '2019-05-01', NULL, 2, 2),         -- María (per_id=2) + Técnico de Motores (car_id=2)
       (3, '2021-07-20', NULL, 3, 3),         -- Carlos (per_id=3) + Inspector de Calidad (car_id=3)
       (4, '2022-03-15', NULL, 4, 4),         -- Elena (per_id=4) + Supervisor de Ensamble (car_id=4)
       (5, '2018-09-01', NULL, 5, 5);         -- José (per_id=5) + Ingeniero Aeronáutico (car_id=5)

-- ==============================================
-- Inserción de datos: Título
-- ==============================================
INSERT INTO TITULO (tit_nombre, tit_descripcion)
VALUES ('TSU Mecánico', 'Técnico Superior en Mecánica'),
       ('Ing. Aeronáutica', 'Ingeniero en Aeronáutica'),
       ('Ing. Industrial', 'Ingeniero en procesos industriales'),
       ('Master en Logística', 'Postgrado en logística y distribución');

-- ==============================================
-- Inserción de datos: Empleado Titulo
-- ==============================================
INSERT INTO EMPLEADO_TITULO (edt_fecha_obtencion, edt_nombre_universidad, edt_descripcion, fk_tit_id, fk_per_id)
VALUES ('2015-07-01', 'Universidad de Maracay', 'Pregrado en Aeronáutica', 2, 1), -- Juan
       ('2012-10-15', 'Instituto Técnico La Guaira', 'TSU en Mecánica', 1, 2),    -- María
       ('2021-02-10', 'Universidad de Zulia', 'Postgrado en Logística', 4, 5);    -- José

-- ==============================================
-- Inserción de datos: Empleado Teléfono
-- ==============================================
INSERT INTO TELEFONO (tel_codigo_area, tel_numero, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES
    ('+58', '4123456789', 1, NULL, NULL, NULL), -- Juan
    ('+58', '4145678901', 2, NULL, NULL, NULL), -- María
    ('+58', '4167890123', 3, NULL, NULL, NULL), -- Carlos
    ('+58', '4249012345', 4, NULL, NULL, NULL), -- Elena
    ('+58', '4261234567', 5, NULL, NULL, NULL); -- José

-- ==============================================
-- Inserción de datos: Red Social
-- ==============================================
INSERT INTO RED_SOCIAL (res_usuario, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('juan_perez', 1, NULL, NULL, NULL),      -- Juan
       ('maria_garcia', 2, NULL, NULL, NULL),    -- María
       ('carlos_lopez', 3, NULL, NULL, NULL),    -- Carlos
       ('elena_rodriguez', 4, NULL, NULL, NULL), -- Elena
       ('jose_martinez', 5, NULL, NULL, NULL);   -- José

-- ==============================================
-- Inserción de datos: Correo Electrónico
-- ==============================================
INSERT INTO CORREO_ELECTRONICO (cor_dir_correo, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('juan.perez@example.com', 1, NULL, NULL, NULL),      -- Juan
       ('maria.garcia@example.com', 2, NULL, NULL, NULL),    -- María
       ('carlos.lopez@example.com', 3, NULL, NULL, NULL),    -- Carlos
       ('elena.rodriguez@example.com', 4, NULL, NULL, NULL), -- Elena
       ('jose.martinez@example.com', 5, NULL, NULL, NULL);   -- José

-- ==============================================
-- Inserción de datos: Beneficiario
-- ==============================================
INSERT INTO BENEFICIARIO (ben_dni, ben_nombre, ben_apellido, ben_direccion, fk_lug_id)
VALUES (33445566, 'Luis', 'Pérez', 'Av. Principal, Maracay', 1),
       (55667788, 'Ana', 'García', 'Calle Bolivar, La Guaira', 2);

-- ==============================================
-- Inserción de datos: Persona Beneficiario
-- ==============================================
INSERT INTO PER_BEN (prb_parentezco, fk_ben_id, fk_per_id)
VALUES ('PADRE', 1, 1), -- Luis (ben_id=1) es beneficiario de Juan (per_id=1)
       ('OTRO', 2, 2);  -- Ana (ben_id=2) es beneficiaria de María (per_id=2)

-- ==============================================
-- Inserción de datos: Experiencia
-- ==============================================
INSERT INTO EXPERIENCIA (exp_nombre_empresa, exp_fecha_inicio, exp_fecha_fin, fk_per_id)
VALUES ('Aviones S.A.', '2018-01-01', '2020-12-31', 1),     -- Juan
       ('Motores Globales', '2017-03-01', '2021-05-30', 2), -- María
       ('Aerotec', '2019-07-10', '2022-02-15', 3),          -- Carlos
       ('Aeroespacial', '2020-03-15', '2022-12-31', 4),     -- Elena
       ('Logística Express', '2018-09-01', '2022-12-31', 5);-- José

-- ==============================================
-- Inserción de datos: Horario
-- ==============================================
INSERT INTO HORARIO (hor_dia, hor_hora_inicio, hor_hora_fin)
VALUES ('LUNES', '08:00:00', '16:00:00'),
       ('MARTES', '08:00:00', '16:00:00'),
       ('MIERCOLES', '08:00:00', '16:00:00'),
       ('JUEVES', '08:00:00', '16:00:00'),
       ('VIERNES', '08:00:00', '16:00:00');

-- ==============================================
-- Inserción de datos: Empleado Cargo Horario
-- ==============================================
INSERT INTO EMP_CARGO_HORARIO (fk_per_id, fk_car_id, fk_emc_id, fk_hor_id)
VALUES (1, 1, 1, 1), -- Juan (per_id=1) + Ingeniero Aeronáutico (car_id=1) + Horario Lunes (hor_id=1)
       (1, 1, 1, 2), -- Juan (per_id=1) + Ingeniero Aeronáutico (car_id=1) + Horario Martes (hor_id=2)
       (2, 2, 2, 1), -- María (per_id=2) + Técnico de Motores (car_id=2) + Horario Lunes (hor_id=1)
       (2, 2, 2, 2), -- María (per_id=2) + Técnico de Motores (car_id=2) + Horario Martes (hor_id=2)
       (2, 2, 2, 3), -- María (per_id=2) + Técnico de Motores (car_id=2) + Horario Miércoles (hor_id=3)
       (3, 3, 3, 1), -- Carlos (per_id=3) + Inspector de Calidad (car_id=3) + Horario Lunes (hor_id=1)
       (3, 3, 3, 2), -- Carlos (per_id=3) + Inspector de Calidad (car_id=3) + Horario Martes (hor_id=2)
       (3, 3, 3, 3), -- Carlos (per_id=3) + Inspector de Calidad (car_id=3) + Horario Miércoles (hor_id=3)
       (3, 3, 3, 4), -- Carlos (per_id=3) + Inspector de Calidad (car_id=3) + Horario Jueves (hor_id=4)
       (3, 3, 3, 5), -- Carlos (per_id=3) + Inspector de Calidad (car_id=3) + Horario Viernes (hor_id=5)
       (4, 4, 4, 1), -- Elena (per_id=4) + Supervisor de Ensamble (car_id=4) + Horario Lunes (hor_id=1)
       (4, 4, 4, 2), -- Elena (per_id=4) + Supervisor de Ensamble (car_id=4) + Horario Martes (hor_id=2)
       (4, 4, 4, 3), -- Elena (per_id=4) + Supervisor de Ensamble (car_id=4) + Horario Miércoles (hor_id=3)
       (4, 4, 4, 4), -- Elena (per_id=4) + Supervisor de Ensamble (car_id=4) + Horario Jueves (hor_id=4)
       (4, 4, 4, 5), -- Elena (per_id=4) + Supervisor de Ensamble (car_id=4) + Horario Viernes (hor_id=5)
       (5, 5, 5, 1), -- José (per_id=5) + Ingeniero Aeronáutico (car_id=5) + Horario Lunes (hor_id=1)
       (5, 5, 5, 2), -- José (per_id=5) + Ingeniero Aeronáutico (car_id=5) + Horario Martes (hor_id=2)
       (5, 5, 5, 3), -- José (per_id=5) + Ingeniero Aeronáutico (car_id=5) + Horario Miércoles (hor_id=3)
       (5, 5, 5, 4), -- José (per_id=5) + Ingeniero Aeronáutico (car_id=5) + Horario Jueves (hor_id=4)
       (5, 5, 5, 5); -- José (per_id=5) + Ingeniero Aeronáutico (car_id=5) + Horario Viernes (hor_id=5)

-- ==============================================
-- Inserción de datos: Asistencia
-- ==============================================
INSERT INTO ASISTENCIA (asi_hora_inicio, asi_hora_fin, fk_per_id, fk_car_id, fk_emc_id, fk_hor_id)
VALUES ('08:05:00', '16:01:00', 1, 1, 1, 1),
       ('08:00:00', '15:59:00', 1, 1, 1, 2),
       ('08:10:00', '16:05:00', 2, 2, 2, 1),
       ('08:00:00', '16:00:00', 2, 2, 2, 2),
       ('08:00:00', '16:00:00', 2, 2, 2, 3),
       ('08:00:00', '16:00:00', 3, 3, 3, 1),
       ('08:00:00', '16:00:00', 3, 3, 3, 2),
       ('08:00:00', '16:00:00', 3, 3, 3, 3),
       ('08:00:00', '16:00:00', 3, 3, 3, 4),
       ('08:00:00', '16:00:00', 3, 3, 3, 5),
       ('08:00:00', '16:00:00', 4, 4, 4, 1),
       ('08:00:00', '16:00:00', 4, 4, 4, 2),
       ('08:00:00', '16:00:00', 4, 4, 4, 3),
       ('08:00:00', '16:00:00', 4, 4, 4, 4),
       ('08:00:00', '16:00:00', 4, 4, 4, 5),
       ('08:00:00', '16:00:00', 5, 5, 5, 1),
       ('08:00:00', '16:00:00', 5, 5, 5, 2),
       ('08:00:00', '16:00:00', 5, 5, 5, 3),
       ('08:00:00', '16:00:00', 5, 5, 5, 4),
       ('08:00:00', '16:00:00', 5, 5, 5, 5);