-- ==============================================
-- Inserción de datos: Cargos
-- ==============================================
INSERT INTO CARGO (car_nombre, car_descripcion)
VALUES 
('Ingeniero Aeronáutico', 'Diseño y desarrollo de aeronaves.'),
('Técnico en Electrónica Aeronáutica', 'Mantenimiento de sistemas electrónicos en aviones.'),
('Inspector de Calidad', 'Asegura la calidad de componentes aeronáuticos.'),
('Supervisor de Producción', 'Supervisa líneas de producción en la fábrica.'),
('Mecánico de Aviones', 'Mantenimiento y reparación de aeronaves.'),
('Técnico de Mantenimiento', 'Mantenimiento preventivo y correctivo de equipos.'),
('Diseñador Aeronáutico', 'Diseño de estructuras de aeronaves.'),
('Programador de Sistemas', 'Desarrollo y mantenimiento de sistemas de software.'),
('Técnico en Materiales Compuestos', 'Trabajo con materiales avanzados en aviones.'),
('Especialista en Motores', 'Reparación y mantenimiento de motores aeronáuticos.'),
('Inspector de Seguridad', 'Cumplimiento de normas de seguridad.'),
('Operador de Máquina CNC', 'Manejo de máquinas CNC para fabricar piezas.'),
('Ensamblador de Estructuras', 'Ensamblaje de estructuras de aviones.'),
('Técnico en Hidráulica y Neumática', 'Mantenimiento de sistemas hidráulicos y neumáticos.'),
('Ingeniero de Pruebas', 'Pruebas y validación de componentes aeronáuticos.'),
('Coordinador de Logística', 'Gestión de cadena de suministro y distribución.'),
('Técnico en Aviónica', 'Especialista en la electrónica de las aeronaves.'),
('Planificador de Producción', 'Planificación de actividades de producción.'),
('Especialista en Control de Calidad', 'Supervisión de sistemas de calidad.'),
('Técnico en Instrumentación', 'Mantenimiento de instrumentos de medición en aviones.');

-- ==============================================
-- Inserción de datos: Empleados
-- ==============================================
INSERT INTO EMPLEADO (per_dni, per_nombre, per_apellido, per_direccion, per_experiencia, per_profesion, fk_lug_id)
VALUES 
('V12345678', 'Juan', 'Pérez', 'Calle 123', 5, 'Ingeniero Aeronáutico', 1),
('V23456789', 'María', 'Gómez', 'Avenida 45', 8, 'Mecánica de Aviones', 2),
('V34567890', 'Pedro', 'Martínez', 'Calle 67', 3, 'Técnico en Electrónica Aeronáutica', 3),
('V45678901', 'Luisa', 'Fernández', 'Calle 89', 10, 'Inspector de Calidad', 4),
('V56789012', 'Carlos', 'Rodríguez', 'Boulevard 101', 7, 'Programador de Sistemas', 5),
('V67890123', 'Ana', 'Morales', 'Carrera 23', 12, 'Supervisora de Producción', 6),
('V78901234', 'José', 'Hernández', 'Calle 56', 4, 'Diseñador Aeronáutico', 7),
('V89012345', 'Marta', 'López', 'Avenida 78', 9, 'Mecánica de Aviones', 8),
('V90123456', 'Luis', 'García', 'Calle 910', 6, 'Técnico de Mantenimiento', 9),
('V12345679', 'Sara', 'Vega', 'Calle 1112', 2, 'Técnico en Materiales Compuestos', 10),
('V23456780', 'David', 'Ramos', 'Avenida 1314', 11, 'Especialista en Motores', 11),
('V34567891', 'Laura', 'Torres', 'Carrera 1516', 5, 'Inspector de Seguridad', 12),
('V45678902', 'Andrés', 'Ruiz', 'Calle 1718', 3, 'Operador de Máquina CNC', 13),
('V56789013', 'Carmen', 'Díaz', 'Boulevard 1920', 4, 'Ensamblador de Estructuras', 14),
('V67890124', 'Manuel', 'Mejía', 'Calle 2122', 7, 'Técnico en Hidráulica y Neumática', 15),
('V78901235', 'Gloria', 'Ortiz', 'Avenida 2324', 6, 'Ingeniera de Pruebas', 16),
('V89012346', 'Rafael', 'Navarro', 'Calle 2526', 10, 'Coordinador de Logística', 17),
('V90123457', 'Sofía', 'Pineda', 'Carrera 2728', 8, 'Técnico en Aviónica', 18),
('V12345680', 'Fabio', 'Serrano', 'Boulevard 2930', 3, 'Planificador de Producción', 19),
('V23456781', 'Diana', 'Castillo', 'Calle 3132', 5, 'Especialista en Control de Calidad', 20),
('V34567892', 'Jorge', 'Suárez', 'Avenida 3334', 6, 'Técnico en Instrumentación', 21),
('V45678903', 'Elena', 'Espinosa', 'Calle 3536', 4, 'Ingeniera Aeronáutica', 22),
('V56789014', 'Camilo', 'Correa', 'Boulevard 3738', 2, 'Técnico en Electrónica Aeronáutica', 23),
('V67890125', 'Estela', 'Guzmán', 'Calle 3940', 12, 'Inspector de Calidad', 24),
('V78901236', 'Víctor', 'Santana', 'Avenida 4142', 9, 'Programador de Sistemas', 1),
('V89012347', 'Olga', 'Álvarez', 'Calle 4344', 11, 'Técnico de Mantenimiento', 2),
('V90123458', 'Gustavo', 'Montoya', 'Boulevard 4546', 7, 'Supervisor de Producción', 3),
('V12345681', 'Verónica', 'Palacios', 'Calle 4748', 4, 'Diseñador Aeronáutico', 4),
('V23456782', 'Sebastián', 'Blanco', 'Carrera 4950', 3, 'Técnico en Materiales Compuestos', 5),
('V34567893', 'Adriana', 'Bermúdez', 'Calle 5152', 6, 'Especialista en Motores', 6),
('V45678904', 'Enrique', 'Cabrera', 'Avenida 5354', 5, 'Inspector de Seguridad', 7),
('V56789015', 'Mariela', 'Zambrano', 'Calle 5556', 7, 'Operador de Máquina CNC', 8),
('V67890126', 'Fernando', 'Jiménez', 'Boulevard 5758', 8, 'Ensamblador de Estructuras', 9),
('V78901237', 'Patricia', 'Acosta', 'Calle 5960', 10, 'Técnico en Hidráulica y Neumática', 10),
('V89012348', 'Héctor', 'Mendoza', 'Carrera 6162', 12, 'Ingeniero de Pruebas', 11),
('V90123459', 'Claudia', 'Peña', 'Calle 6364', 9, 'Coordinadora de Logística', 12),
('V12345682', 'Eduardo', 'Ibarra', 'Avenida 6566', 6, 'Técnico en Aviónica', 13),
('V23456783', 'Lucía', 'Arce', 'Calle 6768', 4, 'Planificadora de Producción', 14),
('V34567894', 'Tomás', 'Barrera', 'Carrera 6970', 8, 'Especialista en Control de Calidad', 15),
('V74567895', 'Tomás', 'Pérez', 'Carrera 6970', 8, 'Técnico en Instrumentación', 15);

-- ==============================================
-- Inserción de datos: Empleado Cargo
-- ==============================================
INSERT INTO EMPLEADO_CARGO (emc_fecha_inicio, emc_fecha_fin, fk_car_id, fk_per_id)
VALUES 
('2022-01-15', NULL, 1, 1),  -- Ingeniero Aeronáutico
('2023-03-21', NULL, 5, 2),  -- Mecánica de Aviones
('2021-06-10', NULL, 2, 3),  -- Técnico en Electrónica Aeronáutica
('2020-09-30', NULL, 3, 4),  -- Inspector de Calidad
('2022-02-05', NULL, 8, 5),  -- Programador de Sistemas
('2021-11-25', NULL, 4, 6),  -- Supervisora de Producción
('2022-07-14', NULL, 7, 7),  -- Diseñador Aeronáutico
('2023-04-18', NULL, 5, 8),  -- Mecánica de Aviones
('2020-12-09', NULL, 6, 9),  -- Técnico de Mantenimiento
('2022-08-22', NULL, 9, 10), -- Técnico en Materiales Compuestos
('2021-05-17', NULL, 10, 11),-- Especialista en Motores
('2023-01-28', NULL, 11, 12),-- Inspector de Seguridad
('2022-06-11', NULL, 12, 13),-- Operador de Máquina CNC
('2020-10-05', NULL, 13, 14),-- Ensamblador de Estructuras
('2021-09-12', NULL, 14, 15),-- Técnico en Hidráulica y Neumática
('2022-03-29', NULL, 15, 16),-- Ingeniera de Pruebas
('2023-02-07', NULL, 16, 17),-- Coordinador de Logística
('2021-07-03', NULL, 17, 18),-- Técnico en Aviónica
('2022-04-27', NULL, 18, 19),-- Planificador de Producción
('2020-08-15', NULL, 19, 20),-- Especialista en Control de Calidad
('2023-05-19', NULL, 20, 21),-- Técnico en Instrumentación
('2021-11-01', NULL, 1, 22), -- Ingeniera Aeronáutica
('2022-09-26', NULL, 2, 23), -- Técnico en Electrónica Aeronáutica
('2023-03-12', NULL, 3, 24), -- Inspector de Calidad
('2020-12-24', NULL, 8, 25), -- Programador de Sistemas
('2021-06-05', NULL, 6, 26), -- Técnico de Mantenimiento
('2022-10-30', NULL, 4, 27), -- Supervisor de Producción
('2023-04-07', NULL, 7, 28), -- Diseñador Aeronáutico
('2021-05-21', NULL, 9, 29), -- Técnico en Materiales Compuestos
('2022-08-11', NULL, 10, 30),-- Especialista en Motores
('2023-01-16', NULL, 11, 31),-- Inspector de Seguridad
('2020-11-05', NULL, 12, 32),-- Operador de Máquina CNC
('2021-07-30', NULL, 13, 33),-- Ensamblador de Estructuras
('2022-04-02', NULL, 14, 34),-- Técnico en Hidráulica y Neumática
('2023-02-25', NULL, 15, 35),-- Ingeniero de Pruebas
('2021-09-09', NULL, 16, 36),-- Coordinadora de Logística
('2022-03-19', NULL, 17, 37),-- Técnico en Aviónica
('2020-07-12', NULL, 18, 38),-- Planificadora de Producción
('2021-08-05', NULL, 19, 39),-- Especialista en Control de Calidad
('2023-05-03', NULL, 20, 40);-- Técnico en Instrumentación

-- ==============================================
-- Inserción de datos: Título
-- ==============================================
INSERT INTO TITULO (tit_nombre, tit_descripcion)
VALUES 
('Ingeniería en Aeronáutica', 'Grado en diseño y desarrollo de aeronaves.'),
('Ingeniería en Electrónica Aeronáutica', 'Grado en mantenimiento de sistemas electrónicos en aviones.'),
('Ingeniería en Control de Calidad', 'Especialización en aseguramiento de calidad.'),
('Ingeniería en Producción Industrial', 'Grado en supervisión de producción industrial.'),
('Ingeniería Mecánica Aeronáutica', 'Grado en reparación de aeronaves.'),
('Ingeniería en Mantenimiento Industrial', 'Grado en mantenimiento preventivo y correctivo.'),
('Ingeniería en Diseño Aeronáutico', 'Grado en diseño de estructuras de aeronaves.'),
('Ingeniería en Programación de Sistemas', 'Grado en desarrollo de software.'),
('Ingeniería en Materiales Compuestos', 'Grado en trabajo con materiales avanzados.'),
('Tecnología de Motores Aeronáuticos', 'Grado en reparación de motores.'),
('Seguridad Industrial Aeronáutica', 'Grado en normas de seguridad.'),
('Operación CNC', 'Grado en manejo de máquinas CNC.'),
('Ingeniería en Estructuras Aeronáuticas', 'Grado en ensamblaje de estructuras.'),
('Ingeniería en Hidráulica y Neumática', 'Grado en sistemas hidráulicos y neumáticos.'),
('Ingeniería en Pruebas Aeronáuticas', 'Especialización en pruebas de componentes.'),
('Logística Industrial Aeronáutica', 'Grado en gestión de suministros y distribución.'),
('Ingeniería en Aviónica', 'Grado en electrónica de aeronaves.'),
('Planificación de Producción Industrial', 'Especialización en planificación de producción.'),
('Control de Calidad Industrial', 'Especialización en supervisión de calidad.'),
('Instrumentación Aeronáutica', 'Grado en mantenimiento de instrumentos.');

-- ==============================================
-- Inserción de datos: Empleado Titulo
-- ==============================================
INSERT INTO EMPLEADO_TITULO (edt_fecha_obtencion, edt_nombre_universidad, edt_descripcion, fk_tit_id, fk_per_id)
VALUES 
('2015-07-23', 'Universidad Central de Venezuela', 'Grado en diseño y desarrollo de aeronaves.', 1, 1),
('2013-08-15', 'Universidad Simón Bolívar', 'Grado en reparación de aeronaves.', 5, 2),
('2016-09-12', 'Universidad de Carabobo', 'Grado en mantenimiento de sistemas electrónicos en aviones.', 2, 3),
('2018-11-10', 'Universidad de Los Andes', 'Especialización en aseguramiento de calidad.', 3, 4),
('2014-06-05', 'Universidad Metropolitana', 'Grado en desarrollo de software.', 8, 5),
('2012-10-28', 'Universidad Católica Andrés Bello', 'Grado en supervisión de producción industrial.', 4, 6),
('2017-03-18', 'Universidad del Zulia', 'Grado en diseño de estructuras de aeronaves.', 7, 7),
('2019-04-22', 'Universidad Nacional Experimental Politécnica', 'Grado en reparación de aeronaves.', 5, 8),
('2011-12-19', 'Universidad de Oriente', 'Grado en mantenimiento preventivo y correctivo.', 6, 9),
('2016-08-31', 'Universidad Simón Bolívar', 'Grado en trabajo con materiales avanzados.', 9, 10),
('2014-05-21', 'Universidad Central de Venezuela', 'Grado en reparación de motores.', 10, 11),
('2018-01-17', 'Universidad de Carabobo', 'Grado en normas de seguridad.', 11, 12),
('2017-07-09', 'Universidad de Los Andes', 'Grado en manejo de máquinas CNC.', 12, 13),
('2013-11-05', 'Universidad Metropolitana', 'Grado en ensamblaje de estructuras.', 13, 14),
('2015-09-29', 'Universidad Católica Andrés Bello', 'Grado en sistemas hidráulicos y neumáticos.', 14, 15),
('2012-02-26', 'Universidad del Zulia', 'Especialización en pruebas de componentes.', 15, 16),
('2019-03-07', 'Universidad Nacional Experimental Politécnica', 'Grado en gestión de suministros y distribución.', 16, 17),
('2014-07-13', 'Universidad de Oriente', 'Grado en electrónica de aeronaves.', 17, 18),
('2016-04-19', 'Universidad Central de Venezuela', 'Especialización en planificación de producción.', 18, 19),
('2013-06-14', 'Universidad Simón Bolívar', 'Especialización en supervisión de calidad.', 19, 20),
('2017-02-22', 'Universidad de Carabobo', 'Grado en mantenimiento de instrumentos.', 20, 21),
('2015-01-11', 'Universidad de Los Andes', 'Grado en diseño y desarrollo de aeronaves.', 1, 22),
('2018-09-26', 'Universidad Metropolitana', 'Grado en mantenimiento de sistemas electrónicos en aviones.', 2, 23),
('2019-03-12', 'Universidad Católica Andrés Bello', 'Especialización en aseguramiento de calidad.', 3, 24),
('2011-10-24', 'Universidad del Zulia', 'Grado en desarrollo de software.', 8, 25),
('2014-06-05', 'Universidad Nacional Experimental Politécnica', 'Grado en mantenimiento preventivo y correctivo.', 6, 26),
('2012-11-30', 'Universidad de Oriente', 'Grado en supervisión de producción industrial.', 4, 27),
('2018-04-07', 'Universidad Central de Venezuela', 'Grado en diseño de estructuras de aeronaves.', 7, 28),
('2015-05-21', 'Universidad Simón Bolívar', 'Grado en trabajo con materiales avanzados.', 9, 29),
('2016-08-11', 'Universidad de Carabobo', 'Grado en reparación de motores.', 10, 30),
('2019-01-16', 'Universidad de Los Andes', 'Grado en normas de seguridad.', 11, 31),
('2013-11-05', 'Universidad Metropolitana', 'Grado en manejo de máquinas CNC.', 12, 32),
('2017-07-30', 'Universidad Católica Andrés Bello', 'Grado en ensamblaje de estructuras.', 13, 33),
('2014-04-02', 'Universidad del Zulia', 'Grado en sistemas hidráulicos y neumáticos.', 14, 34),
('2018-02-25', 'Universidad Nacional Experimental Politécnica', 'Especialización en pruebas de componentes.', 15, 35),
('2016-09-09', 'Universidad de Oriente', 'Grado en gestión de suministros y distribución.', 16, 36),
('2015-03-19', 'Universidad Central de Venezuela', 'Grado en electrónica de aeronaves.', 17, 37),
('2012-07-12', 'Universidad Simón Bolívar', 'Especialización en planificación de producción.', 18, 38),
('2013-08-05', 'Universidad de Carabobo', 'Especialización en supervisión de calidad.', 19, 39),
('2019-05-03', 'Universidad de Los Andes', 'Grado en mantenimiento de instrumentos.', 20, 40);

-- ==============================================
-- Inserción de datos: Beneficiario
-- ==============================================
INSERT INTO BENEFICIARIO (ben_dni, ben_nombre, ben_apellido, ben_direccion, fk_lug_id)
VALUES 
('V12345678', 'Juan', 'Rodríguez', 'Calle Amazonas 123', 1),
('V23456789', 'María', 'González', 'Avenida Anzoátegui 456', 2),
('V34567890', 'Pedro', 'Martínez', 'Calle Apure 789', 3),
('V45678901', 'Luisa', 'Fernández', 'Calle Aragua 101', 4),
('V56789012', 'Carlos', 'Pérez', 'Boulevard Barinas 202', 5),
('V67890123', 'Ana', 'López', 'Carrera Bolívar 303', 6),
('V78901234', 'José', 'Hernández', 'Calle Carabobo 404', 7),
('V89012345', 'Marta', 'Morales', 'Avenida Cojedes 505', 8),
('V91234567', 'Luis', 'García', 'Calle Delta Amacuro 606', 9),
('V12345679', 'Sara', 'Ramírez', 'Calle Distrito Capital 707', 10),
('V23456781', 'David', 'Sánchez', 'Avenida Falcón 808', 11),
('V34567892', 'Laura', 'Torres', 'Carrera Guárico 909', 12),
('V45678903', 'Andrés', 'Mejía', 'Calle Lara 111', 13),
('V56789014', 'Carmen', 'Guzmán', 'Boulevard La Guaira 222', 14),
('V67890125', 'Manuel', 'Díaz', 'Calle Mérida 333', 15),
('V78901236', 'Gloria', 'Jiménez', 'Avenida Miranda 444', 16),
('V89012347', 'Rafael', 'Ortiz', 'Calle Monagas 555', 17),
('V91234568', 'Sofía', 'Navarro', 'Carrera Nueva Esparta 666', 18),
('V12345680', 'Fabio', 'Serrano', 'Boulevard Portuguesa 777', 19),
('V23456782', 'Diana', 'Castillo', 'Calle Sucre 888', 20),
('V34567893', 'Jorge', 'Suárez', 'Avenida Táchira 999', 21),
('V45678904', 'Elena', 'Espinosa', 'Calle Trujillo 111', 22),
('V56789015', 'Camilo', 'Correa', 'Boulevard Yaracuy 222', 23),
('V67890126', 'Estela', 'Guzmán', 'Calle Zulia 333', 24);

-- ==============================================
-- Inserción de datos: Persona Beneficiario
-- ==============================================
INSERT INTO PER_BEN (prb_parentezco, fk_ben_id, fk_per_id)
VALUES 
('HERMAN@', 1, 12),
('PADRE', 2, 7),
('MADRE', 3, 22),
('OTRO', 4, 14),
('HERMAN@', 5, 5),
('PADRE', 6, 20),
('MADRE', 7, 3),
('OTRO', 8, 9),
('HERMAN@', 9, 16),
('PADRE', 10, 19),
('MADRE', 11, 13),
('OTRO', 12, 8),
('HERMAN@', 13, 2),
('PADRE', 14, 18),
('MADRE', 15, 6),
('OTRO', 16, 1),
('HERMAN@', 17, 10),
('PADRE', 18, 24),
('MADRE', 19, 15),
('OTRO', 20, 11),
('HERMAN@', 21, 23),
('PADRE', 22, 4),
('MADRE', 23, 21),
('OTRO', 24, 17);

-- ==============================================
-- Inserción de datos: Experiencia
-- ==============================================
INSERT INTO EXPERIENCIA (exp_nombre_empresa, exp_fecha_inicio, exp_fecha_fin, fk_per_id)
VALUES 
('AeroTech Industries', '2010-01-15', '2014-05-20', 1),
('Skyward Aviation', '2012-03-10', '2015-07-18', 2),
('Flight Dynamics', '2011-06-22', '2014-10-30', 3),
('Altitude Aerospace', '2013-09-05', '2016-11-28', 4),
('NextGen Aeronautics', '2010-12-19', '2015-04-23', 5),
('AeroSystems Corp', '2012-07-11', '2016-08-17', 6),
('Precision Aircraft', '2013-05-25', '2017-09-02', 7),
('Avionics Solutions', '2011-04-16', '2014-08-14', 8),
('Zenith Aerospace', '2010-11-30', '2013-12-19', 9),
('Horizon Airworks', '2014-02-28', '2017-03-25', 10),
('Vanguard Aviation', '2011-08-19', '2016-01-13', 11),
('AeroCraft Technologies', '2013-04-01', '2015-11-30', 12),
('Aero Dynamics', '2012-09-08', '2016-07-11', 13),
('Aero Innovations', '2011-03-19', '2015-05-22', 14),
('AirTech Enterprises', '2013-10-16', '2017-01-29', 15),
('Skyline Aerospace', '2010-11-25', '2014-12-21', 16),
('Starline Aviation', '2011-06-08', '2015-02-18', 17),
('Altitude Avionics', '2013-12-02', '2016-06-25', 18),
('Eagle Aerospace', '2011-07-14', '2015-09-07', 19),
('AeroLink Technologies', '2012-11-10', '2016-03-19', 20),
('SkyTech Aviation', '2014-04-09', '2017-08-15', 21),
('ProFlight Systems', '2013-02-15', '2015-10-10', 22),
('Jetstream Aerospace', '2012-05-26', '2016-11-06', 23),
('AeroFusion Corp', '2011-09-03', '2015-08-28', 24),
('AeroTech Industries', '2013-01-15', '2016-05-20', 25),
('Skyward Aviation', '2011-03-10', '2014-07-18', 26),
('Flight Dynamics', '2012-06-22', '2016-10-30', 27),
('Altitude Aerospace', '2011-09-05', '2015-11-28', 28),
('NextGen Aeronautics', '2010-12-19', '2014-04-23', 29),
('AeroSystems Corp', '2012-07-11', '2017-08-17', 30),
('Precision Aircraft', '2013-05-25', '2018-09-02', 31),
('Avionics Solutions', '2010-04-16', '2013-08-14', 32),
('Zenith Aerospace', '2012-11-30', '2015-12-19', 33),
('Horizon Airworks', '2013-02-28', '2016-03-25', 34),
('Vanguard Aviation', '2010-08-19', '2014-01-13', 35),
('AeroCraft Technologies', '2012-04-01', '2015-11-30', 36),
('Aero Dynamics', '2011-09-08', '2015-07-11', 37),
('Aero Innovations', '2010-03-19', '2014-05-22', 38),
('AirTech Enterprises', '2012-10-16', '2016-01-29', 39),
('Skyline Aerospace', '2011-11-25', '2015-12-21', 40);

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
VALUES 
-- Juan Pérez
(1, 1, 1, 1),   -- Lunes
(1, 1, 1, 2),   -- Martes
(1, 1, 1, 3),   -- Miércoles
(1, 1, 1, 4),   -- Jueves
(1, 1, 1, 5),   -- Viernes

-- María Gómez
(2, 5, 2, 1),   -- Lunes
(2, 5, 2, 2),   -- Martes
(2, 5, 2, 3),   -- Miércoles
(2, 5, 2, 4),   -- Jueves
(2, 5, 2, 5),   -- Viernes

-- Pedro Martínez
(3, 2, 3, 1),   -- Lunes
(3, 2, 3, 2),   -- Martes
(3, 2, 3, 3),   -- Miércoles
(3, 2, 3, 4),   -- Jueves
(3, 2, 3, 5),   -- Viernes

-- Luisa Fernández
(4, 3, 4, 1),   -- Lunes
(4, 3, 4, 2),   -- Martes
(4, 3, 4, 3),   -- Miércoles
(4, 3, 4, 4),   -- Jueves
(4, 3, 4, 5),   -- Viernes

-- Carlos Rodríguez
(5, 8, 5, 1),   -- Lunes
(5, 8, 5, 2),   -- Martes
(5, 8, 5, 3),   -- Miércoles
(5, 8, 5, 4),   -- Jueves
(5, 8, 5, 5),   -- Viernes

-- Ana Morales
(6, 4, 6, 1),   -- Lunes
(6, 4, 6, 2),   -- Martes
(6, 4, 6, 3),   -- Miércoles
(6, 4, 6, 4),   -- Jueves
(6, 4, 6, 5),   -- Viernes

-- José Hernández
(7, 7, 7, 1),   -- Lunes
(7, 7, 7, 2),   -- Martes
(7, 7, 7, 3),   -- Miércoles
(7, 7, 7, 4),   -- Jueves
(7, 7, 7, 5),   -- Viernes

-- Marta López
(8, 5, 8, 1),   -- Lunes
(8, 5, 8, 2),   -- Martes
(8, 5, 8, 3),   -- Miércoles
(8, 5, 8, 4),   -- Jueves
(8, 5, 8, 5),   -- Viernes

-- Luis García
(9, 6, 9, 1),   -- Lunes
(9, 6, 9, 2),   -- Martes
(9, 6, 9, 3),   -- Miércoles
(9, 6, 9, 4),   -- Jueves
(9, 6, 9, 5),   -- Viernes

-- Sara Vega
(10, 9, 10, 1), -- Lunes
(10, 9, 10, 2), -- Martes
(10, 9, 10, 3), -- Miércoles
(10, 9, 10, 4), -- Jueves
(10, 9, 10, 5), -- Viernes

-- David Ramos
(11, 10, 11, 1),-- Lunes
(11, 10, 11, 2),-- Martes
(11, 10, 11, 3),-- Miércoles
(11, 10, 11, 4),-- Jueves
(11, 10, 11, 5),-- Viernes

-- Laura Torres
(12, 11, 12, 1),-- Lunes
(12, 11, 12, 2),-- Martes
(12, 11, 12, 3),-- Miércoles
(12, 11, 12, 4),-- Jueves
(12, 11, 12, 5),-- Viernes

-- Andrés Ruiz
(13, 12, 13, 1),-- Lunes
(13, 12, 13, 2),-- Martes
(13, 12, 13, 3),-- Miércoles
(13, 12, 13, 4),-- Jueves
(13, 12, 13, 5),-- Viernes

-- Carmen Díaz
(14, 13, 14, 1),-- Lunes
(14, 13, 14, 2),-- Martes
(14, 13, 14, 3),-- Miércoles
(14, 13, 14, 4),-- Jueves
(14, 13, 14, 5),-- Viernes

-- Manuel Mejía
(15, 14, 15, 1),-- Lunes
(15, 14, 15, 2),-- Martes
(15, 14, 15, 3),-- Miércoles
(15, 14, 15, 4),-- Jueves
(15, 14, 15, 5),-- Viernes

-- Gloria Ortiz
(16, 15, 16, 1),-- Lunes
(16, 15, 16, 2),-- Martes
(16, 15, 16, 3),-- Miércoles
(16, 15, 16, 4),-- Jueves
(16, 15, 16, 5),-- Viernes

-- Rafael Navarro
(17, 16, 17, 1),-- Lunes
(17, 16, 17, 2),-- Martes
(17, 16, 17, 3),-- Miércoles
(17, 16, 17, 4),-- Jueves
(17, 16, 17, 5),-- Viernes

-- Sofía Pineda
(18, 17, 18, 1),-- Lunes
(18, 17, 18, 2),-- Martes
(18, 17, 18, 3),-- Miércoles
(18, 17, 18, 4),-- Jueves
(18, 17, 18, 5),-- Viernes

-- Fabio Serrano
(19, 18, 19, 1),-- Lunes
(19, 18, 19, 2),-- Martes
(19, 18, 19, 3),-- Miércoles
(19, 18, 19, 4),-- Jueves
(19, 18, 19, 5),-- Viernes

-- Diana Castillo
(20, 19, 20, 1),-- Lunes
(20, 19, 20, 2),-- Martes
(20, 19, 20, 3),-- Miércoles
(20, 19, 20, 4),-- Jueves
(20, 19, 20, 5),-- Viernes

-- Jorge Suárez
(21, 20, 21, 1),-- Lunes
(21, 20, 21, 2),-- Martes
(21, 20, 21, 3),-- Miércoles
(21, 20, 21, 4),-- Jueves
(21, 20, 21, 5),-- Viernes

-- Elena Espinosa
(22, 1, 22, 1), -- Lunes
(22, 1, 22, 2), -- Martes
(22, 1, 22, 3), -- Miércoles
(22, 1, 22, 4), -- Jueves
(22, 1, 22, 5), -- Viernes

-- Camilo Correa
(23, 2, 23, 1), -- Lunes
(23, 2, 23, 2), -- Martes
(23, 2, 23, 3), -- Miércoles
(23, 2, 23, 4), -- Jueves
(23, 2, 23, 5), -- Vier

-- Estela Guzmán
(24, 3, 24, 1), -- Lunes
(24, 3, 24, 2), -- Martes
(24, 3, 24, 3), -- Miércoles
(24, 3, 24, 4), -- Jueves
(24, 3, 24, 5), -- Viernes

-- Víctor Santana
(25, 8, 25, 1), -- Lunes
(25, 8, 25, 2), -- Martes
(25, 8, 25, 3), -- Miércoles
(25, 8, 25, 4), -- Jueves
(25, 8, 25, 5), -- Viernes

-- Olga Álvarez
(26, 6, 26, 1), -- Lunes
(26, 6, 26, 2), -- Martes
(26, 6, 26, 3), -- Miércoles
(26, 6, 26, 4), -- Jueves
(26, 6, 26, 5), -- Viernes

-- Gustavo Montoya
(27, 4, 27, 1), -- Lunes
(27, 4, 27, 2), -- Martes
(27, 4, 27, 3), -- Miércoles
(27, 4, 27, 4), -- Jueves
(27, 4, 27, 5), -- Viernes

-- Verónica Palacios
(28, 7, 28, 1), -- Lunes
(28, 7, 28, 2), -- Martes
(28, 7, 28, 3), -- Miércoles
(28, 7, 28, 4), -- Jueves
(28, 7, 28, 5), -- Viernes

-- Sebastián Blanco
(29, 9, 29, 1), -- Lunes
(29, 9, 29, 2), -- Martes
(29, 9, 29, 3), -- Miércoles
(29, 9, 29, 4), -- Jueves
(29, 9, 29, 5), -- Viernes

-- Adriana Bermúdez
(30, 10, 30, 1), -- Lunes
(30, 10, 30, 2), -- Martes
(30, 10, 30, 3), -- Miércoles
(30, 10, 30, 4), -- Jueves
(30, 10, 30, 5), -- Viernes

-- Enrique Cabrera
(31, 11, 31, 1), -- Lunes
(31, 11, 31, 2), -- Martes
(31, 11, 31, 3), -- Miércoles
(31, 11, 31, 4), -- Jueves
(31, 11, 31, 5), -- Viernes

-- Mariela Zambrano
(32, 12, 32, 1), -- Lunes
(32, 12, 32, 2), -- Martes
(32, 12, 32, 3), -- Miércoles
(32, 12, 32, 4), -- Jueves
(32, 12, 32, 5), -- Viernes

-- Fernando Jiménez
(33, 13, 33, 1), -- Lunes
(33, 13, 33, 2), -- Martes
(33, 13, 33, 3), -- Miércoles
(33, 13, 33, 4), -- Jueves
(33, 13, 33, 5), -- Viernes

-- Patricia Acosta
(34, 14, 34, 1), -- Lunes
(34, 14, 34, 2), -- Martes
(34, 14, 34, 3), -- Miércoles
(34, 14, 34, 4), -- Jueves
(34, 14, 34, 5), -- Viernes

-- Héctor Mendoza
(35, 15, 35, 1), -- Lunes
(35, 15, 35, 2), -- Martes
(35, 15, 35, 3), -- Miércoles
(35, 15, 35, 4), -- Jueves
(35, 15, 35, 5), -- Viernes

-- Claudia Peña
(36, 16, 36, 1), -- Lunes
(36, 16, 36, 2), -- Martes
(36, 16, 36, 3), -- Miércoles
(36, 16, 36, 4), -- Jueves
(36, 16, 36, 5), -- Viernes

-- Eduardo Ibarra
(37, 17, 37, 1), -- Lunes
(37, 17, 37, 2), -- Martes
(37, 17, 37, 3), -- Miércoles
(37, 17, 37, 4), -- Jueves
(37, 17, 37, 5), -- Viernes

-- Lucía Arce
(38, 18, 38, 1), -- Lunes
(38, 18, 38, 2), -- Martes
(38, 18, 38, 3), -- Miércoles
(38, 18, 38, 4), -- Jueves
(38, 18, 38, 5), -- Viernes

-- Tomás Barrera
(39, 19, 39, 1), -- Lunes
(39, 19, 39, 2), -- Martes
(39, 19, 39, 3), -- Miércoles
(39, 19, 39, 4), -- Jueves
(39, 19, 39, 5), -- Viernes

-- Tomás Pérez
(40, 20, 40, 1), -- Lunes
(40, 20, 40, 2), -- Martes
(40, 20, 40, 3), -- Miércoles
(40, 20, 40, 4), -- Jueves
(40, 20, 40, 5); -- Viernes


-- ==============================================
-- Inserción de datos: Asistencia
-- ==============================================

INSERT INTO ASISTENCIA (asi_hora_inicio, asi_hora_fin, fk_per_id, fk_car_id, fk_emc_id, fk_hor_id)
VALUES
-- Juan Pérez
('08:00:00', '16:00:00', 1, 1, 1, 1),   -- Lunes
('08:15:00', '16:30:00', 1, 1, 1, 2),   -- Martes
('08:10:00', '17:00:00', 1, 1, 1, 3),   -- Miércoles
('08:05:00', '16:45:00', 1, 1, 1, 4),   -- Jueves
('08:30:00', '16:15:00', 1, 1, 1, 5),   -- Viernes

-- María Gómez
('08:20:00', '16:00:00', 2, 5, 2, 1),   -- Lunes
('08:00:00', '16:30:00', 2, 5, 2, 2),   -- Martes
('08:10:00', '16:20:00', 2, 5, 2, 3),   -- Miércoles
('08:05:00', '16:45:00', 2, 5, 2, 4),   -- Jueves
('08:00:00', '16:00:00', 2, 5, 2, 5),   -- Viernes

-- Pedro Martínez
('08:25:00', '16:10:00', 3, 2, 3, 1),   -- Lunes
('08:00:00', '16:00:00', 3, 2, 3, 2),   -- Martes
('08:15:00', '16:30:00', 3, 2, 3, 3),   -- Miércoles
('08:00:00', '16:00:00', 3, 2, 3, 4),   -- Jueves
('08:10:00', '17:00:00', 3, 2, 3, 5),   -- Viernes

-- Luisa Fernández
('08:05:00', '16:00:00', 4, 3, 4, 1),   -- Lunes
('08:20:00', '16:30:00', 4, 3, 4, 2),   -- Martes
('08:00:00', '16:00:00', 4, 3, 4, 3),   -- Miércoles
('08:15:00', '16:45:00', 4, 3, 4, 4),   -- Jueves
('08:10:00', '16:30:00', 4, 3, 4, 5),   -- Viernes

-- Carlos Rodríguez
('08:00:00', '16:00:00', 5, 8, 5, 1),   -- Lunes
('08:10:00', '16:30:00', 5, 8, 5, 2),   -- Martes
('08:15:00', '17:00:00', 5, 8, 5, 3),   -- Miércoles
('08:05:00', '16:00:00', 5, 8, 5, 4),   -- Jueves
('08:00:00', '16:00:00', 5, 8, 5, 5),   -- Viernes

-- Ana Morales
('08:20:00', '16:15:00', 6, 4, 6, 1),   -- Lunes
('08:00:00', '16:00:00', 6, 4, 6, 2),   -- Martes
('08:10:00', '16:30:00', 6, 4, 6, 3),   -- Miércoles
('08:00:00', '16:00:00', 6, 4, 6, 4),   -- Jueves
('08:05:00', '17:00:00', 6, 4, 6, 5),   -- Viernes

-- José Hernández
('08:00:00', '16:00:00', 7, 7, 7, 1),   -- Lunes
('08:25:00', '16:30:00', 7, 7, 7, 2),   -- Martes
('08:10:00', '16:20:00', 7, 7, 7, 3),   -- Miércoles
('08:00:00', '17:00:00', 7, 7, 7, 4),   -- Jueves
('08:15:00', '16:45:00', 7, 7, 7, 5),   -- Viernes

-- Marta López
('08:10:00', '16:15:00', 8, 5, 8, 1),   -- Lunes
('08:00:00', '16:00:00', 8, 5, 8, 2),   -- Martes
('08:15:00', '16:30:00', 8, 5, 8, 3),   -- Miércoles
('08:00:00', '17:00:00', 8, 5, 8, 4),   -- Jueves
('08:05:00', '16:00:00', 8, 5, 8, 5),   -- Viernes

-- Luis García
('08:20:00', '16:00:00', 9, 6, 9, 1),   -- Lunes
('08:00:00', '16:30:00', 9, 6, 9, 2),   -- Martes
('08:15:00', '17:00:00', 9, 6, 9, 3),   -- Miércoles
('08:00:00', '16:15:00', 9, 6, 9, 4),   -- Jueves
('08:10:00', '16:45:00', 9, 6, 9, 5),   -- Viernes

-- Sara Vega
('08:00:00', '16:30:00', 10, 9, 10, 1), -- Lunes
('08:15:00', '17:00:00', 10, 9, 10, 2), -- Martes
('08:00:00', '16:20:00', 10, 9, 10, 3), -- Miércoles
('08:05:00', '16:00:00', 10, 9, 10, 4), -- Jueves
('08:10:00', '16:00:00', 10, 9, 10, 5), -- Viernes

-- David Ramos
('08:00:00', '16:00:00', 11, 10, 11, 1),-- Lunes
('08:10:00', '16:20:00', 11, 10, 11, 2),-- Martes
('08:15:00', '17:00:00', 11, 10, 11, 3),-- Miércoles
('08:05:00', '16:30:00', 11, 10, 11, 4),-- Jueves
('08:00:00', '16:15:00', 11, 10, 11, 5),-- Viernes

-- Laura Torres
('08:20:00', '16:00:00', 12, 11, 12, 1),-- Lunes
('08:00:00', '16:30:00', 12, 11, 12, 2),-- Martes
('08:10:00', '16:45:00', 12, 11, 12, 3),-- Miércoles
('08:05:00', '16:15:00', 12, 11, 12, 4),-- Jueves
('08:15:00', '16:30:00', 12, 11, 12, 5),-- Viernes

-- Andrés Ruiz
('08:00:00', '16:00:00', 13, 12, 13, 1),-- Lunes
('08:15:00', '16:30:00', 13, 12, 13, 2),-- Martes
('08:10:00', '17:00:00', 13, 12, 13, 3),-- Miércoles
('08:05:00', '16:45:00', 13, 12, 13, 4),-- Jueves
('08:30:00', '16:15:00', 13, 12, 13, 5),-- Viernes

-- Carmen Díaz
('08:20:00', '16:00:00', 14, 13, 14, 1),-- Lunes
('08:00:00', '16:30:00', 14, 13, 14, 2),-- Martes
('08:10:00', '16:20:00', 14, 13, 14, 3),-- Miércoles
('08:05:00', '16:45:00', 14, 13, 14, 4),-- Jueves
('08:00:00', '16:00:00', 14, 13, 14, 5),-- Viernes

-- Manuel Mejía
('08:25:00', '16:10:00', 15, 14, 15, 1),-- Lunes
('08:00:00', '16:00:00', 15, 14, 15, 2),-- Martes
('08:15:00', '16:30:00', 15, 14, 15, 3),-- Miércoles
('08:00:00', '16:00:00', 15, 14, 15, 4),-- Jueves
('08:10:00', '17:00:00', 15, 14, 15, 5),-- Viernes

-- Gloria Ortiz
('08:05:00', '16:00:00', 16, 15, 16, 1),-- Lunes
('08:20:00', '16:30:00', 16, 15, 16, 2),-- Martes
('08:00:00', '16:00:00', 16, 15, 16, 3),-- Miércoles
('08:15:00', '16:45:00', 16, 15, 16, 4),-- Jueves
('08:10:00', '16:30:00', 16, 15, 16, 5),-- Viernes

-- Rafael Navarro
('08:00:00', '16:00:00', 17, 16, 17, 1),-- Lunes
('08:10:00', '16:30:00', 17, 16, 17, 2),-- Martes
('08:15:00', '17:00:00', 17, 16, 17, 3),-- Miércoles
('08:05:00', '16:00:00', 17, 16, 17, 4),-- Jueves
('08:00:00', '16:00:00', 17, 16, 17, 5),-- Viernes

-- Sofía Pineda
('08:20:00', '16:15:00', 18, 17, 18, 1),-- Lunes
('08:00:00', '16:00:00', 18, 17, 18, 2),-- Martes
('08:10:00', '16:30:00', 18, 17, 18, 3),-- Miércoles
('08:00:00', '16:00:00', 18, 17, 18, 4),-- Jueves
('08:05:00', '17:00:00', 18, 17, 18, 5),-- Viernes

-- Fabio Serrano
('08:00:00', '16:00:00', 19, 18, 19, 1),-- Lunes
('08:25:00', '16:30:00', 19, 18, 19, 2),-- Martes
('08:10:00', '16:20:00', 19, 18, 19, 3),-- Miércoles
('08:00:00', '17:00:00', 19, 18, 19, 4),-- Jueves
('08:15:00', '16:45:00', 19, 18, 19, 5),-- Viernes

-- Diana Castillo
('08:10:00', '16:15:00', 20, 19, 20, 1),-- Lunes
('08:00:00', '16:00:00', 20, 19, 20, 2),-- Martes
('08:15:00', '16:30:00', 20, 19, 20, 3),-- Miércoles
('08:00:00', '17:00:00', 20, 19, 20, 4),-- Jueves
('08:05:00', '16:00:00', 20, 19, 20, 5),-- Viernes

-- Jorge Suárez
('08:20:00', '16:00:00', 21, 20, 21, 1),-- Lunes
('08:00:00', '16:30:00', 21, 20, 21, 2),-- Martes
('08:15:00', '17:00:00', 21, 20, 21, 3),-- Miércoles
('08:00:00', '16:15:00', 21, 20, 21, 4),-- Jueves
('08:10:00', '16:45:00', 21, 20, 21, 5),-- Viernes

-- Elena Espinosa
('08:00:00', '16:30:00', 22, 1, 22, 1), -- Lunes
('08:15:00', '17:00:00', 22, 1, 22, 2), -- Martes
('08:00:00', '16:20:00', 22, 1, 22, 3), -- Miércoles
('08:05:00', '16:00:00', 22, 1, 22, 4), -- Jueves
('08:10:00', '16:00:00', 22, 1, 22, 5), -- Viernes

-- Camilo Correa
('08:00:00', '16:00:00', 23, 2, 23, 1), -- Lunes
('08:10:00', '16:20:00', 23, 2, 23, 2), -- Martes
('08:15:00', '17:00:00', 23, 2, 23, 3), -- Miércoles
('08:05:00', '16:30:00', 23, 2, 23, 4), -- Jueves
('08:00:00', '16:15:00', 23, 2, 23, 5), -- Viernes

-- Estela Guzmán
('08:20:00', '16:00:00', 24, 3, 24, 1), -- Lunes
('08:00:00', '16:30:00', 24, 3, 24, 2), -- Martes
('08:10:00', '16:45:00', 24, 3, 24, 3), -- Miércoles
('08:05:00', '16:15:00', 24, 3, 24, 4), -- Jueves
('08:15:00', '16:30:00', 24, 3, 24, 5), -- Viernes

-- Víctor Santana
('08:25:00', '16:10:00', 25, 8, 25, 1), -- Lunes
('08:00:00', '16:00:00', 25, 8, 25, 2), -- Martes
('08:15:00', '16:30:00', 25, 8, 25, 3), -- Miércoles
('08:00:00', '16:00:00', 25, 8, 25, 4), -- Jueves
('08:10:00', '17:00:00', 25, 8, 25, 5), -- Viernes

-- Olga Álvarez
('08:05:00', '16:00:00', 26, 6, 26, 1), -- Lunes
('08:20:00', '16:30:00', 26, 6, 26, 2), -- Martes
('08:00:00', '16:00:00', 26, 6, 26, 3), -- Miércoles
('08:15:00', '16:45:00', 26, 6, 26, 4), -- Jueves
('08:10:00', '16:30:00', 26, 6, 26, 5), -- Viernes

-- Gustavo Montoya
('08:00:00', '16:00:00', 27, 4, 27, 1), -- Lunes
('08:10:00', '16:30:00', 27, 4, 27, 2), -- Martes
('08:15:00', '17:00:00', 27, 4, 27, 3), -- Miércoles
('08:05:00', '16:00:00', 27, 4, 27, 4), -- Jueves
('08:00:00', '16:00:00', 27, 4, 27, 5), -- Viernes

-- Verónica Palacios
('08:20:00', '16:15:00', 28, 7, 28, 1), -- Lunes
('08:00:00', '16:00:00', 28, 7, 28, 2), -- Martes
('08:10:00', '16:30:00', 28, 7, 28, 3), -- Miércoles
('08:00:00', '16:00:00', 28, 7, 28, 4), -- Jueves
('08:05:00', '17:00:00', 28, 7, 28, 5), -- Viernes

-- Sebastián Blanco
('08:00:00', '16:00:00', 29, 9, 29, 1), -- Lunes
('08:25:00', '16:30:00', 29, 9, 29, 2), -- Martes
('08:10:00', '16:20:00', 29, 9, 29, 3), -- Miércoles
('08:00:00', '17:00:00', 29, 9, 29, 4), -- Jueves
('08:15:00', '16:45:00', 29, 9, 29, 5), -- Viernes

-- Adriana Bermúdez
('08:10:00', '16:15:00', 30, 10, 30, 1), -- Lunes
('08:00:00', '16:00:00', 30, 10, 30, 2), -- Martes
('08:15:00', '16:30:00', 30, 10, 30, 3), -- Miércoles
('08:00:00', '17:00:00', 30, 10, 30, 4), -- Jueves
('08:05:00', '16:00:00', 30, 10, 30, 5), -- Viernes

-- Enrique Cabrera
('08:20:00', '16:00:00', 31, 11, 31, 1), -- Lunes
('08:00:00', '16:30:00', 31, 11, 31, 2), -- Martes
('08:15:00', '17:00:00', 31, 11, 31, 3), -- Miércoles
('08:00:00', '16:15:00', 31, 11, 31, 4), -- Jueves
('08:10:00', '16:45:00', 31, 11, 31, 5), -- Viernes

-- Mariela Zambrano
('08:00:00', '16:30:00', 32, 12, 32, 1), -- Lunes
('08:15:00', '17:00:00', 32, 12, 32, 2), -- Martes
('08:00:00', '16:20:00', 32, 12, 32, 3), -- Miércoles
('08:05:00', '16:00:00', 32, 12, 32, 4), -- Jueves
('08:10:00', '16:00:00', 32, 12, 32, 5), -- Viernes

-- Fernando Jiménez
('08:00:00', '16:00:00', 33, 13, 33, 1), -- Lunes
('08:10:00', '16:20:00', 33, 13, 33, 2), -- Martes
('08:15:00', '17:00:00', 33, 13, 33, 3), -- Miércoles
('08:05:00', '16:30:00', 33, 13, 33, 4), -- Jueves
('08:00:00', '16:15:00', 33, 13, 33, 5), -- Viernes

-- Patricia Acosta
('08:20:00', '16:00:00', 34, 14, 34, 1), -- Lunes
('08:00:00', '16:30:00', 34, 14, 34, 2), -- Martes
('08:10:00', '16:45:00', 34, 14, 34, 3), -- Miércoles
('08:05:00', '16:15:00', 34, 14, 34, 4), -- Jueves
('08:15:00', '16:30:00', 34, 14, 34, 5), -- Viernes

-- Héctor Mendoza
('08:00:00', '16:00:00', 35, 15, 35, 1), -- Lunes
('08:25:00', '16:30:00', 35, 15, 35, 2), -- Martes
('08:10:00', '16:20:00', 35, 15, 35, 3), -- Miércoles
('08:00:00', '17:00:00', 35, 15, 35, 4), -- Jueves
('08:15:00', '16:45:00', 35, 15, 35, 5), -- Viernes

-- Claudia Peña
('08:10:00', '16:15:00', 36, 16, 36, 1), -- Lunes
('08:00:00', '16:00:00', 36, 16, 36, 2), -- Martes
('08:15:00', '16:30:00', 36, 16, 36, 3), -- Miércoles
('08:00:00', '17:00:00', 36, 16, 36, 4), -- Jueves
('08:05:00', '16:00:00', 36, 16, 36, 5), -- Viernes

-- Eduardo Ibarra
('08:20:00', '16:00:00', 37, 17, 37, 1), -- Lunes
('08:00:00', '16:30:00', 37, 17, 37, 2), -- Martes
('08:15:00', '17:00:00', 37, 17, 37, 3), -- Miércoles
('08:00:00', '16:15:00', 37, 17, 37, 4), -- Jueves
('08:10:00', '16:45:00', 37, 17, 37, 5), -- Viernes

-- Lucía Arce
('08:00:00', '16:30:00', 38, 18, 38, 1), -- Lunes
('08:15:00', '17:00:00', 38, 18, 38, 2), -- Martes
('08:00:00', '16:20:00', 38, 18, 38, 3), -- Miércoles
('08:05:00', '16:00:00', 38, 18, 38, 4), -- Jueves
('08:10:00', '16:00:00', 38, 18, 38, 5), -- Viernes

-- Tomás Barrera
('08:00:00', '16:00:00', 39, 19, 39, 1), -- Lunes
('08:10:00', '16:20:00', 39, 19, 39, 2), -- Martes
('08:15:00', '17:00:00', 39, 19, 39, 3), -- Miércoles
('08:05:00', '16:30:00', 39, 19, 39, 4), -- Jueves
('08:00:00', '16:15:00', 39, 19, 39, 5), -- Viernes

-- Tomás Pérez
('08:20:00', '16:00:00', 40, 20, 40, 1), -- Lunes
('08:00:00', '16:30:00', 40, 20, 40, 2), -- Martes
('08:10:00', '16:45:00', 40, 20, 40, 3), -- Miércoles
('08:05:00', '16:15:00', 40, 20, 40, 4), -- Jueves
('08:15:00', '16:30:00', 40, 20, 40, 5); -- Viernes


-- ==============================================
-- Inserción de datos: Empleado Teléfono
-- ==============================================
INSERT INTO TELEFONO (tel_codigo_area, tel_numero, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES
    ('+58', '4123456789', 1, NULL, NULL, NULL), 
    ('+58', '4145678901', 2, NULL, NULL, NULL), 
    ('+58', '4167890123', 3, NULL, NULL, NULL), 
    ('+58', '4249012345', 4, NULL, NULL, NULL), 
    ('+58', '4261234567', 5, NULL, NULL, NULL); 

-- ==============================================
-- Inserción de datos: Red Social
-- ==============================================
INSERT INTO RED_SOCIAL (res_usuario, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('@juan_perez', 1, NULL, NULL, NULL),     
       ('@maría_gomez', 2, NULL, NULL, NULL),    
       ('@pedro_martínez', 3, NULL, NULL, NULL),    
       ('@luisa_fernández', 4, NULL, NULL, NULL), 
       ('@carlos_rodríguez', 5, NULL, NULL, NULL);   

-- ==============================================
-- Inserción de datos: Correo Electrónico
-- ==============================================
INSERT INTO CORREO_ELECTRONICO (cor_dir_correo, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES ('juanperez@example.com', 1, NULL, NULL, NULL),     
       ('mariagomez@example.com', 2, NULL, NULL, NULL),  
       ('pedromartinez@example.com', 3, NULL, NULL, NULL),    
       ('luisafernandez@example.com', 4, NULL, NULL, NULL), 
       ('carlosrodriguez@example.com', 5, NULL, NULL, NULL);  
	   
-- ======================================================================