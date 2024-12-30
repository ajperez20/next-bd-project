-- =====================================
-- Inserción de datos: PRUEBA_CONF
-- ======================================
INSERT INTO PRUEBA_CONF (prc_nombre_prueba, prc_tiempo_estimado)
VALUES
-- Pruebas para Modelos de Ala
('Prueba de resistencia de Ala Recta', '2 hours'),
('Prueba de aerodinámica de Ala Recta', '3 hours'),
('Prueba de resistencia de Ala Trapezoidal', '2 hours'),
('Prueba de aerodinámica de Ala Trapezoidal', '3 hours'),
('Prueba de resistencia de Ala Delta', '2 hours'),
('Prueba de aerodinámica de Ala Delta', '3 hours'),
('Prueba de resistencia de Ala en Flecha', '2 hours'),
('Prueba de aerodinámica de Ala en Flecha', '3 hours'),
('Prueba de resistencia de Ala en Flecha Inversa', '2 hours'),
('Prueba de aerodinámica de Ala en Flecha Inversa', '3 hours'),

-- Pruebas para Modelos de Estabilizadores
('Prueba de resistencia de Forma Estándar', '2 hours'),
('Prueba de aerodinámica de Forma Estándar', '3 hours'),
('Prueba de resistencia de Forma en T', '2 hours'),
('Prueba de aerodinámica de Forma en T', '3 hours'),
('Prueba de resistencia de Forma en Cruz', '2 hours'),
('Prueba de aerodinámica de Forma en Cruz', '3 hours'),
('Prueba de resistencia de Forma 2 Verticales', '2 hours'),
('Prueba de aerodinámica de Forma 2 Verticales', '3 hours'),
('Prueba de resistencia de Forma 3 Verticales', '2 hours'),
('Prueba de aerodinámica de Forma 3 Verticales', '3 hours'),
('Prueba de resistencia de Forma en V', '2 hours'),
('Prueba de aerodinámica de Forma en V', '3 hours'),

-- Pruebas para Modelos de Tren de Aterrizaje
('Prueba de resistencia de Tren Fijo', '2 hours'),
('Prueba de funcionamiento de Tren Retráctil', '3 hours'),

-- Pruebas para Modelos de Sistemas de Control
('Prueba de precisión de Anemómetro', '2 hours'),
('Prueba de precisión de Altímetro', '2 hours'),
('Prueba de precisión de Variómetro', '2 hours'),
('Prueba de precisión de Inclinómetro', '2 hours'),
('Prueba de precisión de Horizonte Artificial', '2 hours'),
('Prueba de precisión de Brújula', '2 hours'),
('Prueba de precisión de Indicador de Rumbos', '2 hours'),
('Prueba de precisión de ADF', '2 hours'),
('Prueba de precisión de DME', '2 hours'),
('Prueba de precisión de CDI', '2 hours'),
('Prueba de precisión de ILS', '2 hours'),
('Prueba de funcionamiento de Piloto Automático', '4 hours'),
('Prueba de precisión del Sistema de Gestión de Vuelo', '3 hours'),
('Prueba de precisión del Manómetro', '2 hours'),
('Prueba de precisión del Termómetro de Aceite', '2 hours'),
('Prueba de precisión del Caudal de Combustible', '2 hours'),
('Prueba de precisión de Temperatura de Culatas', '2 hours'),
('Prueba de precisión del Nivel de Combustible', '2 hours'),

-- Pruebas para Tipos de Elementos Internos
('Prueba de comodidad de Asientos', '2 hours'),
('Prueba de capacidad de Porta Equipajes', '2 hours'),
('Prueba de resistencia de Alfombrado', '2 hours'),
('Prueba de funcionamiento de Piezas Sanitarias', '2 hours'),
('Prueba de visibilidad de Ventanillas', '2 hours'),
('Prueba de durabilidad de Cortinas', '2 hours'),

-- Pruebas para Modelos de Avión
('Prueba de vuelo de AU-80', '5 hours'),
('Prueba de carga de AU-80', '4 hours'),
('Prueba de vuelo de AU-801', '5 hours'),
('Prueba de carga de AU-801', '4 hours'),
('Prueba de vuelo de AU-802', '5 hours'),
('Prueba de carga de AU-802', '4 hours'),
('Prueba de vuelo de AU-747Plus', '6 hours'),
('Prueba de carga de AU-747Plus', '5 hours'),
('Prueba de vuelo de AU-87A', '6 hours'),
('Prueba de carga de AU-87A', '5 hours'),
('Prueba de vuelo de AU-802A', '5 hours'),
('Prueba de carga de AU-802A', '4 hours'),
('Prueba de vuelo de AU-802B', '5 hours'),
('Prueba de carga de AU-802B', '4 hours'),
('Prueba de vuelo de AU-802C', '5 hours'),
('Prueba de carga de AU-802C', '4 hours'),
('Prueba de vuelo de AU-802D', '5 hours'),
('Prueba de carga de AU-802D', '4 hours'),
('Prueba de vuelo de AU-802E', '5 hours'),
('Prueba de carga de AU-802E', '4 hours'),
('Prueba de vuelo de AU-802F', '5 hours'),
('Prueba de carga de AU-802F', '4 hours'),
('Prueba de vuelo de AU-747Platinium', '6 hours'),
('Prueba de carga de AU-747Platinium', '5 hours'),
('Prueba de vuelo de AU-747Gold', '6 hours'),
('Prueba de carga de AU-747Gold', '5 hours'),
('Prueba de vuelo de AU-747Silver', '6 hours'),
('Prueba de carga de AU-747Silver', '5 hours'),
('Prueba de vuelo de AU-747SilverB', '6 hours'),
('Prueba de carga de AU-747SilverB', '5 hours'),
('Prueba de vuelo de AU-87ABusiness', '6 hours'),
('Prueba de carga de AU-87ABusiness', '5 hours');


-- =====================================
-- Inserción de datos: MODELO_PRUEBA
-- ======================================
INSERT INTO MODELO_PRUEBA (fk_prc_id, fk_mec_id)
VALUES
-- Relaciones para Modelos de Alas
(1, 1), -- Prueba de resistencia de Ala Recta
(2, 1), -- Prueba de aerodinámica de Ala Recta
(3, 2), -- Prueba de resistencia de Ala Trapezoidal
(4, 2), -- Prueba de aerodinámica de Ala Trapezoidal
(5, 3), -- Prueba de resistencia de Ala Delta
(6, 3), -- Prueba de aerodinámica de Ala Delta
(7, 4), -- Prueba de resistencia de Ala en Flecha
(8, 4), -- Prueba de aerodinámica de Ala en Flecha
(9, 5), -- Prueba de resistencia de Ala en Flecha Inversa
(10, 5), -- Prueba de aerodinámica de Ala en Flecha Inversa

-- Relaciones para Modelos de Estabilizadores
(11, 6), -- Prueba de resistencia de Forma Estándar
(12, 6), -- Prueba de aerodinámica de Forma Estándar
(13, 7), -- Prueba de resistencia de Forma en T
(14, 7), -- Prueba de aerodinámica de Forma en T
(15, 8), -- Prueba de resistencia de Forma en Cruz
(16, 8), -- Prueba de aerodinámica de Forma en Cruz
(17, 9), -- Prueba de resistencia de Forma 2 Verticales
(18, 9), -- Prueba de aerodinámica de Forma 2 Verticales
(19, 10), -- Prueba de resistencia de Forma 3 Verticales
(20, 10), -- Prueba de aerodinámica de Forma 3 Verticales
(21, 11), -- Prueba de resistencia de Forma en V
(22, 11), -- Prueba de aerodinámica de Forma en V

-- Relaciones para Modelos de Tren de Aterrizaje
(23, 12), -- Prueba de resistencia de Tren Fijo
(24, 13), -- Prueba de funcionamiento de Tren Retráctil

-- Relaciones para Modelos de Sistemas de Control
(25, 14), -- Prueba de precisión de Anemómetro
(26, 15), -- Prueba de precisión de Altímetro
(27, 16), -- Prueba de precisión de Variómetro
(28, 17), -- Prueba de precisión de Inclinómetro
(29, 18), -- Prueba de precisión de Horizonte Artificial
(30, 19), -- Prueba de precisión de Brújula
(31, 20), -- Prueba de precisión de Indicador de Rumbos
(32, 21), -- Prueba de precisión de ADF
(33, 22), -- Prueba de precisión de DME
(34, 23), -- Prueba de precisión de CDI
(35, 24), -- Prueba de precisión de ILS
(36, 25), -- Prueba de funcionamiento de Piloto Automático
(37, 26), -- Prueba de precisión del Sistema de Gestión de Vuelo
(38, 27), -- Prueba de precisión del Manómetro
(39, 28), -- Prueba de precisión del Termómetro de Aceite
(40, 29), -- Prueba de precisión del Caudal de Combustible
(41, 30), -- Prueba de precisión de Temperatura de Culatas
(42, 31), -- Prueba de precisión del Nivel de Combustible

-- Relaciones para Tipos de Elementos Internos
(43, 32), -- Prueba de comodidad de Asientos
(44, 33), -- Prueba de capacidad de Porta Equipajes
(45, 34), -- Prueba de resistencia de Alfombrado
(46, 35), -- Prueba de funcionamiento de Piezas Sanitarias
(47, 36), -- Prueba de visibilidad de Ventanillas
(48, 37); -- Prueba de durabilidad de Cortinas


-- =====================================
-- Inserción de datos: FASE_PRUEBA
-- ======================================
INSERT INTO FASE_PRUEBA (fk_mda_id, fk_prc_id)
VALUES
(1, 49), -- Prueba de vuelo de AU-80
(1, 50), -- Prueba de carga de AU-80
(2, 51), -- Prueba de vuelo de AU-801
(2, 52), -- Prueba de carga de AU-801
(3, 53), -- Prueba de vuelo de AU-802
(3, 54), -- Prueba de carga de AU-802
(4, 55), -- Prueba de vuelo de AU-747Plus
(4, 56), -- Prueba de carga de AU-747Plus
(5, 57), -- Prueba de vuelo de AU-87A
(5, 58), -- Prueba de carga de AU-87A
(6, 59), -- Prueba de vuelo de AU-802A
(6, 60), -- Prueba de carga de AU-802A
(7, 61), -- Prueba de vuelo de AU-802B
(7, 62), -- Prueba de carga de AU-802B
(8, 63), -- Prueba de vuelo de AU-802C
(8, 64), -- Prueba de carga de AU-802C
(9, 65), -- Prueba de vuelo de AU-802D
(9, 66), -- Prueba de carga de AU-802D
(10, 67), -- Prueba de vuelo de AU-802E
(10, 68), -- Prueba de carga de AU-802E
(11, 69), -- Prueba de vuelo de AU-802F
(11, 70), -- Prueba de carga de AU-802F
(12, 71), -- Prueba de vuelo de AU-747Platinium
(12, 72), -- Prueba de carga de AU-747Platinium
(13, 73), -- Prueba de vuelo de AU-747Gold
(13, 74), -- Prueba de carga de AU-747Gold
(14, 75), -- Prueba de vuelo de AU-747Silver
(14, 76), -- Prueba de carga de AU-747Silver
(15, 77), -- Prueba de vuelo de AU-747SilverB
(15, 78), -- Prueba de carga de AU-747SilverB
(16, 79), -- Prueba de vuelo de AU-87ABusiness
(16, 80); -- Prueba de carga de AU-87ABusiness


