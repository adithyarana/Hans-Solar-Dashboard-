import validator from "validator";
import prisma from "../utils/prisma.js";

const generatecustomerId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const publicCustomerdata = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      whatsappNumber,
      interestAreas,
      address,
      birthday,
      location,
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!validator.isMobilePhone(whatsappNumber, "en-IN")) {
      return res.status(400).json({ message: "Invalid whatsapp number" });
    }

    const newcustomer = await prisma.customerData.create({
      data: {
        customerId: generatecustomerId(),
        name,
        phoneNumber,
        whatsappNumber,
        interestAreas,
        address,
        birthday:birthday? new Date(birthday):null,
        location:{
            district:location.district,
            tehsil:location.tehsil,
            block:location.block,
            village:location.village,
        },
      },
    });

   return res
      .status(200)
      .json({
        message: "Customer data added successfully",
        customer: newcustomer,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
