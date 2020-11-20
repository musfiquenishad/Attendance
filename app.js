const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
	session({
		secret: "copyright@AhsanNishad",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
//mongoose connection
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log("Database connected");
	})
	.catch((error) => {
		console.log(error);
	});

mongoose.set("useCreateIndex", true);
//User Schema

const userSchema = new mongoose.Schema({
	email: {
		type: String,
	},
	password: {
		type: String,
	},
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Attendance Schema

const studentSchema = new mongoose.Schema({
	ip: {
		type: String,
	},
	classId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	section: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	email: {
		required: true,
		type: String,
		unique: true,
	},
});

studentSchema.plugin(uniqueValidator);
const Students = mongoose.model("Students", studentSchema);

app.post("/attend", (req, res) => {
	Students.findOne({ ip: req.body.ip }, (error, student) => {
		if (student) {
			res.status(409).send("This device is already registered");
		} else {
			const student = new Students({
				ip: req.body.ip,
				classId: req.body.classId,
				name: req.body.name,
				section: req.body.section,
				subject: req.body.subject,
				email: req.body.email,
			});

			student.save((error, success) => {
				if (error) {
					res.status(500).send("Internel server error please try again letar");
				} else {
					res.send(success);
				}
			});
		}
	});
});

app.post("/addstudent", (req, res) => {
	if (req.isAuthenticated()) {
		const student = new Students({
			ip: "",
			classId: req.body.classId,
			name: req.body.name,
			section: req.body.section,
			subject: req.body.subject,
			email: req.body.email,
		});

		student.save((error, success) => {
			if (error) {
				res.status(500).send("Internel server error please try again letar");
			} else {
				res.send("Attendance recorded successfully");
			}
		});
	}
});

app.put("/edit", (req, res) => {
	const id = req.body.id;
	const classId = req.body.classId;
	const name = req.body.name;
	const section = req.body.section;
	const subject = req.body.subject;
	const email = req.body.email;
	if (req.isAuthenticated()) {
		Students.updateOne(
			{ _id: id },
			{
				classId,
				name,
				section,
				subject,
				email,
			}
		)
			.then((req, res) => {
				res.send("Attendance edited successfully");
			})
			.catch((req, error) => {
				res.send("Internel server error please try again letar");
			});
	} else {
		res.send("You are not authenticated to edit");
	}
});

app.get("/student/:id", (req, res) => {
	if (req.isAuthenticated()) {
		Students.find({ _id: req.params.id }, (error, student) => {
			if (error) {
				res.status(404);
			} else {
				res.json(student);
			}
		});
	} else {
		res.error("You are not authenticated");
	}
});
app.get("/archive/:id", (req, res) => {
	Archives.find({ _id: req.params.id }, (error, archive) => {
		if (error) {
			res.status(404);
		} else {
			res.json(archive);
		}
	});
});

app.delete("/deletearchive/:id", (req, res) => {
	Archives.deleteOne({ _id: req.params.id }, (error, success) => {
		if (error) {
			res.status(500).send("Something went wrong while deleting archive");
		} else {
			res.send("Successfully deleted archive");
		}
	});
});

app.get("/students", (req, res) => {
	Students.find({})
		.sort("classId")
		.then((result) => {
			res.json(result);
		})
		.catch((error) => {
			res.json(error.message);
		});
});

app.delete("/deleteall", (req, res) => {
	if (req.isAuthenticated()) {
		Students.deleteMany((error) => {
			if (!error) {
				res.send("Successfully deleted all Attendance list");
			} else {
				res.send("Something went wrong please try again later!");
			}
		});
	} else {
		res.send("You are not authenticated to delete");
	}
});

app.post("/register", (req, res) => {
	User.register(
		{ username: req.body.username },
		req.body.password,
		(error, user) => {
			if (error) {
				res.send(error);
			} else {
				passport.authenticate("local")(req, res, () => {
					res.send("An user registered successfully");
				});
			}
		}
	);
});

app.post("/login", (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	});

	req.logIn(user, (error) => {
		if (!error) {
			passport.authenticate("local")(req, res, () => {
				res.send("Logged in success");
			});
		} else {
			res.send(error);
		}
	});
});

app.post("/logout", (req, res) => {
	req.logout();
	res.send("User logged out successfully");
});

const archiveSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	data: {
		type: String,
		required: true,
	},
});

const Archives = mongoose.model("Archives", archiveSchema);

app.post("/post", (req, res) => {
	if (req.isAuthenticated()) {
		const archives = new Archives({
			date: req.body.date,
			subject: req.body.subject,
			data: req.body.data,
		});

		archives.save((error, archive) => {
			if (error) {
				res.status(500);
			} else {
				res.send("Attendance data posted successfully");
			}
		});
	} else {
		res.send("You are not authenticated to post in archive");
	}
});

app.get("/archives", (req, res) => {
	Archives.find({})
		.sort("date")
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
			res.send(error.message);
		});
});

app.delete("/archive/:id", (req, res) => {
	if (req.isAuthenticated()) {
		Archives.deleteOne({ _id: req.params.id }, (error, success) => {
			if (error) {
				res.status(500);
			} else {
				res.send("Archive Successfully deleted");
			}
		});
	} else {
		res.status(401);
	}
});

app.get("/authenticated", (req, res) => {
	if (req.isAuthenticated()) {
		res.send(true);
	} else {
		res.send(false);
	}
});

const formSchema = new mongoose.Schema({
	formvisibility: { type: Boolean, required: true },
});

const Formvisibility = mongoose.model("Formvisibility", formSchema);

// app.post("/formvisibility", (req, res) => {
// 	const formvisibility = req.body.formvisibility;
// 	const visibility = new Formvisibility({
// 		formvisibility,
// 	});
// 	visibility.save((error, success) => {
// 		if (error) {
// 			res.status(500);
// 		} else {
// 			res.send("Form visibility value changed");
// 		}
// 	});
// });

app.put("/formvisibility", (req, res) => {
	Formvisibility.updateOne(
		{ _id: "5fb124a4eccd961718d0b8bc" },
		{ formvisibility: req.body.formvisibility },
		(error, success) => {
			if (error) {
				res.status(500);
			} else {
				res.send("Form visibility value changed");
			}
		}
	);
});

app.get("/showform", (req, res) => {
	Formvisibility.findOne(
		{ _id: "5fb124a4eccd961718d0b8bc" },
		(error, formvisibilityvalue) => {
			if (error) {
				res.status(500);
			} else {
				res.send(formvisibilityvalue);
			}
		}
	);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App started at port ${port}`);
});
