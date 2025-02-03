import {PrismaClient,} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  // Student
  const student = await prisma.students.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: '864-597-7798',
      address: '123 Main St',
    }
  });


  // // ANNOUNCEMENT
  // for (let i = 1; i <= 5; i++) {
  //   await prisma.announcements.create({
  //     data: {
  //       title: `Announcement ${i}`, 
  //       announcementDesc: `Description for Announcement ${i}`, 
  //       date: new Date(), 
  //       classId: (i % 5) + 1, 
  //     },
  //   });
  // }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
