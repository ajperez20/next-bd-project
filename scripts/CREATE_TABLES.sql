--------------------------------------------------------------------------------
-- 1. TABLA LUGAR (Lugar geográfico)
--------------------------------------------------------------------------------

CREATE TABLE LUGAR
(
    lug_id     SERIAL PRIMARY KEY,
    lug_nombre VARCHAR(90) NOT NULL,
    lug_tipo   VARCHAR(20),
    fk_lug_id  INT,
    -- Relación recursiva con la entidad LUGAR
    CONSTRAINT fk_lugar_padre
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id)
);

--------------------------------------------------------------------------------
-- 2. CONFIGURACIÓN DEL PROYECTO
--------------------------------------------------------------------------------

-- 2.1 Tipo de Avión
CREATE TABLE TIPO_AVION
(
    tiv_id          SERIAL PRIMARY KEY,
    tiv_nombre      VARCHAR(50) NOT NULL,
    tiv_descripcion VARCHAR(255) NOT NULL
);

-- 2.2 Característica de Avión (Configuración)
CREATE TABLE CARACTERISTICA_ANV_CONF
(
    pvv_id                    SERIAL PRIMARY KEY,
    pvv_nombre_caracteristica VARCHAR(50) NOT NULL
);

-- 2.3 Modelo de Avión (Configuración)
CREATE TABLE MODELO_AVION_CONF
(
    mda_id          SERIAL PRIMARY KEY,
    mda_nombre      VARCHAR(50) NOT NULL,
    mda_descripcion VARCHAR(70) NOT NULL,
    fk_tiv_id       INT         NOT NULL,
    CONSTRAINT fk_tiv_id
        FOREIGN KEY (fk_tiv_id)
            REFERENCES TIPO_AVION (tiv_id)
);

-- 2.4 Relación (Modelo Avión - Característica)
CREATE TABLE MODELO_AVION_CARACTERISTICA
(
    mnc_unidad_medida VARCHAR(30),
    mnc_valor         INT,
    fk_pvv_id         INT NOT NULL,
    fk_mda_id         INT NOT NULL,
    CONSTRAINT pk_modavioncaract
        PRIMARY KEY (fk_mda_id, fk_pvv_id),
    CONSTRAINT fk_pvv_id
        FOREIGN KEY (fk_pvv_id)
            REFERENCES CARACTERISTICA_ANV_CONF (pvv_id),
    CONSTRAINT fk_mda_id
        FOREIGN KEY (fk_mda_id)
            REFERENCES MODELO_AVION_CONF (mda_id)
);

-- 2.5 Proceso de Ensamble de Avión (Configuración)
CREATE TABLE PROCESO_ENSAMBLE_AVION_CONF
(
    epv_id             SERIAL PRIMARY KEY,
    epv_nombre_proceso VARCHAR(50) NOT NULL,
    epv_tiempo_estimado INTERVAL NOT NULL,
    epv_descripcion    VARCHAR(70) NOT NULL
);

-- 2.6 Fase de Ensamble de Avión (Configuración)
CREATE TABLE FASE_ENSAMBLE_AVION_CONF
(
    fk_epv_id INT NOT NULL,
    fk_mda_id INT NOT NULL,
    CONSTRAINT pk_fasebavcf
        PRIMARY KEY (fk_epv_id, fk_mda_id),
    CONSTRAINT fk_epv_id
        FOREIGN KEY (fk_epv_id)
            REFERENCES PROCESO_ENSAMBLE_AVION_CONF (epv_id),
    CONSTRAINT fk_mda_id
        FOREIGN KEY (fk_mda_id)
            REFERENCES MODELO_AVION_CONF (mda_id)
);

-- 2.7 Modelo de Pieza (Configuración)
CREATE TABLE MODELO_PIEZA_CONF
(
    mec_id           SERIAL PRIMARY KEY,
    mec_nombre_pieza VARCHAR(50) NOT NULL,
    mec_descripcion  VARCHAR(30) NOT NULL
);

-- 2.8 Composición (Relación recursiva de piezas)
CREATE TABLE COMPOSICION
(
    cpn_cantidad INT NOT NULL,
    fk_compone   INT NOT NULL,
    fk_compuesta INT NOT NULL,
    CONSTRAINT pk_cpn
        PRIMARY KEY (fk_compone, fk_compuesta),
    CONSTRAINT fk_compuesta
        FOREIGN KEY (fk_compuesta)
            REFERENCES MODELO_PIEZA_CONF (mec_id),
    CONSTRAINT fk_compone
        FOREIGN KEY (fk_compone)
            REFERENCES MODELO_PIEZA_CONF (mec_id)
);

-- 2.9 Avión - Componente (Piezas que pertenecen a ciertos procesos de ensamble)
CREATE TABLE AVION_COMPONENTE
(
    ctm_cantidad_piezas INT NOT NULL,
    fk_epv_id           INT NOT NULL,
    fk_mda_id           INT NOT NULL,
    fk_mec_id           INT NOT NULL,
    CONSTRAINT pk_ctm
        PRIMARY KEY (fk_epv_id, fk_mda_id, fk_mec_id),
    CONSTRAINT fk_fasebavcf
        FOREIGN KEY (fk_epv_id, fk_mda_id)
            REFERENCES FASE_ENSAMBLE_AVION_CONF (fk_epv_id, fk_mda_id),
    CONSTRAINT fk_mec_id
        FOREIGN KEY (fk_mec_id)
            REFERENCES MODELO_PIEZA_CONF (mec_id)
);

-- 2.10 Prueba de Avión (Configuración)
CREATE TABLE PRUEBA_CONF
(
    prc_id            SERIAL PRIMARY KEY,
    prc_tiempo_estimado INTERVAL NOT NULL,
    prc_nombre_prueba VARCHAR(50) NOT NULL
);

-- 2.11 Modelo - Prueba (Configuración)
CREATE TABLE MODELO_PRUEBA
(
    fk_prc_id INT NOT NULL,
    fk_mec_id INT NOT NULL,
    CONSTRAINT pk_md_prueba
        PRIMARY KEY (fk_prc_id, fk_mec_id),
    CONSTRAINT fk_mec_id
        FOREIGN KEY (fk_mec_id)
            REFERENCES MODELO_PIEZA_CONF (mec_id),
    CONSTRAINT fk_prc_id
        FOREIGN KEY (fk_prc_id)
            REFERENCES PRUEBA_CONF (prc_id)
);

-- 2.12 Fase Prueba (Configuración)
CREATE TABLE FASE_PRUEBA
(
    fk_mda_id INT NOT NULL,
    fk_prc_id INT NOT NULL,
    CONSTRAINT fk_prc_id
        FOREIGN KEY (fk_prc_id)
            REFERENCES PRUEBA_CONF (prc_id),
    CONSTRAINT fk_mda_id
        FOREIGN KEY (fk_mda_id)
            REFERENCES MODELO_AVION_CONF (mda_id)
);

-- 2.13 Característica de Pieza (Configuración)
CREATE TABLE CARACTERISTICA_PIEZA_CONF
(
    pcc_id                    SERIAL PRIMARY KEY,
    pcc_nombre_caracteristica VARCHAR(50) NOT NULL
);

-- 2.14 Relación Pieza - Característica
CREATE TABLE PIEZA_CARACTERISTICA
(
    pzi_unidad_medida VARCHAR(50),
    pzi_valor         INT,
    fk_pcc_id         INT NOT NULL,
    fk_mec_id         INT NOT NULL,
    CONSTRAINT pk_pie_caract
        PRIMARY KEY (fk_pcc_id, fk_mec_id),
    CONSTRAINT fk_mec_id
        FOREIGN KEY (fk_mec_id)
            REFERENCES MODELO_PIEZA_CONF (mec_id),
    CONSTRAINT fk_pcc_id
        FOREIGN KEY (fk_pcc_id)
            REFERENCES CARACTERISTICA_PIEZA_CONF (pcc_id)
);

-- 2.15 Material de Pieza (Configuración)
CREATE TABLE MATERIAL_PIEZA_CONF
(
    mac_id              SERIAL PRIMARY KEY,
    mac_nombre_material VARCHAR(50) NOT NULL,
    mac_descripcion     VARCHAR(70) NOT NULL
);

-- 2.16 Proceso Ensamble de Pieza (Configuración)
CREATE TABLE PROCESO_ENSAMBLE_PIEZA_CONF
(
    epc_id             SERIAL PRIMARY KEY,
    epc_nombre_proceso VARCHAR(50) NOT NULL,
    epc_tiempo_estimado INTERVAL NOT NULL,
    epc_descripcion    VARCHAR(70) NOT NULL
);

-- 2.17 Fase Ensamble Pieza (Configuración)
CREATE TABLE FASE_ENSAMBLE_PIEZA_CONF
(
    fk_mec_id INT NOT NULL,
    fk_epc_id INT NOT NULL,
    CONSTRAINT pk_fase_epc
        PRIMARY KEY (fk_mec_id, fk_epc_id),
    CONSTRAINT fk_mec_id
        FOREIGN KEY (fk_mec_id)
            REFERENCES MODELO_PIEZA_CONF (mec_id),
    CONSTRAINT fk_epc_id
        FOREIGN KEY (fk_epc_id)
            REFERENCES PROCESO_ENSAMBLE_PIEZA_CONF (epc_id)
);

-- 2.18 Material Fase
CREATE TABLE MATERIAL_FASE
(
    mtf_cantidad_material INT         NOT NULL,
    mtf_unidad_medida     VARCHAR(50) NOT NULL,
    fk_mec_id             INT         NOT NULL,
    fk_epc_id             INT         NOT NULL,
    fk_mac_id             INT         NOT NULL,
    CONSTRAINT pk_material_fase
        PRIMARY KEY (fk_mec_id, fk_epc_id, fk_mac_id),
    CONSTRAINT fk_fase_epc
        FOREIGN KEY (fk_mec_id, fk_epc_id)
            REFERENCES FASE_ENSAMBLE_PIEZA_CONF (fk_mec_id, fk_epc_id),
    CONSTRAINT fk_mac_id
        FOREIGN KEY (fk_mac_id)
            REFERENCES MATERIAL_PIEZA_CONF (mac_id)
);

-- 2.19 Materia Prima
CREATE TABLE MATERIA_PRIMA
(
    rpm_id          SERIAL PRIMARY KEY,
    rpm_nombre      VARCHAR(50) NOT NULL,
    rpm_descripcion VARCHAR(70)
);

--------------------------------------------------------------------------------
-- 3. EJECUCIÓN DEL PROYECTO
--------------------------------------------------------------------------------

-- 3.1 Sede Planta
CREATE TABLE SEDE_PLANTA
(
    sed_id          SERIAL PRIMARY KEY,
    sed_nombre      VARCHAR(100) NOT NULL,
    sed_direccion   VARCHAR(200) NOT NULL,
    sed_descripcion VARCHAR(255),
    fk_lug_id       INT          NOT NULL,
    CONSTRAINT fk_lugar
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id)
            ON DELETE CASCADE
);

-- 3.2 Área
CREATE TABLE AREA
(
    are_id          SERIAL PRIMARY KEY,
    are_nombre      VARCHAR(100) NOT NULL,
    are_descripcion VARCHAR(255),
    fk_sed_id       INT          NOT NULL,
    CONSTRAINT fk_sede
        FOREIGN KEY (fk_sed_id)
            REFERENCES SEDE_PLANTA (sed_id)
            ON DELETE CASCADE
);

-- 3.3 Zona
CREATE TABLE ZONA
(
    zon_id          SERIAL PRIMARY KEY,
    zon_nombre      VARCHAR(100) NOT NULL,
    zon_descripcion VARCHAR(255),
    fk_are_id       INT          NOT NULL,
    CONSTRAINT fk_area
        FOREIGN KEY (fk_are_id)
            REFERENCES AREA (are_id)
            ON DELETE CASCADE
);

-- 3.4 Estatus
CREATE TABLE ESTATUS
(
    est_id           SERIAL PRIMARY KEY,
    est_tipo_estatus VARCHAR(50)  NOT NULL,
    est_descripcion  VARCHAR(255) NOT NULL
);

-- 3.5 Prueba
CREATE TABLE PRUEBA
(
    pru_id          SERIAL PRIMARY KEY,
    pru_nombre      VARCHAR(100) NOT NULL,
    pru_tiempo_estimado INTERVAL NOT NULL,
    pru_descripcion VARCHAR(255) NOT NULL
);

-- 3.6 Materia Prima Stock
CREATE TABLE MATERIA_PRIMA_STOCK
(
    mps_id                  SERIAL      NOT NULL,
    mps_unidad_medida       VARCHAR(30) NOT NULL,
    mps_cantidad_disponible INT         NOT NULL,
    fk_sed_id               INT         NOT NULL,
    fk_rpm_id               INT         NOT NULL,
    CONSTRAINT pk_mps
        PRIMARY KEY (fk_sed_id, fk_rpm_id, mps_id),
    CONSTRAINT fk_sed_id
        FOREIGN KEY (fk_sed_id)
            REFERENCES SEDE_PLANTA (sed_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_rpm_id
        FOREIGN KEY (fk_rpm_id)
            REFERENCES MATERIA_PRIMA (rpm_id)
            ON DELETE CASCADE
);

-- 3.7 Sede Material Prueba
CREATE TABLE SEDE_MATERIAL_PRUEBA
(
    pbm_fecha_inicio     DATE         NOT NULL DEFAULT CURRENT_DATE,
    pbm_fecha_fin        DATE,
    pbm_resultado_prueba VARCHAR(255) NOT NULL,
    fk_zon_id            INT          NOT NULL,
    fk_sed_id            INT          NOT NULL,
    fk_rpm_id            INT          NOT NULL,
    fk_mps_id            INT          NOT NULL,
    CONSTRAINT pk_pbm
        PRIMARY KEY (fk_zon_id, fk_sed_id, fk_rpm_id, fk_mps_id),
    CONSTRAINT fk_mps
        FOREIGN KEY (fk_sed_id, fk_rpm_id, fk_mps_id)
            REFERENCES MATERIA_PRIMA_STOCK (fk_sed_id, fk_rpm_id, mps_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_zon_id
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
            ON DELETE CASCADE
);

-- 3.8 Estatus PMS
CREATE TABLE ESTATUS_PMS
(
    sms_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    sms_fecha_fin    DATE,
    fk_est_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    fk_sed_id        INT  NOT NULL,
    fk_rpm_id        INT  NOT NULL,
    fk_mps_id        INT  NOT NULL,
    CONSTRAINT pk_sms
        PRIMARY KEY (fk_est_id, fk_zon_id, fk_sed_id, fk_rpm_id, fk_mps_id),
    CONSTRAINT fk_pbm
        FOREIGN KEY (fk_zon_id, fk_sed_id, fk_rpm_id, fk_mps_id)
            REFERENCES SEDE_MATERIAL_PRUEBA (fk_zon_id, fk_sed_id, fk_rpm_id, fk_mps_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.9 Proceso Ensamble Pieza (Ejecución)
CREATE TABLE PROCESO_ENSAMBLE_PIEZA_EJEC
(
    esp_id          SERIAL PRIMARY KEY,
    esp_tiempo_estimado INTERVAL NOT NULL,
    esp_descripcion VARCHAR(255) NOT NULL
);

-- 3.10 Fase Ensamble Pieza (Ejecución)
CREATE TABLE FASE_ENSAMBLE_PIEZA
(
    eez_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    eez_fecha_fin    DATE,
    fk_esp_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    fk_mec_id        INT  NOT NULL,
    CONSTRAINT pk_eez
        PRIMARY KEY (fk_esp_id, fk_zon_id),
    CONSTRAINT fk_esp_id
        FOREIGN KEY (fk_esp_id)
            REFERENCES PROCESO_ENSAMBLE_PIEZA_EJEC (esp_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_zon_id
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_mec_id
        FOREIGN KEY (fk_mec_id)
            REFERENCES MODELO_PIEZA_CONF (mec_id)
            ON DELETE CASCADE
);

-- 3.11 Estatus FEP
CREATE TABLE ESTATUS_FEP
(
    sfe_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    sfe_fecha_fin    DATE,
    fk_esp_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_est_id
        PRIMARY KEY (fk_est_id, fk_esp_id, fk_zon_id),
    CONSTRAINT fk_eez
        FOREIGN KEY (fk_esp_id, fk_zon_id)
            REFERENCES FASE_ENSAMBLE_PIEZA (fk_esp_id, fk_zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.12 Ensamble Solicitud Materia
CREATE TABLE ENSAMBLE_SOLICITUD_MATERIA
(
    elm_id            SERIAL,
    elm_cantidad      INT         NOT NULL,
    elm_unidad_medida VARCHAR(50) NOT NULL,
    fk_esp_id         INT         NOT NULL,
    fk_zon_id         INT         NOT NULL,
    fk_sed_id         INT         NOT NULL,
    fk_rpm_id         INT         NOT NULL,
    fk_mps_id         INT         NOT NULL,
    CONSTRAINT pk_elm
        PRIMARY KEY (elm_id, fk_esp_id, fk_zon_id),
    CONSTRAINT fk_eez
        FOREIGN KEY (fk_esp_id, fk_zon_id)
            REFERENCES FASE_ENSAMBLE_PIEZA (fk_esp_id, fk_zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_mps
        FOREIGN KEY (fk_sed_id, fk_rpm_id, fk_mps_id)
            REFERENCES MATERIA_PRIMA_STOCK (fk_sed_id, fk_rpm_id, mps_id)
            ON DELETE CASCADE
);

-- 3.13 Estatus SME
CREATE TABLE ESTATUS_SME
(
    sme_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    sme_fecha_fin    DATE,
    fk_est_id        INT  NOT NULL,
    fk_elm_id        INT  NOT NULL,
    fk_esp_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    CONSTRAINT pk_sme
        PRIMARY KEY (fk_est_id, fk_elm_id, fk_esp_id, fk_zon_id),
    CONSTRAINT fk_elm
        FOREIGN KEY (fk_elm_id, fk_esp_id, fk_zon_id)
            REFERENCES ENSAMBLE_SOLICITUD_MATERIA (elm_id, fk_esp_id, fk_zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.14 Ensamble Material Prueba
CREATE TABLE ENSAMBLE_MATERIAL_PRUEBA
(
    epr_fecha_inicio     DATE         NOT NULL DEFAULT CURRENT_DATE,
    epr_fecha_fin        DATE,
    epr_resultado_prueba VARCHAR(255) NOT NULL,
    fk_pru_id            INT          NOT NULL,
    fk_zon_id            INT          NOT NULL,
    fk_elm_id            INT          NOT NULL,
    fk_esp_id            INT          NOT NULL,
    CONSTRAINT pk_epr
        PRIMARY KEY (fk_pru_id, fk_zon_id),
    CONSTRAINT fk_pru_id
        FOREIGN KEY (fk_pru_id)
            REFERENCES PRUEBA (pru_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_zon_id
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_elm
        FOREIGN KEY (fk_elm_id, fk_esp_id, fk_zon_id)
            REFERENCES ENSAMBLE_SOLICITUD_MATERIA (elm_id, fk_esp_id, fk_zon_id)
            ON DELETE CASCADE
);

-- 3.15 Estatus PPEM
CREATE TABLE ESTATUS_PPEM
(
    ppm_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    ppm_fecha_fin    DATE,
    fk_pru_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_ppm
        PRIMARY KEY (fk_est_id, fk_pru_id, fk_zon_id),
    CONSTRAINT fk_epr
        FOREIGN KEY (fk_pru_id, fk_zon_id)
            REFERENCES ENSAMBLE_MATERIAL_PRUEBA (fk_pru_id, fk_zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
);

-- 3.16 Pieza Stock
CREATE TABLE PIEZA_STOCK
(
    pie_id                  SERIAL PRIMARY KEY,
    pie_numero_serial       VARCHAR(50) NOT NULL,
    pie_nombre              VARCHAR(50) NOT NULL,
    pie_fecha_fabricacion   DATE        NOT NULL DEFAULT CURRENT_DATE,
    pie_cantidad_disponible INT         NOT NULL,
    fk_sed_id               INT         NOT NULL,
    fk_esp_id               INT         NOT NULL,
    fk_zon_id               INT         NOT NULL,
    CONSTRAINT fk_sed_id
        FOREIGN KEY (fk_sed_id)
            REFERENCES SEDE_PLANTA (sed_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_eez
        FOREIGN KEY (fk_esp_id, fk_zon_id)
            REFERENCES FASE_ENSAMBLE_PIEZA (fk_esp_id, fk_zon_id)
            ON DELETE CASCADE
);

-- 3.17 Prueba Pieza Sede
CREATE TABLE PRUEBA_PIEZA_SEDE
(
    psz_fecha_inicio DATE         NOT NULL DEFAULT CURRENT_DATE,
    psz_fecha_fin    DATE,
    psz_resultado    VARCHAR(255) NOT NULL,
    fk_pie_id        INT          NOT NULL,
    fk_zon_id        INT          NOT NULL,
    fk_pru_id        INT          NOT NULL,
    CONSTRAINT pk_psz
        PRIMARY KEY (fk_pie_id, fk_zon_id, fk_pru_id),
    CONSTRAINT fk_pie_id
        FOREIGN KEY (fk_pie_id)
            REFERENCES PIEZA_STOCK (pie_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_zon_id
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pru_id
        FOREIGN KEY (fk_pru_id)
            REFERENCES PRUEBA (pru_id)
            ON DELETE CASCADE
);

-- 3.18 Estatus PPS
CREATE TABLE ESTATUS_PPS
(
    ssp_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    ssp_fecha_fin    DATE,
    fk_pie_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    fk_pru_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_est_pps
        PRIMARY KEY (fk_pie_id, fk_zon_id, fk_pru_id, fk_est_id),
    CONSTRAINT fk_psz
        FOREIGN KEY (fk_pie_id, fk_zon_id, fk_pru_id)
            REFERENCES PRUEBA_PIEZA_SEDE (fk_pie_id, fk_zon_id, fk_pru_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.19 Proceso Ensamble Avión (Ejecución)
CREATE TABLE PROCESO_ENSAMBLE_AVION_EJEC
(
    eav_id          SERIAL PRIMARY KEY,
    eav_tiempo_estimado INTERVAL NOT NULL,
    eav_descripcion VARCHAR(255) NOT NULL
);

-- 3.20 Fase Ensamble Avión
CREATE TABLE FASE_ENSAMBLE_AVION
(
    fln_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fln_fecha_fin    DATE,
    fk_eav_id        INT  NOT NULL,
    fk_mda_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    CONSTRAINT pk_fln
        PRIMARY KEY (fk_eav_id, fk_mda_id, fk_zon_id),
    CONSTRAINT fk_proceso_avion
        FOREIGN KEY (fk_eav_id)
            REFERENCES PROCESO_ENSAMBLE_AVION_EJEC (eav_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_modelo_avion
        FOREIGN KEY (fk_mda_id)
            REFERENCES MODELO_AVION_CONF (mda_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_zona
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
            ON DELETE CASCADE
);

-- 3.21 Estatus FEA
CREATE TABLE ESTATUS_FEA
(
    efa_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    efa_fecha_fin    DATE,
    fk_eav_id        INT  NOT NULL,
    fk_mda_id        INT  NOT NULL,
    fk_zon_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_estatus_fea
        PRIMARY KEY (fk_eav_id, fk_mda_id, fk_zon_id, fk_est_id),
    CONSTRAINT fk_fase_ensamble_avion
        FOREIGN KEY (fk_eav_id, fk_mda_id, fk_zon_id)
            REFERENCES FASE_ENSAMBLE_AVION (fk_eav_id, fk_mda_id, fk_zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_estatus
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.22 Ensamble Solicitud Pieza
CREATE TABLE ENSAMBLE_SOLICITUD_PIEZA
(
    edz_id              SERIAL PRIMARY KEY,
    edz_cantidad_piezas INT NOT NULL,
    fk_eav_id           INT NOT NULL,
    fk_mda_id           INT NOT NULL,
    fk_zon_id           INT NOT NULL,
    fk_pie_id           INT NOT NULL,
    CONSTRAINT fk_fln
        FOREIGN KEY (fk_eav_id, fk_mda_id, fk_zon_id)
            REFERENCES FASE_ENSAMBLE_AVION (fk_eav_id, fk_mda_id, fk_zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pie_id
        FOREIGN KEY (fk_pie_id)
            REFERENCES PIEZA_STOCK (pie_id)
            ON DELETE CASCADE
);

-- 3.23 Estatus ESP
CREATE TABLE ESTATUS_ESP
(
    ets_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    ets_fecha_fin    DATE,
    fk_est_id        INT  NOT NULL,
    fk_edz_id        INT  NOT NULL,
    CONSTRAINT pk_ets
        PRIMARY KEY (fk_est_id, fk_edz_id),
    CONSTRAINT fk_edz_id
        FOREIGN KEY (fk_edz_id)
            REFERENCES ENSAMBLE_SOLICITUD_PIEZA (edz_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.24 Prueba Pieza Solicitud
CREATE TABLE PRUEBA_PIEZA_SOLICITUD
(
    pzb_fecha_inicio     DATE         NOT NULL DEFAULT CURRENT_DATE,
    pzb_fecha_fin        DATE,
    pzb_resultado_prueba VARCHAR(255) NOT NULL,
    fk_zon_id            INT          NOT NULL,
    fk_edz_id            INT          NOT NULL,
    fk_pru_id            INT          NOT NULL,
    CONSTRAINT pk_pzb
        PRIMARY KEY (fk_zon_id, fk_edz_id, fk_pru_id),
    CONSTRAINT fk_zon_id
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_edz_id
        FOREIGN KEY (fk_edz_id)
            REFERENCES ENSAMBLE_SOLICITUD_PIEZA (edz_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pru_id
        FOREIGN KEY (fk_pru_id)
            REFERENCES PRUEBA (pru_id)
            ON DELETE CASCADE
);

-- 3.25 Estatus PP Solicitud
CREATE TABLE ESTATUS_PP_SOLICITUD
(
    api_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    api_fecha_fin    DATE,
    fk_zon_id        INT  NOT NULL,
    fk_edz_id        INT  NOT NULL,
    fk_pru_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_api
        PRIMARY KEY (fk_est_id, fk_zon_id, fk_edz_id, fk_pru_id),
    CONSTRAINT fk_pzb
        FOREIGN KEY (fk_zon_id, fk_edz_id, fk_pru_id)
            REFERENCES PRUEBA_PIEZA_SOLICITUD (fk_zon_id, fk_edz_id, fk_pru_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.26 Solicitud Sede
CREATE TABLE SOLICITUD_SEDE
(
    sse_id          SERIAL PRIMARY KEY,
    sse_fecha       DATE NOT NULL DEFAULT CURRENT_DATE,
    sse_descripcion VARCHAR(70),
    fk_sed_atiende  INT  NOT NULL,
    fk_sed_solicita INT  NOT NULL,
    CONSTRAINT fk_sed_atiende
        FOREIGN KEY (fk_sed_atiende)
            REFERENCES SEDE_PLANTA (sed_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_sed_solicita
        FOREIGN KEY (fk_sed_solicita)
            REFERENCES SEDE_PLANTA (sed_id)
            ON DELETE CASCADE
);

-- 3.27 Detalle Solicitud de Sede
CREATE TABLE DETALLE_SLD_SEDE
(
    dss_cantidad    INT NOT NULL,
    dss_descripcion VARCHAR(50),
    fk_sse_id       INT NOT NULL,
    fk_pie_id       INT NOT NULL,
    CONSTRAINT pk_dss
        PRIMARY KEY (fk_sse_id, fk_pie_id),
    CONSTRAINT fk_sse_id
        FOREIGN KEY (fk_sse_id)
            REFERENCES SOLICITUD_SEDE (sse_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pie_id
        FOREIGN KEY (fk_pie_id)
            REFERENCES PIEZA_STOCK (pie_id)
            ON DELETE CASCADE
);

-- 3.28 Estatus Solicitud Pieza
CREATE TABLE ESTATUS_SOL_PIEZA
(
    slz_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    slz_fecha_fin    DATE,
    fk_sse_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_slz
        PRIMARY KEY (fk_sse_id, fk_est_id),
    CONSTRAINT fk_sse_id
        FOREIGN KEY (fk_sse_id)
            REFERENCES SOLICITUD_SEDE (sse_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

-- 3.29 Avión Creado
CREATE TABLE AVION_CREADO
(
    avi_id             SERIAL PRIMARY KEY,
    avi_num_serie      VARCHAR(50) NOT NULL UNIQUE,
    avi_fecha_creacion DATE        NOT NULL DEFAULT CURRENT_DATE,
    fk_eav_id          INT         NOT NULL UNIQUE,
    fk_mda_id          INT         NOT NULL UNIQUE,
    fk_zon_id          INT         NOT NULL UNIQUE,
    CONSTRAINT fk_fln
        FOREIGN KEY (fk_eav_id, fk_mda_id, fk_zon_id)
            REFERENCES FASE_ENSAMBLE_AVION (fk_eav_id, fk_mda_id, fk_zon_id)
            ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- 4. USUARIOS (PARTE DE EMPLEADOS)
--------------------------------------------------------------------------------

-- 4.1 Empleado
CREATE TABLE EMPLEADO
(
    per_id                 SERIAL PRIMARY KEY,
    per_dni                NUMERIC(8, 0) NOT NULL UNIQUE,
    per_nombre             VARCHAR(30)   NOT NULL,
    per_apellido           VARCHAR(30)   NOT NULL,
    per_direccion          VARCHAR(70)   NOT NULL,
    per_experiencia        INT           NOT NULL,
    per_fecha_contratacion DATE          NOT NULL DEFAULT CURRENT_DATE,
    per_profesion          VARCHAR(30)   NOT NULL,
    fk_lug_id              INT           NOT NULL,
    CONSTRAINT fk_lug_id
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id)
);

-- 4.2 Equipo Encargado
CREATE TABLE EQUIPO_ENCARGADO
(
    eqc_id          SERIAL      NOT NULL,
    eqc_descripcion VARCHAR(70) NOT NULL,
    fk_zon_id       INT         NOT NULL,
    fk_per_id       INT         NOT NULL,
    CONSTRAINT pk_equi_encargado
        PRIMARY KEY (fk_zon_id, fk_per_id, eqc_id),
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_zon_id
        FOREIGN KEY (fk_zon_id)
            REFERENCES ZONA (zon_id)
);

-- 4.3 Experiencia
CREATE TABLE EXPERIENCIA
(
    exp_id             SERIAL PRIMARY KEY,
    exp_nombre_empresa VARCHAR(50) NOT NULL,
    exp_fecha_inicio   DATE        NOT NULL,
    exp_fecha_fin      DATE        NOT NULL,
    fk_per_id          INT         NOT NULL,
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
   CONSTRAINT ck_fecha_fin
        CHECK (exp_fecha_fin > exp_fecha_inicio)
);

-- 4.4 Beneficiario
CREATE TABLE BENEFICIARIO
(
    ben_id        SERIAL PRIMARY KEY,
    ben_dni       NUMERIC(8, 0) NOT NULL UNIQUE,
    ben_nombre    VARCHAR(30)   NOT NULL,
    ben_apellido  VARCHAR(30)   NOT NULL,
    ben_direccion VARCHAR(70)   NOT NULL,
    fk_lug_id     INT           NOT NULL,
    CONSTRAINT fk_lug_id
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id)
);

-- 4.5 Relación Persona-Beneficiario
CREATE TABLE PER_BEN
(
    prb_parentezco VARCHAR(30) NOT NULL,
    fk_ben_id      INT         NOT NULL,
    fk_per_id      INT         NOT NULL,
    CONSTRAINT pk_per_ben
        PRIMARY KEY (fk_ben_id, fk_per_id),
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_ben_id
        FOREIGN KEY (fk_ben_id)
            REFERENCES BENEFICIARIO (ben_id),
    CONSTRAINT ck_parentezco
        CHECK (
            UPPER(prb_parentezco) in ('HERMAN@', 'PADRE', 'MADRE', 'OTRO')
            )
);

-- 4.6 Título
CREATE TABLE TITULO
(
    tit_id          SERIAL PRIMARY KEY,
    tit_nombre      VARCHAR(30) NOT NULL,
    tit_descripcion VARCHAR(70) NOT NULL
);

-- 4.7 Empleado - Título
CREATE TABLE EMPLEADO_TITULO
(
    edt_fecha_obtencion    DATE        NOT NULL,
    edt_nombre_universidad VARCHAR(30) NOT NULL,
    edt_descripcion        VARCHAR(50) NOT NULL,
    fk_tit_id              INT         NOT NULL,
    fk_per_id              INT         NOT NULL,
    CONSTRAINT pk_per_tit
        PRIMARY KEY (fk_per_id, fk_tit_id),
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_tit_id
        FOREIGN KEY (fk_tit_id)
            REFERENCES TITULO (tit_id)
);

--------------------------------------------------------------------------------
-- 5. CLIENTES
--------------------------------------------------------------------------------

-- 5.1 Cliente Natural
CREATE TABLE CLIENTE_NATURAL
(
    ctn_id                    SERIAL PRIMARY KEY,
    ctn_direccion             VARCHAR(255) NOT NULL,
    ctn_url_pagina            VARCHAR(255) NOT NULL,
    ctn_fecha_ini_operaciones DATE        NOT NULL DEFAULT CURRENT_DATE,
    ctn_dni                   VARCHAR(50) NOT NULL UNIQUE,
    ctn_nombre                VARCHAR(50) NOT NULL,
    ctn_apellido              VARCHAR(50) NOT NULL,
    fk_lug_id                 INT         NOT NULL,
    CONSTRAINT fk_lug_id
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id),
    CONSTRAINT ck_ctn_dni
        CHECK (ctn_dni ~ '^[VEJP]{1}[0-9]{9,10}$'
)
    );

-- 5.2 Cliente Jurídico
CREATE TABLE CLIENTE_JURIDICO
(
    cjd_id                    SERIAL PRIMARY KEY,
    cjd_direccion             VARCHAR(255) NOT NULL,
    cjd_url_pagina            VARCHAR(255) NOT NULL,
    cjd_fecha_ini_operaciones DATE        NOT NULL DEFAULT CURRENT_DATE,
    cjd_rif                   VARCHAR(70) NOT NULL UNIQUE,
    cjd_nombre                VARCHAR(50) NOT NULL,
    cjd_descripcion           VARCHAR(70) NOT NULL,
    fk_lug_id 				  INT 		  NOT NULL,
    CONSTRAINT cjd_rif
        CHECK (cjd_rif ~ '^[J]{1}[0-9]{9,10}$'
),
	CONSTRAINT fk_lug_id
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id)
	
    );

-- 5.3 Solicitud Cliente
CREATE TABLE SOLICITUD_CLIENTE
(
    sct_id          SERIAL PRIMARY KEY,
    sct_fecha       DATE NOT NULL DEFAULT CURRENT_DATE,
    sct_total       INT  NOT NULL,
    sct_cantidad    INT  NOT NULL,
    sct_observacion VARCHAR(255),
    fk_avi_id       INT  NOT NULL,
    fk_cjd_id       INT,
    fk_ctn_id       INT,
    CONSTRAINT fk_cjd_id
        FOREIGN KEY (fk_cjd_id)
            REFERENCES CLIENTE_JURIDICO (cjd_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_ctn_id
        FOREIGN KEY (fk_ctn_id)
            REFERENCES CLIENTE_NATURAL (ctn_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_avi_id
        FOREIGN KEY (fk_avi_id)
            REFERENCES AVION_CREADO (avi_id)
            ON DELETE CASCADE
);

-- 5.4 Estatus SCAV
CREATE TABLE ESTATUS_SCAV
(
    scv_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    scv_fecha_fin    DATE,
    fk_sct_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_scv
        PRIMARY KEY (fk_sct_id, fk_est_id),
    CONSTRAINT fk_sct_id
        FOREIGN KEY (fk_sct_id)
            REFERENCES SOLICITUD_CLIENTE (sct_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- 6. PROVEEDORES Y SOLICITUD PROVEEDOR
--------------------------------------------------------------------------------

-- 6.1 Proveedor MP Stock
CREATE TABLE PROVEEDOR_MP_STOCK
(
    mtp_id                 SERIAL PRIMARY KEY,
    mtp_unidad_medida      VARCHAR(30) NOT NULL,
    mtp_cantida_disponible INT         NOT NULL,
    fk_rpm_id              INT         NOT NULL,
    CONSTRAINT fk_rpm_id
        FOREIGN KEY (fk_rpm_id)
            REFERENCES MATERIA_PRIMA (rpm_id)
);

-- 6.2 Proveedor
CREATE TABLE PROVEEDOR
(
    com_id                 SERIAL PRIMARY KEY,
    com_nombre             VARCHAR(30) NOT NULL,
    com_direccion          VARCHAR(70) NOT NULL,
    com_url_pagina         VARCHAR(70) NOT NULL,
    com_fechaI_operaciones DATE        NOT NULL DEFAULT CURRENT_DATE,
    fk_mtp_id              INT         NOT NULL,
    fk_lug_id              INT         NOT NULL,
    CONSTRAINT fk_mtp_id
        FOREIGN KEY (fk_mtp_id)
            REFERENCES PROVEEDOR_MP_STOCK (mtp_id),
   CONSTRAINT fk_lug_id
        FOREIGN KEY (fk_lug_id)
            REFERENCES LUGAR (lug_id)
);

-- 6.3 Solicitud Proveedor
CREATE TABLE SOLICITUD_PROVEEDOR
(
    spr_id          SERIAL PRIMARY KEY,
    spr_fecha       DATE NOT NULL DEFAULT CURRENT_DATE,
    spr_total       INT  NOT NULL,
    spr_descripcion VARCHAR(255),
    fk_com_id       INT  NOT NULL,
    fk_mps_id       INT  NOT NULL,
    fk_sed_id       INT  NOT NULL,
    fk_rpm_id       INT  NOT NULL,
    CONSTRAINT fk_mps
        FOREIGN KEY (fk_mps_id, fk_sed_id, fk_rpm_id)
            REFERENCES MATERIA_PRIMA_STOCK (mps_id, fk_sed_id, fk_rpm_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_com_id
        FOREIGN KEY (fk_com_id)
            REFERENCES PROVEEDOR (com_id)
            ON DELETE CASCADE
);

-- 6.4 Detalle Solicitud Proveedor
CREATE TABLE DETALLE_SLD_PROVEEDOR
(
    dsp_cantidad      INT          NOT NULL,
    dsp_unidad_medida VARCHAR(255) NOT NULL,
    fk_mtp_id         INT          NOT NULL,
    fk_spr_id         INT          NOT NULL,
    CONSTRAINT pk_dsp
        PRIMARY KEY (fk_mtp_id, fk_spr_id),
    CONSTRAINT fk_mtp_id
        FOREIGN KEY (fk_mtp_id)
            REFERENCES PROVEEDOR_MP_STOCK (mtp_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_spr_id
        FOREIGN KEY (fk_spr_id)
            REFERENCES SOLICITUD_PROVEEDOR (spr_id)
            ON DELETE CASCADE
);

-- 6.5 Estatus SSP
CREATE TABLE ESTATUS_SSP
(
    ups_fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    ups_fecha_fin    DATE,
    fk_spr_id        INT  NOT NULL,
    fk_est_id        INT  NOT NULL,
    CONSTRAINT pk_ups
        PRIMARY KEY (fk_spr_id, fk_est_id),
    CONSTRAINT fk_spr_id
        FOREIGN KEY (fk_spr_id)
            REFERENCES SOLICITUD_PROVEEDOR (spr_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_est_id
        FOREIGN KEY (fk_est_id)
            REFERENCES ESTATUS (est_id)
            ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- 7. CARGOS, HORARIOS, NOMINAS
--------------------------------------------------------------------------------

-- 7.1 Cargo
CREATE TABLE CARGO
(
    car_id          SERIAL PRIMARY KEY,
    car_nombre      VARCHAR(50) NOT NULL,
    car_descripcion VARCHAR(70) NOT NULL
);

-- 7.2 Empleado Cargo
CREATE TABLE EMPLEADO_CARGO
(
    emc_id           SERIAL NOT NULL,
    emc_fecha_inicio DATE   NOT NULL DEFAULT CURRENT_DATE,
    emc_fecha_fin    DATE,
    fk_car_id        INT    NOT NULL,
    fk_per_id        INT    NOT NULL,
    CONSTRAINT pk_empleado_cargo
        PRIMARY KEY (emc_id, fk_car_id, fk_per_id),
    CONSTRAINT fk_car_id
        FOREIGN KEY (fk_car_id)
            REFERENCES CARGO (car_id),
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT ck_fecha_fin
        CHECK (emc_fecha_inicio > emc_fecha_fin)
);

-- 7.3 Horario
CREATE TABLE HORARIO
(
    hor_id          SERIAL PRIMARY KEY,
    hor_dia         VARCHAR(9) NOT NULL,
    hor_hora_inicio TIME WITHOUT TIME ZONE NOT NULL,
    hor_hora_fin    TIME WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT ck_hor_dia
        CHECK (
            UPPER(hor_dia) IN (
                               'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'
                )
            ),
    CONSTRAINT hor_hora_inicio
        CHECK (
            CAST(hor_hora_inicio AS TEXT) ~ '^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]:00$'
) ,
    CONSTRAINT hor_hora_fin
        CHECK (
            CAST(hor_hora_fin AS TEXT) ~ '^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]:00$'
        ),
    CONSTRAINT ck_horario
        CHECK (hor_hora_fin > hor_hora_inicio)
);

-- 7.4 Empleado Cargo Horario
CREATE TABLE EMP_CARGO_HORARIO
(
    fk_per_id INT NOT NULL,
    fk_car_id INT NOT NULL,
    fk_emc_id INT NOT NULL,
    fk_hor_id INT NOT NULL,
    CONSTRAINT pk_ech
        PRIMARY KEY (fk_per_id, fk_car_id, fk_emc_id, fk_hor_id),
    CONSTRAINT fk_empleado_cargo
        FOREIGN KEY (fk_per_id, fk_car_id, fk_emc_id)
            REFERENCES EMPLEADO_CARGO (fk_per_id, fk_car_id, emc_id),
    CONSTRAINT fk_hor_id
        FOREIGN KEY (fk_hor_id)
            REFERENCES HORARIO (hor_id)
);

-- 7.5 Asistencia
CREATE TABLE ASISTENCIA
(
    asi_id          SERIAL PRIMARY KEY,
    asi_hora_inicio TIME WITHOUT TIME ZONE NOT NULL,
    asi_hora_fin    TIME WITHOUT TIME ZONE,
    fk_per_id       INT NOT NULL,
    fk_car_id       INT NOT NULL,
    fk_emc_id       INT NOT NULL,
    fk_hor_id       INT NOT NULL,
    CONSTRAINT fk_ech
        FOREIGN KEY (fk_per_id, fk_car_id, fk_emc_id, fk_hor_id)
            REFERENCES EMP_CARGO_HORARIO (fk_per_id, fk_car_id, fk_emc_id, fk_hor_id),
    CONSTRAINT asi_hora_inicio
        CHECK (
            CAST(asi_hora_inicio AS TEXT) ~ '^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]:00$'
) ,
    CONSTRAINT asi_hora_fin
        CHECK (
            CAST(asi_hora_fin AS TEXT) ~ '^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]:00$'
        ),
    CONSTRAINT ck_asistencia
        CHECK (asi_hora_fin > asi_hora_inicio)
);

-- 7.6 Pago Nómina
CREATE TABLE PAGO_NOMINA
(
    pnn_id          SERIAL PRIMARY KEY,
    pnn_fecha_pago  DATE NOT NULL DEFAULT CURRENT_DATE,
    pnn_total_pago  INT  NOT NULL,
    pnn_descripcion VARCHAR(255),
    fk_asi          INT  NOT NULL,
    CONSTRAINT fk_asi
        FOREIGN KEY (fk_asi)
            REFERENCES ASISTENCIA (asi_id)
);

--------------------------------------------------------------------------------
-- 8. DATOS DE CONTACTO (REDES, TELÉFONO, CORREO)
--------------------------------------------------------------------------------

-- 8.1 Red Social
CREATE TABLE RED_SOCIAL
(
    res_id      SERIAL PRIMARY KEY,
    res_usuario VARCHAR(50) NOT NULL,
    fk_per_id   INT,
    fk_com_id   INT,
    fk_cjd_id   INT,
    fk_ctn_id   INT,
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_com_id
        FOREIGN KEY (fk_com_id)
            REFERENCES PROVEEDOR (com_id),
    CONSTRAINT fk_cjd_id
        FOREIGN KEY (fk_cjd_id)
            REFERENCES CLIENTE_JURIDICO (cjd_id),
    CONSTRAINT fk_ctn_id
        FOREIGN KEY (fk_ctn_id)
            REFERENCES CLIENTE_NATURAL (ctn_id)
);

-- 8.2 Teléfono
CREATE TABLE TELEFONO
(
    tel_id          SERIAL PRIMARY KEY,
    tel_codigo_area VARCHAR(30) NOT NULL,
    tel_numero      VARCHAR(50) NOT NULL,
    fk_per_id       INT,
    fk_com_id       INT,
    fk_cjd_id       INT,
    fk_ctn_id       INT,
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_com_id
        FOREIGN KEY (fk_com_id)
            REFERENCES PROVEEDOR (com_id),
    CONSTRAINT fk_cjd_id
        FOREIGN KEY (fk_cjd_id)
            REFERENCES CLIENTE_JURIDICO (cjd_id),
    CONSTRAINT fk_ctn_id
        FOREIGN KEY (fk_ctn_id)
            REFERENCES CLIENTE_NATURAL (ctn_id),
    CONSTRAINT ck_codigo_area
        CHECK (tel_codigo_area ~ '^\+(?:[1-9]\d{0,2})$'
) ,
    CONSTRAINT ck_telefono
        CHECK (tel_numero ~ '^\d{7,10}$')
);

-- 8.3 Correo Electrónico
CREATE TABLE CORREO_ELECTRONICO
(
    cor_id         SERIAL PRIMARY KEY,
    cor_dir_correo VARCHAR(70) NOT NULL,
    fk_per_id      INT,
    fk_com_id      INT,
    fk_cjd_id      INT,
    fk_ctn_id      INT,
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_com_id
        FOREIGN KEY (fk_com_id)
            REFERENCES PROVEEDOR (com_id),
    CONSTRAINT fk_cjd_id
        FOREIGN KEY (fk_cjd_id)
            REFERENCES CLIENTE_JURIDICO (cjd_id),
    CONSTRAINT fk_ctn_id
        FOREIGN KEY (fk_ctn_id)
            REFERENCES CLIENTE_NATURAL (ctn_id),
    CONSTRAINT ck_correo
        CHECK (cor_dir_correo ~ '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
)
    );

--------------------------------------------------------------------------------
-- 9. SISTEMA DE PRIVILEGIOS Y USUARIOS
--------------------------------------------------------------------------------

-- 9.1 Privilegio
CREATE TABLE PRIVILEGIO
(
    pri_id     SERIAL PRIMARY KEY,
    pri_accion VARCHAR(30) NOT NULL,
    CONSTRAINT ck_pri_accion
        CHECK (UPPER(pri_accion) in ('CREATE', 'DELETE', 'UPDATE', 'READ'))
);

-- 9.2 Rol
CREATE TABLE ROL
(
    rol_id     SERIAL PRIMARY KEY,
    rol_nombre VARCHAR(30) NOT NULL,
    rol_descripcion VARCHAR(255),
    CONSTRAINT ck_rol_nombre
        CHECK (UPPER(rol_nombre) in ('EMPLEADO', 'CLIENTE', 'PROVEEDOR', 'ADMINISTRADOR'))
);

-- 9.3 Privilegio Rol (relación)
CREATE TABLE PRIVILEGIO_ROL
(
    fk_rol_id INT NOT NULL,
    fk_pri_id INT NOT NULL,
    CONSTRAINT pk_pri_rol
        PRIMARY KEY (fk_pri_id, fk_rol_id),
    CONSTRAINT fk_pri_rol
        FOREIGN KEY (fk_pri_id)
            REFERENCES PRIVILEGIO (pri_id),
    CONSTRAINT fk_rol_id
        FOREIGN KEY (fk_rol_id)
            REFERENCES ROL (rol_id)
);

-- 9.4 Usuario
CREATE TABLE USUARIO
(
    usu_id             SERIAL PRIMARY KEY,
    usu_nombre_usuario VARCHAR(30) NOT NULL,
    usu_contrasena     VARCHAR(30) NOT NULL,
    usu_email          VARCHAR(60) NOT NULL,
    fk_rol_id          INT         NOT NULL,
    fk_per_id          INT         NOT NULL,
    fk_cjd_id	       INT         NOT NULL,
    fk_ctn_id 		   INT         NOT NULL,
    fk_com_id          INT         NOT NULL,
    
    CONSTRAINT fk_rol_id
        FOREIGN KEY (fk_rol_id)
            REFERENCES ROL (rol_id),
    CONSTRAINT fk_per_id
        FOREIGN KEY (fk_per_id)
            REFERENCES EMPLEADO (per_id),
    CONSTRAINT fk_cjd_id
        FOREIGN KEY (fk_cjd_id)
            REFERENCES CLIENTE_JURIDICO (cjd_id),
    CONSTRAINT fk_ctn_id
        FOREIGN KEY (fk_ctn_id)
            REFERENCES CLIENTE_NATURAL (ctn_id),
    CONSTRAINT fk_com_id
        FOREIGN KEY (fk_com_id)
            REFERENCES PROVEEDOR (com_id)
    
);

--------------------------------------------------------------------------------
-- 10. PAGOS
--------------------------------------------------------------------------------

-- 10.1 Método de Pago
CREATE TABLE METODO_PAGO
(
    met_id                SERIAL PRIMARY KEY,
    efe_denominacion      VARCHAR(20),
    trf_num_transferencia VARCHAR(18),
    che_num_cheque        VARCHAR(7),
    tdd_numero_tarjeta    VARCHAR(16),
    tdd_vencimiento       DATE,
    tdc_numero_tarjeta    VARCHAR(16),
    tdc_vencimiento       DATE,
    tipo_metodo           VARCHAR(60) NOT NULL,
    CONSTRAINT ck_denominacion
        CHECK (efe_denominacion ~ '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$'
) ,
    CONSTRAINT ck_trf_num_transferencia
        CHECK (trf_num_transferencia ~ '^[0-9]{18}$'),
    CONSTRAINT ck_che_num_cheque
        CHECK (che_num_cheque ~ '^[0-9]{7}$'),
    CONSTRAINT ck_tdd_numero_tarjeta
        CHECK (tdd_numero_tarjeta ~ '^[0-9]{16}$'),
    CONSTRAINT ck_tdc_numero_tarjeta
        CHECK (tdc_numero_tarjeta ~ '^[0-9]{16}$')
);

-- 10.2 Moneda
CREATE TABLE MONEDA
(
    mon_id           SERIAL PRIMARY KEY,
    mon_tipo         VARCHAR(20) NOT NULL,
    mon_valor_cambio INT         NOT NULL,
    mon_fecha_inicio DATE        NOT NULL DEFAULT CURRENT_DATE, 
    mon_fecha_fin    DATE
);

-- 10.3 Pago
CREATE TABLE PAGO
(
    pago_monto INT  NOT NULL,
    pago_fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    fk_mon_id  INT  NOT NULL,
    fk_met_id  INT  NOT NULL,
    fk_pnn_id  INT,
    fk_spr_id  INT,
    fk_sct_id  INT,
    CONSTRAINT pk_pago
        PRIMARY KEY (fk_mon_id, fk_met_id),
    CONSTRAINT fk_met_id
        FOREIGN KEY (fk_met_id)
            REFERENCES METODO_PAGO (met_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_mon_id
        FOREIGN KEY (fk_mon_id)
            REFERENCES MONEDA (mon_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pnn_id
        FOREIGN KEY (fk_pnn_id)
            REFERENCES PAGO_NOMINA (pnn_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_spr_id
        FOREIGN KEY (fk_spr_id)
            REFERENCES SOLICITUD_PROVEEDOR (spr_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_sct_id
        FOREIGN KEY (fk_sct_id)
            REFERENCES SOLICITUD_CLIENTE (sct_id)
            ON DELETE CASCADE
);

-------------------------------------------------------------------------------
-- FIN DEL SCRIPT DE CREACIÓN
-------------------------------------------------------------------------------
