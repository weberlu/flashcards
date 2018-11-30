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

  public static cloneAndRemove(objects: Array<any> = [], subtractionObject: any = []): Array<any> {
    const clonedObjects: Array<any> = [];
    const subtractionObjects = subtractionObject instanceof Array ? subtractionObject : new Array(subtractionObject);

    objects.forEach(objToCheck => {
      subtractionObjects.forEach(subtractionObj => {
        if (!this.objectsEquals(objToCheck, subtractionObj)) {
          clonedObjects.push(Object.assign({}, objToCheck));
        }
      });
    });

    return clonedObjects;
  }

  public static objectsEquals(objA, objB) {
    // Create arrays of property names
    const propsObjA = Object.getOwnPropertyNames(objA);
    const propsObjB = Object.getOwnPropertyNames(objB);

    // If number of properties is different, objects are not equivalent
    if (propsObjA.length !== propsObjB.length) {
      return false;
    }

    for (let propIndex = 0; propIndex < propsObjA.length; propIndex++) {
      const propName = propsObjA[propIndex];

      // If values of same property are not equal, objects are not equivalent
      if (objA[propName] !== objB[propName]) {
        return false;
      }
    }

    // objects are considered equivalent.
    return true;
  }
}
