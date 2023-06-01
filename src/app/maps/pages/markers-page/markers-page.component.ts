import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {


  @ViewChild('map') divMap?: ElementRef;

  public currentZoom: number = 12;
  public map?: Map
  public currentLngLat: LngLat = new LngLat(-4.6247300, 36.5399800)

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13,
    });

    // const markerHtml = document.createElement('div')
    // markerHtml.innerHTML = 'El kabra'

    // const marker = new Marker({
    //   //color: 'red',
    //   element: markerHtml
    // }
    // )
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map)


  }
}
