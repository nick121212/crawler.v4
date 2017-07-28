import { injectable } from 'inversify';

@injectable()
export class aaa {
    public aaaa: Array<string> = [];

    add10(n: number) {
        return n += 12;
    }
}