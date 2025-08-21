import bcrypt from "bcrypt";
import prisma from "../src/utils/prisma.js";

// main admin data saved in databse 

async function main() {
  const passwordHash = await bcrypt.hash("adithya@123", 10);

  await prisma.user.create({
    data: {
      name: "Adithya".toLowerCase(),
      email: "adithya@hanssolar.com",
      password:passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✅ Initial admin created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
