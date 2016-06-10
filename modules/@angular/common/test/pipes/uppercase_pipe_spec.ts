import {UpperCasePipe} from '@angular/common';
import {afterEach, beforeEach, ddescribe, describe, expect, iit, it, xit} from '@angular/core/testing/testing_internal';

export function main() {
  describe('UpperCasePipe', () => {
    var upper: any /** TODO #9100 */;
    var lower: any /** TODO #9100 */;
    var pipe: any /** TODO #9100 */;

    beforeEach(() => {
      lower = 'something';
      upper = 'SOMETHING';
      pipe = new UpperCasePipe();
    });

    describe('transform', () => {

      it('should return uppercase', () => {
        var val = pipe.transform(lower);
        expect(val).toEqual(upper);
      });

      it('should uppercase when there is a new value', () => {
        var val = pipe.transform(lower);
        expect(val).toEqual(upper);
        var val2 = pipe.transform('wat');
        expect(val2).toEqual('WAT');
      });

      it('should not support other objects',
         () => { expect(() => pipe.transform(new Object())).toThrowError(); });
    });

  });
}
