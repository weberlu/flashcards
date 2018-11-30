import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map'
})
export class Mapping implements PipeTransform {
  /*
  this will be a universal pipe for array mappings. You may add more
  type checkings and runtime checkings to make sure it works correctly everywhere
  */
  transform(value, mappingFunction: Function){
    return mappingFunction(value);
  }
}


@Component({
  selector: 'some-component',
  template: `
    <div>
      <dropdown-component [options]="weightUnits"></dropdown-component>
      <input type="text" placeholder="Price">
      <dropdown-component [options]="(weightUnits | map : slashed)"></dropdown-component>
    </div>`
})
export class SomeComponent {
  public weightUnits = [{value: 1, label: 'kg'}, {value: 2, label: 'oz'}];

  public slashed(units) {
    return units.map(unit => {
      return {
        label: '/' + unit.label,
        value: unit.value
      };
    });
  }
}
