const testEventItem = {
    key: "0.5",
    id: "",
    timestamp: +new Date(2020, 9, 15),
    name: "test-name",
    messages: [{ propertyId: "id0", message: "error in prop 0 with id0" }],
    eventProps: [
        { id: "id0", name: "prop 0 name", value: "val 0" },
        { id: "id1", name: "prop 1 name", value: "val 1" }
    ],
    userProps: []
};

const debuggerMode = {
    BAR: "bar",
    BUBBLE: "bubble"
};

const avoAPI = {
    TRACK: "https://api.avo.app/c/v1/track/"
};

export { avoAPI, debuggerMode, testEventItem };
