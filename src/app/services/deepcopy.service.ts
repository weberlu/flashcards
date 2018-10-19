import { Injectable } from '@angular/core';


/**
 * This Service provides functionality to deep-copy arrays of Objects.
 */
@Injectable()
export class DeepCopyService {

  public static clone(objects: Array<any>): Array<any> {
    const clonedObjects: Array<any> = [];
    objects.forEach(obj => clonedObjects.push(Object.assign({}, obj)));
    return clonedObjects;
  }

  public static cloneAndAdd(objects: Array<any>, additionalObject: Object): Array<any> {
    const clonedObjects: Array<any> = this.clone(objects);
    clonedObjects.push(Object.assign({}, additionalObject));
    return clonedObjects;
  }

  public static cloneAndRemove(objects: Array<any>, subtractionObject: any = []): Array<any> {
    const clonedObjects: Array<any> = [];
    const subtractionObjects = subtractionObject instanceof Array ? subtractionObject : new Array(subtractionObject);

    objects.forEach(object => {
      if (!subtractionObjects.includes(object)) {
        clonedObjects.push(Object.assign({}, object));
      }
    });
    return clonedObjects;
  }
}
