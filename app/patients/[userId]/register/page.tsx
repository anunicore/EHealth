import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const Register = async ({ params: { userId } }: SearchParamProps) => {
  let user;

  try {
    // Fetch the user data
    user = await getUser(userId);
  } catch (error) {
    console.error("Error fetching user:", error);
    return <p>Error fetching user information. Please try again later.</p>;
  }

  // Ensure that user is defined before accessing its properties
  if (!user) {
    return <p> Tran Quoc An </p>;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>

            {/* Ensure the user object exists before rendering the link */}
            {user && (
              <Link href={`/patients/${user.id}/register`}>
                <a className="text-green-500">
                  Go to Register Page for {user.id}
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

// const Register = () => {
//   return (
//     <div className="flex h-screen max-h-screen">
//       {/* TODO: OTP Certification */}

//       <section className="remove-scrollbar container my-auto">
//         {/* container{width:100% margin-rl:autop pad-rl:2rem=32px
//       @media min-widht:1400px{.container{max-w:1400px}} }  */}
//         <div className="sub-container max-w-[496px]">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={1000}
//             width={1000}
//             alt="patient"
//             className="mb-12 h-10 w-fit"
//           />
//           {/* <PatientForm /> */}

//           <div className="text-14-regular mt-20 flex justify-between">
//             <p className="justify-items-end text-dark-600 xl:text-left">
//               © 2024 CarePulse
//             </p>
//             <Link href="/?admin=true" className="text-green-500">
//               Admin
//             </Link>
//           </div>
//         </div>
//       </section>
//       <Image
//         src="/assets/images/register-img.png"
//         height={1000}
//         width={1000}
//         alt="patient"
//         className="side-img max-w-[70%]"
//       />
//     </div>
//   )
// }

// export default Register
