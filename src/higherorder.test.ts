import {anonymizeClass, decorateClass} from './higherorder';
import {expect} from 'chai';

describe('anonymizeClass', () => {
    it('Case 1', () => {
        class Test {
            readonly x: number;

            constructor(x: number) {
                this.x = x;
            }
        }

        const AnonymousClass = anonymizeClass(Test);

        expect(Test.name).to.equal('Test');
        expect(AnonymousClass.name).not.to.equal('Test');

        const t = new AnonymousClass(1);

        expect(t.x).to.equal(1);
        expect(t).to.be.instanceOf(Test);
        expect(t).to.be.instanceOf(AnonymousClass);
    });
});

// TODO: add tests for decorateClass
describe('decorateClass', () => {
});
