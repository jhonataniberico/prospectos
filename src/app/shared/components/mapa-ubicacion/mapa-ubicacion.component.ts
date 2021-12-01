import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MouseEvent, MapsAPILoader, StreetViewControlOptions, MapTypeControlOptions, ControlPosition } from '@agm/core';
import { __getPosition } from './mapa-ubicacion-helper';
import { IMapCoordinates } from './mapa-ubicacion.model';
import { MapaUbicacionService } from './mapa-ubicacion.service';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-mapa-ubicacion',
  templateUrl: 'mapa-ubicacion.component.html',
  styleUrls: ['mapa-ubicacion.component.css'],
})

export class MapaUbicacionComponent implements OnInit {
  @Output() coordenadas = new EventEmitter;
  disabled = false;
  ICON_MAP_INST: string = 'http://maps.google.com/mapfiles/kml/pal3/icon48.png';
  ICON_MAP_PEOPLE_RRHH: string = 'http://maps.google.com/mapfiles/kml/pal3/icon48.png';
  ICON_MAP_PEOPLE_MATRI: string = 'http://maps.google.com/mapfiles/kml/pal3/icon48.png';
  // More in http://kml4earth.appspot.com/icons.html#shapes
  // icon_edificio = 'http://maps.google.com/mapfiles/kml/pal3/icon21.png';
  // icon_home     = 'http://maps.google.com/mapfiles/kml/pal3/icon48.png';
  datos: any;
  icon_map: string;
  coordenates: any = { lat: null, lng: null };
  show: boolean = false;
  theme: string = '';
  showProgress: boolean = false;
  btnActive: boolean = false;
  animation: animationMarker = { drop: 'DROP', bounce: 'BOUNCE' };
  view: boolean = false;
  // Posicion inicial Perú
  lat: number = -10.988929555486411;
  lng: number = -76.73491020145303;
  // Zoom Google Maps
  zoom: number = 10;
  zoomControl: boolean = true;
  // streetView Google Maps
  streetViewControl: boolean = true;
  // streetViewControlOptions : StreetViewControlOptions = {
  //     position: ControlPosition.LEFT_TOP
  // };
  streetViewControlOptions: StreetViewControlOptions = {
    position: ControlPosition.LEFT_TOP
  };
  //  mapType Google Maps
  mapTypeControl: boolean = true;
  // mapTypeControlOptions    : MapTypeControlOptions = {
  //     position: ControlPosition.TOP_RIGHT,
  // };
  mapTypeControlOptions: MapTypeControlOptions = {
    position: ControlPosition.TOP_RIGHT,
  };
  // fullscreen Google Maps
  fullscreenControl: boolean = true;

  // More in http://kml4earth.appspot.com/icons.html#shapes
  // icon_edificio = 'http://maps.google.com/mapfiles/kml/pal3/icon21.png';
  // icon_home     = 'http://maps.google.com/mapfiles/kml/pal3/icon48.png';
  token: any = localStorage.getItem('token');
  markers: marker[] = [];

  // PARA OBTENER POSICION
  latlngBounds: any = null;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private mapaUbicacionSrv: MapaUbicacionService
  ) {
    // this.datos = data;
    // if (this.data.type) {
    //     this.view = true
    // }
    this.initMap();
  }

  ngOnInit(): void {
    this.mapaUbicacionSrv.disabled$.subscribe(disabled => {
      this.disabled = disabled;
    });
  }

  async initMap() {
    // this.theme = this.datos.theme;
    // switch (this.datos.system) {
    //   case 'MATRI':
    //     this.icon_map = this.ICON_MAP_PEOPLE_MATRI;
    //     break;
    //   case 'RRHH':
    //     this.icon_map = this.ICON_MAP_PEOPLE_RRHH;
    //     break;
    //   case 'CONFIG':
    //     this.icon_map = this.ICON_MAP_INST;
    //     break;
    // }
    this.icon_map = 'http://maps.google.com/mapfiles/kml/pal3/icon48.png';
    // if (this.datos.metadata.lat && this.datos.metadata.lng) {
    //   this.lat = parseFloat(this.datos.metadata.lat);
    //   this.lng = parseFloat(this.datos.metadata.lng);
    //   this.zoom = 18;
    // } else if (this.datos.sede_info) {
    //   this.lat = this.datos.sede_info[0].lat ? parseFloat(this.datos.sede_info[0].lat) : -10.988929555486411;;
    //   this.lng = this.datos.sede_info[0].lng ? parseFloat(this.datos.sede_info[0].lng) : -76.73491020145303;;
    // }

    if ((isNaN(this.lat) && isNaN(this.lng))) {
      let res: IMapCoordinates = await __getPosition();
      if (res) this.setPosition(res.latitude, res.longitude)
    }
    this.mapaUbicacionSrv.direccionCoordenates.pipe(filter(a => a != null)).subscribe(async (a) => {
      let GeoCodeDireccion = await this.mapaUbicacionSrv.GeoCodeLatLng(a);
      let [data] = GeoCodeDireccion.results;
      let latlng = data.geometry.location;
      this.setPosition(latlng.lat, latlng.lng, false);
      this.mapaUbicacionSrv.direccionState.next({ direccion: a, ...latlng });
      // this.coordenates = {
      //   lat: latlng.lat,
      //   lng: latlng.lng
      // };
      // this.markers[0] = {
      //   lat: latlng.lat,
      //   lng: latlng.lng,
      //   iconUrl: this.icon_map,
      //   draggable: true,
      //   label: 'Mi hogar',
      //   // animation : this.animation.bounce
      // };
    })
  }

  /**
   *
   * @description Cemtra la posicion del marcador y le aplica el zoom que deberia tener una vez obtenida la ubicacion del usuario
   * @param {*} lat
   * @param {*} lng
   * @returns {void}
   */
  async setPosition(lat, lng, reset = true) {
    if (this.markers.length == 0) {
      this.markers.push({
        lat,
        lng,
        iconUrl: this.icon_map,
        label: 'Mi hogar',
        draggable: true
      })
    }

    if (this.markers.length == 1) {
      this.markers[0] = {
        lat,
        lng,
        iconUrl: this.icon_map,
        label: 'Mi hogar',
        draggable: true
      }
    }
    this.zoom = 18;
    this.coordenates.lat = lat;
    // this.datos.metadata.lat = lat;
    this.coordenates.lng = lng;
    // this.datos.metadata.lng = lng;
    reset && this.mapReading(this.coordenates);
    await this.centerView();
    // this.changedPosition = true;

  }

  clickedMarker(label: string, index: number) {
    this.markers[index].animation = this.markers[index].animation ? null : this.animation.bounce;
  }

  ngAfterContentInit() {

  }

  mapReading(event) {
    setTimeout(() => {
      if (!navigator.geolocation) {
        return;
      }
      let success = async (position) => {
        try {
          console.log('entre getCurrentPosition success');
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          this.setPosition(latitude, longitude, false);
          let GeoCodeDireccion = await this.mapaUbicacionSrv.GeoCodeDireccion(+latitude, +longitude);
          let [direccion] = GeoCodeDireccion.results;
          let locality = this.getLocality(direccion);
          this.mapaUbicacionSrv.direccionState.next({
            direccion: direccion.formatted_address,
            lat: latitude,
            lng: longitude,
            disabledInput: true,
            locality
          });
        } catch (error) {
          console.log(error);
        }
      };

      function error(err) {
        console.log('error', err);
      };
      navigator.geolocation.getCurrentPosition(success, error);
      this.show = true;
    }, 1);
  }

  /**
   * @description centra la vista del mapa a la posicion actual del usuario, solo cuando da aceptar
   * @param {none} no recive parametros
   * @returns {void} no retorna nada
   */
  centerView(): void {
    this.btnActive = true;
    this.show = true;
    if (this.coordenates.lat && this.coordenates.lng) {
      this.lat = parseFloat(this.coordenates.lat);
      this.lng = parseFloat(this.coordenates.lng);

      this.mapsAPILoader.load().then(() => {
        if (this.markers && this.markers.length > 0) {
          this.latlngBounds = new window['google'].maps.LatLngBounds();
          this.markers.map(location => {
            this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.lng));
          });
          if (this.markers.length == 1) {
            this.latlngBounds.extend(new window['google'].maps.LatLng(this.markers[0].lat + 0.01, this.markers[0].lng + 0.01));
          }
        }
      });
    }
  }

  async mapClicked($event: MouseEvent) {
    this.activeButton($event.coords.lat, $event.coords.lng);
    let GeoCodeDireccion = await this.mapaUbicacionSrv.GeoCodeDireccion(+$event.coords.lat, +$event.coords.lng);
    let [direccion] = GeoCodeDireccion.results;
    this.mapaUbicacionSrv.direccionState.next({ direccion: direccion.formatted_address, lat: $event.coords.lat, lng: $event.coords.lng });

    this.coordenates = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    this.markers[0] = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      iconUrl: this.icon_map,
      draggable: true,
      label: 'Mi hogar',
      // animation : this.animation.bounce
    };
  }

  async markerDragEnd(m: marker, $event: MouseEvent) {
    this.activeButton($event.coords.lat, $event.coords.lng);
    let GeoCodeDireccion = await this.mapaUbicacionSrv.GeoCodeDireccion(+$event.coords.lat, +$event.coords.lng);
    let [direccion] = GeoCodeDireccion.results;
    this.mapaUbicacionSrv.direccionState.next({ direccion: direccion.formatted_address, lat: $event.coords.lat, lng: $event.coords.lng });
    this.coordenates = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    this.markers[0] = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      iconUrl: this.icon_map,
      draggable: true,
      label: 'Mi hogar',
      // animation : this.animation.bounce
    };
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() { }

  saveCoordenates() {
    this.coordenadas.emit(this.coordenates);
    this.showProgress = true;
  }

  activeButton(lat, lng) {
    if ((this.lat != lat) || (this.lng !== lng)) {
      this.btnActive = true;
    } else {
      this.btnActive = false;
    }
  }

  getLocality(direccion): string {
    return ((direccion.address_components || []).filter(fil => (fil.types || [])[0] == 'locality')[0] || {}).long_name;
  }
}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  iconUrl?: string;
  animation?: string;
}

interface animationMarker {
  drop: string;
  bounce: string;
}
