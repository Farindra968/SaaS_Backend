import { ITeacherData } from "../global";

const teacherWelcomeEmail = (
  plainPassword: string,
  data: ITeacherData,
  instituteNumber: Number
) => {
  return `
    <div 
      role="article" 
      aria-label="Welcome email for new teacher ${data.teacherName}"
      style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        max-width: 600px; 
        margin: 0 auto; 
        background-color: #ffffff; 
        padding: 30px 25px; 
        border-radius: 12px; 
        border: 1px solid #e0e0e0; 
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        color: #2c3e50;
      "
    >
      <h2 style="text-align: center; font-weight: 700; margin-bottom: 20px;">
        👋 Welcome to Edu Academy, ${data.teacherName}!
      </h2>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        We’re delighted to welcome you as a mentor! Your teaching profile has been created successfully.
        Below are your temporary login details. Please log in and update your password at your earliest convenience.
      </p>

      <div 
        style="
          background-color: #f9f9f9; 
          border-left: 5px solid #3498db; 
          border-radius: 6px; 
          padding: 20px 25px; 
          margin-bottom: 30px;
        "
      >
        <p style="font-size: 16px; margin: 8px 0;"><strong>Email:</strong> <em>${data.teacherEmail}</em></p>
        <p style="font-size: 16px; margin: 8px 0;"><strong>Temporary Password:</strong> <em>${plainPassword}</em></p>
        <p style="font-size: 16px; margin: 8px 0;"><strong>Institute Number:</strong> <em>${instituteNumber}</em></p>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <a 
          href="https://your-platform.com/login" 
          style="
            background-color: #3498db; 
            color: #fff; 
            padding: 14px 28px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: 16px;
            display: inline-block;
            transition: background-color 0.3s ease;
          "
        >
          🔐 Log In to Your Account
        </a>
      </div>

      <p style="font-size: 15px; color: #555; margin-bottom: 20px;">
        <strong>Note:</strong> While logging in, make sure to enter your <strong>Institute Number</strong> along with your email and password.
      </p>

      <p style="font-size: 15px; color: #555;">
        For your security, please change your password after logging in. If you have any questions or need assistance, our support team is here to help.
      </p>

      <p style="font-size: 15px; color: #555;">
        Warm regards,<br />
        <strong>Admin Team, Edu Academy</strong>
      </p>

      <hr style="margin: 40px 0 20px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #aaa; text-align: center; font-style: italic;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
  `;
};

export default teacherWelcomeEmail;



// import { ITeacherData } from "../global";

// const teacherWelcomeEmail = (plainPassword: string, data: ITeacherData) => {
//   return `
//     <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
//       <h2 style="color: #2c3e50; text-align: center;">👋 Welcome to Edu Academy, ${data.teacherName}!</h2>

//       <p style="font-size: 16px; color: #34495e; line-height: 1.6;">
//         We're thrilled to have you on board as a mentor! Your teaching profile has been successfully created.
//         Below are your temporary login credentials. Please log in and update your password right away.
//       </p>

//       <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #3498db; border-radius: 6px;">
//         <p style="font-size: 16px; margin: 0;"><strong>Email:</strong> ${data.teacherEmail}</p>
//         <p style="font-size: 16px; margin: 0;"><strong>Temporary Password:</strong> ${plainPassword}</p>
//       </div>

//       <div style="text-align: center; margin-top: 30px;">
//         <a href="https://your-platform.com/login" style="background-color: #3498db; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px;">
//           🔐 Log In to Your Account
//         </a>
//       </div>

//       <p style="font-size: 15px; color: #555; margin-top: 30px;">
//         For your security, make sure to change your password after logging in. If you have any questions or face issues, feel free to contact our support team.
//       </p>

//       <p style="font-size: 15px; color: #555; margin-top: 40px;">
//         Warm regards,<br>
//         <strong>Admin Team, Edu Academy</strong>
//       </p>

//       <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />

//       <p style="font-size: 12px; color: #aaa; text-align: center;">
//         This is an automated email. Please do not reply to this message.
//       </p>
//     </div>
//   `;
// };

// export default teacherWelcomeEmail;
