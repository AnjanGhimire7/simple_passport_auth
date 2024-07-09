import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import passport from "passport";
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;
  if (
    [userName, email, password, fullName].every(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All the fields are required!!!");
  }
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with userName and email already exists!!!");
  }
  const user = await User.create({
    userName,
    fullName,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user!!!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Successfully created User!!!"));
});






export { registerUser};
