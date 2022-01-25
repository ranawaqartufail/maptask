import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { GeneralService } from './services/general.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   map: Map;
   path = "friedhof"
   id="440d1500-d5d5-4bf9-bf06-7725cf17170f"

   constructor(public gs : GeneralService) { }

 async  ngOnInit(){
  this.loadMap()

  let res= await this.gs.getAll(this.path).toPromise()
    console.log(res)

  let param = {friedhofId : this.id}
  let resp= await this.gs.getWithParams("grab", param).toPromise()
   console.log(resp)

   let param1 = {friedhofId : this.id}
   let resp1= await this.gs.getWithParams("grabstelle", param1).toPromise()
   console.log(resp1)

   let resp2= await this.gs.getAll("grabstelle/unverknuepft").toPromise()
   console.log(resp2)
   

}



  loadMap(){
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }
}
