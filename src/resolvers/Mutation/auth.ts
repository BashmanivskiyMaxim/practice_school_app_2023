import { Context } from "../../index";
import { Post, Prisma } from ".prisma/client";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../../keys";

interface SignupArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

interface SigninArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
  userId: number | null
}

export const authResolvers = {
  signup: async (
    _: any,
    { credentials, name, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const isEmail = validator.isEmail(email);
    console.log(email);

    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "Invalid Email!",
          },
        ],
        token: null,
        userId: null
      };
    }

    const isValidPassword = validator.isLength(password, { min: 5 });

    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: "Invalid Password!",
          },
        ],
        token: null,
        userId: null
      };
    }

    if (!name) {
      return {
        userErrors: [
          {
            message: "Invalid Name!",
          },
        ],
        token: null,
        userId: null
      };
    }

    if (!bio) {
      return {
        userErrors: [
          {
            message: "Invalid Bio!",
          },
        ],
        token: null,
        userId: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    return {
      userErrors: [],
      token: JWT.sign(
        {
          userId: user.id,
          email: user.email
        },
        JSON_SIGNATURE,
        { expiresIn: 6400000 }
      ),
      userId: user.id
    };
  },

  signin: async (
    _: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "Invalid credentials!",
          },
        ],
        token: null,
        userId: null
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [
          {
            message: "Invalid credentials!",
          },
        ],
        token: null,
        userId: null
      };
    }

    return {
      userErrors: [],
      token: JWT.sign({ userId: user.id, email: user.email }, JSON_SIGNATURE, {
        expiresIn: 64000,
      }),
      userId: user.id
    };
  },
};
