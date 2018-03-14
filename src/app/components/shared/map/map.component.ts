
import {
  Component, ElementRef,
  NgZone, OnInit,
  Input, ViewContainerRef,
  Output, EventEmitter
} from '@angular/core';
import { } from 'googlemaps';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import { setInterval } from 'timers';


@Component({
  selector: 'app-google-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css'],
})

export class MapComponent implements OnInit {
  latitude: number = 0;
  longitude: number = 0;
  public zoom: number;
  @Input() locationCss: string = '';
  @Output() getCordinatesEvent = new EventEmitter();

  @Input()
  set mapSearch(search: any) {
    if (search) {
      setTimeout(() => {
        this.searchMap(search);
      }, 300);
    }
  }

  constructor(
    private ngZone: NgZone,
    public http: Http,
    public toastr: ToastsManager, vcr: ViewContainerRef,
  ) {
    let test = this.getIpCliente();
    console.log(test);
  }

  ngOnInit() {
    this.zoom = 12;
    this.latitude = 28.89813800000001;
    this.longitude = 76.56141400000001;
  }


  getIpCliente(): Observable<string> {
    return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK') // ...using post request '
      .map((res: Response) => {
        console.log('res ', res);
        console.log('res.json() ', res.text());
        //console.log('parseado ', JSON.parse(res.text()));
        console.log('parseado  stringify ', JSON.stringify(res.text()));
        let ipVar = res.text();
        let num = ipVar.indexOf(":");
        let num2 = ipVar.indexOf("\"});");
        ipVar = ipVar.slice(num + 2, num2);
        console.log('ipVar -- ', ipVar);
        return ipVar
      }); // ...and calling .json() on the response to return data
    //.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  searchMap(searchObj) {
    const geocoder = new google.maps.Geocoder();
    const address = searchObj; // india,delhi
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const location: any = results[0].geometry.location;
        this.latitude = location.lat();
        this.longitude = location.lng();
        this.zoom = 12;
        let obj = {
          latitude: this.latitude,
          longitude: this.longitude
        }
        this.getCordinatesEvent.emit(obj);
      }
    });
  }

  location() {
    switch (this.locationCss) {
      case 'locationMap':
        return { 'locationMap': true };
      case 'uniqueHomeMap':
        return { 'uniqueHomeMap': true };
      case 'locationMapBooking':
        return { 'locationMapBooking': true };
      case 'hostExperinceMap':
        return { 'hostExperinceMap': true };
    }
  }

  markerDragEnd($event: any) {
    // let errorCount = 0;
    // console.log($event);

    // if (this.latitude < $event.coords.lat && $event.coords.lat < this.longitude) {
    //   this.obj.isWarning = true;
    //   this.obj.warningMessage = 'Please drag marker inside the selected city only';
    //   // this.getCordinatesEvent.emit(this.obj);
    //   errorCount++;
    // }
    // if (this.longitude > $event.coords.lng) {
    //   this.obj.isWarning = true;
    //   this.obj.warningMessage = 'Please drag marker inside the selected city only';
    //   // this.getCordinatesEvent.emit(this.obj);
    // }

    // if (errorCount === 0) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    let obj = {
      latitude: this.latitude,
      longitude: this.longitude
    }
    this.getCordinatesEvent.emit(obj);
    // }


  }


  centerChangeEvent() {
    const geoCoder = new google.maps.Geocoder();
    geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude } }, (results, status: any) => {
      console.log(results);
      console.log(status);
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let placeName = results[0].formatted_address;
          this.searchMap(placeName);
        } else {
          window.alert('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
        // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
