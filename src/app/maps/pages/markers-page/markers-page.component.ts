import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string,
  marker: Marker,
}

interface PlainMaker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {


  @ViewChild('map') divMap?: ElementRef;

  public currentZoom: number = 12;
  public map?: Map
  public currentLngLat: LngLat = new LngLat(-4.6247300, 36.5399800)
  public markers: MarkerAndColor[] = []


  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13,
    });

    this.readFromLocalStorage()
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

  createMarker() {

    if (!this.map) return

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color)
  }


  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lngLat)
      .addTo(this.map)

    this.markers.push({
      color: color,
      marker: marker
    })

    this.saveToLocalStorage()

    marker.on('dragend', () => {
      this.saveToLocalStorage()
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove()
    this.markers.splice(index, 1)

    this.saveToLocalStorage()
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMaker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    }
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMaker[] = JSON.parse(plainMarkersString)

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat)

      this.addMarker(coords, color)
    })

  }
}
