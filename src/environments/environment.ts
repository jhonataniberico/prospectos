const IP_SERVER = 'ec2-54-90-30-216.compute-1.amazonaws.com';

export const environment = {
  production: false,
  api: `http://${IP_SERVER}`,
  apiService: {
    combos: {
      pais: '/api/combo/pais',
      departamento: '/api/combo/departamento',
      provincia: '/api/combo/provincia',
      distrito: '/api/combo/distrito',
      distritoDetectado: '/api/combo/distritos-detectados',
      procesador: '/api/combo/procesador',
      ram: '/api/combo/ram',
      disco: '/api/combo/disco',
      sistema: '/api/combo/sistema',
      auricular: '/api/combo/auricular',
      carga: '/api/combo/velocidad-carga',
      descarga: '/api/combo/velocidad-descarga'
    },
    oauth: {
      token: '/oauth/token'
    },
    postulante: {
      registrarProspecto: '/api/postulante/registrar-prospecto',
      registrarConectividad: '/api/postulante/registrar-conectividad',
      registrarDispositivos: '/api/postulante/registrar-dispositivos',
      registrarEquipo: '/api/postulante/registrar-equipo',
      registrarEquipoImg: '/api/postulante/registrar-equipo-img',
      detalleProyecto: '/api/postulante/detalle-proyecto',
      testIP: '/api/postulante/test-ip'
    },
    leadpostulante: {
      registrarLead: '/api/leadpostulante/registrar'
    },
    admin: {
      buscarProspecto: '/api/admin/buscar-prospectos',
      detalleProspecto: '/api/admin/detalle-prospecto',
      listarProyecto: '/api/admin/listar-proyectos'
    },
    usuarios: {
      anularToken: '/api/usuarios/anular'
    }
  },
  geolocalization: 'https://maps.googleapis.com/maps/api/geocode/json',
  api_key_map: 'AIzaSyBOhg8YYoI8oFGAGTrP1O_4r9b4i_KUNH0'
};
