"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require("express");
var path = require("path");
var cors = require("cors");
var JSZip = require("jszip");
var multer = require("multer");
var _require = require("./database.js"),
  initDatabase = _require.initDatabase,
  UserService = _require.UserService,
  ProjectService = _require.ProjectService,
  FriendService = _require.FriendService,
  ActivityService = _require.ActivityService,
  FileService = _require.FileService;
var app = express();
app.use(cors());
app.use(express.json());
app.use(express["static"]("./frontend/public"));
app.use(function (req, res, next) {
  console.log("".concat(new Date().toISOString(), " - ").concat(req.method, " ").concat(req.path, " - Headers:"), req.headers.authorization ? "Auth Present" : "No Auth");
  next();
});

// Configure multer for file uploads (in-memory storage)
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: function fileFilter(req, file, cb) {
    // Allow all file types but enforce size limit
    cb(null, true);
  }
});

// Initialize database
initDatabase()["catch"](function (err) {
  console.error("Database initialization failed:", err);
});
var sessions = new Map();
function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
function requireAuth(req, res, next) {
  var _req$headers$authoriz;
  console.log("Auth middleware - Headers:", req.headers.authorization);
  var sessionId = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.replace("Bearer ", "");
  var userId = sessions.get(sessionId);
  console.log("Auth middleware - Session ID:", sessionId, "User ID:", userId);
  if (!userId) {
    console.log("Auth failed - returning 401");
    return res.status(401).json({
      error: "Authentication required"
    });
  }
  req.userId = userId;
  next();
}

// Authentication Routes
app.post("/api/auth/signup", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, username, email, password, bio, existingUser, user, sessionId, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, bio = _req$body.bio; // Check if user already exists
          _context.n = 1;
          return UserService.findByEmail(email);
        case 1:
          existingUser = _context.v;
          if (!existingUser) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: "User already exists with this email"
          }));
        case 2:
          _context.n = 3;
          return UserService.create({
            username: username,
            email: email,
            password: password,
            bio: bio
          });
        case 3:
          user = _context.v;
          sessionId = generateSessionId();
          sessions.set(sessionId, user._id.toString());
          res.json({
            success: true,
            user: user,
            sessionId: sessionId
          });
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error("Signup error:", _t);
          res.status(500).json({
            error: "Internal server error"
          });
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/api/auth/signin", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, email, password, user, sessionId, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          console.log("Signin endpoint hit with:", req.body);
          _context2.p = 1;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "Email and password are required"
          }));
        case 2:
          _context2.n = 3;
          return UserService.validatePassword(email, password);
        case 3:
          user = _context2.v;
          if (user) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(401).json({
            error: "Invalid credentials"
          }));
        case 4:
          sessionId = generateSessionId();
          sessions.set(sessionId, user._id.toString());
          console.log("Signin successful for user:", user.email);
          res.json({
            success: true,
            user: user,
            sessionId: sessionId
          });
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t2 = _context2.v;
          console.error("Signin error:", _t2);
          res.status(500).json({
            error: "Internal server error"
          });
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 5]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.post("/api/auth/logout", requireAuth, function (req, res) {
  var _req$headers$authoriz2;
  var sessionId = (_req$headers$authoriz2 = req.headers.authorization) === null || _req$headers$authoriz2 === void 0 ? void 0 : _req$headers$authoriz2.replace("Bearer ", "");
  sessions["delete"](sessionId);
  res.json({
    success: true
  });
});

// User Routes
app.get("/api/users/me", requireAuth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var user, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return UserService.findById(req.userId);
        case 1:
          user = _context3.v;
          res.json(user);
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/api/users/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var user, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return UserService.findById(req.params.id);
        case 1:
          user = _context4.v;
          if (user) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, res.status(404).json({
            error: "User not found"
          }));
        case 2:
          res.json(user);
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.put("/api/users/me", requireAuth, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var user, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return UserService.update(req.userId, req.body);
        case 1:
          user = _context5.v;
          res.json(user);
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t5 = _context5.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
app.get("/api/users/search/:query", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var users, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return UserService.search(req.params.query);
        case 1:
          users = _context6.v;
          res.json(users);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t6 = _context6.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());

// Project Routes
app.get("/api/projects", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var userId, projects, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          userId = req.query.user ? req.query.user : null;
          _context7.n = 1;
          return ProjectService.findAll(userId);
        case 1:
          projects = _context7.v;
          res.json(projects);
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t7 = _context7.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
app.get("/api/test/checkins", function (req, res) {
  console.log("TEST: Checkins test route hit!");
  res.json({
    message: "Test route working",
    timestamp: new Date()
  });
});
app.get("/api/projects/:id/checkins", requireAuth, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var checkins, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          console.log("REAL: Checkins route hit - Project ID:", req.params.id, "User ID:", req.userId);
          _context8.p = 1;
          _context8.n = 2;
          return ProjectService.getCheckinHistory(req.params.id);
        case 2:
          checkins = _context8.v;
          console.log("Checkins found:", checkins.length);
          res.json(checkins);
          _context8.n = 4;
          break;
        case 3:
          _context8.p = 3;
          _t8 = _context8.v;
          console.error("Checkins error:", _t8);
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context8.a(2);
      }
    }, _callee8, null, [[1, 3]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
app.get("/api/projects/:id", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var project, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return ProjectService.findById(req.params.id);
        case 1:
          project = _context9.v;
          if (project) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, res.status(404).json({
            error: "Project not found"
          }));
        case 2:
          res.json(project);
          _context9.n = 4;
          break;
        case 3:
          _context9.p = 3;
          _t9 = _context9.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 3]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());
app.post("/api/projects", requireAuth, /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var projectData, project, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          projectData = _objectSpread(_objectSpread({}, req.body), {}, {
            created_by: req.userId
          });
          _context0.n = 1;
          return ProjectService.create(projectData);
        case 1:
          project = _context0.v;
          res.json(project);
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t0 = _context0.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());
app.post("/api/projects/:id/checkout", requireAuth, /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          console.log("Checkout request - Project ID:", req.params.id, "User ID:", req.userId);
          _context1.n = 1;
          return ProjectService.checkOut(req.params.id, req.userId);
        case 1:
          res.json({
            success: true
          });
          _context1.n = 3;
          break;
        case 2:
          _context1.p = 2;
          _t1 = _context1.v;
          console.error("Checkout error:", _t1);
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 2]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());
app.post("/api/projects/:id/checkin", requireAuth, /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var _req$body3, message, version, fileUpdates, checkin, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _req$body3 = req.body, message = _req$body3.message, version = _req$body3.version, fileUpdates = _req$body3.fileUpdates;
          _context10.n = 1;
          return ProjectService.checkIn(req.params.id, req.userId, message, fileUpdates, version);
        case 1:
          checkin = _context10.v;
          res.json(checkin);
          _context10.n = 3;
          break;
        case 2:
          _context10.p = 2;
          _t10 = _context10.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 2]]);
  }));
  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}());

// Update project
app.put("/api/projects/:id", requireAuth, /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var project, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return ProjectService.update(req.params.id, req.userId, req.body);
        case 1:
          project = _context11.v;
          res.json(project);
          _context11.n = 4;
          break;
        case 2:
          _context11.p = 2;
          _t11 = _context11.v;
          if (!(_t11.message.includes("Only project owner") || _t11.message.includes("collaborators can edit"))) {
            _context11.n = 3;
            break;
          }
          return _context11.a(2, res.status(403).json({
            error: _t11.message
          }));
        case 3:
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());

// Delete project
app["delete"]("/api/projects/:id", requireAuth, /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var result, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _context12.n = 1;
          return ProjectService["delete"](req.params.id, req.userId);
        case 1:
          result = _context12.v;
          res.json(result);
          _context12.n = 4;
          break;
        case 2:
          _context12.p = 2;
          _t12 = _context12.v;
          if (!_t12.message.includes("Only project owner")) {
            _context12.n = 3;
            break;
          }
          return _context12.a(2, res.status(403).json({
            error: _t12.message
          }));
        case 3:
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return function (_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}());

// Add collaborator
app.post("/api/projects/:id/collaborators", requireAuth, /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var _req$body4, email, role, collaborator, _t13;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _req$body4 = req.body, email = _req$body4.email, role = _req$body4.role;
          _context13.n = 1;
          return ProjectService.addCollaborator(req.params.id, req.userId, email, role);
        case 1:
          collaborator = _context13.v;
          res.json(collaborator);
          _context13.n = 4;
          break;
        case 2:
          _context13.p = 2;
          _t13 = _context13.v;
          if (!(_t13.message.includes("Only project owner") || _t13.message.includes("User not found") || _t13.message.includes("already a collaborator"))) {
            _context13.n = 3;
            break;
          }
          return _context13.a(2, res.status(400).json({
            error: _t13.message
          }));
        case 3:
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 2]]);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}());

// Remove collaborator
app["delete"]("/api/projects/:id/collaborators/:collaboratorId", requireAuth, /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var _t14;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          _context14.n = 1;
          return ProjectService.removeCollaborator(req.params.id, req.userId, req.params.collaboratorId);
        case 1:
          res.json({
            success: true
          });
          _context14.n = 4;
          break;
        case 2:
          _context14.p = 2;
          _t14 = _context14.v;
          if (!(_t14.message.includes("Only project owner") || _t14.message.includes("Cannot remove"))) {
            _context14.n = 3;
            break;
          }
          return _context14.a(2, res.status(403).json({
            error: _t14.message
          }));
        case 3:
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 2]]);
  }));
  return function (_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}());

// Update collaborator role
app.put("/api/projects/:id/collaborators/:collaboratorId", requireAuth, /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var role, _t15;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          role = req.body.role;
          _context15.n = 1;
          return ProjectService.updateCollaboratorRole(req.params.id, req.userId, req.params.collaboratorId, role);
        case 1:
          res.json({
            success: true
          });
          _context15.n = 4;
          break;
        case 2:
          _context15.p = 2;
          _t15 = _context15.v;
          if (!(_t15.message.includes("Only project owner") || _t15.message.includes("Cannot change"))) {
            _context15.n = 3;
            break;
          }
          return _context15.a(2, res.status(403).json({
            error: _t15.message
          }));
        case 3:
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 2]]);
  }));
  return function (_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}());
app["delete"]("/api/projects/:id", requireAuth, /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var _t16;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          _context16.n = 1;
          return ProjectService["delete"](req.params.id, req.userId);
        case 1:
          res.json({
            success: true
          });
          _context16.n = 4;
          break;
        case 2:
          _context16.p = 2;
          _t16 = _context16.v;
          if (!(_t16.message === "Only project owner can delete project")) {
            _context16.n = 3;
            break;
          }
          return _context16.a(2, res.status(403).json({
            error: _t16.message
          }));
        case 3:
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context16.a(2);
      }
    }, _callee16, null, [[0, 2]]);
  }));
  return function (_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}());
app.get("/api/projects/search/:query", /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
    var projects, _t17;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          _context17.p = 0;
          _context17.n = 1;
          return ProjectService.search(req.params.query);
        case 1:
          projects = _context17.v;
          res.json(projects);
          _context17.n = 3;
          break;
        case 2:
          _context17.p = 2;
          _t17 = _context17.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context17.a(2);
      }
    }, _callee17, null, [[0, 2]]);
  }));
  return function (_x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}());

// Friend Routes
app.post("/api/friends/request", requireAuth, /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
    var friendId, _t18;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          friendId = req.body.friendId;
          _context18.n = 1;
          return FriendService.sendRequest(req.userId, friendId);
        case 1:
          res.json({
            success: true
          });
          _context18.n = 3;
          break;
        case 2:
          _context18.p = 2;
          _t18 = _context18.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context18.a(2);
      }
    }, _callee18, null, [[0, 2]]);
  }));
  return function (_x37, _x38) {
    return _ref18.apply(this, arguments);
  };
}());
app.post("/api/friends/accept", requireAuth, /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
    var friendId, _t19;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.p = 0;
          friendId = req.body.friendId;
          _context19.n = 1;
          return FriendService.acceptRequest(req.userId, friendId);
        case 1:
          res.json({
            success: true
          });
          _context19.n = 3;
          break;
        case 2:
          _context19.p = 2;
          _t19 = _context19.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context19.a(2);
      }
    }, _callee19, null, [[0, 2]]);
  }));
  return function (_x39, _x40) {
    return _ref19.apply(this, arguments);
  };
}());
app.get("/api/friends", requireAuth, /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
    var friends, _t20;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _context20.p = 0;
          _context20.n = 1;
          return FriendService.getFriends(req.userId);
        case 1:
          friends = _context20.v;
          res.json(friends);
          _context20.n = 3;
          break;
        case 2:
          _context20.p = 2;
          _t20 = _context20.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context20.a(2);
      }
    }, _callee20, null, [[0, 2]]);
  }));
  return function (_x41, _x42) {
    return _ref20.apply(this, arguments);
  };
}());
app["delete"]("/api/friends/:friendId", requireAuth, /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
    var _t21;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _context21.n = 1;
          return FriendService.unfriend(req.userId, req.params.friendId);
        case 1:
          res.json({
            success: true
          });
          _context21.n = 3;
          break;
        case 2:
          _context21.p = 2;
          _t21 = _context21.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context21.a(2);
      }
    }, _callee21, null, [[0, 2]]);
  }));
  return function (_x43, _x44) {
    return _ref21.apply(this, arguments);
  };
}());
app.get("/api/friends/status/:userId", requireAuth, /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
    var status, _t22;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          _context22.p = 0;
          _context22.n = 1;
          return FriendService.getFriendshipStatus(req.userId, req.params.userId);
        case 1:
          status = _context22.v;
          res.json({
            status: status
          });
          _context22.n = 3;
          break;
        case 2:
          _context22.p = 2;
          _t22 = _context22.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context22.a(2);
      }
    }, _callee22, null, [[0, 2]]);
  }));
  return function (_x45, _x46) {
    return _ref22.apply(this, arguments);
  };
}());
app.get("/api/friends/requests", requireAuth, /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
    var requests, _t23;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          _context23.n = 1;
          return FriendService.getPendingRequests(req.userId);
        case 1:
          requests = _context23.v;
          res.json(requests);
          _context23.n = 3;
          break;
        case 2:
          _context23.p = 2;
          _t23 = _context23.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context23.a(2);
      }
    }, _callee23, null, [[0, 2]]);
  }));
  return function (_x47, _x48) {
    return _ref23.apply(this, arguments);
  };
}());
app["delete"]("/api/friends/requests/:requesterId", requireAuth, /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(req, res) {
    var _t24;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          _context24.p = 0;
          _context24.n = 1;
          return FriendService.declineRequest(req.userId, req.params.requesterId);
        case 1:
          res.json({
            success: true
          });
          _context24.n = 3;
          break;
        case 2:
          _context24.p = 2;
          _t24 = _context24.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context24.a(2);
      }
    }, _callee24, null, [[0, 2]]);
  }));
  return function (_x49, _x50) {
    return _ref24.apply(this, arguments);
  };
}());

// Activity Feed Routes
app.get("/api/activity/global", /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(req, res) {
    var limit, activities, _t25;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          _context25.p = 0;
          limit = parseInt(req.query.limit) || 20;
          _context25.n = 1;
          return ActivityService.getGlobalFeed(limit);
        case 1:
          activities = _context25.v;
          console.log("Global activities found: ".concat(activities.length, ", types:"), activities.map(function (a) {
            return a.type;
          }));
          res.json(activities);
          _context25.n = 3;
          break;
        case 2:
          _context25.p = 2;
          _t25 = _context25.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context25.a(2);
      }
    }, _callee25, null, [[0, 2]]);
  }));
  return function (_x51, _x52) {
    return _ref25.apply(this, arguments);
  };
}());
app.get("/api/activity/friends", requireAuth, /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(req, res) {
    var limit, activities, _t26;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          _context26.p = 0;
          limit = parseInt(req.query.limit) || 20;
          _context26.n = 1;
          return ActivityService.getFriendsFeed(req.userId, limit);
        case 1:
          activities = _context26.v;
          console.log("Friends activities found: ".concat(activities.length, ", types:"), activities.map(function (a) {
            return a.type;
          }));
          res.json(activities);
          _context26.n = 3;
          break;
        case 2:
          _context26.p = 2;
          _t26 = _context26.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context26.a(2);
      }
    }, _callee26, null, [[0, 2]]);
  }));
  return function (_x53, _x54) {
    return _ref26.apply(this, arguments);
  };
}());

// Unified Search Routes
app.get("/api/search/users", /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(req, res) {
    var query, users, _t27;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _context27.p = 0;
          query = req.query.q;
          if (query) {
            _context27.n = 1;
            break;
          }
          return _context27.a(2, res.json([]));
        case 1:
          _context27.n = 2;
          return UserService.search(query);
        case 2:
          users = _context27.v;
          res.json(users);
          _context27.n = 4;
          break;
        case 3:
          _context27.p = 3;
          _t27 = _context27.v;
          console.error("User search error:", _t27);
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context27.a(2);
      }
    }, _callee27, null, [[0, 3]]);
  }));
  return function (_x55, _x56) {
    return _ref27.apply(this, arguments);
  };
}());
app.get("/api/search/projects", /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(req, res) {
    var query, projects, _t28;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          _context28.p = 0;
          query = req.query.q;
          if (query) {
            _context28.n = 1;
            break;
          }
          return _context28.a(2, res.json([]));
        case 1:
          _context28.n = 2;
          return ProjectService.search(query);
        case 2:
          projects = _context28.v;
          res.json(projects);
          _context28.n = 4;
          break;
        case 3:
          _context28.p = 3;
          _t28 = _context28.v;
          console.error("Project search error:", _t28);
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context28.a(2);
      }
    }, _callee28, null, [[0, 3]]);
  }));
  return function (_x57, _x58) {
    return _ref28.apply(this, arguments);
  };
}());
app.get("/api/search/activities", /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(req, res) {
    var query, activities, _t29;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          _context29.p = 0;
          query = req.query.q;
          if (query) {
            _context29.n = 1;
            break;
          }
          return _context29.a(2, res.json([]));
        case 1:
          _context29.n = 2;
          return ActivityService.searchActivities(query);
        case 2:
          activities = _context29.v;
          res.json(activities);
          _context29.n = 4;
          break;
        case 3:
          _context29.p = 3;
          _t29 = _context29.v;
          console.error("Activity search error:", _t29);
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context29.a(2);
      }
    }, _callee29, null, [[0, 3]]);
  }));
  return function (_x59, _x60) {
    return _ref29.apply(this, arguments);
  };
}());

// File Routes
app.get("/api/projects/:id/files", /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(req, res) {
    var files, _t30;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          _context30.p = 0;
          _context30.n = 1;
          return FileService.getByProject(req.params.id);
        case 1:
          files = _context30.v;
          res.json(files);
          _context30.n = 3;
          break;
        case 2:
          _context30.p = 2;
          _t30 = _context30.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context30.a(2);
      }
    }, _callee30, null, [[0, 2]]);
  }));
  return function (_x61, _x62) {
    return _ref30.apply(this, arguments);
  };
}());
app.post("/api/projects/:id/files", requireAuth, /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(req, res) {
    var fileData, file, _t31;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.p = _context31.n) {
        case 0:
          _context31.p = 0;
          fileData = _objectSpread(_objectSpread({}, req.body), {}, {
            project_id: req.params.id,
            last_modified_by: req.userId
          });
          _context31.n = 1;
          return FileService.create(fileData);
        case 1:
          file = _context31.v;
          res.json(file);
          _context31.n = 3;
          break;
        case 2:
          _context31.p = 2;
          _t31 = _context31.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context31.a(2);
      }
    }, _callee31, null, [[0, 2]]);
  }));
  return function (_x63, _x64) {
    return _ref31.apply(this, arguments);
  };
}());

// File upload endpoint
app.post("/api/projects/:id/files/upload", requireAuth, upload.single("file"), /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(req, res) {
    var content, fileData, file, _t32;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          _context32.p = 0;
          if (req.file) {
            _context32.n = 1;
            break;
          }
          return _context32.a(2, res.status(400).json({
            error: "No file uploaded"
          }));
        case 1:
          if (!(req.file.size > 10 * 1024 * 1024)) {
            _context32.n = 2;
            break;
          }
          return _context32.a(2, res.status(400).json({
            error: "File size exceeds 10MB limit"
          }));
        case 2:
          // Convert file buffer to base64 for storage
          content = req.file.buffer.toString("base64");
          fileData = {
            filename: req.file.originalname,
            content: content,
            project_id: req.params.id,
            last_modified_by: req.userId,
            size: req.file.size,
            type: req.file.mimetype || "application/octet-stream",
            is_uploaded: true
          };
          _context32.n = 3;
          return FileService.create(fileData);
        case 3:
          file = _context32.v;
          res.json(file);
          _context32.n = 6;
          break;
        case 4:
          _context32.p = 4;
          _t32 = _context32.v;
          console.error("File upload error:", _t32);
          if (!(_t32.code === "LIMIT_FILE_SIZE")) {
            _context32.n = 5;
            break;
          }
          return _context32.a(2, res.status(400).json({
            error: "File size exceeds 10MB limit"
          }));
        case 5:
          res.status(500).json({
            error: "Failed to upload file"
          });
        case 6:
          return _context32.a(2);
      }
    }, _callee32, null, [[0, 4]]);
  }));
  return function (_x65, _x66) {
    return _ref32.apply(this, arguments);
  };
}());
app.get("/api/files/:id", /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(req, res) {
    var file, _t33;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          _context33.p = 0;
          _context33.n = 1;
          return FileService.getById(req.params.id);
        case 1:
          file = _context33.v;
          if (file) {
            _context33.n = 2;
            break;
          }
          return _context33.a(2, res.status(404).json({
            error: "File not found"
          }));
        case 2:
          res.json(file);
          _context33.n = 4;
          break;
        case 3:
          _context33.p = 3;
          _t33 = _context33.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context33.a(2);
      }
    }, _callee33, null, [[0, 3]]);
  }));
  return function (_x67, _x68) {
    return _ref33.apply(this, arguments);
  };
}());
app.put("/api/files/:id", requireAuth, /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(req, res) {
    var content, _t34;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.p = _context34.n) {
        case 0:
          _context34.p = 0;
          content = req.body.content;
          _context34.n = 1;
          return FileService.update(req.params.id, content, req.userId);
        case 1:
          res.json({
            success: true
          });
          _context34.n = 3;
          break;
        case 2:
          _context34.p = 2;
          _t34 = _context34.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context34.a(2);
      }
    }, _callee34, null, [[0, 2]]);
  }));
  return function (_x69, _x70) {
    return _ref34.apply(this, arguments);
  };
}());
app["delete"]("/api/files/:id", requireAuth, /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(req, res) {
    var _t35;
    return _regenerator().w(function (_context35) {
      while (1) switch (_context35.p = _context35.n) {
        case 0:
          _context35.p = 0;
          _context35.n = 1;
          return FileService["delete"](req.params.id);
        case 1:
          res.json({
            success: true
          });
          _context35.n = 3;
          break;
        case 2:
          _context35.p = 2;
          _t35 = _context35.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 3:
          return _context35.a(2);
      }
    }, _callee35, null, [[0, 2]]);
  }));
  return function (_x71, _x72) {
    return _ref35.apply(this, arguments);
  };
}());

// ZIP download endpoint
app.get("/api/projects/:id/download", /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(req, res) {
    var project, files, zip, metadata, zipBuffer, _t36;
    return _regenerator().w(function (_context36) {
      while (1) switch (_context36.p = _context36.n) {
        case 0:
          _context36.p = 0;
          _context36.n = 1;
          return ProjectService.findById(req.params.id);
        case 1:
          project = _context36.v;
          if (project) {
            _context36.n = 2;
            break;
          }
          return _context36.a(2, res.status(404).json({
            error: "Project not found"
          }));
        case 2:
          _context36.n = 3;
          return FileService.getByProject(req.params.id);
        case 3:
          files = _context36.v;
          zip = new JSZip(); // Add each file to the ZIP
          files.forEach(function (file) {
            zip.file(file.filename, file.content || "");
          });

          // Add project metadata
          metadata = {
            project: {
              name: project.name,
              description: project.description,
              type: project.type,
              version: project.version,
              tags: project.tags,
              created_at: project.created_at,
              last_updated: project.last_updated
            },
            files_count: files.length,
            download_date: new Date()
          };
          zip.file("project-info.json", JSON.stringify(metadata, null, 2));

          // Generate ZIP buffer
          _context36.n = 4;
          return zip.generateAsync({
            type: "nodebuffer"
          });
        case 4:
          zipBuffer = _context36.v;
          // Set appropriate headers
          res.setHeader("Content-Type", "application/zip");
          res.setHeader("Content-Disposition", "attachment; filename=\"".concat(project.name.replace(/[^a-zA-Z0-9]/g, "_"), "-v").concat(project.version, ".zip\""));
          res.setHeader("Content-Length", zipBuffer.length);
          res.send(zipBuffer);
          _context36.n = 6;
          break;
        case 5:
          _context36.p = 5;
          _t36 = _context36.v;
          console.error("ZIP download error:", _t36);
          res.status(500).json({
            error: "Internal server error"
          });
        case 6:
          return _context36.a(2);
      }
    }, _callee36, null, [[0, 5]]);
  }));
  return function (_x73, _x74) {
    return _ref36.apply(this, arguments);
  };
}());

// Legacy routes for backward compatibility
app.post("/signup/validate", /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(req, res) {
    var _req$body5, username, email, password, bio, existingUser, user, sessionId, _t37;
    return _regenerator().w(function (_context37) {
      while (1) switch (_context37.p = _context37.n) {
        case 0:
          _context37.p = 0;
          _req$body5 = req.body, username = _req$body5.username, email = _req$body5.email, password = _req$body5.password, bio = _req$body5.bio;
          _context37.n = 1;
          return UserService.findByEmail(email);
        case 1:
          existingUser = _context37.v;
          if (!existingUser) {
            _context37.n = 2;
            break;
          }
          return _context37.a(2, res.status(400).json({
            error: "User already exists with this email"
          }));
        case 2:
          _context37.n = 3;
          return UserService.create({
            username: username,
            email: email,
            password: password,
            bio: bio
          });
        case 3:
          user = _context37.v;
          sessionId = generateSessionId();
          sessions.set(sessionId, user._id.toString());
          res.json({
            success: true,
            user: user,
            sessionId: sessionId
          });
          _context37.n = 5;
          break;
        case 4:
          _context37.p = 4;
          _t37 = _context37.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 5:
          return _context37.a(2);
      }
    }, _callee37, null, [[0, 4]]);
  }));
  return function (_x75, _x76) {
    return _ref37.apply(this, arguments);
  };
}());
app.post("/signin/validate", /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(req, res) {
    var _req$body6, email, password, user, sessionId, _t38;
    return _regenerator().w(function (_context38) {
      while (1) switch (_context38.p = _context38.n) {
        case 0:
          _context38.p = 0;
          _req$body6 = req.body, email = _req$body6.email, password = _req$body6.password;
          _context38.n = 1;
          return UserService.validatePassword(email, password);
        case 1:
          user = _context38.v;
          if (user) {
            _context38.n = 2;
            break;
          }
          return _context38.a(2, res.status(401).json({
            error: "Invalid credentials"
          }));
        case 2:
          sessionId = generateSessionId();
          sessions.set(sessionId, user._id.toString());
          res.json({
            success: true,
            user: user,
            sessionId: sessionId
          });
          _context38.n = 4;
          break;
        case 3:
          _context38.p = 3;
          _t38 = _context38.v;
          res.status(500).json({
            error: "Internal server error"
          });
        case 4:
          return _context38.a(2);
      }
    }, _callee38, null, [[0, 3]]);
  }));
  return function (_x77, _x78) {
    return _ref38.apply(this, arguments);
  };
}());

// Serve React app for all non-API routes
app.use(function (req, res) {
  // Only serve the React app if it's not an API request
  if (!req.path.startsWith("/api/")) {
    res.sendFile("index.html", {
      root: "frontend/public"
    });
  } else {
    // Return 404 for API routes that don't exist
    res.status(404).json({
      error: "API endpoint not found"
    });
  }
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on port ".concat(PORT));
});