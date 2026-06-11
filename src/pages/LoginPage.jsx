import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData";
import { loadState } from "../utils/localStorage";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import AuthLayout from "../components/AuthLayout";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const localUsers = loadState("registeredUsers", []);
    const matchedUser =
      authData.users.find(
        (u) => u.username === username && u.password === password,
      ) ||
      localUsers.find(
        (u) => u.username === username && u.password === password,
      );

    if (matchedUser) {
      const userKey = matchedUser.username;
      const userCart = loadState(`cartItems_${userKey}`, []);
      const userWishlist = loadState(`wishlistItems_${userKey}`, []);

      dispatch(
        login({
          user: { username: matchedUser.username, role: matchedUser.role },
          cartItems: userCart,
          wishListItems: userWishlist,
        }),
      );
      navigate("/");
    } else setError("Invalid username or password.");
  };

  const handleQuickLogin = () => {
    dispatch(
      login({
        user: { role: "guest" },
        cartItems: [],
        wishListItems: [],
      }),
    );
    navigate("/");
  };

  return (
    <AuthLayout maxWidth="max-w-sm" pl="lg:pl-[10%] xl:pl-[15%]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1 text-center mb-4">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your ShopSphere account
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-medium">
              OR
            </span>
          </div>
        </div>

        <Button variant="outline" onClick={handleQuickLogin} className="w-full">
          Continue as Guest
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
