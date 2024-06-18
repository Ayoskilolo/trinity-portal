// import { prisma } from "./db";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function runSeeders() {
  console.log("Running Seeders");

  //Creating the Doctors
  await prisma.doctor.createMany({
    data: [
      {
        dateCreated: new Date(),
        firstName: "Semilore",
        lastName: "Sanya",
        status: "ON_SEAT",
        email: "semilore@email.com",
      },
      {
        dateCreated: new Date(),
        firstName: "Afolabi",
        lastName: "Lesi",
        status: "ON_SEAT",
        email: "afolabi@email.com",
      },
      {
        dateCreated: new Date(),
        firstName: "Mayokun",
        lastName: "Timothy",
        status: "OFF_SEAT",
        email: "mayokun@email.com",
      },
    ],
  });

  //Creating the Students
  await prisma.student.createMany({
    data: [
      {
        matricNumber: "18CG024711",
        firstName: "Toni ",
        lastName: "Hector",
        nationality: " Nigerian",
        dateOfBirth: new Date("11-04-2001"),
        level: "FRESHMAN",
        college: "COE",
        sex: "FEMALE",
        religion: "Christian",
        password: "",
        hall: "Deborah",
        // Visits: {
        //   create: [
        //     {
        //       id: "1",
        //       doctorId: "1",
        //       dateOfVisit: new Date(),
        //       notes: "This one na malaria",
        //       diagnosis: "MALARIA",
        //       severity: "MEDIUM",
        //     },
        //   ],
        // },
        // Surgeries: [],
      },
      {
        matricNumber: "18CG024712",
        firstName: "Ayomide ",
        lastName: "Afolabi",
        nationality: "Nigerian",
        dateOfBirth: new Date("07-08-2001"),
        level: "SOPHMORE",
        college: "COE",
        sex: "MALE",
        religion: "Christian",
        hall: "Daniel",
        password: "",
        // Visits: {
        //   create: [
        //     {
        //       id: "2",
        //       doctorId: "String",
        //       dateOfVisit: new Date(),
        //       notes: " This one na cold",
        //       diagnosis: "COLD",
        //       severity: "MEDIUM",
        //     },
        //   ],
        // },
        // Surgeries: [],
      },
      {
        matricNumber: "18CG024713",
        firstName: "Fernami",
        lastName: "Sowole",
        nationality: "Nigerian",
        dateOfBirth: new Date("07-07-2001"),
        level: "JUNIOR",
        college: "FMASS",
        sex: "MALE",
        hall: "Joseph",
        religion: "Christian",
        password: "",
        // Visits: {
        //   create: [
        //     {
        //       id: "3",
        //       doctorId: "2",
        //       dateOfVisit: "DateTime",
        //       notes: " This one na sprain",
        //       diagnosis: "SPRAIN",
        //       severity: "LOW",
        //     },
        //   ],
        // },
        // Surgeries: [],
      },
      {
        matricNumber: "18CG024714",
        firstName: "Fiyin",
        lastName: "Daramola",
        nationality: "Nigerian",
        dateOfBirth: new Date("07-08-2001"),
        level: "SENIOR",
        college: "FBMAS",
        sex: "FEMALE",
        religion: "Christian",
        hall: "Esther",
        password: "",
        // Visits: {
        //   create: [
        //     {
        //       id: "2",
        //       doctorId: "String",
        //       dateOfVisit: new Date(),
        //       notes: " This one na cold",
        //       diagnosis: "COLD",
        //       severity: "MEDIUM",
        //     },
        //   ],
        // },
        // Surgeries: [],
      },
      {
        matricNumber: "18CG024715",
        firstName: "Hameed",
        lastName: "Soyemi",
        nationality: "Nigerian",
        dateOfBirth: new Date("07-08-2001"),
        level: "ALEVEL",
        college: "COE",
        sex: "MALE",
        religion: "Christian",
        hall: "Daniel",
        password: "",
        // Visits: {
        //   create: [
        //     {
        //       id: "2",
        //       doctorId: "String",
        //       dateOfVisit: new Date(),
        //       notes: " This one na cold",
        //       diagnosis: "COLD",
        //       severity: "MEDIUM",
        //     },
        //   ],
        // },
        // Surgeries: [],
      },
    ],
  });

  //Creating Next of Kin
  await prisma.nextOfKin.createMany({
    data: [
      {
        firstName: "Father",
        lastName: "Hector",
        address: "22 Victoria Islan",
        phoneNumber: "09033051025",
        sex: "FEMALE",
        studentId: "18CG024711",
      },
      {
        firstName: "Kemi",
        lastName: "Afolabi",
        address: "22 Kolawole Shonibare Street",
        phoneNumber: "09033051025",
        sex: "MALE",
        studentId: "18CG024712",
      },
      {
        firstName: "Mother",
        lastName: "Sowole",
        address: "22 Mende Street",
        phoneNumber: "09033051025",
        sex: "FEMALE",
        studentId: "18CG024713",
      },
      {
        firstName: "Mother",
        lastName: "Daramola",
        address: "22 Ikeja Street",
        phoneNumber: "09033051025",
        sex: "FEMALE",
        studentId: "18CG024714",
      },
    ],
  });

  //Creating Visits
  // await prisma.visits.createMany({
  //   data: [
  //     {
  //       studentId: "18CG024711",
  //       doctorId: "1",
  //       dateOfVisit: new Date(),
  //       notes: "",
  //       diagnosis: "COLD",
  //       severity: "LOW",
  //     },
  //     {
  //       studentId: "18CG024711",
  //       doctorId: "1",
  //       dateOfVisit: new Date(),
  //       notes: "",
  //       diagnosis: "COLD",
  //       severity: "MEDIUM",
  //     },
  //     {
  //       studentId: "18CG024711",
  //       doctorId: "2",
  //       dateOfVisit: new Date(),
  //       notes: "",
  //       diagnosis: "COLD",
  //       severity: "HIGH",
  //     },
  //     {
  //       studentId: "18CG024711",
  //       doctorId: "2",
  //       dateOfVisit: new Date(),
  //       notes: "",
  //       diagnosis: "COLD",
  //       severity: "HIGH",
  //     },
  //     {
  //       studentId: "18CG024713",
  //       doctorId: "1",
  //       dateOfVisit: new Date(),
  //       notes: "",
  //       diagnosis: "SPRAIN",
  //       severity: "HIGH",
  //     },
  //     {
  //       studentId: "18CG024714",
  //       doctorId: "2",
  //       dateOfVisit: new Date(),
  //       notes: "",
  //       diagnosis: "MALARIA",
  //       severity: "MEDIUM",
  //     },
  //   ],
  // });

  console.log("Finished Seeding");
}

runSeeders();
