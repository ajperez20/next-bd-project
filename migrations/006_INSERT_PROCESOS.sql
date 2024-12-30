-- ==========================================================
-- Inserción de datos: PROCESO_ENSAMBLE_AVION_CONF
-- ==========================================================

INSERT INTO PROCESO_ENSAMBLE_AVION_CONF (epv_nombre_proceso, epv_tiempo_estimado, epv_descripcion)
VALUES ('Fabricación de Componentes', '1 month', 'Fabricación de partes: alas, fuselaje, estabilizadores, etc.'),
	   ('Ensamblaje del Fuselaje', '2 weeks', 'Unión de secciones y montaje de la estructura principal.'),
	   ('Ensamblaje de las Alas', '1 week', 'Unión de partes y fijación al fuselaje.'),
	   ('Instalación del Empenaje', '3 days', 'Montaje del estabilizador vertical y horizontal (cola).'),
	   ('Instalación del Tren de Aterrizaje', '4 days', 'Montaje del sistema de aterrizaje.'),
	   ('Instalación de Sistemas', '3 weeks', 'Instalación de sistemas: eléctricos, hidráulicos, combustible, control y aviónica.'),
	   ('Instalación de Motores', '1 week', 'Montaje de los motores.'),
	   ('Instalación del Cableado', '2 weeks', 'Instalación del cableado eléctrico y de sistemas.'),
       ('Ajustes Finales y Calibración', '1 week', 'Ajuste y calibración de sistemas y componentes.'),
	   ('Pintura', '1 week', 'Aplicación de pintura y acabados.'),
	   ('Acondicionamiento Interior', '2 weeks', 'Instalación de interiores');


-- ==========================================================
-- Inserción de datos: FASE_ENSAMBLE_AVION_CONF
-- ==========================================================

INSERT INTO FASE_ENSAMBLE_AVION_CONF (fk_epv_id, fk_mda_id) 
VALUES (1, 3),  -- Fabricación de Componentes - AU-802 
	   (2, 7),  -- Ensamblaje del Fuselaje - AU-802B 
	   (3, 1),  -- Ensamblaje de las Alas - AU-80 
	   (4, 12), -- Instalación del Empenaje - AU-747Gold 
	   (5, 5),  -- Instalación del Tren de Aterrizaje - AU-87A 
	   (6, 9),  -- Instalación de Sistemas - AU-802D 
	   (6, 8),  -- Instalación de Sistemas - AU-802C 
	   (7, 4),  -- Instalación de Motores - AU-747Plus 
	   (8, 2),  -- Instalación del Cableado - AU-801 
	   (9, 15), -- Ajustes Finales y Calibración - AU-87ABusiness
	   (10, 8); -- Pintura - AU-802C 


-- ===================================================
-- Inserción de datos: PROCESO_ENSAMBLE_PIEZA_CONF
-- ===================================================
INSERT INTO PROCESO_ENSAMBLE_PIEZA_CONF (epc_nombre_proceso, epc_tiempo_estimado, epc_descripcion) 
VALUES ('Corte', '4 hours', 'Corte de material base a la forma inicial.'),
	   ('Mecanizado', '10 hours', 'Remoción de material para dar forma precisa a la pieza.'),
	   ('Conformado', '6 hours', 'Procesos de doblado, plegado o estirado.'),
	   ('Soldadura', '8 hours', 'Unión de componentes mediante soldadura.'),
	   ('Tratamiento Térmico', '12 hours', 'Mejora de propiedades mecánicas con calor.'),
	   ('Inspección END', '4 hours', 'Detección de defectos sin dañar la pieza.'),
	   ('Acabado Superficial', '6 hours', 'Tratamientos protectores y estéticos.'),
	   ('Pintura', '8 hours', 'Aplicación de pintura y recubrimientos.'),
	   ('Ensamble', '10 hours', 'Unión de subcomponentes.'),
	   ('Detallado/Acabado Manual', '4 hours', 'Ajustes finales y pulido.');

-- ===================================================
-- Inserción de datos: FASE_ENSAMBLE_PIEZA_CONF
-- ===================================================
INSERT INTO FASE_ENSAMBLE_PIEZA_CONF (fk_epc_id, fk_mec_id)
VALUES (1, 1),
	   (7, 2),
	   (2, 4),
	   (9, 3),
	   (6, 5),
	   (3, 7),
	   (5, 8),
	   (1, 15),
	   (2, 6),
	   (2, 3);
	   
-- =====================================
-- Inserción de datos: MATERIAL_FASE
-- ======================================
INSERT INTO MATERIAL_FASE (mtf_unidad_medida, mtf_cantidad_material, fk_mac_id, fk_epc_id, fk_mec_id)
VALUES ('kg', 50, 1, 1, 1),
	   ('kg', 25, 2, 7, 2),
	   ('kg', 100, 3, 2, 4),
	   ('kg', 15, 4, 9, 3),
	   ('m²', 10, 5, 6, 5),
	   ('kg', 20, 6, 3, 7),
	   ('m', 50, 7, 5, 8),
	   ('kg', 30, 8, 1, 15),
	   ('kg', 5, 9, 2, 6),
	   ('kg', 40, 10, 2, 3);


-- =====================================
-- Inserción de datos: AVION_COMPONENTE
-- ======================================

INSERT INTO AVION_COMPONENTE (ctm_cantidad_piezas, fk_epv_id, fk_mda_id, fk_mec_id) VALUES
-- AU-802 - Fabricación de Componentes
(2, 1, 3, 1),    -- 2 Alas Rectas
(1, 1, 3, 6),    -- 1 Estabilizador Forma Estándar

-- AU-802B - Ensamblaje del Fuselaje
(20, 2, 7, 32),  -- 20 Asientos
(20, 2, 7, 33),  -- 20 Porta Equipajes
(1, 2, 7, 35),   -- 1 Piezas Sanitarias

-- AU-747Platinium - Instalación del Empenaje
(1, 4, 12, 8),   -- 1 Estabilizador Forma en Cruz

-- AU-87A - Instalación del Tren de Aterrizaje
(1, 5, 5, 13),   -- 1 Tren Retráctil

-- AU-802D - Instalación de Sistemas (Aquí va el anemómetro y otros instrumentos)
(1, 6, 9, 14),   -- 1 Anemómetro
(1, 6, 9, 15),   -- 1 Altímetro
(1, 6, 9, 22),   -- 1 DME
(1, 6, 9, 23),   -- 1 CDI
(1, 6, 9, 25),   -- 1 Piloto Automático
(1, 6, 9, 24),   -- 1 ILS
(1, 6, 9, 26);   -- 1 Sistema de Gestión de Vuelo

-- ======================================


