-- ==============================================
-- Inserción de datos: Materia Prima
-- ==============================================
INSERT INTO MATERIA_PRIMA (rpm_nombre, rpm_descripcion)
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
-- Inserción de datos: Proveedor MP Stock
-- ==============================================
INSERT INTO PROVEEDOR_MP_STOCK (mtp_unidad_medida, mtp_cantida_disponible, fk_rpm_id)
VALUES ('kg', 1000, 1),    -- Acero A36
       ('kg', 500, 2),     -- Titanio Grado 5
       ('kg', 200, 3),     -- Compuesto Kevlar
       ('kg', 750, 4),     -- Aleación de aluminio 2024
       ('kg', 600, 5),     -- Aleación de aluminio 7075
       ('kg', 900, 6),     -- Acero aleado 4340
       ('kg', 400, 7),     -- Titanio Ti-6Al-4V
       ('kg', 300, 8),     -- Fibra de carbono
       ('kg', 450, 9),     -- Fibra de vidrio
       ('kg', 800, 10),    -- Acero inoxidable 304
       ('kg', 550, 11),    -- Magnesio
       ('kg', 350, 12),    -- Polímeros reforzados 
       ('L', 200, 13),     -- Resinas epoxi 
       ('L', 150, 14),     -- Poliuretano 
       ('kg', 250, 15),    -- Caucho de silicona
       ('kg', 700, 16),    -- Níquel
       ('m³', 5, 17);      -- Madera de balsa
	   
-- ==============================================
-- Inserción de datos: Proveedor
-- ==============================================
INSERT INTO PROVEEDOR (com_nombre, com_direccion, com_url_pagina, fk_mtp_id, fk_lug_id)
VALUES 
('MetalesGalácticos', 'Dirección 1 Amazonas', 'www.metalesgalacticos.com', 1, 1),  -- Amazonas
('AceroPlus', 'Dirección 2 Amazonas', 'www.aceroplus.com', 2, 1),                  -- Amazonas
('TitanioFusión', 'Dirección 1 Anzoátegui', 'www.titaniofusion.com', 3, 2),        -- Anzoátegui
('AleacionesElite', 'Dirección 2 Anzoátegui', 'www.aleacioneselite.com', 4, 2),    -- Anzoátegui
('KevlarForce', 'Dirección 1 Apure', 'www.kevlarforce.com', 5, 3),                 -- Apure
('CompositesXtremo', 'Dirección 2 Apure', 'www.compositesxtremo.com', 6, 3),       -- Apure
('AluMatrix', 'Dirección 1 Aragua', 'www.alumatrix.com', 7, 4),                    -- Aragua
('FusionAluminio', 'Dirección 2 Aragua', 'www.fusionaluminio.com', 8, 4),          -- Aragua
('AcerosTop', 'Dirección 1 Barinas', 'www.acerostop.com', 9, 5),                   -- Barinas
('SuperAceros', 'Dirección 2 Barinas', 'www.superaceros.com', 10, 5),              -- Barinas
('FuerzaMetálica', 'Dirección 1 Bolívar', 'www.fuerzametalica.com', 11, 6),        -- Bolívar
('MetalMaster', 'Dirección 2 Bolívar', 'www.metalmaster.com', 12, 6),              -- Bolívar
('TitaniumPro', 'Dirección 1 Carabobo', 'www.titaniumpro.com', 13, 7),             -- Carabobo
('ProMetals', 'Dirección 2 Carabobo', 'www.prometals.com', 14, 7),                 -- Carabobo
('CarbonTech', 'Dirección 1 Cojedes', 'www.carbontech.com', 15, 8),                -- Cojedes
('FiberMax', 'Dirección 2 Cojedes', 'www.fibermax.com', 16, 8),                    -- Cojedes
('VidrioFortaleza', 'Dirección 1 Delta Amacuro', 'www.vidriofortaleza.com', 17, 9),-- Delta Amacuro
('FibraViva', 'Dirección 2 Delta Amacuro', 'www.fibraviva.com', 1, 9),             -- Delta Amacuro
('InoxidableSteel', 'Dirección 1 Distrito Capital', 'www.inoxidablesteel.com', 2, 10), -- Distrito Capital
('SteelGuard', 'Dirección 2 Distrito Capital', 'www.steelguard.com', 3, 10),       -- Distrito Capital
('MegaMagnesio', 'Dirección 1 Falcón', 'www.megamagnesio.com', 4, 11),             -- Falcón
('MagnesioPlus', 'Dirección 2 Falcón', 'www.magnesioplus.com', 5, 11),             -- Falcón
('ReforPoly', 'Dirección 1 Guárico', 'www.reforpoly.com', 6, 12),                  -- Guárico
('PolyForce', 'Dirección 2 Guárico', 'www.polyforce.com', 7, 12),                  -- Guárico
('EpoxiPower', 'Dirección 1 Lara', 'www.epoxipower.com', 8, 13),                   -- Lara
('EpoxiStar', 'Dirección 2 Lara', 'www.epoxistar.com', 9, 13),                     -- Lara
('SuperPoly', 'Dirección 1 La Guaira', 'www.superpoly.com', 10, 14),               -- La Guaira
('PolyMax', 'Dirección 2 La Guaira', 'www.polymax.com', 11, 14),                   -- La Guaira
('SiliconShield', 'Dirección 1 Mérida', 'www.siliconshield.com', 12, 15),          -- Mérida
('SiliconForce', 'Dirección 2 Mérida', 'www.siliconforce.com', 13, 15),            -- Mérida
('NickelPro', 'Dirección 1 Miranda', 'www.nickelpro.com', 14, 16),                 -- Miranda
('NickelForce', 'Dirección 2 Miranda', 'www.nickelforce.com', 15, 16),             -- Miranda
('BalsaWood', 'Dirección 1 Monagas', 'www.balsawood.com', 16, 17),                 -- Monagas
('MaderaLigera', 'Dirección 2 Monagas', 'www.maderaligera.com', 17, 17),           -- Monagas
('AcerosVerdes', 'Dirección 1 Nueva Esparta', 'www.acerosverdes.com', 1, 18),      -- Nueva Esparta
('EcoAceros', 'Dirección 2 Nueva Esparta', 'www.ecoaceros.com', 2, 18),            -- Nueva Esparta
('TitanioAndes', 'Dirección 1 Portuguesa', 'www.titanioandes.com', 3, 19),         -- Portuguesa
('AndesTitanios', 'Dirección 2 Portuguesa', 'www.andestitanios.com', 4, 19),       -- Portuguesa
('KevlarExtreme', 'Dirección 1 Sucre', 'www.kevlarextreme.com', 5, 20),            -- Sucre
('XtremoKevlar', 'Dirección 2 Sucre', 'www.xtremokevlar.com', 6, 20),              -- Sucre
('AluminiosTáchira', 'Dirección 1 Táchira', 'www.aluminiostachira.com', 7, 21),    -- Táchira
('AlumMaster', 'Dirección 2 Táchira', 'www.alummaster.com', 8, 21),                -- Táchira
('Aluminios7075Plus', 'Dirección 1 Trujillo', 'www.aluminios7075plus.com', 9, 22), -- Trujillo
('PlusAluminio7075', 'Dirección 2 Trujillo', 'www.plusaluminio7075.com', 10, 22),  -- Trujillo
('AleadosYaracuy', 'Dirección 1 Yaracuy', 'www.aleadosyaracuy.com', 11, 23),       -- Yaracuy
('YaracuyAleaciones', 'Dirección 2 Yaracuy', 'www.yaracuyaleaciones.com', 12, 23), -- Yaracuy
('TitanioZulia', 'Dirección 1 Zulia', 'www.titaniozulia.com', 13, 24),             -- Zulia
('ZuliaTitanium', 'Dirección 2 Zulia', 'www.zuliatitanium.com', 14, 24);           -- Zulia


-- =================================================
-- Inserción de datos: Redes Sociales de Proveedor
-- =================================================
INSERT INTO RED_SOCIAL (res_usuario, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES 
('@MetalesGalácticos', NULL, 1, NULL, NULL),  -- MetalesGalácticos
('@AceroPlus', NULL, 2, NULL, NULL),          -- AceroPlus
('@TitanioFusión', NULL, 3, NULL, NULL),      -- TitanioFusión
('@AleacionesElite', NULL, 4, NULL, NULL),    -- AleacionesElite
('@KevlarForce', NULL, 5, NULL, NULL),        -- KevlarForce
('@CompositesXtremo', NULL, 6, NULL, NULL),   -- CompositesXtremo
('@AluMatrix', NULL, 7, NULL, NULL),          -- AluMatrix
('@FusionAluminio', NULL, 8, NULL, NULL),     -- FusionAluminio
('@AcerosTop', NULL, 9, NULL, NULL),          -- AcerosTop
('@SuperAceros', NULL, 10, NULL, NULL),       -- SuperAceros
('@FuerzaMetálica', NULL, 11, NULL, NULL),    -- FuerzaMetálica
('@MetalMaster', NULL, 12, NULL, NULL),       -- MetalMaster
('@TitaniumPro', NULL, 13, NULL, NULL),       -- TitaniumPro
('@ProMetals', NULL, 14, NULL, NULL),         -- ProMetals
('@CarbonTech', NULL, 15, NULL, NULL),        -- CarbonTech
('@FiberMax', NULL, 16, NULL, NULL),          -- FiberMax
('@VidrioFortaleza', NULL, 17, NULL, NULL),   -- VidrioFortaleza
('@FibraViva', NULL, 18, NULL, NULL),         -- FibraViva
('@InoxidableSteel', NULL, 19, NULL, NULL),   -- InoxidableSteel
('@SteelGuard', NULL, 20, NULL, NULL),        -- SteelGuard
('@MegaMagnesio', NULL, 21, NULL, NULL),      -- MegaMagnesio
('@MagnesioPlus', NULL, 22, NULL, NULL),      -- MagnesioPlus
('@ReforPoly', NULL, 23, NULL, NULL),         -- ReforPoly
('@PolyForce', NULL, 24, NULL, NULL),         -- PolyForce
('@EpoxiPower', NULL, 25, NULL, NULL),        -- EpoxiPower
('@EpoxiStar', NULL, 26, NULL, NULL),         -- EpoxiStar
('@SuperPoly', NULL, 27, NULL, NULL),         -- SuperPoly
('@PolyMax', NULL, 28, NULL, NULL),           -- PolyMax
('@SiliconShield', NULL, 29, NULL, NULL),     -- SiliconShield
('@SiliconForce', NULL, 30, NULL, NULL),      -- SiliconForce
('@NickelPro', NULL, 31, NULL, NULL),         -- NickelPro
('@NickelForce', NULL, 32, NULL, NULL),       -- NickelForce
('@BalsaWood', NULL, 33, NULL, NULL),         -- BalsaWood
('@MaderaLigera', NULL, 34, NULL, NULL),      -- MaderaLigera
('@AcerosVerdes', NULL, 35, NULL, NULL),      -- AcerosVerdes
('@EcoAceros', NULL, 36, NULL, NULL),         -- EcoAceros
('@TitanioAndes', NULL, 37, NULL, NULL),      -- TitanioAndes
('@AndesTitanios', NULL, 38, NULL, NULL),     -- AndesTitanios
('@KevlarExtreme', NULL, 39, NULL, NULL),     -- KevlarExtreme
('@XtremoKevlar', NULL, 40, NULL, NULL),      -- XtremoKevlar
('@AluminiosTáchira', NULL, 41, NULL, NULL),  -- AluminiosTáchira
('@AlumMaster', NULL, 42, NULL, NULL),        -- AlumMaster
('@Aluminios7075Plus', NULL, 43, NULL, NULL), -- Aluminios7075Plus
('@PlusAluminio7075', NULL, 44, NULL, NULL),  -- PlusAluminio7075
('@AleadosYaracuy', NULL, 45, NULL, NULL),    -- AleadosYaracuy
('@YaracuyAleaciones', NULL, 46, NULL, NULL), -- YaracuyAleaciones
('@TitanioZulia', NULL, 47, NULL, NULL),      -- TitanioZulia
('@ZuliaTitanium', NULL, 48, NULL, NULL);     -- ZuliaTitanium



-- ==============================================
-- Inserción de datos: Teléfonos de Proveedor
-- ==============================================
INSERT INTO TELEFONO (tel_codigo_area, tel_numero, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES 
('+58', '2121234567', NULL, 1, NULL, NULL),  -- MetalesGalácticos
('+58', '4141234567', NULL, 2, NULL, NULL),  -- AceroPlus
('+58', '4161234567', NULL, 3, NULL, NULL),  -- TitanioFusión
('+58', '4261234567', NULL, 4, NULL, NULL),  -- AleacionesElite
('+58', '4241234567', NULL, 5, NULL, NULL),  -- KevlarForce
('+58', '2122345678', NULL, 6, NULL, NULL),  -- CompositesXtremo
('+58', '4142345678', NULL, 7, NULL, NULL),  -- AluMatrix
('+58', '4162345678', NULL, 8, NULL, NULL),  -- FusionAluminio
('+58', '4262345678', NULL, 9, NULL, NULL),  -- AcerosTop
('+58', '4242345678', NULL, 10, NULL, NULL), -- SuperAceros
('+58', '2123456789', NULL, 11, NULL, NULL), -- FuerzaMetálica
('+58', '4143456789', NULL, 12, NULL, NULL), -- MetalMaster
('+58', '4163456789', NULL, 13, NULL, NULL), -- TitaniumPro
('+58', '4263456789', NULL, 14, NULL, NULL), -- ProMetals
('+58', '4243456789', NULL, 15, NULL, NULL), -- CarbonTech
('+58', '2124567890', NULL, 16, NULL, NULL), -- FiberMax
('+58', '4144567890', NULL, 17, NULL, NULL), -- VidrioFortaleza
('+58', '4164567890', NULL, 18, NULL, NULL), -- FibraViva
('+58', '4264567890', NULL, 19, NULL, NULL), -- InoxidableSteel
('+58', '4244567890', NULL, 20, NULL, NULL), -- SteelGuard
('+58', '2125678901', NULL, 21, NULL, NULL), -- MegaMagnesio
('+58', '4145678901', NULL, 22, NULL, NULL), -- MagnesioPlus
('+58', '4165678901', NULL, 23, NULL, NULL), -- ReforPoly
('+58', '4265678901', NULL, 24, NULL, NULL), -- PolyForce
('+58', '4245678901', NULL, 25, NULL, NULL), -- EpoxiPower
('+58', '2126789012', NULL, 26, NULL, NULL), -- EpoxiStar
('+58', '4146789012', NULL, 27, NULL, NULL), -- SuperPoly
('+58', '4166789012', NULL, 28, NULL, NULL), -- PolyMax
('+58', '4266789012', NULL, 29, NULL, NULL), -- SiliconShield
('+58', '4246789012', NULL, 30, NULL, NULL), -- SiliconForce
('+58', '2127890123', NULL, 31, NULL, NULL), -- NickelPro
('+58', '4147890123', NULL, 32, NULL, NULL), -- NickelForce
('+58', '4167890123', NULL, 33, NULL, NULL), -- BalsaWood
('+58', '4267890123', NULL, 34, NULL, NULL), -- MaderaLigera
('+58', '4247890123', NULL, 35, NULL, NULL), -- AcerosVerdes
('+58', '2128901234', NULL, 36, NULL, NULL), -- EcoAceros
('+58', '4148901234', NULL, 37, NULL, NULL), -- TitanioAndes
('+58', '4168901234', NULL, 38, NULL, NULL), -- AndesTitanios
('+58', '4268901234', NULL, 39, NULL, NULL), -- KevlarExtreme
('+58', '4248901234', NULL, 40, NULL, NULL), -- XtremoKevlar
('+58', '2129012345', NULL, 41, NULL, NULL), -- AluminiosTáchira
('+58', '4149012345', NULL, 42, NULL, NULL), -- AlumMaster
('+58', '4169012345', NULL, 43, NULL, NULL), -- Aluminios7075Plus
('+58', '4269012345', NULL, 44, NULL, NULL), -- PlusAluminio7075
('+58', '4249012345', NULL, 45, NULL, NULL), -- AleadosYaracuy
('+58', '2120123456', NULL, 46, NULL, NULL), -- YaracuyAleaciones
('+58', '4140123456', NULL, 47, NULL, NULL), -- TitanioZulia
('+58', '4160123456', NULL, 48, NULL, NULL); -- ZuliaTitanium

-- =======================================================
-- Inserción de datos: Correos Electrónicos de Proveedor
-- =======================================================
INSERT INTO CORREO_ELECTRONICO (cor_dir_correo, fk_per_id, fk_com_id, fk_cjd_id, fk_ctn_id)
VALUES 
('metalesgalacticos@example.com', NULL, 1, NULL, NULL),  -- MetalesGalácticos
('aceroplus@example.com', NULL, 2, NULL, NULL),          -- AceroPlus
('titaniofusion@example.com', NULL, 3, NULL, NULL),      -- TitanioFusión
('aleacioneselite@example.com', NULL, 4, NULL, NULL),    -- AleacionesElite
('kevlarforce@example.com', NULL, 5, NULL, NULL),        -- KevlarForce
('compositesxtremo@example.com', NULL, 6, NULL, NULL),   -- CompositesXtremo
('alumatrix@example.com', NULL, 7, NULL, NULL),          -- AluMatrix
('fusionaluminio@example.com', NULL, 8, NULL, NULL),     -- FusionAluminio
('acerostop@example.com', NULL, 9, NULL, NULL),          -- AcerosTop
('superaceros@example.com', NULL, 10, NULL, NULL),       -- SuperAceros
('fuerzametalica@example.com', NULL, 11, NULL, NULL),    -- FuerzaMetálica
('metalmaster@example.com', NULL, 12, NULL, NULL),       -- MetalMaster
('titaniumpro@example.com', NULL, 13, NULL, NULL),       -- TitaniumPro
('prometals@example.com', NULL, 14, NULL, NULL),         -- ProMetals
('carbontech@example.com', NULL, 15, NULL, NULL),        -- CarbonTech
('fibermax@example.com', NULL, 16, NULL, NULL),          -- FiberMax
('vidriofortaleza@example.com', NULL, 17, NULL, NULL),   -- VidrioFortaleza
('fibraviva@example.com', NULL, 18, NULL, NULL),         -- FibraViva
('inoxidablesteel@example.com', NULL, 19, NULL, NULL),   -- InoxidableSteel
('steelguard@example.com', NULL, 20, NULL, NULL),        -- SteelGuard
('megamagnesio@example.com', NULL, 21, NULL, NULL),      -- MegaMagnesio
('magnesioplus@example.com', NULL, 22, NULL, NULL),      -- MagnesioPlus
('reforpoly@example.com', NULL, 23, NULL, NULL),         -- ReforPoly
('polyforce@example.com', NULL, 24, NULL, NULL),         -- PolyForce
('epoxipower@example.com', NULL, 25, NULL, NULL),        -- EpoxiPower
('epoxistar@example.com', NULL, 26, NULL, NULL),         -- EpoxiStar
('superpoly@example.com', NULL, 27, NULL, NULL),         -- SuperPoly
('polymax@example.com', NULL, 28, NULL, NULL),           -- PolyMax
('siliconshield@example.com', NULL, 29, NULL, NULL),     -- SiliconShield
('siliconforce@example.com', NULL, 30, NULL, NULL),      -- SiliconForce
('nickelpro@example.com', NULL, 31, NULL, NULL),         -- NickelPro
('nickelforce@example.com', NULL, 32, NULL, NULL),       -- NickelForce
('balsawood@example.com', NULL, 33, NULL, NULL),         -- BalsaWood
('maderaligera@example.com', NULL, 34, NULL, NULL),      -- MaderaLigera
('acerosverdes@example.com', NULL, 35, NULL, NULL),      -- AcerosVerdes
('ecoaceros@example.com', NULL, 36, NULL, NULL),         -- EcoAceros
('titanioandes@example.com', NULL, 37, NULL, NULL),      -- TitanioAndes
('andestitanios@example.com', NULL, 38, NULL, NULL),     -- AndesTitanios
('kevlarxtreme@example.com', NULL, 39, NULL, NULL),      -- KevlarExtreme
('xtremokevlar@example.com', NULL, 40, NULL, NULL),      -- XtremoKevlar
('aluminiostachira@example.com', NULL, 41, NULL, NULL),  -- AluminiosTáchira
('alummaster@example.com', NULL, 42, NULL, NULL),        -- AlumMaster
('aluminios7075plus@example.com', NULL, 43, NULL, NULL), -- Aluminios7075Plus
('plusaluminio7075@example.com', NULL, 44, NULL, NULL),  -- PlusAluminio7075
('aleadosyaracuy@example.com', NULL, 45, NULL, NULL),    -- AleadosYaracuy
('yaracuyaleaciones@example.com', NULL, 46, NULL, NULL), -- YaracuyAleaciones
('titaniozulia@example.com', NULL, 47, NULL, NULL),      -- TitanioZulia
('zuliatitanium@example.com', NULL, 48, NULL, NULL);     -- ZuliaTitanium

-- ================================================================================
