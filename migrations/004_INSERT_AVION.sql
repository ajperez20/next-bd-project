-- ==============================================
-- Inserción de datos: Tipo de Avión
-- ==============================================
INSERT INTO TIPO_AVION (tiv_nombre, tiv_descripcion)
VALUES ('AU-80', 'Modelo diseñado para rutas transcontinentales, equipado con 4 turborreactores.'),
       ('AU-801', 'Trimotor comercial útil para aeropuertos pequeños y rutas de alcance medio.'),
       ('AU-802', 'Modelo bimotor para rutas cortas y medianas con el mayor número de ventas en su categoría.'),
       ('AU-747Plus', 'Avión transcontinental de fuselaje ancho con capacidad icónica.'),
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
VALUES ('Tripulación'),                     --id= 1
       ('Capacidad de pasajeros'),          --id= 2
       ('Distancia entre asientos'),        --id= 3
       ('Ancho de los asientos'),           --id= 4
       ('Longitud'),                        --id= 5
       ('Envergadura'),                     --id= 6
       ('Altura'),                          --id= 7
       ('Flecha alar'),                     --id= 8
       ('Ancho del fuselaje'),              --id= 9
       ('Alto del fuselaje'),               --id= 10
       ('Ancho de la cabina'),              --id= 11
       ('Alto de la cabina'),               --id= 12
       ('Peso vacío'),                      --id= 13
       ('Peso máximo de despegue'),         --id= 14
       ('Peso máximo de aterrizaje'),       --id= 15
       ('Volumen de carga'),                --id= 16
       ('Carrera de despegue'),             --id= 17
       ('Techo de servicio'),               --id= 18
       ('Velocidad crucero'),               --id= 19
       ('Velocidad máxima'),                --id= 20
       ('Alcance'),                         --id= 21
       ('Máxima capacidad de combustible'), --id= 22
       ('Empuje máximo por motor'),         --id= 23
       ('Empuje a velocidad crucero'),      --id= 24
       ('Diámetro del álabes'),             --id= 25
       ('Longitud del motor'),              --id= 26
       ('Cantidad de motores'),             --id= 27
       ('Superficie alar'),                 --id= 28
       ('Régimen de asceso');               --id= 29

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
('turborreactores', 4, 27, 1),
('kN', 75.6, 23, 1),
('km/h', 1000, 20, 1),
('km', 6820, 21, 1),

-- Características del AU-801
('tripulantes', 7, 1, 2),
('pasajeros', 189, 2, 2),
('m', 46.7, 5, 2),
('m', 32.9, 6, 2),
('m', 10.4, 7, 2),
('kg', 46700, 13, 2),
('kg', 95028, 14, 2),
('m', 13000, 18, 2),
('km/h', 907, 19, 2),
('km', 4450, 21, 2),
('kN', 77, 23, 2),
('turborreactores', 3, 27, 2),
('m2', 153, 28, 2),
('m/s', 14.9, 29, 2),

-- Características del AU-802
('tripulantes', 6, 1, 3),
('pasajeros', 118, 2, 3),
('cm', 76, 3, 3),
('cm', 43.7, 4, 3),
('m', 28.6, 5, 3),
('m', 28.3, 6, 3),
('m', 11.3, 7, 3),
('mrad', 436, 8, 3),
('m', 3.76, 9, 3),
('m', 4.01, 10, 3),
('m', 3.54, 11, 3),
('m', 2.20, 12, 3),
('kg', 28120, 13, 3),
('kg', 49190, 14, 3),
('kg', 45000, 15, 3),
('m3', 18.4, 16, 3),
('m', 1990, 17, 3),
('m', 10700, 18, 3),
('km/h', 780, 19, 3),
('km/h', 876, 20, 3),
('km', 3440, 21, 3),
('litros', 17860, 22, 3),
('kN', 84.5, 23, 3),
('kN', 17.21, 24, 3),
('m', 1.12, 25, 3),
('m', 3.20, 26, 3),
('turborreactores', 2, 27, 3),

-- Características del AU-802A
('tripulantes', 6, 1, 6),
('pasajeros', 168, 2, 6),
('cm', 76, 3, 6),
('cm', 43.7, 4, 6),
('m', 36.5, 5, 6),
('m', 28.9, 6, 6),
('m', 11.1, 7, 6),
('mrad', 436, 8, 6),
('m', 3.76, 9, 6),
('m', 4.01, 10, 6),
('m', 3.54, 11, 6),
('m', 2.20, 12, 6),
('kg', 33200, 13, 6),
('kg', 68050, 14, 6),
('kg', 56250, 15, 6),
('m3', 38.9, 16, 6),
('m', 2540, 17, 6),
('m', 11300, 18, 6),
('km/h', 780, 19, 6),
('km/h', 876, 20, 6),
('km', 4005, 21, 6),
('litros', 23170, 22, 6),
('kN', 98, 23, 6),
('kN', 21.22, 24, 6),
('m', 1.52, 25, 6),
('m', 3.20, 26, 6),
('turborreactores', 2, 27, 6),

-- Características del AU-802B
('tripulantes', 6, 1, 7),
('pasajeros', 132, 2, 7),
('cm', 76, 3, 7),
('cm', 43.7, 4, 7),
('m', 31.1, 5, 7),
('m', 28.9, 6, 7),
('m', 11.1, 7, 7),
('mrad', 436, 8, 7),
('m', 3.76, 9, 7),
('m', 4.01, 10, 7),
('m', 3.54, 11, 7),
('m', 2.20, 12, 7),
('kg', 31300, 13, 7),
('kg', 60550, 14, 7),
('kg', 50000, 15, 7),
('m3', 23.3, 16, 7),
('m', 2470, 17, 7),
('m', 11300, 18, 7),
('km/h', 780, 19, 7),
('km/h', 876, 20, 7),
('km', 4445, 21, 7),
('litros', 23800, 22, 7),
('kN', 89, 23, 7),
('kN', 21.80, 24, 7),
('m', 1.52, 25, 7),
('m', 2.36, 26, 7),
('turborreactores', 2, 27, 7),

-- Características del AU-802C
('tripulantes', 6, 1, 8),
('pasajeros', 132, 2, 8),
('cm', 76, 3, 8),
('cm', 43.7, 4, 8),
('m', 31.2, 5, 8),
('m', 35.7, 6, 8),
('m', 12.6, 7, 8),
('mrad', 437, 8, 8),
('m', 3.76, 9, 8),
('m', 4.01, 10, 8),
('m', 3.54, 11, 8),
('m', 2.20, 12, 8),
('kg', 36380, 13, 8),
('kg', 66000, 14, 8),
('kg', 55000, 15, 8),
('m3', 21.4, 16, 8),
('m', 2400, 17, 8),
('m', 12500, 18, 8),
('km/h', 828, 19, 8),
('km/h', 876, 20, 8),
('km', 5650, 21, 8),
('litros', 26020, 22, 8),
('kN', 91.6, 23, 8),
('kN', 23.18, 24, 8),
('m', 1.55, 25, 8),
('m', 2.51, 26, 8),
('turborreactores', 2, 27, 8),

-- Características del AU-802D
('tripulantes', 6, 1, 9),
('pasajeros', 149, 2, 9),
('cm', 76, 3, 9),
('cm', 43.7, 4, 9),
('m', 33.6, 5, 9),
('m', 35.7, 6, 9),
('m', 12.5, 7, 9),
('mrad', 437, 8, 9),
('m', 3.76, 9, 9),
('m', 4.01, 10, 9),
('m', 3.54, 11, 9),
('m', 2.20, 12, 9),
('kg', 38150, 13, 9),
('kg', 70000, 14, 9),
('kg', 58600, 15, 9),
('m3', 27.3, 16, 9),
('m', 2480, 17, 9),
('m', 12500, 18, 9),
('km/h', 828, 19, 9),
('km/h', 876, 20, 9),
('km', 6230, 21, 9),
('litros', 26020, 22, 9),
('kN', 116, 23, 9),
('kN', 24.38, 24, 9),
('m', 1.55, 25, 9),
('m', 2.51, 26, 9),
('turborreactores', 2, 27, 9),

-- Características del AU-802E
('tripulantes', 6, 1, 10),
('pasajeros', 189, 2, 10),
('cm', 76, 3, 10),
('cm', 43.7, 4, 10),
('m', 39.5, 5, 10),
('m', 35.7, 6, 10),
('m', 12.5, 7, 10),
('mrad', 437, 8, 10),
('m', 3.76, 9, 10),
('m', 4.01, 10, 10),
('m', 3.54, 11, 10),
('m', 2.20, 12, 10),
('kg', 41415, 13, 10),
('kg', 79000, 14, 10),
('kg', 66350, 15, 10),
('m3', 45.1, 16, 10),
('m', 2450, 17, 10),
('m', 12500, 18, 10),
('km/h', 828, 19, 10),
('km/h', 876, 20, 10),
('km', 5665, 21, 10),
('litros', 26020, 22, 10),
('kN', 121.4, 23, 10),
('kN', 24.38, 24, 10),
('m', 1.55, 25, 10),
('m', 2.51, 26, 10),
('turborreactores', 2, 27, 10),

-- Características del AU-802F
('tripulantes', 6, 1, 11),
('pasajeros', 215, 2, 11),
('cm', 71, 3, 11),
('cm', 43.7, 4, 11),
('m', 42.1, 5, 11),
('m', 35.7, 6, 11),
('m', 12.5, 7, 11),
('mrad', 437, 8, 11),
('m', 3.76, 9, 11),
('m', 4.01, 10, 11),
('m', 3.54, 11, 11),
('m', 2.20, 12, 11),
('kg', 44675, 13, 11),
('kg', 85100, 14, 11),
('kg', 66350, 15, 11),
('m3', 52.5, 16, 11),
('m', 2450, 17, 11),
('m', 12500, 18, 11),
('km/h', 823, 19, 11),
('km/h', 876, 20, 11),
('km', 4995, 21, 11),
('litros', 29660, 22, 11),
('kN', 121.4, 23, 11),
('kN', 24.38, 24, 11),
('m', 1.55, 25, 11),
('m', 2.51, 26, 11),
('turborreactores', 2, 27, 11),


-- Características del AU-747Plus
('tripulantes', 3, 1, 4),
('pasajeros', 452, 2, 4),
('m', 70.66, 5, 4),
('m', 59.64, 6, 4),
('m', 19.3, 7, 4),
('kg', 162400, 13, 4),
('kg', 333400, 14, 4),
('m', 3190, 17, 4),
('m', 10500, 18, 4),
('km/h', 893, 19, 4),
('km/h', 945, 20, 4),
('km', 9800, 21, 4),
('litros', 183380, 22, 4),
('kN', 207, 23, 4),
('turborreactores', 4, 27, 4),

-- Características del AU-747Platinium
('tripulantes', 3, 1, 12),
('pasajeros', 452, 2, 12),
('m', 70.66, 5, 12),
('m', 59.64, 6, 12),
('m', 19.3, 7, 12),
('kg', 174000, 13, 12),
('kg', 378000, 14, 12),
('m', 3190, 17, 12),
('m', 10500, 18, 12),
('km/h', 893, 19, 12),
('km/h', 945, 20, 12),
('km', 12700, 21, 12),
('litros', 199160, 22, 12),
('kN', 244, 23, 12),
('turborreactores', 4, 27, 12),

-- Características del AU-747Gold
('tripulantes', 3, 1, 13),
('pasajeros', 496, 2, 13),
('m', 70.66, 5, 13),
('m', 59.64, 6, 13),
('m', 19.3, 7, 13),
('kg', 178100, 13, 13),
('kg', 378000, 14, 13),
('m', 3320, 17, 13),
('m', 10500, 18, 13),
('km/h', 893, 19, 13),
('km/h', 945, 20, 13),
('km', 12400, 21, 13),
('litros', 199160, 22, 13),
('kN', 244, 23, 13),
('turborreactores', 4, 27, 13),

-- Características del AU-747Silver
('tripulantes', 2, 1, 14),
('pasajeros', 524, 2, 14),
('m', 70.66, 5, 14),
('m', 66.4, 6, 14),
('m', 19.4, 7, 14),
('kg', 178750, 13, 14),
('kg', 397000, 14, 14),
('m', 3018, 17, 14),
('m', 10500, 18, 14),
('km/h', 913, 19, 14),
('km/h', 978, 20, 14),
('km', 13450, 21, 14),
('litros', 216840, 22, 14),
('kN', 282, 23, 14),
('turborreactores', 4, 27, 14),

-- Características del AU-747SilverB
('tripulantes', 2, 1, 15),
('pasajeros', 567, 2, 15),
('m', 76.4, 5, 15),
('m', 68.5, 6, 15),
('m', 19.4, 7, 15),
('kg', 186000, 13, 15),
('kg', 440000, 14, 15),
('m', 3090, 17, 15),
('m', 10500, 18, 15),
('km/h', 916, 19, 15),
('km/h', 978, 20, 15),
('km', 14875, 21, 15),
('litros', 243120, 22, 15),
('kN', 296, 23, 15),
('turborreactores', 4, 27, 15),

-- Características del AU-87A
('pasajeros', 220, 2, 5),
('turborreactores', 2, 27, 5),

-- Características del AU-87A Business
('pasajeros', 320, 2, 16),
('turborreactores', 2, 27, 16);
