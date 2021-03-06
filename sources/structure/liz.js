// JavaScript source code
window.liz = null;
window.liz = new Object;
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//Õâ¸öÔÚË÷Òý´óÓÚ9Ê±»áÓÐÎÊÌâ£¬Ð»Ð»ºÎÒÔóÏóïµÄÖ¸³ö
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
    //Á½ÖÖµ÷ÓÃ·½Ê½
    //var template1 = "ÎÒÊÇ{0}£¬½ñÄê{1}ÁË";
    //var template2 = "ÎÒÊÇ{name}£¬½ñÄê{age}ÁË";
    //var result1 = template1.format("loogn", 22);
    //var result2 = template2.format({ name: "loogn", age: 22 });

};
// type ,print ,decomplie
(function (liz) {

    liz.type = function is(obj, type) {
        if (type) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas.toLowerCase() === type.toLowerCase();
        }
        else {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return clas.toLocaleLowerCase();
        }
    }

    liz.print = function (arg) {

        document.writeln(arg + '<br/>');
    }

    liz.decompile = function (str) {
        var functionStr = "return" + " " + str;
        var tmpFunction = Function(functionStr);
        return tmpFunction();
    }

})(window.liz);

+function (liz) {

    liz.interface = function interface(name, methods) {
        if (!interface.interfaces) {
            interface.interfaces = [];
        }
        else if (interface.interfaces[name]) {
            return interface.interfaces[name]
        }


        if (!methods) {
            throw new Error("methods does not define");
        }
        function instance() {

        }

        for (var i = 0, max = methods.length; i < max; i++) {
            var consturctStr, funName = methods[i];
            if (typeof (funName) == "string") {
                consturctStr = "throw new Error('" + methods[i] + "must override')";
                instance.prototype[funName] = decompile(consturctStr);
            }
        }
        var result = new instance();

        interface.interfaces.push(result);
        return result;


    }
}(window.liz);

//List
(function (liz) {


    liz.List = function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
        this.clear = clear;
        this.find = find;
        this.toString = toString;
        this.insert = insert;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.currPos = currPos;
        this.moveTo = moveTo;
        this.getElement = getElement;
        this.length = length;
    }

    function append(element) {
        this.dataStore[this.listSize++] = element;
    }

    function find(element) {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] == element) {
                return i;
            }
        }
        return -1;
    }

    function remove(element) {
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false;
    }

    function toString() {
        return this.dataStore;
    }

    //no

    function clear() {
        delete this.dataStore;
        this.dataStore.length = 0;
        this.listSize = this.pos = 0;
    }

    function insert(element, after) {
        var insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    };
    function front() { }
    function end() { };
    function prev() { };
    function next() { };
    function length() {
        return this.listSize;
    };
    function currPos() { };
    function monveTo() { };
    function getElement() { };
})(window.liz);
//
//stack
(function (liz) {
    liz.Stack = Stack;
    function Stack() {
        this.dataStore = [];
        this.top = 0;
        this.push = push;
        this.pop = pop;
        this.peek = peek;
        this.length = length;
        this.clear = clear;
    }

    function push(ele) {
        this.dataStore[this.top++] = ele;
    }
    function pop() {
        return this.dataStore[--this.top];
    }
    function peek() {
        return this.dataStore[this.top - 1];
    }
    function length() {
        return this.top;
    }
    function clear() {
        this.top = 0;
    }
})(window.liz);
+function (liz) {
    var decompile = function (str) {
        var functionStr = str;
        var tmpFunction = Function(functionStr);
        return tmpFunction;
    }

    liz.interface = function interface(name, methods) {
        if (!interface.interfaces) {//缓存interface 定义
            interface.interfaces = [];
        }
        else if (interface.interfaces[name]) {//如果已经定义过直接返回
            return interface.interfaces[name]
        }


        if (!methods) {
            throw new Error("methods does not define");
        }
        function instance() {

        }

        for (var i = 0, max = methods.length; i < max; i++) {//在要返回的inastce 中添加interface 中定义的method
            var consturctStr, funName = methods[i];
            if (typeof (funName) == "string") {
                consturctStr = "throw new Error('" + methods[i] + "must override')";
                instance.prototype[funName] = decompile(consturctStr);
            }
        }
        var result = new instance();

        interface.interfaces.push(result);
        return result;


    }
}(window.liz);
//child inherit  interface person
liz.interface('person', ['say', 'run']);
function Child() {
    this.say = function () { };
    this.run = function () { };
}
child.prototype = liz.interface['person'];
var child = new Child;


// with (window.liz) {
//     var names = new List();
//     names.append("Cynthia");
//     names.append("Raymond");
//     names.append("Barbara");
//     print(names.toString());
//     names.remove("Raymond");
//     print(names.toString());

// }


function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;

    this.toString = toString;
    this.empty = empty;
}
function enqueue(element) {
    this.dataStore.push(element);
}

function dequeue() {
    return this.dataStore.shift();
}

function front() {
    return this.dataStore[0];
}

function back() {
    return this.dataStore[this.dataStore.length - 1];
}

function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i] + "\n";
    } return retStr;
} function empty() {
    if (this.dataStore.length == 0) {
        return true;
    } else {
        return false;
    }
}
var print = function (arg) {
    
            document.writeln(arg + '<br/>');
        }
    
var q = new Queue();
q.enqueue("Meredith");
q.enqueue("Cynthia");
q.enqueue("Jennifer");
print(q.toString());
q.dequeue();
print(q.toString());
print("Front of queue: " + q.front());
print("Back of queue: " + q.back());