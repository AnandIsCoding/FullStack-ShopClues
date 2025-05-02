// signup controller

export const signupController = async (req, res) => {
  try {
    
  } catch (error) {
    // Error handling, error response
    if (error.name === "ValidationError") {
      // Extract validation messages
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error =>>>"), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    // Log the error message with a red background using Chalk
    console.log(chalk.bgRed("Error in signupController in auth.controller.js ---->> ", error));
    // send a genric internal server error
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
