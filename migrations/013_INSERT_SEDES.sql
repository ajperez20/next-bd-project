-- =====================================
-- Inserción de datos: SEDES
-- ======================================

INSERT INTO SEDE_PLANTA (sed_nombre, sed_direccion, sed_descripcion, fk_lug_id)
VALUES ('Maracay', 'Maracay', 'Ensamble de alas, pruebas de calidad y producción de estabilizadores.', 4);

INSERT INTO SEDE_PLANTA (sed_nombre, sed_direccion, sed_descripcion, fk_lug_id)
VALUES ('Colón', 'Colón', 'Producción de fuselajes, trenes de aterrizaje y soporte logístico.', 24);

INSERT INTO SEDE_PLANTA (sed_nombre, sed_direccion, sed_descripcion, fk_lug_id)
VALUES ('La Guaira', 'La Guaira', 'Pruebas exhaustivas de materiales y fabricación de motores.', 14);

INSERT INTO SEDE_PLANTA (sed_nombre, sed_direccion, sed_descripcion, fk_lug_id)
VALUES ('Guatire', 'Guatire', 'Producción de instrumentos de control y sistemas electrónicos.', 16);

INSERT INTO SEDE_PLANTA (sed_nombre, sed_direccion, sed_descripcion, fk_lug_id)
VALUES ('Valencia', 'Valencia', 'Fabricación de interiores de cabina, asientos y ventanillas.', 7);


-- =====================================
-- Inserción de datos: Areas
-- ======================================

-- Áreas para la sede Maracay
INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Ensamble', 'Área para ensamblar alas, estabilizadores y alerones.', 1);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Pruebas de calidad', 'Verificación de materiales y piezas ensambladas.', 1);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Despacho', 'Zona destinada al embalaje y envío de componentes.', 1);

-- Áreas para la sede Colón
INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Diseño estructural', 'Elaboración de planos y simulaciones de fuselajes.', 2);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Producción', 'Construcción de fuselajes y trenes de aterrizaje.', 2);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Pruebas de resistencia', 'Evaluación de la calidad estructural y resistencia.', 2);

-- Áreas para la sede La Guaira
INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Recepción de materiales', 'Almacenamiento e inspección de materiales.', 3);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Pruebas de calidad', 'Evaluación térmica y mecánica de materiales.', 3);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Producción de motores', 'Ensamble y calibración de sistemas motopropulsores.', 3);

-- Áreas para la sede Guatire
INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Diseño electrónico', 'Desarrollo de sistemas electrónicos y software.', 4);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Ensamble', 'Integración y montaje de instrumentos de control.', 4);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Pruebas funcionales', 'Simulación y calibración de instrumentos.', 4);

-- Áreas para la sede Valencia
INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Diseño de interiores', 'Diseño de asientos, ventanillas y alfombrados.', 5);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Producción', 'Fabricación de porta equipajes y piezas sanitarias.', 5);

INSERT INTO AREA (are_nombre, are_descripcion, fk_sed_id)
VALUES ('Acabado y personalización', 'Pintura y montaje final de los interiores.', 5);

-- =====================================
-- Inserción de datos: Zonas
-- ======================================

-- Zonas para el área "Ensamble" en Maracay
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de alas', 'Ensamblaje y ajuste de alas.', 1);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de estabilizadores', 'Ensamblaje de estabilizadores horizontales y verticales.', 1);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de alerones y flaps', 'Producción y montaje de alerones y flaps.', 1);

-- Zonas para el área "Pruebas de calidad" en Maracay
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de recepción de materiales', 'Verificación de calidad tras el traslado.', 2);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de pruebas aerodinámicas', 'Evaluación del rendimiento de piezas ensambladas.', 2);

-- Zonas para el área "Despacho" en Maracay
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de embalaje', 'Preparación de componentes para envío.', 3);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de envío', 'Despacho de componentes a otras plantas.', 3);

-- Zonas para el área "Diseño estructural" en Colón
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de planos de fuselaje', 'Creación de planos y diseños estructurales.', 4);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de simulaciones', 'Pruebas virtuales de resistencia estructural.', 4);

-- Zonas para el área "Producción" en Colón
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de trenes de aterrizaje', 'Producción y ensamblaje de trenes de aterrizaje.', 5);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de fuselajes', 'Producción de fuselajes completos.', 5);

-- Zonas para el área "Pruebas de resistencia" en Colón
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de carga estructural', 'Pruebas de carga máxima de fuselajes.', 6);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de impacto', 'Simulación de impactos para evaluar la resistencia.', 6);

-- Zonas para el área "Recepción de materiales" en La Guaira
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de almacenamiento temporal', 'Almacenamiento de materiales a corto plazo.', 7);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de inspección inicial', 'Inspección preliminar de materiales recibidos.', 7);

-- Zonas para el área "Pruebas de calidad" en La Guaira
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de pruebas térmicas', 'Evaluación térmica de materiales y componentes.', 8);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de pruebas mecánicas', 'Pruebas de resistencia mecánica de materiales.', 8);

-- Zonas para el área "Producción de motores" en La Guaira
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de ensamblaje', 'Montaje de motores y sistemas motopropulsores.', 9);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de calibración', 'Ajuste y verificación de sistemas motopropulsores.', 9);

-- Zonas para el área "Diseño electrónico" en Guatire
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de desarrollo de software', 'Diseño y desarrollo de sistemas electrónicos.', 10);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de circuitos electrónicos', 'Producción y diseño de circuitos electrónicos.', 10);

-- Zonas para el área "Ensamble" en Guatire
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de integración', 'Montaje de instrumentos de control.', 11);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de soldadura', 'Soldadura y ensamblaje de componentes electrónicos.', 11);

-- Zonas para el área "Pruebas funcionales" en Guatire
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de simulación de vuelo', 'Pruebas de instrumentos en entornos simulados.', 12);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de calibración', 'Ajuste de precisión en instrumentos electrónicos.', 12);

-- Zonas para el área "Diseño de interiores" en Valencia
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de asientos', 'Diseño y producción de asientos de cabina.', 13);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de ventanillas y alfombrados', 'Producción de ventanillas y alfombrados.', 13);

-- Zonas para el área "Producción" en Valencia
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de porta equipajes', 'Fabricación de compartimentos de equipaje.', 14);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de piezas sanitarias', 'Producción de piezas sanitarias para cabinas.', 14);

-- Zonas para el área "Acabado y personalización" en Valencia
INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de pintura', 'Aplicación de pintura y personalización de piezas.', 15);

INSERT INTO ZONA (zon_nombre, zon_descripcion, fk_are_id)
VALUES ('Zona de montaje final', 'Montaje y ensamblaje final de los interiores.', 15);

-- =========================================
-- Inserción de datos: MATERIA_PRIMA_STOCK
-- ==========================================
INSERT INTO MATERIA_PRIMA_STOCK (mps_unidad_medida, mps_cantidad_disponible, fk_sed_id, fk_rpm_id)
VALUES 
-- Stock de Materia Prima para la Sede Maracay
('kg', 500, 1, 1),    -- Acero A36
('kg', 300, 1, 4),    -- Aleación de aluminio 2024
('kg', 200, 1, 8),    -- Fibra de carbono
('L', 100, 1, 13),    -- Resinas epoxi

-- Stock de Materia Prima para la Sede Colón
('kg', 400, 2, 5),    -- Aleación de aluminio 7075
('kg', 300, 2, 6),    -- Acero aleado 4340
('kg', 250, 2, 9),    -- Fibra de vidrio
('L', 150, 2, 13),    -- Resinas epoxi

-- Stock de Materia Prima para la Sede La Guaira
('kg', 200, 3, 2),    -- Titanio Grado 5
('kg', 300, 3, 7),    -- Titanio Ti-6Al-4V
('kg', 150, 3, 10),   -- Acero inoxidable 304
('kg', 100, 3, 16),   -- Níquel

-- Stock de Materia Prima para la Sede Guatire
('kg', 100, 4, 3),    -- Compuesto Kevlar
('kg', 200, 4, 12),   -- Polímeros reforzados (FRP)
('kg', 50, 4, 15),    -- Caucho de silicona

-- Stock de Materia Prima para la Sede Valencia
('kg', 300, 5, 11),   -- Magnesio
('m³', 5, 5, 17),     -- Madera de balsa
('L', 100, 5, 14);    -- Poliuretano

-- =========================================
-- Inserción de datos: SOLICITUD_PROVEEDOR
-- ==========================================
-- Solicitudes de la sede Maracay
INSERT INTO SOLICITUD_PROVEEDOR (spr_fecha, spr_total, spr_descripcion, fk_com_id, fk_mps_id, fk_sed_id, fk_rpm_id)
VALUES
('2023-01-21', 12610, 'Solicitud de Acero A36', 35, 1, 1, 1), -- Acero A36
('2023-09-18', 11860, 'Solicitud de Acero A36', 35, 1, 1, 1), -- Acero A36
('2023-05-21', 35112, 'Solicitud de Fibra de carbono', 42, 3, 1, 8), -- Fibra de carbono
('2024-07-21', 62049, 'Solicitud de Acero A36', 35, 1, 1, 1), -- Acero A36
('2024-06-05', 83327, 'Solicitud de Aleación de aluminio 2024', 38, 2, 1, 4), -- Aleación de aluminio 2024
('2024-05-15', 28455, 'Solicitud de Resinas epoxi', 47, 4, 1, 13), -- Resinas epoxi
('2023-03-10', 41256, 'Solicitud de Fibra de carbono', 42, 3, 1, 8), -- Fibra de carbono
('2024-01-11', 37361, 'Solicitud de Acero A36', 35, 1, 1, 1), -- Acero A36
('2023-12-06', 62476, 'Solicitud de Aleación de aluminio 2024', 38, 2, 1, 4), -- Aleación de aluminio 2024
('2023-08-09', 38705, 'Solicitud de Resinas epoxi', 47, 4, 1, 13), -- Resinas epoxi

-- Solicitudes de la sede Colón
('2024-02-01', 30112, 'Solicitud de Aleación aluminio 7075', 39, 5, 2, 5), -- Aleación de aluminio 7075
('2023-06-18', 67235, 'Solicitud de Acero aleado 4340', 40, 6, 2, 6), -- Acero aleado 4340
('2023-08-10', 27195, 'Solicitud de Fibra de vidrio', 43, 7, 2, 9), -- Fibra de vidrio
('2023-09-20', 38212, 'Solicitud de Resinas epoxi', 47, 8, 2, 13), -- Resinas epoxi
('2024-04-15', 60317, 'Solicitud de Aleación aluminio 7075', 39, 5, 2, 5), -- Aleación de aluminio 7075
('2023-07-25', 29914, 'Solicitud de Acero aleado 4340', 40, 6, 2, 6), -- Acero aleado 4340
('2023-10-11', 43512, 'Solicitud de Fibra de vidrio', 43, 7, 2, 9), -- Fibra de vidrio
('2024-01-08', 71218, 'Solicitud de Resinas epoxi', 47, 8, 2, 13), -- Resinas epoxi
('2023-11-05', 51412, 'Solicitud de Aleación aluminio 7075', 39, 5, 2, 5), -- Aleación de aluminio 7075
('2024-03-12', 27512, 'Solicitud de Acero aleado 4340', 40, 6, 2, 6), -- Acero aleado 4340

-- Solicitudes de la sede La Guaira
('2023-01-11', 43121, 'Solicitud de Titanio Grado 5', 36, 9, 3, 2), -- Titanio Grado 5
('2023-08-25', 76312, 'Solicitud de Titanio Ti-6Al-4V', 41, 10, 3, 7), -- Titanio Ti-6Al-4V
('2023-12-05', 45120, 'Solicitud de Acero inoxidable 304', 44, 11, 3, 10), -- Acero inoxidable 304
('2024-02-10', 29012, 'Solicitud de Níquel', 33, 12, 3, 16), -- Níquel
('2023-09-15', 60012, 'Solicitud de Titanio Ti-6Al-4V', 41, 10, 3, 7), -- Titanio Ti-6Al-4V
('2023-11-20', 45100, 'Solicitud de Acero inoxidable 304', 44, 11, 3, 10), -- Acero inoxidable 304
('2024-01-05', 30210, 'Solicitud de Níquel', 33, 12, 3, 16), -- Níquel
('2023-06-15', 40015, 'Solicitud de Titanio Grado 5', 36, 9, 3, 2), -- Titanio Grado 5
('2023-03-12', 74512, 'Solicitud de Titanio Ti-6Al-4V', 41, 10, 3, 7), -- Titanio Ti-6Al-4V
('2023-04-18', 45110, 'Solicitud de Acero inoxidable 304', 44, 11, 3, 10), -- Acero inoxidable 304

-- Solicitudes de la sede Guatire
('2023-07-18', 50112, 'Solicitud de Compuesto Kevlar', 37, 13, 4, 3), -- Compuesto Kevlar
('2023-06-25', 48120, 'Solicitud de Polímeros reforzados (FRP)', 46, 14, 4, 12), -- Polímeros reforzados
('2023-11-08', 7310, 'Solicitud de Caucho de silicona', 32, 15, 4, 15), -- Caucho de silicona
('2023-01-25', 52112, 'Solicitud de Compuesto Kevlar', 37, 13, 4, 3), -- Compuesto Kevlar
('2023-03-12', 49212, 'Solicitud de Polímeros reforzados (FRP)', 46, 14, 4, 12), -- Polímeros reforzados
('2023-04-18', 8212, 'Solicitud de Caucho de silicona', 32, 15, 4, 15), -- Caucho de silicona
('2023-08-15', 52011, 'Solicitud de Compuesto Kevlar', 37, 13, 4, 3), -- Compuesto Kevlar
('2023-10-05', 45211, 'Solicitud de Polímeros reforzados (FRP)', 46, 14, 4, 12), -- Polímeros reforzados
('2024-01-10', 9412, 'Solicitud de Caucho de silicona', 32, 15, 4, 15), -- Caucho de silicona
('2023-09-20', 50212, 'Solicitud de Compuesto Kevlar', 37, 13, 4, 3), -- Compuesto Kevlar

-- Solicitudes de la sede Valencia
('2023-02-05', 9120, 'Solicitud de Magnesio', 45, 16, 5, 11), -- Magnesio
('2023-04-18', 5120, 'Solicitud de Madera de balsa', 34, 17, 5, 17), -- Madera de balsa
('2023-07-10', 15200, 'Solicitud de Poliuretano', 48, 18, 5, 14), -- Poliuretano
('2023-05-25', 10200, 'Solicitud de Magnesio', 45, 16, 5, 11), -- Magnesio
('2023-08-12', 6200, 'Solicitud de Madera de balsa', 34, 17, 5, 17), -- Madera de balsa
('2024-01-08', 14000, 'Solicitud de Poliuretano', 48, 18, 5, 14), -- Poliuretano
('2023-10-05', 8000, 'Solicitud de Magnesio', 45, 16, 5, 11), -- Magnesio
('2023-11-12', 7200, 'Solicitud de Madera de balsa', 34, 17, 5, 17), -- Madera de balsa
('2024-02-20', 15200, 'Solicitud de Poliuretano', 48, 18, 5, 14), -- Poliuretano
('2023-09-15', 7500, 'Solicitud de Magnesio', 45, 16, 5, 11); -- Magnesio

-- =========================================
-- Inserción de datos: DETALLE_SLD_PROVEEDOR
-- ==========================================

-- Detalles de las solicitudes para la sede Maracay
INSERT INTO DETALLE_SLD_PROVEEDOR (dsp_cantidad, dsp_unidad_medida, fk_mtp_id, fk_spr_id)
VALUES
(500, 'kg', 1, 1),  -- Acero A36 para solicitud 1
(300, 'kg', 1, 2),  -- Acero A36 para solicitud 2
(200, 'kg', 8, 3),  -- Fibra de carbono para solicitud 3
(700, 'kg', 1, 4),  -- Acero A36 para solicitud 4
(400, 'kg', 4, 5),  -- Aleación de aluminio 2024 para solicitud 5
(150, 'L', 13, 6),  -- Resinas epoxi para solicitud 6
(250, 'kg', 8, 7),  -- Fibra de carbono para solicitud 7
(600, 'kg', 1, 8),  -- Acero A36 para solicitud 8
(500, 'kg', 4, 9),  -- Aleación de aluminio 2024 para solicitud 9
(100, 'L', 13, 10); -- Resinas epoxi para solicitud 10

-- Detalles de las solicitudes para la sede Colón
INSERT INTO DETALLE_SLD_PROVEEDOR (dsp_cantidad, dsp_unidad_medida, fk_mtp_id, fk_spr_id)
VALUES
(350, 'kg', 5, 11), -- Aleación de aluminio 7075 para solicitud 11
(400, 'kg', 6, 12), -- Acero aleado 4340 para solicitud 12
(300, 'kg', 9, 13), -- Fibra de vidrio para solicitud 13
(100, 'L', 13, 14), -- Resinas epoxi para solicitud 14
(500, 'kg', 5, 15), -- Aleación de aluminio 7075 para solicitud 15
(450, 'kg', 6, 16), -- Acero aleado 4340 para solicitud 16
(200, 'kg', 9, 17), -- Fibra de vidrio para solicitud 17
(100, 'L', 13, 18), -- Resinas epoxi para solicitud 18
(300, 'kg', 5, 19), -- Aleación de aluminio 7075 para solicitud 19
(250, 'kg', 6, 20); -- Acero aleado 4340 para solicitud 20

-- Detalles de las solicitudes para la sede La Guaira
INSERT INTO DETALLE_SLD_PROVEEDOR (dsp_cantidad, dsp_unidad_medida, fk_mtp_id, fk_spr_id)
VALUES
(200, 'kg', 2, 21), -- Titanio Grado 5 para solicitud 21
(400, 'kg', 7, 22), -- Titanio Ti-6Al-4V para solicitud 22
(300, 'kg', 10, 23), -- Acero inoxidable 304 para solicitud 23
(200, 'kg', 16, 24), -- Níquel para solicitud 24
(500, 'kg', 7, 25), -- Titanio Ti-6Al-4V para solicitud 25
(400, 'kg', 10, 26), -- Acero inoxidable 304 para solicitud 26
(200, 'kg', 16, 27), -- Níquel para solicitud 27
(300, 'kg', 2, 28), -- Titanio Grado 5 para solicitud 28
(400, 'kg', 7, 29), -- Titanio Ti-6Al-4V para solicitud 29
(350, 'kg', 10, 30); -- Acero inoxidable 304 para solicitud 30

-- Detalles de las solicitudes para la sede Guatire
INSERT INTO DETALLE_SLD_PROVEEDOR (dsp_cantidad, dsp_unidad_medida, fk_mtp_id, fk_spr_id)
VALUES
(150, 'kg', 3, 31), -- Compuesto Kevlar para solicitud 31
(100, 'kg', 12, 32), -- Polímeros reforzados (FRP) para solicitud 32
(50, 'kg', 15, 33), -- Caucho de silicona para solicitud 33
(150, 'kg', 3, 34), -- Compuesto Kevlar para solicitud 34
(100, 'kg', 12, 35), -- Polímeros reforzados (FRP) para solicitud 35
(50, 'kg', 15, 36), -- Caucho de silicona para solicitud 36
(200, 'kg', 3, 37), -- Compuesto Kevlar para solicitud 37
(150, 'kg', 12, 38), -- Polímeros reforzados (FRP) para solicitud 38
(50, 'kg', 15, 39), -- Caucho de silicona para solicitud 39
(200, 'kg', 3, 40); -- Compuesto Kevlar para solicitud 40

-- Detalles de las solicitudes para la sede Valencia
INSERT INTO DETALLE_SLD_PROVEEDOR (dsp_cantidad, dsp_unidad_medida, fk_mtp_id, fk_spr_id)
VALUES
(400, 'kg', 11, 41), -- Magnesio para solicitud 41
(3, 'm³', 17, 42),   -- Madera de balsa para solicitud 42
(150, 'L', 14, 43),  -- Poliuretano para solicitud 43
(350, 'kg', 11, 44), -- Magnesio para solicitud 44
(2, 'm³', 17, 45),   -- Madera de balsa para solicitud 45
(120, 'L', 14, 46),  -- Poliuretano para solicitud 46
(300, 'kg', 11, 47), -- Magnesio para solicitud 47
(4, 'm³', 17, 48),   -- Madera de balsa para solicitud 48
(130, 'L', 14, 49),  -- Poliuretano para solicitud 49
(450, 'kg', 11, 50); -- Magnesio para solicitud 50

-- ===========================================================================

