import { jest } from "@jest/globals";

// Mock jwt
jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: jest.fn()
  }
}));

// Mock User model
jest.unstable_mockModule("../../models/userModel.js", () => ({
  default: {
    findById: jest.fn()
  }
}));

const authMiddleware = (await import("../../middleware/authMiddleware.js")).default;
const jwt = (await import("jsonwebtoken")).default;
const User = (await import("../../models/userModel.js")).default;

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

const mockNext = jest.fn();

describe("Auth Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret";
  });

  test("allows access with valid token", async () => {
    const req = {
      headers: {
        authorization: "Bearer validtoken123"
      },
      header: jest.fn(() => "")
    };
    const res = mockResponse();
    
    const mockUser = {
      _id: "user123",
      username: "testuser",
      email: "test@example.com"
    };
    
    jwt.verify.mockReturnValue({ id: "user123" });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser)
    });
    
    await authMiddleware(req, res, mockNext);
    
    expect(jwt.verify).toHaveBeenCalledWith("validtoken123", "test_secret");
    expect(User.findById).toHaveBeenCalledWith("user123");
    expect(req.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

  test("denies access without token", async () => {
    const req = { 
      headers: {},
      header: jest.fn(() => "")
    };
    const res = mockResponse();
    
    await authMiddleware(req, res, mockNext);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: expect.any(String)
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("denies access with invalid token", async () => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken"
      },
      header: jest.fn(() => "")
    };
    const res = mockResponse();
    
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });
    
    await authMiddleware(req, res, mockNext);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid token"
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("denies access when user not found", async () => {
    const req = {
      headers: {
        authorization: "Bearer validtoken123"
      },
      header: jest.fn(() => "")
    };
    const res = mockResponse();
    
    jwt.verify.mockReturnValue({ id: "user123" });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(null)
    });
    
    await authMiddleware(req, res, mockNext);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found"
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});