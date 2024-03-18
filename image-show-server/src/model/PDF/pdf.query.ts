import sequelize from "sequelize";
import {User} from "../PDF/pdf.model";

// export const getUser = async (account_number: string) => {
//     try {
//         console.log('Account number:', account_number); // Log the account number to verify its value
//         const user = await User.findOne({
//             where: {
//                 account_number: account_number
//             }
//         });
//         return user;
//     } catch (error) {
//         console.error("Error getting user from database:", error);
//         throw new Error("Error getting user from database: " + error);
//     }
// };
export const getUser = async (accountNumber: string) => {
    try {
      const user = await User.findOne({
        where: {
          account_number: accountNumber
        }
      });
  
      if (user) {
        return user; // This will be the user object with all its data
      } else {
        return null; // No user found with the given account number
      }
    } catch (error) {
      console.error('Error getting user from database:', error);
      throw error;
    }
  };
export const setUser = async (name: string, account_number: string, pdfData1: string [], pdfData2: string []) => {
    try {
        await User.create({
            name, 
            account_number,
            pdfData1,
            pdfData2
        });
        
    } catch (error) {
        throw new Error("Error getting all values from database: " + error);
    }
}
