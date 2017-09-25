

export const SenecaConfig = {
    _plugin: "seneca-plugin",
    _add: "seneca-add",
    _wrap: "seneca-wrap",
    _init: "seneca-init",
    _validate: "seneca-validate"
};

export const Types = {
    _plugin: Symbol(SenecaConfig._plugin),
    _add: Symbol(SenecaConfig._add),
    _wrap: Symbol(SenecaConfig._wrap),
    _init: Symbol(SenecaConfig._init)
};
