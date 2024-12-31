import pool from "../../config/database";
import { useClientesStatsService } from "./useClientesStatsService";

export const useDashboardStatsService = {
  getDashboardStats: async () => {
    const query = `
      SELECT 
        -- Empleados
        (SELECT COUNT(*) FROM empleado) as total_empleados,
        (SELECT COUNT(*) FROM empleado 
         WHERE per_fecha_contratacion >= CURRENT_DATE - INTERVAL '30 days') as nuevos_empleados,
        
        -- Proveedores
        (SELECT COUNT(*) FROM proveedor) as total_proveedores,
        (SELECT COUNT(*) FROM proveedor 
         WHERE com_fechai_operaciones >= CURRENT_DATE - INTERVAL '30 days') as nuevos_proveedores,
        
        -- Producción
        (SELECT COUNT(*) FROM avion_creado) as total_aviones,
        (SELECT COUNT(*) FROM avion_creado 
         WHERE avi_fecha_creacion >= CURRENT_DATE - INTERVAL '30 days') as nuevos_aviones,
        
        -- Piezas
        (SELECT COUNT(*) FROM pieza_stock) as total_piezas,
        (SELECT COUNT(*) FROM pieza_stock 
         WHERE pie_fecha_fabricacion >= CURRENT_DATE - INTERVAL '30 days') as nuevas_piezas,
        
        -- Ensambles
        (SELECT COUNT(*) FROM fase_ensamble_avion 
         WHERE fln_fecha_fin IS NULL) as ensambles_en_proceso,
        
        -- Solicitudes
        (SELECT COUNT(*) FROM solicitud_cliente) as total_solicitudes_clientes,
        (SELECT COUNT(*) FROM solicitud_cliente 
         WHERE sct_fecha >= CURRENT_DATE - INTERVAL '30 days') as nuevas_solicitudes_clientes,
        
        (SELECT COUNT(*) FROM solicitud_proveedor) as total_solicitudes_proveedores,
        (SELECT COUNT(*) FROM solicitud_proveedor 
         WHERE spr_fecha >= CURRENT_DATE - INTERVAL '30 days') as nuevas_solicitudes_proveedores
    `;

    const [dashboardResult, clientesStats] = await Promise.all([
      pool.query(query),
      useClientesStatsService.getClientesStats(),
    ]);

    const stats = dashboardResult.rows[0];

    return {
      empleados: {
        total: parseInt(stats.total_empleados),
        nuevos: parseInt(stats.nuevos_empleados),
      },
      clientes: {
        total: clientesStats.total,
        nuevos: clientesStats.nuevosTotal,
        naturales: clientesStats.naturales,
        juridicos: clientesStats.juridicos,
      },
      proveedores: {
        total: parseInt(stats.total_proveedores),
        nuevos: parseInt(stats.nuevos_proveedores),
      },
      produccion: {
        aviones: {
          total: parseInt(stats.total_aviones),
          nuevos: parseInt(stats.nuevos_aviones),
          enProceso: parseInt(stats.ensambles_en_proceso),
        },
        piezas: {
          total: parseInt(stats.total_piezas),
          nuevas: parseInt(stats.nuevas_piezas),
        },
      },
      solicitudes: {
        clientes: {
          total: parseInt(stats.total_solicitudes_clientes),
          nuevas: parseInt(stats.nuevas_solicitudes_clientes),
        },
        proveedores: {
          total: parseInt(stats.total_solicitudes_proveedores),
          nuevas: parseInt(stats.nuevas_solicitudes_proveedores),
        },
      },
    };
  },
};
