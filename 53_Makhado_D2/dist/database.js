"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["password"],
  _excluded2 = ["password"],
  _excluded3 = ["password"];
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("mongodb"),
  MongoClient = _require.MongoClient,
  ObjectId = _require.ObjectId;
var connectionString = "mongodb+srv://user21:user21@imy220.6ucgnzf.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";
var database = "sudoRepoDB";
var db;

// Initialize database connection
function initDatabase() {
  return _initDatabase.apply(this, arguments);
} // User CRUD operations
function _initDatabase() {
  _initDatabase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
    var client, _t;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          _context32.p = 0;
          client = new MongoClient(connectionString);
          _context32.n = 1;
          return client.connect();
        case 1:
          db = client.db(database);
          console.log("Connected to MongoDB");

          // Create sample data if collections are empty
          _context32.n = 2;
          return createSampleData();
        case 2:
          _context32.n = 4;
          break;
        case 3:
          _context32.p = 3;
          _t = _context32.v;
          console.error("Database connection error:", _t);
        case 4:
          return _context32.a(2);
      }
    }, _callee32, null, [[0, 3]]);
  }));
  return _initDatabase.apply(this, arguments);
}
var UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }
  return _createClass(UserService, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userData) {
        var user, result, password, userWithoutPassword;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              user = {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                // Store raw password
                bio: userData.bio || "",
                profile_picture: userData.profile_picture || "/assets/images/profilePlaceholder.png",
                created_at: new Date(),
                updated_at: new Date()
              };
              _context.n = 1;
              return db.collection("users").insertOne(user);
            case 1:
              result = _context.v;
              password = user.password, userWithoutPassword = _objectWithoutProperties(user, _excluded);
              return _context.a(2, _objectSpread(_objectSpread({}, userWithoutPassword), {}, {
                _id: result.insertedId
              }));
          }
        }, _callee);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "findByEmail",
    value: function () {
      var _findByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(email) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return db.collection("users").findOne({
                email: email
              });
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2);
      }));
      function findByEmail(_x2) {
        return _findByEmail.apply(this, arguments);
      }
      return findByEmail;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        var user, password, userWithoutPassword;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return db.collection("users").findOne({
                _id: new ObjectId(id)
              });
            case 1:
              user = _context3.v;
              if (!user) {
                _context3.n = 2;
                break;
              }
              password = user.password, userWithoutPassword = _objectWithoutProperties(user, _excluded2);
              return _context3.a(2, userWithoutPassword);
            case 2:
              return _context3.a(2, null);
          }
        }, _callee3);
      }));
      function findById(_x3) {
        return _findById.apply(this, arguments);
      }
      return findById;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id, updateData) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              updateData.updated_at = new Date();
              _context4.n = 1;
              return db.collection("users").updateOne({
                _id: new ObjectId(id)
              }, {
                $set: updateData
              });
            case 1:
              _context4.n = 2;
              return this.findById(id);
            case 2:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, this);
      }));
      function update(_x4, _x5) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(query) {
        var users;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return db.collection("users").find({
                $or: [{
                  username: {
                    $regex: query,
                    $options: "i"
                  }
                }, {
                  email: {
                    $regex: query,
                    $options: "i"
                  }
                }]
              }).project({
                password: 0
              }).toArray();
            case 1:
              users = _context5.v;
              return _context5.a(2, users);
          }
        }, _callee5);
      }));
      function search(_x6) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "validatePassword",
    value: function () {
      var _validatePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(email, password) {
        var user, _, userWithoutPassword;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.findByEmail(email);
            case 1:
              user = _context6.v;
              if (!(user && user.password === password)) {
                _context6.n = 2;
                break;
              }
              _ = user.password, userWithoutPassword = _objectWithoutProperties(user, _excluded3);
              return _context6.a(2, userWithoutPassword);
            case 2:
              return _context6.a(2, null);
          }
        }, _callee6, this);
      }));
      function validatePassword(_x7, _x8) {
        return _validatePassword.apply(this, arguments);
      }
      return validatePassword;
    }()
  }]);
}(); // Project CRUD operations
var ProjectService = /*#__PURE__*/function () {
  function ProjectService() {
    _classCallCheck(this, ProjectService);
  }
  return _createClass(ProjectService, null, [{
    key: "create",
    value: function () {
      var _create2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(projectData) {
        var project, result;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              project = {
                name: projectData.name,
                description: projectData.description,
                type: projectData.type,
                tags: projectData.tags || [],
                version: projectData.version || "1.0.0",
                created_by: new ObjectId(projectData.created_by),
                created_at: new Date(),
                last_updated: new Date(),
                project_image: projectData.project_image || "/assets/images/imagePlaceholder.jpg",
                is_checked_out: false,
                checked_out_by: null,
                checked_out_at: null
              };
              _context7.n = 1;
              return db.collection("projects").insertOne(project);
            case 1:
              result = _context7.v;
              _context7.n = 2;
              return db.collection("project_collaborators").insertOne({
                project_id: result.insertedId,
                user_id: new ObjectId(projectData.created_by),
                role: "owner",
                joined_at: new Date()
              });
            case 2:
              return _context7.a(2, _objectSpread(_objectSpread({}, project), {}, {
                _id: result.insertedId
              }));
          }
        }, _callee7);
      }));
      function create(_x9) {
        return _create2.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id) {
        var project, collaborators;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (ObjectId.isValid(id)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, null);
            case 1:
              _context8.n = 2;
              return db.collection("projects").findOne({
                _id: new ObjectId(id)
              });
            case 2:
              project = _context8.v;
              if (!project) {
                _context8.n = 4;
                break;
              }
              _context8.n = 3;
              return db.collection("project_collaborators").aggregate([{
                $match: {
                  project_id: new ObjectId(id)
                }
              }, {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user"
                }
              }, {
                $unwind: "$user"
              }, {
                $project: {
                  role: 1,
                  "user.username": 1,
                  "user._id": 1
                }
              }]).toArray();
            case 3:
              collaborators = _context8.v;
              project.collaborators = collaborators;

              // Map database fields to frontend-expected fields
              project.isCheckedOut = project.is_checked_out;
              project.checkedOutBy = project.checked_out_by;
              project.checkedOutAt = project.checked_out_at;
            case 4:
              return _context8.a(2, project);
          }
        }, _callee8);
      }));
      function findById(_x0) {
        return _findById2.apply(this, arguments);
      }
      return findById;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var userId,
          query,
          collaborations,
          projectIds,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              userId = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : null;
              query = {};
              if (!userId) {
                _context9.n = 2;
                break;
              }
              _context9.n = 1;
              return db.collection("project_collaborators").find({
                user_id: new ObjectId(userId)
              }).toArray();
            case 1:
              collaborations = _context9.v;
              projectIds = collaborations.map(function (c) {
                return c.project_id;
              });
              query = {
                _id: {
                  $in: projectIds
                }
              };
            case 2:
              _context9.n = 3;
              return db.collection("projects").find(query).toArray();
            case 3:
              return _context9.a(2, _context9.v);
          }
        }, _callee9);
      }));
      function findAll() {
        return _findAll.apply(this, arguments);
      }
      return findAll;
    }()
  }, {
    key: "search",
    value: function () {
      var _search2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(query) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return db.collection("projects").find({
                $or: [{
                  name: {
                    $regex: query,
                    $options: "i"
                  }
                }, {
                  description: {
                    $regex: query,
                    $options: "i"
                  }
                }, {
                  type: {
                    $regex: query,
                    $options: "i"
                  }
                }, {
                  tags: {
                    $in: [new RegExp(query, "i")]
                  }
                }]
              }).toArray();
            case 1:
              return _context0.a(2, _context0.v);
          }
        }, _callee0);
      }));
      function search(_x1) {
        return _search2.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "checkOut",
    value: function () {
      var _checkOut = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(projectId, userId) {
        var checkoutMessage, checkinResult;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return db.collection("projects").updateOne({
                _id: new ObjectId(projectId)
              }, {
                $set: {
                  is_checked_out: true,
                  checked_out_by: new ObjectId(userId),
                  checked_out_at: new Date()
                }
              });
            case 1:
              // Create checkout message in checkin history
              checkoutMessage = {
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                message: "Project checked out",
                type: "checkout",
                timestamp: new Date()
              };
              _context1.n = 2;
              return db.collection("checkins").insertOne(checkoutMessage);
            case 2:
              checkinResult = _context1.v;
              _context1.n = 3;
              return db.collection("activity_feed").insertOne({
                user_id: new ObjectId(userId),
                type: "checkout",
                related_id: checkinResult.insertedId,
                timestamp: new Date(),
                visibility: "global",
                message: "Project checked out"
              });
            case 3:
              return _context1.a(2);
          }
        }, _callee1);
      }));
      function checkOut(_x10, _x11) {
        return _checkOut.apply(this, arguments);
      }
      return checkOut;
    }()
  }, {
    key: "checkIn",
    value: function () {
      var _checkIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(projectId, userId, message) {
        var fileUpdates,
          version,
          checkin,
          checkinResult,
          updateFields,
          _args10 = arguments;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              fileUpdates = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : [];
              version = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : null;
              // Create checkin record
              checkin = {
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                message: message,
                files_updated: fileUpdates.map(function (f) {
                  return new ObjectId(f);
                }),
                timestamp: new Date(),
                version: version
              };
              _context10.n = 1;
              return db.collection("checkins").insertOne(checkin);
            case 1:
              checkinResult = _context10.v;
              // Update project status and version
              updateFields = {
                is_checked_out: false,
                checked_out_by: null,
                checked_out_at: null,
                last_updated: new Date()
              }; // Update version if provided
              if (version) {
                updateFields.version = version;
              }
              _context10.n = 2;
              return db.collection("projects").updateOne({
                _id: new ObjectId(projectId)
              }, {
                $set: updateFields
              });
            case 2:
              _context10.n = 3;
              return db.collection("activity_feed").insertOne({
                user_id: new ObjectId(userId),
                type: "checkin",
                related_id: checkinResult.insertedId,
                timestamp: new Date(),
                visibility: "global",
                message: message,
                version: version
              });
            case 3:
              return _context10.a(2, checkin);
          }
        }, _callee10);
      }));
      function checkIn(_x12, _x13, _x14) {
        return _checkIn.apply(this, arguments);
      }
      return checkIn;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(projectId, userId) {
        var ownerCollaboration;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _context11.n = 1;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                role: "owner"
              });
            case 1:
              ownerCollaboration = _context11.v;
              if (ownerCollaboration) {
                _context11.n = 2;
                break;
              }
              throw new Error("Only project owner can delete project");
            case 2:
              _context11.n = 3;
              return db.collection("project_files").deleteMany({
                project_id: new ObjectId(projectId)
              });
            case 3:
              _context11.n = 4;
              return db.collection("project_collaborators").deleteMany({
                project_id: new ObjectId(projectId)
              });
            case 4:
              _context11.n = 5;
              return db.collection("activity_feed").deleteMany({
                project_id: new ObjectId(projectId)
              });
            case 5:
              _context11.n = 6;
              return db.collection("projects").deleteOne({
                _id: new ObjectId(projectId)
              });
            case 6:
              return _context11.a(2, {
                success: true
              });
          }
        }, _callee11);
      }));
      function _delete(_x15, _x16) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(projectId, userId, updateData) {
        var collaboration;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _context12.n = 1;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                role: {
                  $in: ["owner", "collaborator"]
                }
              });
            case 1:
              collaboration = _context12.v;
              if (collaboration) {
                _context12.n = 2;
                break;
              }
              throw new Error("Only project owner or collaborators can edit project");
            case 2:
              // Update project
              updateData.last_updated = new Date();
              _context12.n = 3;
              return db.collection("projects").updateOne({
                _id: new ObjectId(projectId)
              }, {
                $set: updateData
              });
            case 3:
              _context12.n = 4;
              return this.findById(projectId);
            case 4:
              return _context12.a(2, _context12.v);
          }
        }, _callee12, this);
      }));
      function update(_x17, _x18, _x19) {
        return _update2.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "addCollaborator",
    value: function () {
      var _addCollaborator = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(projectId, userId, collaboratorEmail) {
        var role,
          ownerCollaboration,
          collaboratorUser,
          existingCollaboration,
          _args13 = arguments;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              role = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : "collaborator";
              _context13.n = 1;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                role: "owner"
              });
            case 1:
              ownerCollaboration = _context13.v;
              if (ownerCollaboration) {
                _context13.n = 2;
                break;
              }
              throw new Error("Only project owner can add collaborators");
            case 2:
              _context13.n = 3;
              return db.collection("users").findOne({
                email: collaboratorEmail
              });
            case 3:
              collaboratorUser = _context13.v;
              if (collaboratorUser) {
                _context13.n = 4;
                break;
              }
              throw new Error("User not found");
            case 4:
              _context13.n = 5;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: collaboratorUser._id
              });
            case 5:
              existingCollaboration = _context13.v;
              if (!existingCollaboration) {
                _context13.n = 6;
                break;
              }
              throw new Error("User is already a collaborator");
            case 6:
              _context13.n = 7;
              return db.collection("project_collaborators").insertOne({
                project_id: new ObjectId(projectId),
                user_id: collaboratorUser._id,
                role: role,
                joined_at: new Date()
              });
            case 7:
              return _context13.a(2, collaboratorUser);
          }
        }, _callee13);
      }));
      function addCollaborator(_x20, _x21, _x22) {
        return _addCollaborator.apply(this, arguments);
      }
      return addCollaborator;
    }()
  }, {
    key: "removeCollaborator",
    value: function () {
      var _removeCollaborator = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(projectId, userId, collaboratorId) {
        var ownerCollaboration, targetCollaboration;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              _context14.n = 1;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                role: "owner"
              });
            case 1:
              ownerCollaboration = _context14.v;
              if (ownerCollaboration) {
                _context14.n = 2;
                break;
              }
              throw new Error("Only project owner can remove collaborators");
            case 2:
              _context14.n = 3;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(collaboratorId)
              });
            case 3:
              targetCollaboration = _context14.v;
              if (!(targetCollaboration && targetCollaboration.role === "owner")) {
                _context14.n = 4;
                break;
              }
              throw new Error("Cannot remove project owner");
            case 4:
              _context14.n = 5;
              return db.collection("project_collaborators").deleteOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(collaboratorId)
              });
            case 5:
              return _context14.a(2, true);
          }
        }, _callee14);
      }));
      function removeCollaborator(_x23, _x24, _x25) {
        return _removeCollaborator.apply(this, arguments);
      }
      return removeCollaborator;
    }()
  }, {
    key: "updateCollaboratorRole",
    value: function () {
      var _updateCollaboratorRole = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(projectId, userId, collaboratorId, newRole) {
        var ownerCollaboration, targetCollaboration;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              _context15.n = 1;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                role: "owner"
              });
            case 1:
              ownerCollaboration = _context15.v;
              if (ownerCollaboration) {
                _context15.n = 2;
                break;
              }
              throw new Error("Only project owner can update collaborator roles");
            case 2:
              _context15.n = 3;
              return db.collection("project_collaborators").findOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(collaboratorId)
              });
            case 3:
              targetCollaboration = _context15.v;
              if (!(targetCollaboration && targetCollaboration.role === "owner")) {
                _context15.n = 4;
                break;
              }
              throw new Error("Cannot change owner role");
            case 4:
              _context15.n = 5;
              return db.collection("project_collaborators").updateOne({
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(collaboratorId)
              }, {
                $set: {
                  role: newRole
                }
              });
            case 5:
              return _context15.a(2, true);
          }
        }, _callee15);
      }));
      function updateCollaboratorRole(_x26, _x27, _x28, _x29) {
        return _updateCollaboratorRole.apply(this, arguments);
      }
      return updateCollaboratorRole;
    }()
  }, {
    key: "getCheckinHistory",
    value: function () {
      var _getCheckinHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(projectId) {
        var checkins;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return db.collection("checkins").aggregate([{
                $match: {
                  project_id: new ObjectId(projectId)
                }
              }, {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user"
                }
              }, {
                $unwind: "$user"
              }, {
                $project: {
                  message: 1,
                  version: 1,
                  type: 1,
                  timestamp: 1,
                  user: {
                    _id: "$user._id",
                    username: "$user.username",
                    email: "$user.email"
                  }
                }
              }, {
                $sort: {
                  timestamp: -1
                }
              }]).toArray();
            case 1:
              checkins = _context16.v;
              return _context16.a(2, checkins);
          }
        }, _callee16);
      }));
      function getCheckinHistory(_x30) {
        return _getCheckinHistory.apply(this, arguments);
      }
      return getCheckinHistory;
    }()
  }]);
}(); // Friend CRUD operations
var FriendService = /*#__PURE__*/function () {
  function FriendService() {
    _classCallCheck(this, FriendService);
  }
  return _createClass(FriendService, null, [{
    key: "sendRequest",
    value: function () {
      var _sendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(userId, friendId) {
        var friend;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              friend = {
                user_id: new ObjectId(userId),
                friend_id: new ObjectId(friendId),
                status: "pending",
                created_at: new Date(),
                accepted_at: null
              };
              _context17.n = 1;
              return db.collection("friends").insertOne(friend);
            case 1:
              return _context17.a(2, _context17.v);
          }
        }, _callee17);
      }));
      function sendRequest(_x31, _x32) {
        return _sendRequest.apply(this, arguments);
      }
      return sendRequest;
    }()
  }, {
    key: "acceptRequest",
    value: function () {
      var _acceptRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(userId, friendId) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              _context18.n = 1;
              return db.collection("friends").updateOne({
                user_id: new ObjectId(friendId),
                friend_id: new ObjectId(userId),
                status: "pending"
              }, {
                $set: {
                  status: "accepted",
                  accepted_at: new Date()
                }
              });
            case 1:
              _context18.n = 2;
              return db.collection("friends").insertOne({
                user_id: new ObjectId(userId),
                friend_id: new ObjectId(friendId),
                status: "accepted",
                created_at: new Date(),
                accepted_at: new Date()
              });
            case 2:
              return _context18.a(2);
          }
        }, _callee18);
      }));
      function acceptRequest(_x33, _x34) {
        return _acceptRequest.apply(this, arguments);
      }
      return acceptRequest;
    }()
  }, {
    key: "getFriends",
    value: function () {
      var _getFriends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(userId) {
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              _context19.n = 1;
              return db.collection("friends").aggregate([{
                $match: {
                  user_id: new ObjectId(userId),
                  status: "accepted"
                }
              }, {
                $lookup: {
                  from: "users",
                  localField: "friend_id",
                  foreignField: "_id",
                  as: "friend"
                }
              }, {
                $unwind: "$friend"
              }, {
                $project: {
                  "friend.username": 1,
                  "friend._id": 1,
                  "friend.profile_picture": 1,
                  "friend.bio": 1
                }
              }]).toArray();
            case 1:
              return _context19.a(2, _context19.v);
          }
        }, _callee19);
      }));
      function getFriends(_x35) {
        return _getFriends.apply(this, arguments);
      }
      return getFriends;
    }()
  }, {
    key: "unfriend",
    value: function () {
      var _unfriend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(userId, friendId) {
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              _context20.n = 1;
              return db.collection("friends").deleteMany({
                $or: [{
                  user_id: new ObjectId(userId),
                  friend_id: new ObjectId(friendId)
                }, {
                  user_id: new ObjectId(friendId),
                  friend_id: new ObjectId(userId)
                }]
              });
            case 1:
              return _context20.a(2);
          }
        }, _callee20);
      }));
      function unfriend(_x36, _x37) {
        return _unfriend.apply(this, arguments);
      }
      return unfriend;
    }()
  }, {
    key: "declineRequest",
    value: function () {
      var _declineRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(userId, requesterId) {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              _context21.n = 1;
              return db.collection("friends").deleteOne({
                user_id: new ObjectId(requesterId),
                friend_id: new ObjectId(userId),
                status: "pending"
              });
            case 1:
              return _context21.a(2);
          }
        }, _callee21);
      }));
      function declineRequest(_x38, _x39) {
        return _declineRequest.apply(this, arguments);
      }
      return declineRequest;
    }()
  }, {
    key: "getFriendshipStatus",
    value: function () {
      var _getFriendshipStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(userId, otherUserId) {
        var sentRequest, receivedRequest;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              _context22.n = 1;
              return db.collection("friends").findOne({
                user_id: new ObjectId(userId),
                friend_id: new ObjectId(otherUserId)
              });
            case 1:
              sentRequest = _context22.v;
              _context22.n = 2;
              return db.collection("friends").findOne({
                user_id: new ObjectId(otherUserId),
                friend_id: new ObjectId(userId)
              });
            case 2:
              receivedRequest = _context22.v;
              if (!((sentRequest === null || sentRequest === void 0 ? void 0 : sentRequest.status) === "accepted" || (receivedRequest === null || receivedRequest === void 0 ? void 0 : receivedRequest.status) === "accepted")) {
                _context22.n = 3;
                break;
              }
              return _context22.a(2, "friends");
            case 3:
              if (!((sentRequest === null || sentRequest === void 0 ? void 0 : sentRequest.status) === "pending")) {
                _context22.n = 4;
                break;
              }
              return _context22.a(2, "request_sent");
            case 4:
              if (!((receivedRequest === null || receivedRequest === void 0 ? void 0 : receivedRequest.status) === "pending")) {
                _context22.n = 5;
                break;
              }
              return _context22.a(2, "request_received");
            case 5:
              return _context22.a(2, "none");
            case 6:
              return _context22.a(2);
          }
        }, _callee22);
      }));
      function getFriendshipStatus(_x40, _x41) {
        return _getFriendshipStatus.apply(this, arguments);
      }
      return getFriendshipStatus;
    }()
  }, {
    key: "getPendingRequests",
    value: function () {
      var _getPendingRequests = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(userId) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              _context23.n = 1;
              return db.collection("friends").aggregate([{
                $match: {
                  friend_id: new ObjectId(userId),
                  status: "pending"
                }
              }, {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "sender"
                }
              }, {
                $unwind: "$sender"
              }, {
                $project: {
                  _id: 1,
                  "sender._id": 1,
                  "sender.username": 1,
                  "sender.profile_picture": 1,
                  "sender.bio": 1,
                  created_at: 1
                }
              }]).toArray();
            case 1:
              return _context23.a(2, _context23.v);
          }
        }, _callee23);
      }));
      function getPendingRequests(_x42) {
        return _getPendingRequests.apply(this, arguments);
      }
      return getPendingRequests;
    }()
  }]);
}(); // Activity Feed operations
var ActivityService = /*#__PURE__*/function () {
  function ActivityService() {
    _classCallCheck(this, ActivityService);
  }
  return _createClass(ActivityService, null, [{
    key: "getGlobalFeed",
    value: function () {
      var _getGlobalFeed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
        var limit,
          _args24 = arguments;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              limit = _args24.length > 0 && _args24[0] !== undefined ? _args24[0] : 20;
              _context24.n = 1;
              return db.collection("activity_feed").aggregate([{
                $match: {
                  visibility: "global"
                }
              }, {
                $sort: {
                  timestamp: -1
                }
              }, {
                $limit: limit
              }, {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user"
                }
              }, {
                $unwind: "$user"
              }, {
                $lookup: {
                  from: "checkins",
                  localField: "related_id",
                  foreignField: "_id",
                  as: "checkin"
                }
              }, {
                $lookup: {
                  from: "projects",
                  localField: "checkin.project_id",
                  foreignField: "_id",
                  as: "project"
                }
              }]).toArray();
            case 1:
              return _context24.a(2, _context24.v);
          }
        }, _callee24);
      }));
      function getGlobalFeed() {
        return _getGlobalFeed.apply(this, arguments);
      }
      return getGlobalFeed;
    }()
  }, {
    key: "getFriendsFeed",
    value: function () {
      var _getFriendsFeed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(userId) {
        var limit,
          friends,
          friendIds,
          _args25 = arguments;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              limit = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : 20;
              _context25.n = 1;
              return db.collection("friends").find({
                user_id: new ObjectId(userId),
                status: "accepted"
              }).toArray();
            case 1:
              friends = _context25.v;
              friendIds = friends.map(function (f) {
                return f.friend_id;
              });
              friendIds.push(new ObjectId(userId)); // Include user's own activity
              _context25.n = 2;
              return db.collection("activity_feed").aggregate([{
                $match: {
                  user_id: {
                    $in: friendIds
                  },
                  visibility: {
                    $in: ["global", "friends"]
                  }
                }
              }, {
                $sort: {
                  timestamp: -1
                }
              }, {
                $limit: limit
              }, {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user"
                }
              }, {
                $unwind: "$user"
              }, {
                $lookup: {
                  from: "checkins",
                  localField: "related_id",
                  foreignField: "_id",
                  as: "checkin"
                }
              }, {
                $lookup: {
                  from: "projects",
                  localField: "checkin.project_id",
                  foreignField: "_id",
                  as: "project"
                }
              }]).toArray();
            case 2:
              return _context25.a(2, _context25.v);
          }
        }, _callee25);
      }));
      function getFriendsFeed(_x43) {
        return _getFriendsFeed.apply(this, arguments);
      }
      return getFriendsFeed;
    }()
  }, {
    key: "searchActivities",
    value: function () {
      var _searchActivities = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(query) {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              _context26.n = 1;
              return db.collection("activity_feed").aggregate([{
                $match: {
                  $or: [{
                    message: {
                      $regex: query,
                      $options: "i"
                    }
                  }, {
                    type: {
                      $regex: query,
                      $options: "i"
                    }
                  }],
                  visibility: "global"
                }
              }, {
                $sort: {
                  timestamp: -1
                }
              }, {
                $limit: 50
              }, {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user"
                }
              }, {
                $unwind: "$user"
              }, {
                $project: {
                  _id: 1,
                  message: 1,
                  type: 1,
                  timestamp: 1,
                  "user._id": 1,
                  "user.username": 1,
                  "user.profile_picture": 1
                }
              }]).toArray();
            case 1:
              return _context26.a(2, _context26.v);
          }
        }, _callee26);
      }));
      function searchActivities(_x44) {
        return _searchActivities.apply(this, arguments);
      }
      return searchActivities;
    }()
  }]);
}(); // File operations
var FileService = /*#__PURE__*/function () {
  function FileService() {
    _classCallCheck(this, FileService);
  }
  return _createClass(FileService, null, [{
    key: "create",
    value: function () {
      var _create3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(fileData) {
        var file;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              file = {
                project_id: new ObjectId(fileData.project_id),
                filename: fileData.filename,
                content: fileData.content,
                last_modified: new Date(),
                last_modified_by: new ObjectId(fileData.last_modified_by),
                size: fileData.size || 0,
                type: fileData.type || "text/plain",
                is_uploaded: fileData.is_uploaded || false
              };
              _context27.n = 1;
              return db.collection("files").insertOne(file);
            case 1:
              return _context27.a(2, _context27.v);
          }
        }, _callee27);
      }));
      function create(_x45) {
        return _create3.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "getByProject",
    value: function () {
      var _getByProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(projectId) {
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              _context28.n = 1;
              return db.collection("files").find({
                project_id: new ObjectId(projectId)
              }).toArray();
            case 1:
              return _context28.a(2, _context28.v);
          }
        }, _callee28);
      }));
      function getByProject(_x46) {
        return _getByProject.apply(this, arguments);
      }
      return getByProject;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(fileId) {
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              _context29.n = 1;
              return db.collection("files").findOne({
                _id: new ObjectId(fileId)
              });
            case 1:
              return _context29.a(2, _context29.v);
          }
        }, _callee29);
      }));
      function getById(_x47) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
  }, {
    key: "update",
    value: function () {
      var _update3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(fileId, content, userId) {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              _context30.n = 1;
              return db.collection("files").updateOne({
                _id: new ObjectId(fileId)
              }, {
                $set: {
                  content: content,
                  last_modified: new Date(),
                  last_modified_by: new ObjectId(userId)
                }
              });
            case 1:
              return _context30.a(2);
          }
        }, _callee30);
      }));
      function update(_x48, _x49, _x50) {
        return _update3.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(fileId) {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              _context31.n = 1;
              return db.collection("files").deleteOne({
                _id: new ObjectId(fileId)
              });
            case 1:
              return _context31.a(2);
          }
        }, _callee31);
      }));
      function _delete(_x51) {
        return _delete3.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
}(); // Create sample data
function createSampleData() {
  return _createSampleData.apply(this, arguments);
}
function _createSampleData() {
  _createSampleData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33() {
    var user1, user2, user3, project1, project2, _t2;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          _context33.p = 0;
          // Clear existing data and recreate with raw passwords
          console.log("Clearing existing data and recreating with raw passwords...");
          _context33.n = 1;
          return db.collection("users").deleteMany({});
        case 1:
          _context33.n = 2;
          return db.collection("projects").deleteMany({});
        case 2:
          _context33.n = 3;
          return db.collection("project_collaborators").deleteMany({});
        case 3:
          _context33.n = 4;
          return db.collection("files").deleteMany({});
        case 4:
          _context33.n = 5;
          return db.collection("checkins").deleteMany({});
        case 5:
          _context33.n = 6;
          return db.collection("activity_feed").deleteMany({});
        case 6:
          _context33.n = 7;
          return db.collection("friends").deleteMany({});
        case 7:
          console.log("Creating sample data...");

          // Create 2+ user profiles
          _context33.n = 8;
          return UserService.create({
            username: "Salty",
            email: "salty@gmail.com",
            password: "password123!",
            bio: "Full-stack developer passionate about creating innovative web applications."
          });
        case 8:
          user1 = _context33.v;
          _context33.n = 9;
          return UserService.create({
            username: "Prickly",
            email: "prickly@gmail.com",
            password: "password123!",
            bio: "Frontend developer who loves React and modern web technologies."
          });
        case 9:
          user2 = _context33.v;
          _context33.n = 10;
          return UserService.create({
            username: "Gerald",
            email: "gerald@gmail.com",
            password: "password123!",
            bio: "Backend engineer specializing in Node.js and database design."
          });
        case 10:
          user3 = _context33.v;
          console.log("Created 3 user profiles");

          // Create 2+ projects
          _context33.n = 11;
          return ProjectService.create({
            name: "React Program",
            description: "A personal project website built with React.",
            type: "Web Development",
            tags: ["React", "Bootstrap", "JavaScript"],
            created_by: user1._id.toString()
          });
        case 11:
          project1 = _context33.v;
          _context33.n = 12;
          return ProjectService.create({
            name: "My first Project",
            description: "A simple starter project to teach me how to code :)",
            type: "Backend",
            tags: ["Node.js", "Express", "MongoDB"],
            created_by: user2._id.toString()
          });
        case 12:
          project2 = _context33.v;
          console.log("Created 2 projects");

          // Create sample files for projects
          _context33.n = 13;
          return FileService.create({
            project_id: project1._id.toString(),
            filename: "index.html",
            content: "<!DOCTYPE html><html><head><title>Portfolio</title></head><body><h1>My Portfolio</h1></body></html>",
            last_modified_by: user1._id.toString(),
            size: 120
          });
        case 13:
          _context33.n = 14;
          return FileService.create({
            project_id: project1._id.toString(),
            filename: "styles.css",
            content: "body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }",
            last_modified_by: user1._id.toString(),
            size: 65
          });
        case 14:
          _context33.n = 15;
          return FileService.create({
            project_id: project2._id.toString(),
            filename: "server.js",
            content: "const express = require('express'); const app = express(); app.listen(3000);",
            last_modified_by: user2._id.toString(),
            size: 75
          });
        case 15:
          _context33.n = 16;
          return FileService.create({
            project_id: project2._id.toString(),
            filename: "package.json",
            content: '{"name": "project-1", "version": "1.0.0", "dependencies": {"express": "^5.1.0"}}',
            last_modified_by: user2._id.toString(),
            size: 95
          });
        case 16:
          _context33.n = 17;
          return ProjectService.checkIn(project1._id.toString(), user1._id.toString(), "Initial project setup with basic HTML structure and landing page", []);
        case 17:
          _context33.n = 18;
          return ProjectService.checkIn(project1._id.toString(), user1._id.toString(), "Added CSS styling and responsive design for better user experience", []);
        case 18:
          _context33.n = 19;
          return ProjectService.checkIn(project2._id.toString(), user2._id.toString(), "Implemented Express server setup and basic API routing structure", []);
        case 19:
          console.log("Created 3 check-ins with messages");

          // Add collaborators to projects
          _context33.n = 20;
          return ProjectService.addCollaborator(project1._id.toString(), user1._id.toString(), "prickly@gmail.com", "collaborator");
        case 20:
          _context33.n = 21;
          return ProjectService.addCollaborator(project2._id.toString(), user2._id.toString(), "gerald@gmail.com", "collaborator");
        case 21:
          _context33.n = 22;
          return FriendService.sendRequest(user1._id.toString(), user2._id.toString());
        case 22:
          _context33.n = 23;
          return FriendService.acceptRequest(user1._id.toString(), user2._id.toString());
        case 23:
          _context33.n = 24;
          return FriendService.sendRequest(user2._id.toString(), user3._id.toString());
        case 24:
          _context33.n = 25;
          return FriendService.acceptRequest(user2._id.toString(), user3._id.toString());
        case 25:
          console.log("Sample data created successfully:");
          console.log("- 3 user profiles");
          console.log("- 2 projects with files and collaborators");
          console.log("- 3 check-ins with descriptive messages");
          console.log("- Friend relationships established");
          _context33.n = 27;
          break;
        case 26:
          _context33.p = 26;
          _t2 = _context33.v;
          console.error("Error creating sample data:", _t2);
        case 27:
          return _context33.a(2);
      }
    }, _callee33, null, [[0, 26]]);
  }));
  return _createSampleData.apply(this, arguments);
}
module.exports = {
  initDatabase: initDatabase,
  UserService: UserService,
  ProjectService: ProjectService,
  FriendService: FriendService,
  ActivityService: ActivityService,
  FileService: FileService
};