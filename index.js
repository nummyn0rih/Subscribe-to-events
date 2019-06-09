module.exports = {

    collectionOfEvents: [],

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (this.collectionOfEvents.some(elem => elem.event === event)) {
            this.collectionOfEvents.forEach(elem => {
                if (elem.event === event) {
                    elem.subscriber.push(subscriber);
                    elem.handler.push(handler);
                }
            });
            return this;
        }
    
        this.collectionOfEvents.push({
            event: event,
            subscriber: [subscriber],
            handler: [handler]
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        this.collectionOfEvents.forEach(elem => {
            if (elem.event === event) {
                const sub = elem.subscriber;
                const handl = elem.handler;
                while (sub.some(elem => elem === subscriber)) {
                    const index = sub.indexOf(subscriber);
                    sub.splice(index, 1);
                    handl.splice(index, 1);
                }
            }
        });
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        this.collectionOfEvents.forEach(elem => {
            if (elem.event === event) {
                const sub = elem.subscriber;
                const handl = elem.handler;
                for (let i = 0; i < handl.length; i += 1) {
                    handl[i].apply(sub[i]);
                }
            }
        });
        return this;
    }
};
