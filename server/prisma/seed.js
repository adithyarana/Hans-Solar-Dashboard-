import bcrypt from "bcrypt";
import prisma from "../src/utils/prisma.js";

// main admin data saved in databse 

async function main() {
  const passwordHash = await bcrypt.hash("hanssolar12", 10);

  await prisma.user.create({
    data: {
      name: "HANS SOLAR",
      email: "hum@hanssolar.in",
      password:passwordHash,
      normalpass:"hanssolar12",
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
