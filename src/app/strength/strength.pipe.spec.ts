import { StrengthPipe } from "./strength.pipe";

describe('strength pipe',()=>{
    it('should display weak if strength is 5',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(5)).toEqual('5 (weak)');
    })
    it('should display strong if strength is 12 ',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(12)).toEqual('12 (strong)');
    })
    it('should display unbelievable if strength is 25 ',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(25)).toEqual('25 (unbelievable)');
    })
})