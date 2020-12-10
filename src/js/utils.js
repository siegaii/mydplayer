const isMobile = /mobile/i.test(window.navigator.userAgent);

const utils = {
    /**
     * Parse second to time string
     *
     * @param {Number} second
     * @return {String} 00:00 or 00:00:00
     */
    secondToTime: (second) => {
        second = second || 0;
        if (second === 0 || second === Infinity || second.toString() === 'NaN') {
            return '00:00';
        }
        const add0 = (num) => (num < 10 ? '0' + num : '' + num);
        const hour = Math.floor(second / 3600);
        const min = Math.floor((second - hour * 3600) / 60);
        const sec = Math.floor(second - hour * 3600 - min * 60);
        return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
    },

    /**
     * control play progress
     */
    // get element's view position
    getElementViewLeft: (element) => {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent;
        const elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        } else {
            while (current !== null && current !== element) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        }
        return actualLeft - elementScrollLeft;
    },

    /**
    * optimize control play progress

    * optimize get element's view position,for float dialog video player
    * getBoundingClientRect 在 IE8 及以下返回的值缺失 width、height 值
    * getBoundingClientRect 在 Firefox 11 及以下返回的值会把 transform 的值也包含进去
    * getBoundingClientRect 在 Opera 10.5 及以下返回的值缺失 width、height 值
    */
    getBoundingClientRectViewLeft(element) {
        const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);

        if (element.getBoundingClientRect) {
            if (typeof this.getBoundingClientRectViewLeft.offset !== 'number') {
                let temp = document.createElement('div');
                temp.style.cssText = 'position:absolute;top:0;left:0;';
                document.body.appendChild(temp);
                this.getBoundingClientRectViewLeft.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }
            const rect = element.getBoundingClientRect();
            const offset = this.getBoundingClientRectViewLeft.offset;

            return rect.left + offset;
        } else {
            // not support getBoundingClientRect
            return this.getElementViewLeft(element);
        }
    },

    getScrollPosition() {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        };
    },

    setScrollPosition({ left = 0, top = 0 }) {
        if (this.isFirefox) {
            document.documentElement.scrollLeft = left;
            document.documentElement.scrollTop = top;
        } else {
            window.scrollTo(left, top);
        }
    },

    isMobile: isMobile,

    isFirefox: /firefox/i.test(window.navigator.userAgent),

    isChrome: /chrome/i.test(window.navigator.userAgent),

    storage: {
        set: (key, value) => {
            localStorage.setItem(key, value);
        },

        get: (key) => localStorage.getItem(key),
    },

    nameMap: {
        dragStart: isMobile ? 'touchstart' : 'mousedown',
        dragMove: isMobile ? 'touchmove' : 'mousemove',
        dragEnd: isMobile ? 'touchend' : 'mouseup',
    },

    color2Number: (color) => {
        if (color[0] === '#') {
            color = color.substr(1);
        }
        if (color.length === 3) {
            color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
        }
        return (parseInt(color, 16) + 0x000000) & 0xffffff;
    },

    number2Color: (number) => '#' + ('00000' + number.toString(16)).slice(-6),

    number2Type: (number) => {
        switch (number) {
            case 0:
                return 'right';
            case 1:
                return 'top';
            case 2:
                return 'bottom';
            default:
                return 'right';
        }
    },
    emojiUrlMap: {
        '[可爱]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/1.png',
        '[开心]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/2.png',
        '[酷]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/3.png',
        '[调皮]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/4.png',
        '[吐舌]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/5.png',
        '[好吃]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/6.png',
        '[鬼脸]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/7.png',
        '[啵啵]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/8.png',
        '[亲亲]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/9.png',
        '[坏笑]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/10.png',
        '[庆祝]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/11.png',
        '[喜欢猫]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/12.png',
        '[惊恐猫]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/13.png',
        '[笑哭]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/14.png',
        '[汗]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/15.png',
        '[微笑]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/16.png',
        '[倒微笑]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/17.png',
        '[无语]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/18.png',
        '[白眼]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/19.png',
        '[闭嘴]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/20.png',
        '[噢]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/21.png',
        '[惊恐]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/22.png',
        '[尴尬]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/23.png',
        '[睡了]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/24.png',
        '[舒服]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/25.png',
        '[大哭]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/26.png',
        '[酸]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/27.png',
        '[干杯]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/28.png',
        '[火箭]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/29.png',
        '[蛋糕]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/30.png',
        '[可]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/31.png',
        '[爱心]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/32.png',
        '[加油]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/33.png',
        '[赞]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/34.png',
        '[鼓掌]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/35.png',
        '[满分]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/36.png',
        '[撒花]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/37.png',
        '[病毒]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/38.png',
        '[奖杯]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/39.png',
        '[奖牌]': 'http://sxsimg.xiaoyuanzhao.com/static_common/tv_frontent/emoji/40.png',
    },
};

export default utils;
