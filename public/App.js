"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Chat = /*#__PURE__*/function (_React$Component) {
  _inherits(Chat, _React$Component);

  var _super = _createSuper(Chat);

  function Chat() {
    var _this;

    _classCallCheck(this, Chat);

    _this = _super.call(this);
    _this.sendMessage = _this.sendMessage.bind(_assertThisInitialized(_this));
    _this.loadMessages = _this.loadMessages.bind(_assertThisInitialized(_this));
    _this.writeMessage = _this.writeMessage.bind(_assertThisInitialized(_this));

    window.onkeyup = function (e) {
      var input = document.getElementById('send-message');

      if (e.keyCode == 13) {
        input.focus();
      } else if (e.keyCode == 27) {
        input.blur();
      }
    };

    _this.state = {
      chatMessages: []
    };
    return _this;
  }

  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadMessages();
    }
  }, {
    key: "loadMessages",
    value: function () {
      var _loadMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, res, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            query {\n                messages {\n                    text\n                    myMessage\n                }\n            }\n        ";
                _context.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                res = _context.sent;
                _context.next = 6;
                return res.json();

              case 6:
                result = _context.sent;
                this.setState({
                  chatMessages: result.data.messages
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadMessages() {
        return _loadMessages.apply(this, arguments);
      }

      return loadMessages;
    }()
  }, {
    key: "writeMessage",
    value: function () {
      var _writeMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(messageText) {
        var mutation, sendMessage;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mutation = "\n            mutation {\n                addMessage(message: {\n                    text: \"".concat(messageText, "\"\n                    myMessage: ", true, "\n                }) {\n                    text\n                    myMessage\n                }\n            }\n        ");
                _context2.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: mutation
                  })
                });

              case 3:
                sendMessage = _context2.sent;
                this.loadMessages();

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function writeMessage(_x) {
        return _writeMessage.apply(this, arguments);
      }

      return writeMessage;
    }()
  }, {
    key: "sendMessage",
    value: function sendMessage(e) {
      if (e.charCode == 13) {
        console.log(e.target.value);

        if (e.target.value.length > 0) {
          this.writeMessage(e.target.value);
          e.target.value = '';
        } else if (e.target.value.length <= 0) {
          return;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var messages = this.state.chatMessages.map(function (message) {
        if (message.myMessage) {
          return /*#__PURE__*/React.createElement("div", {
            className: "my-msg msg"
          }, /*#__PURE__*/React.createElement("span", {
            className: "wrap"
          }, message.text));
        } else if (message.myMessage == false) {
          return /*#__PURE__*/React.createElement("div", {
            className: "someone-elses-msg msg"
          }, /*#__PURE__*/React.createElement("span", {
            className: "wrap"
          }, message.text));
        }

        return /*#__PURE__*/React.createElement("div", null, "There was an error");
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "chat"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-field col s6 chatting"
      }, /*#__PURE__*/React.createElement("input", {
        name: "send-message",
        onKeyPress: this.sendMessage,
        id: "send-message",
        type: "text",
        className: "send-message"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "send-message"
      }, "Send message")), /*#__PURE__*/React.createElement("div", {
        className: "chatBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, messages)));
    }
  }]);

  return Chat;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Chat, null), document.getElementById('content'));