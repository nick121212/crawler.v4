# 爬虫common

封装了seneca的一些decorator

1. add

自动调用seneca的add方法

2. init

自动调用seneca的init:plugin方法

3. plugin

定义一个插件


**demo**

```

@Plugin("math-plugin", {})
@injectable()
export class MathPlugin {
    constructor( @inject(aaa) private aa: aaa) {
        // aa.aaaa.push("234234");
    }

    @Init()
    init(a: any, b: any, c: any): Promise<any> {
        return new Promise(async (resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => {
            await bluebird.delay(2000);

            resolve();
        });
    }

    @Wrap("role:math")
    wrap(msg: any) {
        if (!msg.ddd) {
            msg.ddd = 10;
        }

        console.log(this.aa.aaaa.length);
    }

    @Add("role:math,cmd:add")
    add(msg: any): { data: number } {
        this.aa.aaaa.push("234234");
        return { data: msg.left + msg.right };
    }

    @Add("role:math,cmd:remove")
    async remove(msg: any): Promise<{ data: number }> {
        this.aa.aaaa.push("234234");
        console.log(this.aa.aaaa.length);

        if (!msg.ddd) {
            throw new Error("缺少参数！");
        }

        return { data: msg.left - msg.right + msg.ddd };
    }
}

```

@log 打印参数类型，返回值类型，参数，返回值  `${方法名}被调用了！参数是什么，入参是什么，返回值是什么，返回值类型是什么！`
@loading
@proxy
@route
@reducer
@action(async)
@store

redux