-- ==============================================
-- Inserción de datos: Tipo de Avión
-- ==============================================
INSERT INTO TIPO_AVION (tiv_nombre, tiv_descripcion)
VALUES ('AU-80', 'Modelo diseñado para rutas transcontinentales, equipado con 4 turborreactores.'),
       ('AU-801', 'Trimotor comercial útil para aeropuertos pequeños y rutas de alcance medio.'),
       ('AU-802', 'Modelo bimotor para rutas cortas y medianas con el mayor número de ventas en su categoría.'),
       ('AU-747Plus', 'Avión transcontinental de fuselaje ancho con capacidad icónica.')
	   ('AU-87A', 'Avión birreactor diseñado para rutas cortas y medias.');

-- ==============================================
-- Inserción de datos: Modelo de Avión
-- ==============================================
INSERT INTO MODELO_AVION_CONF (mda_nombre, mda_descripcion, fk_tiv_id)
VALUES ('AU-80', 'Rutas largas con capacidad de 179 pasajeros.', 1),
       ('AU-801', 'Rutas cortas a medianas con capacidad de 189 pasajeros.', 2),
       ('AU-802', 'Modelo optimizado para rutas cortas a medianas con variantes adaptadas.', 3),
       ('AU-747Plus', 'Transcontinental con capacidad para 524 pasajeros en dos clases.', 4),
	   ('AU-87A', 'Avión de pasajeros más vendido en la aviación civil.', 5);
	   

-- ==============================================
-- Inserción de datos: Variantes del AU-802
-- ==============================================
INSERT INTO MODELO_AVION_CONF (mda_nombre, mda_descripcion, fk_tiv_id)
VALUES ('AU-802A', 'Variante de menor capacidad con 168 pasajeros (1 clase densa).', 3),
       ('AU-802B', 'Variante con capacidad intermedia para rutas cortas, 132 pasajeros.', 3),
       ('AU-802C', 'Variante con capacidad de 132 pasajeros, diseñada para mayor alcance.', 3),
       ('AU-802D', 'Modelo adaptado con capacidad de 149 pasajeros (alta densidad).', 3),
       ('AU-802E', 'Modelo optimizado con un alcance mejorado y capacidad de 189 pasajeros.', 3),
       ('AU-802F', 'Variante modernizada con capacidad para 215 pasajeros (1 clase densa).', 3);

-- ==============================================
-- Inserción de datos: Variantes del AU-747Plus
-- ==============================================
INSERT INTO MODELO_AVION_CONF (mda_nombre, mda_descripcion, fk_tiv_id)
VALUES ('AU-747Platinium', 'Avión de pasillo único para recorridos medios.', 4),
       ('AU-747Gold', 'Cabina ancha, bimotor, diseñado para rutas medias y largas.', 4),
       ('AU-747Silver', 'Modelo con capacidad de 390 pasajeros y autonomía mejorada.', 4),
       ('AU-747SilverB', 'Variante con mayor capacidad de pasajeros y optimización estructural.', 4);

-- ==============================================
-- Inserción de datos: Variantes del AU-87A
-- ==============================================
INSERT INTO MODELO_AVION_CONF (mda_nombre, mda_descripcion, fk_tiv_id)
VALUES ('AU-87ABusiness', 'Variante del AU-87A diseñada para uso empresarial.', 5);


-- ==============================================
-- Inserción de datos: Característica de Avión
-- ==============================================
INSERT INTO CARACTERISTICA_ANV_CONF (pvv_nombre_caracteristica)
VALUES ('Tripulación'),
       ('Capacidad de pasajeros'),
       ('Distancia entre asientos'),
       ('Ancho de los asientos'),
       ('Longitud'), 
       ('Envergadura'),
       ('Altura'),
       ('Flecha alar'),
       ('Ancho del fuselaje'),
       ('Alto del fuselaje'),
       ('Ancho de la cabina'),
       ('Alto de la cabina'),
       ('Peso vacío'),
       ('Peso máximo de despegue'),
       ('Peso máximo de aterrizaje'),
       ('Volumen de carga'),
       ('Carrera de despegue'),
       ('Techo de servicio'),
       ('Velocidad crucero'),
       ('Velocidad máxima'),
       ('Alcance'),
       ('Máxima capacidad de combustible'),
       ('Empuje máximo por motor'),
       ('Empuje a velocidad crucero'),
       ('Diámetro del álabes'),
       ('Longitud del motor'),
	   ('Cantidad de motores'),
	   ('Superficie alar'),
	   ('Régimen de asceso');

-- ==============================================
-- Inserción de datos: Modelo Avión Característica
-- ==============================================
INSERT INTO MODELO_AVION_CARACTERISTICA (mnc_unidad_medida, mnc_valor, fk_pvv_id, fk_mda_id)
VALUES
-- Características del AU-80
('pasajeros', 179, 2, 1),
('m', 44.1, 5, 1),
('m', 39.9, 6, 1),
('m', 12.9, 7, 1),
('kg', 55580, 13, 1),
('kg', 116570, 14, 1),
('turborreactores', 4, 22, 1),
('kN', 75.6, 23, 1),
('km/h', 1000, 20, 1),
('km', 6820, 21, 1),

-- Características del AU-801
('tripulantes', 7, 1, 2),
('pasajeros', 189, 2, 2),
('m', 46.7, 5, 2),
('m', 32.9, 6, 2),
('m', 10.4, 7, 2),
('m2', 153, 8, 2),
('kg', 46700, 13, 2),
('kg', 95028, 14, 2),
('turborreactores', 3, 22, 2),
('kN', 77, 23, 2),
('km/h', 907, 19, 2),
('km', 4450, 21, 2),
('m', 13000, 18, 2),
('m/s', 14.9, 26, 2),

-- Características del AU-802
('tripulantes', 6, 1, 3),
('pasajeros', 118, 2, 3),
('m', 28.6, 5, 3),
('m', 28.3, 6, 3),
('m', 11.3, 7, 3),
('kg', 28120, 13, 3),
('kg', 49190, 14, 3),
('km/h', 780, 19, 3),
('km', 3440, 21, 3),
('litros', 17860, 22, 3),
('kN', 84.5, 23, 3),

-- Características del AU-802A
('tripulantes', 6, 1, 4),
('pasajeros', 104, 2, 4),
('m', 36.5, 5, 4),
('m', 28.9, 6, 4),
('m', 11.1, 7, 4),
('kg', 33200, 13, 4),
('kg', 68050, 14, 4),
('km/h', 828, 19, 4),
('km', 4005, 21, 4),
('litros', 23170, 22, 4),
('kN', 98, 23, 4),

-- Características del AU-802B
('tripulantes', 6, 1, 5),
('pasajeros', 168, 2, 5),
('m', 31.1, 5, 5),
('m', 35.7, 6, 5),
('m', 12.6, 7, 5),
('kg', 31300, 13, 5),
('kg', 60550, 14, 5),
('km/h', 823, 19, 5),
('km', 4445, 21, 5),
('litros', 23800, 22, 5),
('kN', 89, 23, 5),

-- Características del AU-802C
('tripulantes', 6, 1, 6),
('pasajeros', 159, 2, 6),
('m', 31.2, 5, 6),
('m', 35.7, 6, 6),
('m', 12.5, 7, 6),
('kg', 36380, 13, 6),
('kg', 66000, 14, 6),
('km', 5650, 21, 6),
('litros', 26020, 22, 6),
('kN', 91.6, 23, 6),

-- Características del AU-802D
('tripulantes', 6, 1, 7),
('pasajeros', 132, 2, 7),
('m', 33.6, 5, 7),
('kg', 38150, 13, 7),
('kg', 70000, 14, 7),
('km', 6230, 21, 7),
('litros', 29660, 22, 7),
('kN', 116, 23, 7),

-- Características del AU-802E
('tripulantes', 6, 1, 8),
('pasajeros', 149, 2, 8),
('m', 39.5, 5, 8),
('kg', 41415, 13, 8),
('kg', 79000, 14, 8),
('km', 5665, 21, 8),
('litros', 29660, 22, 8),
('kN', 121.4, 23, 8),

-- Características del AU-802F
('tripulantes', 6, 1, 9),
('pasajeros', 215, 2, 9),
('m', 42.1, 5, 9),
('m', 35.7, 6, 9),
('kg', 44675, 13, 9),
('kg', 85100, 14, 9),
('km', 9955, 21, 9),
('litros', 37500, 22, 9),
('kN', 121.4, 23, 9),

-- Características del AU-747Plus
('tripulantes', 3, 1, 10),
('pasajeros', 452, 2, 10),
('m', 70.66, 5, 10),
('m', 59.64, 6, 10),
('m', 19.3, 7, 10),
('kg', 162400, 13, 10),
('kg', 333400, 14, 10),
('km/h', 893, 19, 10),
('km', 9800, 21, 10),
('litros', 183380, 22, 10),
('kN', 207, 23, 10),

-- Características del AU-747Platinium
('tripulantes', 2, 1, 11),
('pasajeros', 366, 2, 11),
('m', 76.4, 5, 11),
('m', 64.4, 6, 11),
('m', 19.4, 7, 11),
('kg', 174000, 13, 11),
('kg', 378000, 14, 11),
('km/h', 913, 19, 11),
('km', 12700, 21, 11),
('litros', 199160, 22, 11),
('kN', 223, 23, 11),

-- Características del AU-747Gold
('tripulantes', 3, 1, 12),
('pasajeros', 496, 2, 12),
('m', 76.4, 5, 12),
('m', 68.5, 6, 12),
('m', 19.4, 7, 12),
('kg', 178100, 13, 12),
('kg', 397000, 14, 12),
('km/h', 916, 19, 12),
('km', 12400, 21, 12),
('litros', 216840, 22, 12),
('kN', 244, 23, 12),

-- Características del AU-747Silver
('tripulantes', 3, 1, 13),
('pasajeros', 524, 2, 13),
('m', 76.4, 5, 13),
('m', 68.5, 6, 13),
('m', 19.4, 7, 13),
('kg', 178750, 13, 13),
('kg', 413000, 14, 13),
('km/h', 916, 19, 13),
('km', 13450, 21, 13),
('litros', 241140, 22, 13),
('kN', 276, 23, 13),

-- Características del AU-747SilverB
('tripulantes', 3, 1, 14),
('pasajeros', 567, 2, 14),
('m', 76.4, 5, 14),
('m', 68.5, 6, 14),
('m', 19.4, 7, 14),
('kg', 186000, 13, 14),
('kg', 440000, 14, 14),
('km/h', 916, 19, 14),
('km', 14815, 21, 14),
('litros', 243120, 22, 14),
('kN', 296, 23, 14);