import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'
import { map } from 'rxjs';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public currentZoom: number = 12;
  public map?: Map
  public currentLngLat: LngLat = new LngLat(-4.6247300, 36.5399800)
  public currentLong: number = -4.6247300
  public currentLat: number = 36.5399800

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });
    this.mapListerers()
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListerers() {
    if (!this.map) throw 'Mapa no inicializado'

    this.map.on('zoom', () => {
      this.currentZoom = this.map!.getZoom()
    })

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return
      this.map!.zoomTo(18)
    })

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter()

      const { lng, lat } = this.currentLngLat
      this.currentLong = lng
      this.currentLat = lat

    })
  }

  zoomIn() {
    this.map?.zoomIn()

  }

  zoomOut() {
    this.map?.zoomOut()
  }

  zoomChanged(value: string) {
    this.currentZoom = Number(value)
    this.map?.zoomTo(this.currentZoom)
  }
}
