const LS = {

    age: 1 * 30 * 24 * 60 * 60 * 1000,

    /**
     * @param age
     * @returns { exports }
     */
    setAge(age) {
        this.age = age;

        if (this.key) {
            this.set(this.key, this.value);
        }

        return this;
    },

    /**
     * @param key
     * @param value
     */
    set(key, value) {
        const isObject = value instanceof Object;
        const time = new Date().getTime();
        const age = time + this.age;
        const storage = {
            time,
            age,
            isObject
        };

        this.key = key;
        this.value = value;

        localStorage.removeItem(key);

        storage.value = value;

        localStorage.setItem(key, JSON.stringify(storage));

        return this;
    },

    /**
     * 判断一个 localStorage 是否过期
     * @param key
     * @returns {boolean}
     */
    isExpire(key) {
        let isExpire = true;
        const value = localStorage.getItem(key);
        const now = new Date().getTime();

        if (value) {
            const storage = JSON.parse(value);

            // 当前时间是否大于过期时间
            isExpire = now > storage.age;
        }

        return isExpire;
    },

    /**
     * 获取某个 localStorage 值
     * @param key
     * @returns {*}
     */
    get(key) {
        const isExpire = this.isExpire(key);

        // 如果已经过期，则删除
        if (isExpire) {
            localStorage.removeItem(key);

            return null;
        }

        const value = localStorage.getItem(key);
        const storage = JSON.parse(value);

        return storage.value;
    }
};

export default LS;
