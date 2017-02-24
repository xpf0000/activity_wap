"use strict"

define (function() {

    var EventBus = {




    };

    return EventBus;
});




if(!Object.prototype.watch)
{
    Object.prototype.watch = function (prop, handler)
    {
        var oldval = this[prop], newval = oldval,
            getter = function ()
            {
                return newval;
            },
            setter = function (val)
            {
                oldval = newval;
                return newval = handler.call(this, prop, oldval, val);
            };
        if (delete this[prop])
        {
            if (Object.defineProperty) // ECMAScript 5
            {
                Object.defineProperty(this, prop, {get: getter,set: setter});
            }
            else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__)
            {
                Object.prototype.__defineGetter__.call(this, prop, getter);
                Object.prototype.__defineSetter__.call(this, prop, setter);
            }
        }
    };
}

if (!Object.prototype.unwatch)
{
    Object.prototype.unwatch = function (prop)
    {
        var val = this[prop];
        delete this[prop];
        this[prop] = val;
    };
}