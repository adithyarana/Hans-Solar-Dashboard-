import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

// dotenv.config(); // Removed - already called in server.js

async function countHansUrja() {
  const lasthansurja = await prisma.hansUrja.findFirst({
    where: {
      role:"HANSURJAMITRA",
    },
    orderBy: {
      hansurjaId: "desc",
    },
  });

  let newhansurjaId = 1;

  if (lasthansurja?.hansurjaId) {
    const num = parseInt(lasthansurja.hansurjaId.replace("HUM", ""), 10);
    newhansurjaId = num + 1;
  }

  return `HUM${String(newhansurjaId).padStart(2, "0")}`;
}

export const registerHansUrja = async (req, res) => {
  try {
    const {
      name,
      profilePic,
      email,
      password,
      role = "HANSURJAMITRA",
      phoneNumber,
      whatsappNumber,
      address,
      birthday,
      state,
      district,
      tehsil,
      village,
      infoSource,
      notes,
      followUp,
      workCategory,
      startDate,
      aadhaarNumber,
      panNumber,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existingUser = await prisma.hansUrja.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admins only can create Hans Urja Mitra" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const LowerCaseName = name.toLowerCase();

    let Id;
    if(role === "HANSURJAMITRA"){
      Id = await countHansUrja();
    }

    const CreateHansUrja = {
      name: LowerCaseName,
      email,
      password: hashPassword,
      role,
      profilePic,
      phoneNumber,
      whatsappNumber,
      ...(address && { address }),
      birthday: birthday ? new Date(birthday) : null,
      state,
      district,
      tehsil,
      village,
      ...(infoSource && { infoSource }),
      ...(notes && { notes }),
      followUp: followUp ? new Date(followUp) : null,
      ...(workCategory && { workCategory }),
      startDate: startDate ? new Date(startDate) : null,
      ...(aadhaarNumber && { aadhaarNumber }),
      ...(panNumber && { panNumber }),
      ...(Id && { hansurjaId: Id }),
    };

    const newuser = await prisma.hansUrja.create({
      data: CreateHansUrja,
    });

    return res
      .status(200)
      .json({ message: "Hans Urja Mitra created successfully", user: newuser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// where role is employee and he want to login

export const loginHansUrja = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  push the auth details in database

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await prisma.hansUrja.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    const passwordvalid = await bcrypt.compare(password, user.password);

    if (!passwordvalid) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    if (user.name !== name) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    // token and jwt logic here

    // generate token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        hansurjaId: user.hansurjaId, // Include empid in the token payload
     
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hansurjaId: user.hansurjaId,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutHansUrja = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
