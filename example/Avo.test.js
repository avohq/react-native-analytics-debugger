test('appOpened() works', () => {
    const Avo = require('./Avo');

    Avo.initAvo({env: 'dev', noop: true}, {}, {}, {
        make: function(env) {
        },
        logEvent: function(eventName, eventProperties) {
        },
        setUserProperties: function(userId, userProperties) {
        },
        identify: function(userId) {
        },
        unidentify: function() {
        }
      });
    Avo.appOpened();
});