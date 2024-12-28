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


INSERT INTO TIPO_PIEZA_CONF_COMPOSICION (cpn_cantidad, fk_compone, fk_compuesta)
VALUES
-- "Alas" se componen de:
(1, 1, 2),
(2, 1, 3),
(1, 1, 4),
(2, 1, 5),
(1, 1, 6),
(2, 1, 7),
(1, 1, 8),
(1, 1, 9),
(1, 1, 10),
(1, 1, 11);

-- ==============================================
-- Inserción de datos: MODELO_PIEZA_CONF
-- ==============================================
INSERT INTO MODELO_PIEZA_CONF (mec_nombre_pieza, mec_descripcion, fk_tpc_id)
VALUES ('Ala Recta', 'Ala de geometría simple y eficiente.', 1),
       ('Ala Trapezoidal', 'Ala de geometría avanzada para mayor eficiencia.', 1),
       ('Ala Delta', 'Ala de geometría avanzada para vuelo supersónico.', 1),
       ('Ala en Flecha', 'Ala de geometría avanzada para vuelo supersónico.', 1),
       ('Ala en Flecha Inversa', 'Ala de geometría avanzada para vuelo supersónico.', 1);

-- ==============================================
-- Inserción de datos: MATERIAL_PIEZA_CONF
-- ==============================================
INSERT INTO MATERIAL_PIEZA_CONF (mac_nombre_material, mac_descripcion)
VALUES ('Acero A36', 'Aleación de acero común para estructuras.'),
       ('Aluminio 7075', 'Aleación ligera, alta resistencia.'),
       ('Fibra de Carbono', 'Material ultraligero, muy resistente.'),
       ('Titanio Grado 5', 'Excelente resistencia y ligereza.'),
       ('Compuesto Kevlar', 'Material sintético muy resistente al impacto.');

-- ==============================================
-- Inserción de datos: CARACTERISTICA_PIEZA_CONF
-- ==============================================
INSERT INTO CARACTERISTICA_PIEZA_CONF (pcc_nombre_caracteristica)
VALUES ('Longitud'),
       ('Peso'),
       ('Material'),
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
('MATERIAL', 1, 3, 1),
('MPa', 300, 4, 1),
('COLOR', 65280, 5, 1),    -- #00FF00 (verde)
('mm', 10, 6, 1),
('kg', 10000, 7, 1),
('cm', 0, 8, 1),

-- ===================================================
-- mec_id = 2 (Ala Trapezoidal)
-- ===================================================
('m', 25, 1, 2),
('kg', 1200, 2, 2),
('MATERIAL', 2, 3, 2),
('MPa', 350, 4, 2),
('COLOR', 16776960, 5, 2), -- #FFD700 (amarillo)
('mm', 12, 6, 2),
('kg', 12000, 7, 2),
('cm', 0, 8, 2),

-- ===================================================
-- mec_id = 3 (Ala Delta)
-- ===================================================
('m', 30, 1, 3),
('kg', 1500, 2, 3),
('MATERIAL', 3, 3, 3),
('MPa', 400, 4, 3),
('COLOR', 255, 5, 3),      -- #FF0000 (rojo)
('mm', 15, 6, 3),
('kg', 15000, 7, 3),
('cm', 0, 8, 3),

-- ===================================================
-- mec_id = 4 (Ala en Flecha)
-- ===================================================
('m', 35, 1, 4),
('kg', 1800, 2, 4),
('MATERIAL', 4, 3, 4),
('MPa', 450, 4, 4),
('COLOR', 255, 5, 4),      -- #FF0000 (rojo)
('mm', 18, 6, 4),
('kg', 18000, 7, 4),
('cm', 0, 8, 4),

-- ===================================================
-- mec_id = 5 (Ala en Flecha Inversa)
-- ===================================================
('m', 40, 1, 5),
('kg', 2000, 2, 5),
('MATERIAL', 5, 3, 5),
('MPa', 500, 4, 5),
('COLOR', 255, 5, 5),      -- #FF0000 (rojo)
('mm', 20, 6, 5),
('kg', 20000, 7, 5),
('cm', 0, 8, 5);

-- ==============================================
