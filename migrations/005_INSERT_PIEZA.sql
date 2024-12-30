-- ==============================================
-- Inserción de datos: TIPO_PIEZA_CONF
-- ==============================================
INSERT INTO TIPO_PIEZA_CONF (tpc_nombre, tpc_descripcion)
VALUES ('Alas', 'Cuerpo aerodinámico principal que genera sustentación.'),
       ('Superficie de Sustentación', 'Superficie que genera fuerza de reacción al desplazarse en el aire.'),
       ('Fuselaje', 'Estructura central del avión donde se aloja la cabina y la carga.'),
       ('Grupo Motopropulsor', 'Conjunto de motores y sistemas para generar tracción.'),
	   ('Alerones', 'Superficies móviles en el ala para controlar el alabeo.'),
       ('Flaps', 'Dispositivos que aumentan la sustentación en despegue y aterrizaje.'),
       ('Spoilers', 'Elementos en el extradós del ala que reducen la sustentación.'),
       ('Slats', 'Dispositivos en el borde de ataque para mejorar sustentación a bajas velocidades.'),
       ('Estabilizadores', 'Pequeñas alas traseras que garantizan la estabilidad longitudinal y direccional.'),
       ('Tren de Aterrizaje', 'Sistema que permite rodar en tierra y absorber impactos de aterrizaje.'),
       ('Instrumentos de Control', 'Conjunto de aparatos para informar al piloto sobre los parámetros de vuelo.'),
       ('Elementos internos de cabina', 'Asientos, equipaje de mano, alfombras y otros acabados interiores.');

INSERT INTO TIPO_PIEZA_CONF_COMPOSICION (cpn_cantidad, fk_compuesta, fk_compone)
VALUES
-- "Alas" se componen de:
(5, 1, 5),
(8, 1, 6),
(1, 1, 8),
(2, 1, 7),
(1, 1, 2),
(2, 1, 4);

-- ==============================================
-- Inserción de datos: MODELO_PIEZA_CONF
-- ==============================================
INSERT INTO MODELO_PIEZA_CONF (mec_nombre_pieza, mec_descripcion, fk_tpc_id)
VALUES 
-- Modelos de Ala:
('Ala Recta', 'Ala de geometría simple y eficiente.', 1),
('Ala Trapezoidal', 'Ala de geometría avanzada para mayor eficiencia.', 1),
('Ala Delta', 'Ala de geometría avanzada para vuelo supersónico.', 1),
('Ala en Flecha', 'Ala de geometría avanzada para vuelo supersónico.', 1),
('Ala en Flecha Inversa', 'Ala de geometría avanzada para vuelo supersónico.', 1),

-- Modelos de Estabilizadores:
('Forma Estándar', 'Un estabilizador vertical con timón. La más común.', 9),
('Forma en T', 'Estabilizador horizontal sobre el vertical. Más eficiente, pero complejo.', 9),
('Forma en Cruz', 'Similar a la estándar, con estabilizador horizontal extendido.', 9),
('Forma 2 Verticales', 'Dos estabilizadores verticales. Mayor estabilidad direccional.', 9),
('Forma 3 Verticales', 'Tres estabilizadores verticales. Muy raro, para estabilidad extrema.', 9),
('Forma en V', 'Estabilizadores combinados en forma de "V". Reduce la resistencia, pero complejo.', 9),

-- Modelos de Tren de Aterrizaje:
('Tren Fijo', 'Las ruedas y los soportes están siempre expuestos.', 10),
('Tren Retráctil', 'Se guarda en vuelo para menor resistencia y más velocidad', 10),

-- Modelos de Sistemas de Control:
('Anemómetro','Mide la velocidad del avión respecto al aire. Indica la velocidad aerodinámica.',11),
('Altímetro','Indica la altitud del avión sobre el nivel del mar o un punto de referencia.',11),
('Variómetro','Mide la velocidad vertical del avión, ascenso o descenso (pies/min).',11),
('Inclinómetro','Muestra el ángulo de alabeo del avión respecto al horizonte.',11),
('Horizonte Artificial','Indica la actitud del avión: alabeo y cabeceo respecto al horizonte.',11),
('Brújula','Indica la dirección del avión respecto al norte magnético.',11),
('Indicador de Rumbos','Muestra el rumbo magnético del avión, corregido por la declinación.',11),
('ADF','Localiza estaciones de radiobaliza no direccionales (NDB) en tierra.',11),
('DME','Mide la distancia oblicua entre el avión y una estación terrestre DME.',11),
('CDI','Indica la desviación del avión respecto a un radial o curso seleccionado.',11),
('ILS','Guía al avión durante el aterrizaje mediante señales de radio precisas.',11),
('Piloto Automático','Controla automáticamente el vuelo del avión según parámetros predefinidos.',11),
('Sistema de Gestión de Vuelo','Computadora que optimiza la navegación y el rendimiento del vuelo.',11),
('Manómetro','Mide la presión en sistemas del avión: combustible, hidráulico, etc.',11),
('Termómetro de Aceite','Indica la temperatura del aceite del motor.',11),
('Caudal de Combustible','Mide la cantidad de combustible que consume el motor por hora.',11),
('Temperatura de Culatas','Mide la temperatura de las culatas de los cilindros del motor.',11),
('Nivel de Combustible','Indica la cantidad de combustible restante en los tanques.',11),

-- Tipos de Elementos Internos:
('Asientos','Donde se sientan los pasajeros durante el vuelo.',12),
('Porta Equipajes','Espacios para guardar el equipaje de mano de los pasajeros.',12),
('Alfombrado','Recubrimiento del suelo de la cabina del avión.',12),
('Piezas Sanitarias','Instalaciones de baño dentro del avión.',12),
('Ventanillas','Aberturas en el fuselaje para la visión exterior.',12),
('Cortinas','Cubren las ventanillas para controlar la luz y la privacidad.',12);

-- ==============================================
-- Inserción de datos: MATERIAL_PIEZA_CONF
-- ==============================================
INSERT INTO MATERIAL_PIEZA_CONF (mac_nombre_material, mac_descripcion)
VALUES ('Acero A36', 'Aleación de acero común para estructuras.'),
       ('Titanio Grado 5', 'Excelente resistencia y ligereza.'),
       ('Compuesto Kevlar', 'Material sintético muy resistente al impacto.'),
	   ('Aleación de aluminio 2024', 'Resistente, trabajable, para fuselajes y alas.'),
	   ('Aleación de aluminio 7075', 'Muy resistente, para partes estructurales críticas.'),
	   ('Acero aleado 4340', 'Alta resistencia a tracción, para trenes y ejes.'),
	   ('Titanio Ti-6Al-4V', 'Resistente, ligero, anticorrosivo, para turbinas.'),
	   ('Fibra de carbono', 'Ligero, muy resistente, para alas y fuselaje.'),
	   ('Fibra de vidrio', 'Económico, para componentes y revestimientos.'),
	   ('Acero inoxidable 304', 'Anticorrosivo, para escapes y expuestos.'),
	   ('Magnesio', 'Ligero, para componentes no estructurales.'),
	   ('Polímeros reforzados (FRP)', 'Resistente y ligero, para partes estructurales.'),
	   ('Resinas epoxi', 'Matriz en compuestos, une las fibras.'),
	   ('Poliuretano', 'Para sellos, juntas y aislamiento.'),
	   ('Caucho de silicona', 'Resistente a altas temperaturas, para sellos.'),
	   ('Níquel', 'Anticorrosivo, para motores a reacción.'),
	   ('Madera de balsa', 'Ligera, para aviones ligeros y modelos.'); 
	   
-- ==============================================
-- Inserción de datos: CARACTERISTICA_PIEZA_CONF
-- ==============================================
INSERT INTO CARACTERISTICA_PIEZA_CONF (pcc_nombre_caracteristica)
VALUES ('Longitud'),
       ('Peso'),
       ('Resistencia'),
       ('Color'),
       ('Espesor'),
       ('Capacidad de carga'),
       ('Radio de curvatura');

-- ==============================================
-- Inserción de datos: PIEZA_CARACTERISTICA
-- ==============================================

INSERT INTO MODELO_PIEZA_CARACTERISTICA (pzi_unidad_medida, pzi_valor, fk_pcc_id, fk_mec_id)
VALUES
-- ===================================================
-- mec_id = 1 (Ala Rectas)
-- ===================================================
('m', 20, 1, 1),
('kg', 1000, 2, 1),
('MPa', 300, 3, 1),
('COLOR', 65280, 4, 1),    -- #00FF00 (verde)
('mm', 10, 5, 1),
('kg', 10000, 6, 1),
('grados', 3, 7, 1),

-- ===================================================
-- mec_id = 2 (Ala Trapezoidal)
-- ===================================================
('m', 25, 1, 2),
('kg', 1200, 2, 2),
('MPa', 350, 3, 2),
('COLOR', 16776960, 4, 2), -- #FFD700 (amarillo)
('mm', 12, 5, 2),
('kg', 12000, 6, 2),
('grados', 4, 7, 2),

-- ===================================================
-- mec_id = 3 (Ala Delta)
-- ===================================================
('m', 30, 1, 3),
('kg', 1500, 2, 3),
('MPa', 400, 3, 3),
('COLOR', 255, 4, 3),      -- #FF0000 (rojo)
('mm', 15, 5, 3),
('kg', 15000, 6, 3),
('grados', 1, 7, 3),

-- ===================================================
-- mec_id = 4 (Ala en Flecha)
-- ===================================================
('m', 35, 1, 4),
('kg', 1800, 2, 4),
('MPa', 450, 3, 4),
('COLOR', 255, 4, 4),      -- #FF0000 (rojo)
('mm', 18, 5, 4),
('kg', 18000, 6, 4),
('grados', 2, 7, 4),

-- ===================================================
-- mec_id = 5 (Ala en Flecha Inversa)
-- ===================================================
('m', 40, 1, 5),
('kg', 2000, 2, 5),
('MPa', 500, 3, 5),
('COLOR', 255, 4, 5),      -- #FF0000 (rojo)
('mm', 20, 5, 5),
('kg', 20000, 6, 5),
('grados', 2, 7, 5);

-- ==============================================