-- =====================================
-- Inserción de datos: ESTATUS
-- ======================================
INSERT INTO ESTATUS (est_tipo_estatus, est_descripcion)
VALUES ('Activo', 'El registro está activo y en operación.');

INSERT INTO ESTATUS (est_tipo_estatus, est_descripcion)
VALUES ('Inactivo', 'El registro está inactivo y no está en operación.');

INSERT INTO ESTATUS (est_tipo_estatus, est_descripcion)
VALUES ('Pendiente', 'El registro está en espera de revisión o acción.');

INSERT INTO ESTATUS (est_tipo_estatus, est_descripcion)
VALUES ('Cancelado', 'El registro ha sido cancelado.');

INSERT INTO ESTATUS (est_tipo_estatus, est_descripcion)
VALUES ('Completado', 'El registro ha sido completado exitosamente.');

INSERT INTO ESTATUS (est_tipo_estatus, est_descripcion)
VALUES ('En proceso', 'El registro está siendo procesado actualmente.');
