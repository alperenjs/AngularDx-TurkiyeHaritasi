import { NgModule, Component, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { DxVectorMapModule } from "devextreme-angular";

import { FeatureCollection, Service } from "./app.service";

@Component({
  selector: "demo-app",
  providers: [Service],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  pangaeaBorders: FeatureCollection;

  pangaeaContinents: FeatureCollection;

  projection: any;

  constructor(service: Service) {
    this.pangaeaBorders = service.getPangaeaBorders();
    this.pangaeaContinents = service.getPangaeaContinents();
    this.projection = {
      to(coordinates) {
        return [coordinates[0] / 100, coordinates[1] / 100];
      },
      from(coordinates) {
        return [coordinates[0] * 100, coordinates[1] * 100];
      }
    };
  }

  customizeLayer(elements) {
    elements.forEach((element) => {
      element.applySettings({
        color: element.attribute("color")
      });
    });
  }

  selectCity(e) {
    if (e.target) {
      let id = e.target.attribute().number;
      let cityName = e.target.attribute().name;
      console.log(id, cityName);
    }
  }
}

@NgModule({
  imports: [BrowserModule, DxVectorMapModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
