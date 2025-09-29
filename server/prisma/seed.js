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
      normalpass:"adithya@123",
      role: "ADMIN",
    },
  });

}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
