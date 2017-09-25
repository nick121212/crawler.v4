let data = { "hit": { "_index": "qa", "_type": "mamilove", "_id": "d458d9c534b0f67f06674ebed54e2a9c", "_score": 1, "_source": { "comments": [{ "content": "我沒買塑身衣耶!! 我是飲食的控制跟睡前使用2包的超燃素，瘦了12公斤呦~^^", "like": 0 }, { "content": "我兒子目前4M18D 我瘦了13公斤😅😅\n我都是正常吃多喝水 習慣每天排便 \n當然還是健康最重要～\n對於產後皮膚鬆弛我都是洗完澡後擦乳液按摩 提供給你參考😀", "like": 0 }, { "content": "媽咪想瘦下來嗎？\n我有一個方法很有效，我二個禮拜瘦三公斤唷", "like": 0 }, { "content": "我是買維娜斯推推指,印象中是4萬左右\n說真的我覺得不貴\n其實我以前亂買的又穿不住的塑身衣加起來根本可以量身訂做一套推推指了\n重點是推推指真的好穿多了\n材質非常透氣好穿、觸感也很輕柔\n我幾乎天天穿,穿一整天沒有問題\n另外我還會穿著推推指搭配一些小運動\n連穿著運動都沒有悶熱感真的很耐穿!!\n這樣維持穿了半年之後 我原本很凸的肚子和肥肥的腰都消腫很多\n身材曲線也更明顯了\n免費改小了很多次喔！", "like": 0 }, { "content": "一套一兩千\n但買了超多套買不到好穿的XD", "like": 1 }], "title": "\n                            請問大家都花多少錢在產後塑身衣上?\n                                                    ", "createAt": 6, "content": "\n                請問在生產完有買塑身衣來穿的媽咪<br>\n大概是花多少錢在這個部份?<br>\n<br>\n因為有朋友穿塑身衣真的瘦蠻多的<br>\n讓我很心動<br>\n不過發現價錢都不便宜<br>\n想問問各位有穿的媽咪們，大概都是穿了多久才不穿了?<br>\n覺得值得嗎?\n\n                            ", "age": "所有月齡", "category": "懷孕大小事" } } };

resouce = data.hit._source;

let comments = resouce.comments || [];

comments.length = 1;

let postData = {
    title: resouce.title,
    author: 5,
    comment_status: "open",
    // categories: [136],
    slug: "dwqa-question",
    content: resouce.content,
    status: "publish",
    date: Moment().add(comments.length * 3 - 30).format("YYYY-MM-DD hh:mm:ss"),
    ping_status: "open"
};

this.wpApi = await WpApi.discover("https://www.bebewiki.com").then((site: any) => {
    return site.auth({
        username: "crawler",
        password: "crawler-1314"
    });
});


// let post: any = await this.wpApi["dwqa-question"]().create(postData);

// console.log("postId:", post);

comments.forEach(async (comment, idx) => {
    let com = await this.wpApi["dwqa-answer"]().create({
        title: resouce.title,
        _question: 1580,
        post_meta: [{
            "key": "_question",
            "value": 1580
        }],
        post: 1508,
        test: 1,
        menu_order: 2,
        author: 4,
        slug: "dwqa-answer",
        status: "publish",
        comment_status: "open",
        content: comment.content,
        date: Moment().add(idx * 10).format("YYYY-MM-DD hh:mm:ss"),
        ping_status: "open"
    }).catch(console.log);

    // console.log()

    console.log(com);
});