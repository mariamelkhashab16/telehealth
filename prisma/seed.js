const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {

  // Seed Roles
  const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'doctor' },
    { id: 3, name: 'patient' },
    { id: 4, name: 'receptionist' }
  ];

  await prisma.role.createMany({
    data: roles,
    skipDuplicates: true,
  });

  console.log('Roles seeded');

  // Seed Specializations
  const specializations = [
    { id: 1, name: 'General Practitioner', name_ar: 'طبيب عام' },
    { id: 2, name: 'Cardiologist', name_ar: 'طبيب قلب' },
    { id: 3, name: 'Dermatologist', name_ar: 'طبيب جلدية' },
    { id: 4, name: 'Neurologist', name_ar: 'طبيب أعصاب' },
    { id: 5, name: 'Pediatrician', name_ar: 'طبيب أطفال' },
    { id: 6, name: 'Psychiatrist', name_ar: 'طبيب نفسي' },
    { id: 7, name: 'Orthopedic Surgeon', name_ar: 'جراح عظام' },
    { id: 8, name: 'Gynecologist', name_ar: 'طبيب نساء وتوليد' },
    { id: 9, name: 'Oncologist', name_ar: 'طبيب أورام' },
    { id: 10, name: 'Endocrinologist', name_ar: 'طبيب غدد صماء' }
  ];

  await prisma.specialization.createMany({
    data: specializations,
    skipDuplicates: true,
  });

  console.log('Specializations seeded');

  // Seed Users (Doctors)
  const users = [
    { username: 'ahmed.ibrahim', phonenumber: '01102332338', password: 'password1' },
    { username: 'sara.mohamed', phonenumber: '01115052209', password: 'password2' },
    { username: 'omar.hassan', phonenumber: '01222151306', password: 'password3' },
    { username: 'layla.khalid', phonenumber: '01222717349', password: 'password4' },
  ];

  const createdUsers = await Promise.all(users.map(async (user, index) => {
    return await prisma.user.create({
      data: {
        id: index + 1, 
        username: user.username,
        phonenumber: user.phonenumber,
        password: await bcrypt.hash(user.password, 10), // Hash passwords
        roleId: 2,
      },
    });
  }));

  console.log('Users (Doctors) seeded');

  // Seed Doctors (Linked to Users)
  const doctorData = [
    { bio: 'Experienced cardiologist with 10+ years.', specializationId: 2 },
    { bio: 'Pediatrician passionate about child healthcare.', specializationId: 5 },
    { bio: 'Orthopedic surgeon specializing in sports injuries.', specializationId: 7 },
    { bio: 'Neurologist with expertise in epilepsy.', specializationId: 4 },
  ];

  await Promise.all(createdUsers.map(async (user, index) => {
    await prisma.doctor.create({
      data: {
        id: index + 1, 
        userId: user.id,
        bio: doctorData[index].bio,
        specializationId: doctorData[index].specializationId,
      },
    });
  }));

  console.log('Doctors seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
