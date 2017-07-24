import { injectable } from 'inversify';

@injectable()
export class aaa {
    add10(n: number) {
        return n += 12;
    }
}