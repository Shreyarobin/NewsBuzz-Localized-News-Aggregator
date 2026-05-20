import { jest } from "@jest/globals";

// Mock dependencies
jest.unstable_mockModule("../../models/userModel.js", () => ({
  default: jest.fn()
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn()
  }
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn()
  }
}));

// Import after mocking
const { registerUser, loginUser } = await import("../../controllers/userController.js");
const UserModel = (await import("../../models/userModel.js")).default;
const bcrypt = (await import("bcryptjs")).default;
const jwt = (await import("jsonwebtoken")).default;

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    test("registers a new user successfully", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "Reader"
        }
      };
      const res = mockResponse();
      
      // Mock User.findOne to return null (no existing user)
      UserModel.findOne = jest.fn().mockResolvedValue(null);
      
      // Mock bcrypt
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedpassword");
      
      // Mock JWT
      jwt.sign.mockReturnValue("mocktoken123");
      
      // Mock new User instance
      const mockSave = jest.fn().mockResolvedValue(true);
      UserModel.mockImplementation(() => ({
        _id: "user123",
        username: "testuser",
        role: "Reader",
        save: mockSave
      }));
      
      await registerUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "User registered successfully",
          token: "mocktoken123"
        })
      );
    });

    test("returns 400 when user already exists", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123"
        }
      };
      const res = mockResponse();
      
      UserModel.findOne = jest.fn().mockResolvedValue({ email: "test@example.com" });
      
      await registerUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists"
      });
    });
  });

  describe("loginUser", () => {
    test("logs in user successfully", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123"
        }
      };
      const res = mockResponse();
      
      const mockUser = {
        _id: "user123",
        username: "testuser",
        password: "hashedpassword",
        role: "Reader"
      };
      
      UserModel.findOne = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mocktoken123");
      
      await loginUser(req, res);
      
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: "mocktoken123",
        user: expect.objectContaining({
          _id: "user123",
          username: "testuser",
          role: "Reader"
        })
      });
    });

    test("returns 400 when user not found", async () => {
      const req = {
        body: {
          email: "nonexistent@example.com",
          password: "password123"
        }
      };
      const res = mockResponse();
      
      UserModel.findOne = jest.fn().mockResolvedValue(null);
      
      await loginUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    test("returns 400 when password is invalid", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "wrongpassword"
        }
      };
      const res = mockResponse();
      
      const mockUser = {
        _id: "user123",
        email: "test@example.com",
        password: "hashedpassword"
      };
      
      UserModel.findOne = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);
      
      await loginUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials"
      });
    });
  });
});