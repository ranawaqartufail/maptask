import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileWMS from 'ol/source/TileWMS';
import XYZ from 'ol/source/XYZ';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import { GeneralService } from './services/general.service';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';
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

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
          url: 'https://ahocevar.com/geoserver/wms',
          params: {'LAYERS': 'topp:states', 'TILED': true},
          serverType: 'geoserver',
          transition: 0,
        }),
      }),
    ];
    this.map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: [-10997148, 4569099],
        zoom: 4,
      }),
    });
  }

  //  const layers = [
  //     new TileLayer({
  //       source: new OSM(),
  //     }),
  //     new TileLayer({
  //       source: new TileJSON({
  //         url: 'https://wipperfuerth.pgconnect.de/api/v1/webgis/friedhof',
  //         crossOrigin: 'anonymous',
  //       }),
  //     })
  //   ];
    
  //   console.log(layers)
 
  //   this.map = new Map({
  //     layers: layers,
  //     target: 'map',
  //     view: new View({
  //       center: [0, 0],
  //       zoom: 6,
  //     })
  //   });

    // const layers = [
    //   new TileLayer({
    //     source: new OSM(),
    //   }),
    //   new TileLayer({
    //   //  extent: [-13884991, 2870341, -7455066, 6338219],
    //     source:  new XYZ({
    //       url: 'https://wipperfuerth.pgconnect.de/api/v1/webgis/friedhof'
    //     })
    //   }),
    // ];

    // this.map = new Map({
    //   layers: layers,
    //   target: 'map',
    //   view: new View({
    //     center: [-10997148, 4569099],
    //     zoom: 4,
    //   }),
    // });
 }
