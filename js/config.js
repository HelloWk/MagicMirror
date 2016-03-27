var config = {
    lang: 'zh_cn',
    time: {
        timeFormat: 24
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        interval: 120000,
        fadeInterval: 10000,
        params: {
            q: 'dalian',
            //units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'zh_cn',
            APPID: ''
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Hi, sexy!'
        ]
    },
    complimentscn: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            '早上好！',
            '享受美好一天！',
            '昨晚睡得如何？'
        ],
        afternoon: [
            '你好!',
            '嗯，你看起来很不错!',
            '你今天看起来很好!'
        ],
        evening: [
            '喔, 不错嘛!',
            '今天过得怎么样？',
            '嗨!'
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: ""
    },
    news: {
        feed: 'http://feeds2.feedburner.com/cnbeta_full'
    }
}
